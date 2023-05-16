// / <reference types="vite/client" />

declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

/** @description 用户传参时忽略常量类型 */
declare type Literal = string | number | null | undefined

declare module 'element-plus';
