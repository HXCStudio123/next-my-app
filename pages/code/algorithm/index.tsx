function CodeTest() {
  // console.log(maximalRectangle([["1", "0", "1", "1", "1"], ["0", "1", "0", "1", "0"], ["1", "1", "0", "1", "1"], ["1", "1", "0", "1", "1"], ["0", "1", "1", "1", "1"]]))
  // console.log(removeInvalidParentheses('"a()aaaa())()aaaa"'))
  // console.log(canFinish(6, [[1, 4], [0, 3], [1, 3], [2, 4], [3, 5], [4, 5]]))
  // const res = topKFrequent([1, 1, 1, 2, 2, 3], 2)
  // minWindow("ADOBECODEBANC", "ABC")
  // test([
  //   [0, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0],
  //   [0, 0, 0, 1, 0],
  //   [0, 0, 0, 0, 0],
  // ])
  return (
    <div></div>
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

function test(map: number[][]) {
  const col = map.length
  const row = map[0].length
  let isLearned = new Array(col).fill(new Array(row).fill(false))
  let markPoint = new Set()
  const path = [[0, -1], [0, 1], [1, 0], [-1, 0]]
  function diffusion() {
    // 找当前周围是否有符合条件的
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        console.log(i, j, map[i][j])
      }
    }
  }

  diffusion()
  let day = 0
  // while (true) {
  //   diffusion()
  //   if (markPoint.size === col * row) return day
  //   day++
  // }
}
// 拓扑
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const map = new Map()
  let cache = new Array(numCourses).fill(0)
  for (let p of prerequisites) {
    if (p[0] === p[1]) { return false }
    map.set(p[0], (map.get(p[0]) || []).concat(p[1]))
    cache[p[1]]++
  }
  let queue = []
  for (let i = 0; i < numCourses; i++) {
    if (cache[i] === 0) {
      queue.push(i)
    }
  }
  // 按照入度排序
  while (queue.length) {
    let num = queue.shift()
    for (let node of (map.get(num) || [])) {
      cache[node]--
      if (cache[node] === 0) {
        queue.push(node)
      }
    }
  }
  return cache.every(item => item === 0)
};

