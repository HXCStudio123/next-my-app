/**
 * myExcept toBe() or not.toBe()
 * js 底层原理知识点
 * @returns 
 */
function myExcept() {
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
   * TODO
   * new 做了什么
   * 原型与原型链
   */
}

/**
 * TODO
 * new
 * 几种继承方式es5/6
 * call/apply/bind
 * 防抖节流
 */