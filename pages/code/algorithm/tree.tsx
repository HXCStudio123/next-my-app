const TREE = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    },
  }
}
function TreeCodeTest() {
  console.log('递归', DFS(TREE, 3))
  console.log('迭代', BFSPostOrder(TREE))
  return (
    <div></div>
  )
}
export default TreeCodeTest

class Tree {
  left: Tree | null
  right: Tree | null
  val: string | number
  constructor(val: string | number, left: Tree, right: Tree) {
    this.val = val
    this.right = right
    this.left = left
  }
}
function BFS(root: Tree): Array<string | number> {
  let res: Array<string | number> = []
  let stack: Array<Tree> = []
  if (root) {
    stack.push(root)
  }
  while (stack.length) {
    const node = stack.shift()
    node?.val && res.push(node?.val)
    node?.left && stack.push(node.left)
    node?.right && stack.push(node.right)
  }
  return res
}
/**
 * 递归深度优先遍历
 * @param {Tree} root 
 * @param {Number} type 1 前序遍历 2中序 3后序
 * @returns {Array} 遍历结果
 */
function DFS(root: Tree, type: number = 1): Array<string | number> {
  let res: Array<string | number> = []
  const trave = (root: Tree) => {
    type === 1 && res.push(root.val)
    if (root.left) trave(root.left)
    type === 2 && res.push(root.val)
    if (root.right) trave(root.right)
    type === 3 && res.push(root.val)
  }
  trave(root)
  return res
}
/**
 * 前序遍历
 * @param root 
 * @returns 
 */
function BFSPreOrder(root: Tree | null | undefined): Array<string | number> {
  let res: Array<string | number> = []
  let stack: Array<Tree> = []
  while (root || stack.length) {
    while (root) {
      res.push(root.val)
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root ? root.right : null
  }
  return res
}
/**
 * 中序遍历
 * @param root 
 * @returns 
 */
function BFSInOrder(root: Tree | null | undefined): Array<string | number> {
  let res: Array<string | number> = []
  let stack: Array<Tree> = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root?.val && res.push(root.val)
    root = root ? root.right : null
  }
  return res
}

/**
 * 后序遍历
 * @param root 
 * @returns 
 */
function BFSPostOrder(root: Tree | null | undefined): Array<string | number> {
  let res: Array<string | number> = []
  let stack: Array<Tree> = []
  while (root || stack.length) {
    while (root) {
      root?.val && res.unshift(root.val)
      stack.push(root)
      root = root.right
    }
    root = stack.pop()
    root = root ? root.left : null
  }
  return res
}
