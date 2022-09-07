import type { ReactElement } from 'react'
export default function Layout(page : ReactElement) {
  console.log('引用了', page)
    return (
      <div>
        <h1>顶部</h1>
        <main>{page}</main>
        <footer>dibu</footer>
      </div>
    )
}