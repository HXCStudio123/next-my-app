import { useRouter } from 'next/router'

function Common() {
  // 动态路由
  const router = useRouter()
  const { pid } = router.query
  console.log(router, pid)
  return <div>test Common--{pid}</div>
}
export default Common