// [1,3,-1,-3,5,3,6,7] 3
function maxSlidingWindow(nums: number[], k: number): number[] {
  let ans: number[] = []
  const n = nums.length
  let stack: number[] = []
  for (let i = 0; i < k; i++) {
    if (!stack.length) {
      stack = [i]
    } else {
      while (nums[i] >= nums[stack[stack.length - 1]]) {
        stack.pop()
      }
      stack.push(i)
    }
  }
  ans.push(nums[stack[0]])
  for (let i = 0; i < n - k; i++) {
    // 去掉当前的  加上最后的
    if (i === stack[0]) stack.shift()
    while (nums[i + k] >= nums[stack[stack.length - 1]]) {
      stack.pop()
    }
    stack.push(i + k)
    ans.push(nums[stack[0]])
  }
  return ans
};
// )()()
function removeInvalidParentheses(s: string): string[] {
  const ans: string[] = []
  const n = s.length
  let countLeft = 0
  let countRight = 0
  for (let str of s) {
    if (str === '(') {
      countLeft++
    } else if (str === ')') {
      if (countLeft) {
        countLeft--
      } else {
        countRight++
      }
    }
  }
  const set = new Set()
  // 试探的删除2个）还剩哪种情况，当前这种属于有效括号么
  // BFS 找出所有可能情况
  const dfs = (i: number, left: number, right: number, leftN: number, rightN: number, str: string) => {
    // 剪枝
    if (n - i < (countLeft - left + countRight - right) || set.has(str) || leftN < rightN) {
      return
    }
    if (i === n) {
      ans.push(str)
      set.add(str)
      return
    }
    if ((countLeft === left && countRight === right) || (countLeft === left && s[i] === '(') || (countRight === right && s[i] === ')')) {
      dfs(i + 1, left, right, s[i] === '(' ? (leftN + 1) : leftN, s[i] === ')' ? (rightN + 1) : rightN, str + s[i])
      return
    }
    // 当前的可减可不减
    // 如果是left 1. 减去当前的left 2. 不减去当前的left
    if (s[i] === '(') {
      // 减去
      dfs(i + 1, left + 1, right, leftN, rightN, str)
      // 不减去
      dfs(i + 1, left, right, leftN + 1, rightN, str + '(')
    } else if (s[i] === ')') {
      // 减去
      dfs(i + 1, left, right + 1, leftN, rightN, str)
      // 不减去
      dfs(i + 1, left, right, leftN, rightN + 1, str + ')')
    } else {
      dfs(i + 1, left, right, leftN, rightN, str + s[i])
    }
  }
  dfs(0, 0, 0, 0, 0, '')
  return ans
};
// 暴搜
function maximalRectangle1(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0].length
  const calc = matrix.map(item => {
    return item.map(item => Number(item))
  })
  let ans = 0
  // 计算矩形宽
  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) {
      calc[i][j] = matrix[i][j] === '1' ? (calc[i][j - 1] + 1) : 0
    }
  }
  // console.log(matrix, calc)
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      let min = calc[k][j]
      if (calc[k][j] === 0) {
        continue
      }
      for (let i = k; i < m; i++) {
        if (calc[i][j] === 0) {
          break
        }
        min = Math.min(min, calc[i][j])
        const area = Math.max(min * (i - k + 1), calc[i][j])
        ans = Math.max(ans, area)
      }
    }
  }
  return ans
};
// largestRectangleArea([2, 1, 2])
// 坐标球最大矩形
function largestRectangleArea(heights: number[]): number {
  // 确认最大高之后 找最大宽
  let ans = 0
  const n = heights.length
  let stack: any[] = []

  for (let i = 0; i < n; i++) {
    // 0 --> 3,2 ->  1,4,5
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      // 遇到小的 可以计算出前面额最大面积
      const height = heights[stack.pop()]
      let width = i
      if (stack.length) {
        // 此时的stack[stack.length - 1]是当前高度为heights[i]的最大左边界（即上一个比它小的位置）
        width = i - stack[stack.length - 1] - 1
      }
      ans = Math.max(ans, width * height)
    }
    stack.push(i)
  }
  // console.log(stack, ans)
  while (stack.length) {
    const height = heights[stack.pop()]
    let width = n
    if (stack.length) {
      width = n - stack[stack.length - 1] - 1
    }
    ans = Math.max(ans, height * width)
  }
  // console.log(stack, ans)
  return ans
};
// maximalRectangle([["1", "0", "1", "1", "1"], ["0", "1", "0", "1", "0"], ["1", "1", "0", "1", "1"], ["1", "1", "0", "1", "1"], ["0", "1", "1", "1", "1"]])
function maximalRectangle(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0].length
  let ans = 0
  let temp = new Array(n).fill(0)
  let stack: any = []
  // console.log(matrix)
  // 求每一层的横坐标
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      temp[j] = matrix[i][j] == '0' ? 0 : temp[j] + 1

      while (stack.length && temp[j] < temp[stack[stack.length - 1]]) {
        const height = temp[stack.pop()]
        let width = j
        if (stack.length) {
          width = j - stack[stack.length - 1] - 1
        }
        ans = Math.max(ans, width * height)
      }
      stack.push(j)
    }
    while (stack.length) {
      const height = temp[stack.pop()]
      let width = n
      if (stack.length) {
        width = n - stack[stack.length - 1] - 1
      }
      ans = Math.max(ans, width * height)
    }
    // ans = Math.max(largestRectangleArea(temp), ans)
    // console.log(temp)
  }
  // console.log(ans)
  return ans
};
// const param = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
// console.log(param, searchMatrix(param, 27))
// for (let i = 1; i < 30; i++) {
//   const r = searchMatrix(param, i)
//   if (!r) {
//     console.log(i, r)
//   }
// }
// searchMatrix([[-5]], -5)
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length
  const n = matrix[0].length
  if (target < matrix[0][0] || target > matrix[m - 1][n - 1]) {
    return false
  }

  //  z 字形查找 + erfen
  for (let i = 0; i < m; i++) {
    if (target > matrix[i][n - 1]) {
      continue
    }
    let left = 0, right = n - 1
    while (left < right) {
      const mid = (left + right + 1) >> 1
      if (matrix[i][mid] > target) {
        right = mid - 1
      } else {
        left = mid
      }
    }
    // console.log(i, left, right)
    if (matrix[i][left] === target) {
      return true
    }
  }
  return false
};
// console.log(maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]))
function maximalSquare(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0].length
  let ans = 0
  const dp = new Array(m + 1).fill([]).map(() => new Array(n + 1).fill(0))
  // console.log(matrix)
  // console.log(dp)
  // 算边长
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1
        ans = Math.max(ans, dp[i][j])
      }
    }
  }
  return ans * ans
};
// console.log(subarraySum([1, 1, 1, 1, 1], 2))
// 统计和为k的连续数组个数
// 1 1 1 1 1
// 1 1
// 1   1
// 1     1
// 1       1

