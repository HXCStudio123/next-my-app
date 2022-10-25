function CodeTest() {
  const res = topKFrequent([1, 1, 1, 2, 2, 3], 2)
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
