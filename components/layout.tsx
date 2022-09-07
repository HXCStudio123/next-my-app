import { DetailedHTMLProps, HTMLAttributes } from "react"

export default function Layout({children} : DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  console.log('引用了', children)
    return (
      <div>
        <h1>顶部</h1>
        <main>{children}</main>
        <footer>dibu</footer>
      </div>
    )
}