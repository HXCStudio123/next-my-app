const PENDING = 'pending' //进行中
const FULFILLED = 'fulfilled' //成功
const REJECTED = 'rejected' //失败
const timeFn = (cb: Function) => {
  setTimeout(cb, 0)
}
type MyPromiseResult = string | number | undefined
class MyPromise {
  private status?: string
  private result?: MyPromiseResult
  private reason?: MyPromiseReason
  private onFullfiledList?: Array<Function>
  private onRejectedList?: Array<Function>
  constructor(exec?: Function) {
    try {
      this.initState()
      exec && exec(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      console.error(e)
    }
  }
  private initState() {
    this.status = PENDING
    this.onFullfiledList = []
    this.onRejectedList = []
  }
  private _resolve(val: MyPromiseResult) {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.result = val
    while (this.onFullfiledList?.length) {
      this.onFullfiledList?.shift()?.call(this, val)
    }
  }
  private _reject(err: MyPromiseReason) {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = err
    while (this.onRejectedList?.length) {
      this.onRejectedList?.shift()?.call(this, err)
    }
  }
  // 按顺序执行then的链式调用，因此使用数组存储，前一个的返回值作为后一个then的入参处理
  then(onFullfiled?: Function, onRejected?: Function): MyPromise {
    return new MyPromise((resolve: Function, reject: Function) => {
      // 获取上一步操作的full或者reject
      // 如果上一步获取的是 成功 执行当前方法
      // 将then操作保存起来，保证链式调用 不然每次拿不到参数
      const onResolvFn = (val: MyPromiseResult) => {
        const cb = () => {
          try {
            if (typeof onFullfiled !== 'function') {
              resolve(val)
              return
            }
            const result = onFullfiled(val)
            if(result instanceof MyPromise) {
              // 返回值是promise
              result.then(resolve, reject)
              return
            }
            resolve(result)
          } catch (e) {
            reject(e)
          }
        }
        timeFn(cb)
      }
      // 如果上一步获取的是 失败 抛错
      const onRejectFn = (reason: MyPromiseReason) => {
        const cb = () => {
          try {
            if (typeof onRejected !== 'function') {
              resolve(reason)
              return
            }
            const result = onRejected(reason)
            resolve(result)
          } catch (e) {
            reject(e)
          }
        }
        timeFn(cb)
      }
      if (this.status === PENDING) {
        // 等待状态
        this.onFullfiledList?.push(onResolvFn)
        this.onRejectedList?.push(onRejectFn)
      } else if (this.status === FULFILLED) {
        onResolvFn(this.result)
      } else {
        onRejectFn(this.reason)
      }
    })
  }
  resolve() {}
}

export { MyPromise }
