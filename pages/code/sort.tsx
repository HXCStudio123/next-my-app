function SortCodeTest() {
  const params = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6]
  const params1 = [5, 7, 1, 8, 4]
  // const params1 = [1, 4, 5, 0, 2, 3]
  // console.log(topKFrequentSort(params, 2))
  // console.log(topKFrequentHeap(params, 2))
  // console.log(topKFrequentBarrel([1, 2], 2))
  console.log(quickSort(params1))
  // console.log(mergeSort1(params1))
  // console.log(mergeSort2(params1))
  return (<div>看console</div>)
}
export default SortCodeTest
/**
 * 方法一：暴力排序
 * @param nums 
 * @param k 
 * @returns 
 */
function topKFrequentSort(nums: number[], k: number): number[] {
  let map: Map<number, number> = new Map()
  for (let num of nums) {
    map.set(num, map.has(num) ? (map.get(num) || 0) + 1 : 1)
  }
  // 小顶堆，小的放在上面就弹出，直到堆中剩k个
  return [...map].sort((a, b) => b[1] - a[1]).splice(0, k + 1).map((item) => item[0])
};

/**
 * 法二，法三： 小顶堆
 * @param nums 
 * @param k 
 * @returns 
 */
function topKFrequentHeap(nums: number[], k: number): number[] {
  /**
   * 自定义顶堆数据结构--优化前
   * 节点位置为i，假定节点位为偶数，节点元素关系：父元素=i/2；左子节点=2i；右子节点=2i+1
   */
  class CustomHeap {
    queue: number[][]
    constructor(queue: number[][]) {
      this.queue = queue
    }
    swap(i: number, j: number) {
      const temp = this.queue[i]
      this.queue[i] = this.queue[j]
      this.queue[j] = temp
    }
    pop() {
      // 当前下标
      let i = this.queue.length - 1
      let parent = 0
      let left = 0
      let right = 0
      if (i % 2 === 0) {
        parent = i / 2 - 1
        left = i - 1
        right = i
      } else {
        parent = Math.floor(i / 2)
        left = i
        right = i + 1
      }
      // 从父节点开始遍历找子节点
      while (parent >= 0) {
        if (this.queue[right] && this.queue[parent] && this.queue[parent][1] > this.queue[right][1]) {
          this.swap(parent, right)
        }
        if (this.queue[left] && this.queue[parent] && this.queue[parent][1] > this.queue[left][1]) {
          this.swap(parent, left)
        }
        i = i - 2
        if (i % 2 === 0) {
          parent = i / 2 - 1
          left = i - 1
          right = i
        } else {
          parent = Math.floor(i / 2)
          left = i
          right = i + 1
        }
      }
    }
    sort(limit: number) {
      while (this.queue.length > limit) {
        this.pop()
        this.queue.shift()
      }
      return this.queue
    }
  }
  class Heap {
    compareFn: Function;
    queue: Array<Array<number> | undefined>;
    constructor(compareFn: Function) {
      this.queue = []
      this.compareFn = compareFn
    }
    push(item: number[]) {
      this.queue.push(item)
      let index = this.queue.length - 1
      let parent = Math.floor((index - 1) / 2)
      // 比较多个
      while (parent >= 0 && this.compare(parent, index) > 0) {
        [this.queue[parent], this.queue[index]] = [this.queue[index], this.queue[parent]]
        index = parent
        parent = Math.floor((index - 1) / 2)
      }
    }
    pop() {
      // 把最后一个放在最上面，重新开始排序
      const out = this.queue[0];
      this.queue[0] = this.queue.pop()
      let index = 0
      let left = 1
      let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
      while (this.compare(index, searchChild) > 0) {
        [this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]]
        index = searchChild
        left = index * 2 + 1
        searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
      }
      return out
    }
    /**
     * >0表示：pre > next   <0表示：pre < next
     * @param pre 前一个比较对象
     * @param next 后一个比较对象
     * @returns 
     */
    compare(pre: number, next: number) {
      if (this.queue[pre] === undefined) return 1
      if (this.queue[next] === undefined) return -1
      return this.compareFn(this.queue[pre], this.queue[next])
    }
  }
  let map: Map<number, number> = new Map()
  for (let num of nums) {
    map.set(num, map.has(num) ? (map.get(num) || 0) + 1 : 1)
  }
  // 自定义小顶堆，小的放在上面就弹出，直到堆中剩k个
  // let heap = new Heap([...map])
  // return heap.sort(k).map(item => item[0])

  // 优化后的小顶堆
  let heap = new Heap((a: number[], b: number[]) => a[1] - b[1])
  for (let item of map) {
    heap.push(item)
    if (heap.queue.length > k) {
      heap.pop()
    }
  }
  let res: number[] = []
  while (heap.queue.length) {
    res.push((heap.queue.pop() || [])[0])
  }
  return res
};
/**
 * 方法四：桶排序
 * 计数排序，以频率为下标
 */
