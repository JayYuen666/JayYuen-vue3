import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { getTokenAUTH } from './auth.ts'

const pendingMap = new Map()

const LoadingInstance: any = {
  targetValue: null, // 保存Loading实例
  countValue: 0
}

function myAxios(axiosConfig: AxiosRequestConfig<any>, customOptions: any, loadingOptions: any) {
  const service = axios.create({
    baseURL: 'http://localhost:8888', // 设置统一的请求前缀
    timeout: 10000 // 设置统一的超时时长
  })

  // 自定义配置
  const options = {
    repeatRequestCancel: true, // 是否开启取消重复请求, 默认为 true
    loading: false, // 是否开启loading层效果, 默认为false
    errorMessageShow: true, // 是否开启接口错误信息展示，默认为true
    reduceDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
    codeMessageShow: false, // 是否开启code不为0时的信息提示, 默认为false
    ...customOptions
  }

  service.interceptors.request.use(
    (config) => {
      removePending(config)
      options.repeatRequestCancel && addPending(config)
      // 创建loading实例
      if (options.loading) {
        LoadingInstance.countValue += 1
        if (LoadingInstance.countValue === 1) {
          LoadingInstance.targetValue = ElLoading.service(loadingOptions)
        }
      }
      // 自动携带token
      if (getTokenAUTH() && typeof window !== 'undefined') {
        config.headers.Authorization = getTokenAUTH()
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => {
      removePending(response.config)
      options.loading && closeLoading(options) // 关闭loading
      if (options.codeMessageShow && response.data && response.data.code !== 0) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })
        return Promise.reject(response.data) // code不等于0, 页面具体逻辑就不执行了
      }
      return options.reduceDataFormat ? response.data : response
    },
    (error) => {
      error.config && removePending(error.config)
      options.loading && closeLoading(options) // 关闭loading
      options.errorMessageShow && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config: InternalAxiosRequestConfig<any>) {
  const { url, method, params, data } = config
  if (typeof data === 'string') {
    config.data = JSON.parse(data)
  } // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(config.data)].join('&')
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 关闭Loading层实例
 * @param {*} _options
 */
function closeLoading(_options: { loading: any }) {
  if (_options.loading && LoadingInstance.countValue > 0) {
    LoadingInstance.countValue -= 1
  }
  if (LoadingInstance.countValue === 0 && LoadingInstance.targetValue) {
    LoadingInstance.targetValue.close()
    LoadingInstance.targetValue = null
  }
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: { message: string | string[]; response: { status: any; config: { url: any } } }) {
  // 处理被取消的请求
  if (axios.isCancel(error)) {
    return console.error(`请求的重复请求：${error.message}`)
  }
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) {
    message = '网络请求超时！'
  }
  if (error.message.includes('Network')) {
    message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  }

  ElMessage({
    type: 'error',
    message
  })
}

export default myAxios