function subarraySum(nums: number[], k: number): number {
  const n = nums.length
  let res = 0
  let preSum = 0
  let map = new Map()
  map.set(0, 1)
  /**
   * 已知存在 p[right+1] - p[left] = k
   * 因此 p[right] - p[left - 1] = k
   * p[right] = k + p[left-1]
   * 因此哈希存储前面每个值出现的个数
   */
  for (let i = 0; i < n; i++) {
    preSum += nums[i]
    if (map.has(preSum - k)) {
      res += map.get(preSum - k)
    }
    map.set(preSum, (map.get(preSum) || 0) + 1)
  }
  console.log(res)
  return res
};
function searchRange1(nums: number[], target: number): number[] {
  // 二分 * 二分
  const n = nums.length
  if (target < nums[0] || target > nums[n - 1]) {
    return [-1, -1]
  }
  let left = 0
  let right = n - 1
  function find(left: number, right: number, isLeft?: boolean): number {
    while (left < right) {
      const mid = (left + right + 1) >> 1
      if (nums[mid] === target) {
        if (isLeft) {
          if (nums[mid - 1] !== target) {
            return mid
          }
          return find(left, mid - 1, true)
        } else {
          if (nums[mid + 1] !== target) {
            return mid
          }
          return find(mid + 1, right)
        }
      } else if (nums[mid] > target) {
        right = mid - 1
      } else {
        left = mid
      }
    }
    return right
  }
  // 以mid为left  和 right  分别二分左右
  while (left < right) {
    const mid = (left + right + 1) >> 1
    if (nums[mid] === target) {
      return [find(left, mid, true), find(mid, right)]
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid
    }
  }
  if (nums[right] === target) {
    return [left, right]
  } else {
    return [-1, -1]
  }
};
// console.log(searchRange([5, 8, 8, 8, 8, 9], 6))
// console.log(searchRange([8, 8, 8, 8, 8, 8, 8], 8))
// console.log(searchRange([1], 1))
// console.log(searchRange([1, 3], 2))
function searchRange(nums: number[], target: number): number[] {
  const n = nums.length
  let ans = [-1, -1]
  // 以mid为left  和 right  分别二分左右
  function findBounary(left: number, right: number, isLeft?: boolean): number {
    let ans = n
    while (left <= right) {
      const mid = (left + right) >> 1
      // isLeft 找左端点
      if (nums[mid] > target || (isLeft && nums[mid] === target)) {
        right = mid - 1
        ans = mid
      } else {
        left = mid + 1
      }
    }
    return ans
  }
  let left = findBounary(0, n - 1, true)
  let right = findBounary(left, n - 1) - 1
  // console.log('结果', left, right)
  if (left <= right && nums[left] === target && nums[right] === target) {
    ans = [left, right]
  }
  return ans
};
// console.log(findMedianSortedArrays([1, 32, 33], [7, 8, 9, 100])) // 9
// console.log(findMedianSortedArrays([0,0], [0,0]))
// console.log(findMedianSortedArrays([1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
// 1 7 8 9 32 33 100 101
// 二分法
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const n1 = nums1.length
  const n2 = nums2.length
  //  11 -》5 1 5 （6）
  // 12 -> 5 1 1 5 （6,7）   7->3,5 -> 3 -> 2
  // 奇数 12/13 / 2 = 6/6.
  // 偶数 13/14 2 = 6.5/7
  // 如果是奇数那就是球两次
  // 如果是偶数那就是两个数字
  function getNum(start1: number, end1: number, nums1: number[], start2: number, end2: number, nums2: number[], target: number): number {
    const len1 = end1 - start1 + 1
    const len2 = end2 - start2 + 1
    if (len1 > len2) return getNum(start2, end2, nums2, start1, end1, nums1, target)
    if (len1 === 0) return nums2[start2 + target - 1]
    if (target === 1) return Math.min(nums1[start1], nums2[start2])
    // 还剩几个index
    const s1 = start1 + Math.min(target >> 1, len1) - 1
    const s2 = start2 + Math.min(target >> 1, len2) - 1
    if (nums1[s1] > nums2[s2]) {
      return getNum(start1, end1, nums1, s2 + 1, end2, nums2, target - (s2 - start2 + 1))
    } else {
      return getNum(s1 + 1, end1, nums1, start2, end2, nums2, target - (s1 - start1 + 1))
    }
  }
  const index1 = (n1 + n2 + 1) >> 1
  const index2 = (n1 + n2 + 2) >> 1
  if ((n1 + n2) % 2) {
    return getNum(0, n1 - 1, nums1, 0, n2 - 1, nums2, index1)
  } else {
    return (getNum(0, n1 - 1, nums1, 0, n2 - 1, nums2, index1) + getNum(0, n1 - 1, nums1, 0, n2 - 1, nums2, index2)) / 2
  }
};