function topKFrequentBarrel(nums: number[], k: number): number[] {
  let map: Map<number, number> = new Map()
  for (let num of nums) {
    map.set(num, map.has(num) ? (map.get(num) || 0) + 1 : 1)
  }
  let frequent: number[][] = []
  for (let item of map) {
    if (frequent[item[1]]) {
      frequent[item[1]].push(item[0])
    } else {
      frequent[item[1]] = [item[0]]
    }
  }
  let res: number[] = []
  while (res.length < k) {
    const cur = frequent.pop()
    while (cur?.length) {
      res.push(cur[0])
      cur.shift()
    }
  }
  return res
};

/**
 * 快排
 * @param nums 
 */
function quickSort(nums: number[]) {
  function findPiovt(nums: number[], left: number, right: number) {
    let piovt = nums[right]
    let l = left - 1
    for (let r = left; r < right; r++) {
      if (nums[r] <= piovt) {
        l++
        [nums[l], nums[r]] = [nums[r], nums[l]]
      }
    }
    [nums[l + 1], nums[right]] = [nums[right], nums[l + 1]]
    return l + 1
  }
  function findPiovtIndex(nums: number[], left: number, right: number) {
    let piovt = ((right - left) >> 1) + left;
    [nums[piovt], nums[right]] = [nums[right], nums[piovt]]
    return findPiovt(nums, left, right)
  }
  function sort(nums: number[], left: number, right: number) {
    if (left < right) {
      // 当前索引点位固定
      let piovt = findPiovtIndex(nums, left, right)
      console.log(piovt)
      sort(nums, left, piovt - 1)
      sort(nums, piovt + 1, right)
    }
  }
  sort(nums, 0, nums.length - 1)
  console.log(nums)
}

/**
 * 归并排序--迭代（更适合链表）
 * @param nums 
 */
function mergeSort1(nums: number[]) {
  function merge(left: number[], right: number[]) {
    let l = 0
    let r = 0
    let newN = []
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        newN.push(left[l])
        l++
      } else {
        newN.push(right[r])
        r++
      }
    }
    newN = newN.concat(l < left.length ? left.slice(l) : right.slice(r))
    return newN
  }
  const len = nums.length
  let step = 1
  while (step <= (len << 1 - 1)) {
    let left = 0
    let right = left + step
    while (left + step <= len - 1) {
      // 此种方法更适合链表处理而非数组
      nums.splice(left, step * 2, ...merge(nums.slice(left, right), nums.slice(right, right + step)))
      left = right + step
      right = left + step
    }
    step = step * 2
  }
  return nums
}

/**
 * 归并排序--递归（更适合数组）
 * @param nums 
 */
function mergeSort2(nums: number[]) {
  mergeSortRecursion(nums, 0, nums.length - 1)
  console.log(nums)
}
function mergeSortRecursion(nums: number[], left: number, right: number) {
  if (left >= right) return
  const mid = left + ((right - left) >> 1)
  mergeSortRecursion(nums, left, mid)
  mergeSortRecursion(nums, mid + 1, right)
  const temp = [...nums]
  let l = left
  let r = mid + 1
  let curIdx = left
  while (l <= mid && r <= right) {
    if (temp[l] < temp[r]) {
      nums[curIdx++] = temp[l++]
    } else {
      nums[curIdx++] = temp[r++]
    }
  }
  while (l <= mid) {
    nums[curIdx++] = temp[l++]
  }
}