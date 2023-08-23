function SortCodeTest() {
  const testValue = testFucntion()
  return (<div>看console{testValue.toString()}</div>)
}
export default SortCodeTest

function testClass() {
  class Except {
    value: number
    negative: boolean
    constructor(value: number) {
      this.value = value
      this.negative = true
    }
    get not() {
      console.log('触发了not get', this)
      this.negative = !this.negative;
      return this
    }
    toBe(expected: number) {
      const result = this.value === expected
      return this.negative ? result : !result
    }
  }
  const expectValue = new Except(3).not.not.not.toBe(4)
  console.log(expectValue)

  return expectValue
}
function testFucntion() {
  interface Matcher {
    toBe(data: any): void
    not: Matcher
  }
  function except(input: number): Matcher {
    class Except {
      value: number
      negative: boolean
      constructor(value: number) {
        this.value = value
        this.negative = false
      }
      get not() {
        console.log('获取get')
        this.negative = !this.negative
        return this
      }
      toBe(value: number): boolean {
        return this.negative ? this.value !== value : this.value === value
      }
    }
    return new Except(input)
  }
  const exceptValue = except(3).not.not.toBe(4)
  console.log(exceptValue)
  return exceptValue
  /**
   * new 做了什么
   * 原型与原型链
   */
}