import { isNaN, isNil } from 'lodash-es'
/**
 *
 * @param number 默认值
 * @param precision 保留的小数点位数
 * @returns 传入参数后四舍五入并保留小数位数
 */
function roundToFixed(value: Literal, precision = 2): string {
  if (isNaN(Number(value)) || value === '' || isNil(value)) {
    return value as string
  }
  if (+value >= 0) {
    return (Math.round(+`${value}e${precision}`) / Math.pow(10, precision)).toFixed(precision);
  }
  return ((Math.round((+`${value}e${precision}`) * -1) / Math.pow(10, precision)) * -1).toFixed(precision);
}

export {
  roundToFixed
}