// console.log(reverse('com.baidu.www'))
function reverse(s: string, symbol: string = '.') {
  s = s + symbol
  let res = ''
  let word = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === symbol) {
      res = symbol + word + res
      word = ''
    } else {
      word += s[i]
    }
  }
  return res.slice(1)
}
// console.log(reverseWords('   heelo    word error  '))
function reverseWords(s: string): string {
  // 去空格
  s += ' '
  let word = ''
  let res = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      if (word) {
        res = ' ' + word + res
      }
      word = ''
    } else {
      word += s[i]
    }
  }
  return res.slice(1)
};
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// console.log(lengthOfLongestSubstring(' '))
function lengthOfLongestSubstring(s: string): number {
  const n = s.length
  let res = 0
  let start = 0
  let map = new Map()
  // key value: start
  for (let end = start; end < n; end++) {
    if (map.has(s[end]) && map.get(s[end]) >= start) {
      res = Math.max(res, end - start)
      start = map.get(s[end]) + 1
    }
    map.set(s[end], end)
  }
  res = Math.max(res, n - start)
  return res
};

/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 */
// A a B C
// 1 2 1 1
// console.log(minWindow('AaaaDOBECODEaaBANC', 'AaaBC'))
// ADOBECODEB A N  C
// 012345678910 11 12
// [0,3,5] [5,9,10] [9,10,12]
function minWindow(s: string, t: string): string {
  let res = ''
  let map = new Map()
  for (let i = 0; i < s.length; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1)
  }
  let count = 0
  let start = 0
  for (let end = 0; end < s.length; end++) {
    // 确定符合
    if (count === t.length) {
      if (end - start + 1 < res.length) {
        res = s.slice(start, end + 1)
      }
      while (!map.has(s[start])) {
        start++
      }
    }
  }
  return res
};

// 跳跃游戏
function canJump(nums: number[]): boolean {
  let pre = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (pre === 0) return false
    if (nums[i] >= pre - 1) {
      pre = nums[i]
    } else {
      pre--
    }
  }
  return true
};
/**
 * 438.字母异位词
 * 输入: s = "cbbbaebabacd", p = "abc"
 * a b c d e
 * -1 0 1 0 0
 * -1 0 1 0 0  count表示当前去掉共有多少不为0的
 * -1 1 0 0 0 缺a 多b (2)
 * -1 2 -1 0 0 -c +b (3)
 * 0 1 -1 0 0 -b +a (2) 1->0 -1
 * 0 0 -1 0 1 -b +e (0) 2-1-1
 * 0 0 -1 0 1 -b +b (1)
 * 0 0 -1 0 1 -a +a (1)
 * 0 1 -1 0 0 -e +b (1)
 * 1 0 -1 0 0 -b +a (1) 1+1-1
 * 0 0 0 0 0 -a +c (3) 1+1+1
  输出: [0,6]
  解释:
  起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
  起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 */
// console.log(findAnagrams("bpaa", "aa"))
/**
 * a b p
 * -2 1 1 (2)
 * -1 0 1 -b +a (1) 2-1
 * 0 0 0 -p +a (1) 1-1-1
 */
