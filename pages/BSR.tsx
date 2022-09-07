import { NextPage } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
type Post = {
  id: string,
  title: string
}
/**
 * 客户端渲染
 * @returns ReactElement
 */
const PostIndex: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/posts').then(res => {
      console.log(res)
      setPosts(res.data)
      setIsLoading(false)
    }, () => {
      setIsLoading(true)
    })
  }, [])
  console.log('结果', posts)
  return (
    <div>
      <h1>测试数据</h1>
      {isLoading ? <div>记载中</div>  : posts.map(p=><div key={p.id}>{p.title}</div>)}
    </div>
  )
}
export default PostIndex