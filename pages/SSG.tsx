import { GetStaticProps, NextPage } from "next"
import { getPosts } from "../lib/posts"

type Post = {
  id: string,
  title: string
}

type Props = {
  posts: Post[]
}
/**
 * 静态页面生成（SSG） Static Site Generation
 * @param props 
 * @returns 
 */
const SSGPostIndex: NextPage<Props> = (props) => {
  const { posts } = props
  return (
    <div>
      {
        posts.map(p => <div key={p.title}>{p.title}</div>)
      }
    </div>
  )
}
export default SSGPostIndex

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: { posts }
  }
}