function getIdx(str: string) {
  return str.charCodeAt(0) - 'a'.charCodeAt(0)
}
function findAnagrams(s: string, p: string): number[] {
  const m = s.length
  const n = p.length
  if (m < n) return []
  let res = []
  let countArray = new Array(26).fill(0)

  for (let i = 0; i < n; i++) {
    countArray[getIdx(s[i])]++
    countArray[getIdx(p[i])]--
  }
  let count = 0
  for (let i = 0; i < 26; i++) {
    if (countArray[i] !== 0) count++
  }
  if (count === 0) {
    res.push(0)
  }
  for (let i = 0; i < m - n; i++) {
    console.log(i, i + n, count)
    if (countArray[getIdx(s[i])] === 1) {
      count--
    } else if (countArray[getIdx(s[i])] === 0) {
      count++
    }
    countArray[getIdx(s[i])]--
    if (countArray[getIdx(s[i + n])] === -1) {
      count--
    } else if (countArray[getIdx(s[i + n])] === 0) {
      count++
    }
    countArray[getIdx(s[i + n])]++
    console.log('--', count)
    if (count === 0) {
      res.push(i + 1)
    }
  }
  return res
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0, 0, 0, 0]))
// console.log(threeSum([-1, 0, 1, 0]))
// console.log(threeSum([-2, 0, 0, 2, 2]))
function threeSum(nums: number[]): number[][] {
  // [-4, -1, -1, 0, 1, 2]
  nums = nums.sort((a, b) => a - b)
  const len = nums.length
  let res: number[][] = []
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let l = i + 1
    let r = len - 1
    while (l < r) {
      const temp = nums[l] + nums[r]
      if (temp + nums[i] === 0) {
        res.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] === nums[++l]);
        while (l < r && nums[r] === nums[--r]);
      } else if (temp + nums[i] > 0) {
        r--
      } else {
        l++
      }
    }
  }

  return res
};

// console.log(nextPermutation([1, 1, 2, 2, 5]))
// console.log(nextPermutation([1, 3, 2, 1, 0])) // 2 0 1 1 3
// 2 3 1 1 0
// 2 0 1 1 3

// console.log(nextPermutation([1, 3, 1, 2, 0])) // 1,3，2,1,0
/**
 Do not return anything, modify nums in-place instead.
 输入：nums = [1,2,3]
输出：[1,3,2]
示例 2：
输入：nums = [3,2,1]
输出：[1,2,3]
示例 3：
输入：nums = [1,1,5]
输出：[1,5,1]
 */
function nextPermutation(nums: number[]): void {
  let len = nums.length
  let left = len - 1
  const sort = (nums: number[], l: number, r: number) => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]]
      r--
      l++
    }
  }
  while (left > 0 && nums[left] <= nums[left - 1]) left--;
  if (left > 0) {
    let r = len - 1
    while (nums[r] <= nums[left - 1]) {
      // console.log('统计', r, nums[r], nums[left-1])
      r--
    }
    [nums[left - 1], nums[r]] = [nums[r], nums[left - 1]]
    // console.log('交换的', r, nums)
    // 交换后排序
    while (r > left && nums[r] > nums[r - 1]) {
      [nums[r], nums[r - 1]] = [nums[r - 1], nums[r]]
      r--
    }
    // console.log('最终交换前', r, nums)
  }
  sort(nums, left, len - 1)
};
// const source = [5, 1, 3]
// for (let i = 1; i <= 1; i++) {
//   console.log('查询', i, search(source, i))
// }
// for (let i = 0; i <= 7; i++) {
//   console.log('查询', i, search([4, 5, 6, 7, 0, 1, 2], i))
// }
function search(nums: number[], target: number) {
  const len = nums.length
  let left = 0
  let right = len - 1
  while (left < right) {
    const mid = (right + left - 1) >> 1
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      if (nums[left] > nums[right] && (nums[mid] >= nums[left] && nums[right] >= target)) {
        left = mid + 1
      } else {
        right = mid
      }
    } else {
      if (nums[left] > nums[right] && (nums[mid] < nums[left] && nums[right] < target)) {
        right = mid
      } else {
        left = mid + 1
      }
    }
  }
  return nums[left] === target ? left : -1
}
// for(let i=1;i<6;i++) {
//   ser([1,2,3,4,5], i)
// }
// function ser(nums: number[], target: number) {
//   const len = nums.length
//   let left = 0
//   let right = len - 1
//   while (left < right) {
//     // debugger
//     const mid = (left + right - 1) >> 1
//     if (nums[mid] >= target) {
//       right = mid
//     } else {
//       left = mid + 1
//     }
//   }
//   console.log('jieguo----------', left, right)
//   return nums[left]
// }
console.log(findUnsortedSubarray([1, 2, 6, 4, 0,8, 10, 11, 15,]))
function findUnsortedSubarray(nums: number[]): number {
  // 找最短连续数组
  const n = nums.length
  if (n <= 1) return 0
  let count = 0
  let pre = -1
  for (let i = n - 1; i >= 0; i--) {
    if (pre > -1 && nums[i] > nums[pre]) {
      count++
    } else if (nums[i] < nums[i - 1]) {
      if (pre == -1) {
        count = 1
      } else {
        count = pre - i + 1
      }
      pre = i
    }
  }
  return count
};

/**
 * 接雨水
 */
console.log(trap([]))
function trap (height: number[]): number {
  let res = 0
  return res
}