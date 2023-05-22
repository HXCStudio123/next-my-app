// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
export default function AsyncPool() {
  return <div>中间展示</div>
}
// 每次控制当前执行的数量为2
function asyncPool(count: number, times: number[], callback: Function) {
  return new Promise((resolve: Function) => {
    let num = 0
    let i = 0
    let result: number[] = []
    let tasks = []
    function flushTasks() {
      if (result.length === times.length) {
        resolve(result)
      }
      if (num < count && i < times.length) {
        console.log('-----开始执行任务', i, times[i])
        num++
        const task = callback(times[i++]).then((res: number) => {
          console.log('------执行完任务', res)
          result.push(res)
          num--
          flushTasks()
        })
        tasks.push(task)
      }
    }
    while (num < count) {
      flushTasks()
    }
  })
}
async function testAsync() {
  const timeout = (time: number) => new Promise((resolve: Function) => setTimeout(() => resolve(time), time))
  const times = [2000, 1000, 3000, 4000, 1000]
  const res = await asyncPool(3, times, timeout)
  console.log('执行完全部任务', res)
}
testAsync()