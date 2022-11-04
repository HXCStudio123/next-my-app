function CodeTest() {
  const res = topKFrequent([1, 1, 1, 2, 2, 3], 2)
  minWindow("ADOBECODEBANC", "ABC")
  return (
    <div>{res}</div>
  )
}
export default CodeTest

function topKFrequent(nums: number[], k: number): number[] {
  class MinStack {
    constructor() { }
  }
  let map: Map<number, number> = new Map()
  for (let num of nums) {
    map.set(num, map.has(num) ? (map.get(num) || 0) + 1 : 1)
  }
  // 小顶堆，小的放在上面就弹出，直到堆中剩k个

  return []
};

function minWindow(s: string, t: string): string {
  let map = new Map()
  for (let str of t) {
    map.set(str, (map.get(str) || 0) + 1)
  }
  // A D O B E C
  let left = 0
  let right = s.length - 1
  let count = 0
  let dp: (number | string)[] = []
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      count > 0 && dp.push(count)
      count = 0
      dp.push(s[i])
    } else {
      count++
    }
  }
  console.log(dp)
  return ''
};