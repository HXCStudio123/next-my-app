/*
 * @Autor: ERP
 * @Email: 邮箱
 * @Description: 
 * @CreateDate: Do not edit
 * @LastEditors: houxinchao
 */
import { DetailedHTMLProps, HTMLAttributes } from "react"

export default function Layout({ children }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <div>
      <p>顶部数据结果展示</p>
      <main>{children}</main>
      <footer>测试底部展示</footer>
    </div>
  )
}