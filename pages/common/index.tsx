import { useRouter } from 'next/router'

function Common() {
  const router = useRouter()
  const { pid } = router.query
  return <div>test Common{pid}</div>
}
export default Common