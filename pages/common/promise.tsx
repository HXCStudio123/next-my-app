import { useRouter } from 'next/router'
import { MyPromise } from '../util/promise'
function Common() {
  const mp = new MyPromise((resolve: Function, reject: Function) => {
    console.log(11)
    // 在此处执行resolve后才算通过
    setTimeout(() => { resolve(1) }, 100)
  })
  const a = mp.then((val: MyPromiseResult) => {
    console.log(2, val)
    return new MyPromise((r: Function, j: Function) => {
      r(44444)
    })
  })
  const b = a.then((val: MyPromiseResult) => {
    console.log(3, val)
  })
  const c = b.then((val: MyPromiseResult) => {
    console.log(4, val)
  })
  // 执行回调
  console.log(33, mp, a, b, c)

  // 比较真实promise
  // const p = new Promise((resolve: Function, reject: Function) => {
  //   console.log('promise', 11)
  //   // resolve(1)
  //   setTimeout(() => {resolve(1)}, 100)
  // })
  // const a = p.then((val) => {
  //   console.log('promise结果', val)
  //   // return new Promise((r,j)=>{
  //   //   r(4444)
  //   // })
  //   return 333
  // })
  // const b = a.then((val) => {
  //   console.log('promise结果22', val)
  // })
  // console.log('promise', 33, a)
  // 动态路由
  const router = useRouter()
  const { pid } = router.query
  console.log(router, pid)
  return <div>test Common--{pid}</div>
}
export default Common