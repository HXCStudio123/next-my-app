
export default function Layout({ children } : any) {
  // console.log('引用了', children)
    return (
      <div>
        <h1>顶部Second</h1>
        <main>{children}</main>
        <footer>dibuSecond</footer>
      </div>
    )
}