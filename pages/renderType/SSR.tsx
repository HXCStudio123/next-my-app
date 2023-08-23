import { IncomingHttpHeaders } from "http2"
import { GetServerSideProps, NextPage } from "next"

type Post = {
  id: string,
  title: string
}

type Props = {
  posts: Post[]
}
/**
 * 服务端渲染（SSR)
 * @param props 
 * @returns 
 */
const SSGPostIndex: NextPage<Props> = (props) => {
  const { browser } = props
  console.log(browser)
  return (
    <div>
      你的浏览器是 {browser}
    </div>
  )
}
export default SSGPostIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const headers: IncomingHttpHeaders = context.req.headers
  const browser = headers['user-agent']
  return {
    props: {
      browser
    }
  }
}
