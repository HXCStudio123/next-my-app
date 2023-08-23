// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
import axios from "axios";

// 自定义实现
function asyncPool1(count: number, times: number[], callback: Function) {
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
// es7
async function asyncPool7(limit: number, array: number[], iterator: Function) {
  const tasks: Promise<number>[] = []
  const executing: any = new Set()
  for (const item of array) {
    const task: Promise<number> = Promise.resolve().then(() => iterator(item))
    tasks.push(task);
    const execute = async (task: Promise<number>, time: number) => {
      if (limit < array.length) {
        const execTask = task.then((res) => {
          // console.log('结束', res)
          executing.delete(task)
        })
        executing.add(execTask)
        if (executing.size >= limit) {
          await Promise.race(executing)
        }
      }
    }
    await execute(task, item)
  }
  return Promise.all(tasks)
}
/**
 * 最终版es9，异步并发控制
 * @param limit 
 * @param array 
 * @param iteratorFn 
 */
async function* asyncPool9(limit: number, array: number[], iteratorFn: Function) {
  const executing: any = new Set()
  const consume = async () => {
    const { promise, value }: any = await Promise.race([...executing])
    executing.delete(promise)
    return value
  }
  for (let item of array) {
    const fn = async () => await iteratorFn(item)
    const promise: Promise<any> = fn().then(value => { return { promise, value } });
    executing.add(promise)
    if (executing.size >= limit) {
      yield await consume()
    }
  }

  while (executing.size) {
    yield await consume()
  }
}

// es9
async function* asyncPool(concurrency: number, iterable: number[], iteratorFn: Function) {
  const executing = new Set();
  async function consume() {
    const res: any = await Promise.race(executing);
    console.log('执行结果：', res)
    executing.delete(res.promise);
    return res.value;
  }
  for (const item of iterable) {
    const promise: Promise<number | any[]> = (async () => await iteratorFn(item, iterable))().then(
      value => [promise, value]
    );
    executing.add(promise);
    if (executing.size >= concurrency) {
      yield await consume();
    }
  }
  while (executing.size) {
    yield await consume();
  }
}
function timeAsync(time: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(time), time)
  })
}

async function getApi() {
  try {
    const res = await axios.get('/api/async-pool')
    console.log('拿到结果', res, Date.now())
    return 'test结果'
  } catch (e) {
    console.log(e)
  }
}
/**
 * es9 generator函数 for await
 */
async function testGenerator() {
  await timeAsync(1000)
  return '测试一个答案'
}

async function test() {
  const res = await testGenerator()
  console.log(res)
}
// test()
async function testAsync() {
  const res = await getApi()
  console.log('答案', res)
  // const testG = testGenerator()
  // console.log(testG)
  // console.log(testG.next())
  // testG.next().then((res) => { console.log('------', res) })
  // for await (let res of testG) {
  //   console.log('---', res)
  // }
  // const timeout = (time: number) => new Promise((resolve: Function) => setTimeout(() => resolve(time), time))
  // const times = [1000, 5000, 3000, 2000]
  // for await (let res of asyncPool9(2, times, timeout)) {
  //   console.log('最终结果', res)
  // }
  // console.log('执行结束')
  // const res = await asyncPool(2, times, timeout)
  // console.log('执行完全部任务', res)
  // const timeout = (ms: number) => new Promise(resolve => setTimeout(() => resolve(ms), ms));
  // // for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
  // //   console.log(ms);
  // // }
  // const res = await asyncPool7(2, [1000, 5000, 3000, 2000], timeout)
  // console.log(res)
}
testAsync()

