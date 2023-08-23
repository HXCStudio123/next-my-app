function Ts() {
  // interfaceTypeClassTest()
  // interfaceTest()
  // genericTest()
  enumTest()
  return (
    <div>测试展示</div>
  )
}
export default Ts
/**
 * 1. 接口定义 类型定义 类定义
 */
function interfaceTypeClassTest(): void {
  interface InterfaceProps extends TypeProps {
    test: string
  }
  type TypeProps = {
    test: string
  }
  const interfaceProps: InterfaceProps = { test: '1' }
  const typeProps: TypeProps = { test: '1' }

  class interClass implements InterfaceProps {
    test: string
    constructor(test: string) {
      this.test = test
    }
  }
  class typeClass implements TypeProps {
    test: string
    constructor(test: string) {
      this.test = test
    }
  }
  console.log('interfaceProps', interfaceProps)
  console.log('typeProps', typeProps)
  console.log('interClass', interClass, new interClass('name'))
  console.log('typeClass', typeClass, new typeClass('name'))
  /**
   * type &  interface & class 区别
   * interface: 没有实现细节的类型定义，可以继承（extends）自谋个class  type interface，支持class实现（implements）。
   * class： 包含实现细节
   * type：没有实现细节的类型定义，与interface类似，不可以继承别的类型，但可以作为父类型被继承，支持class实现。
   * 注意：类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。 因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的
   */
}

function interfaceTest() {
  // 直接用不行
  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
  }
  interface ClockInterface {
    tick(): void
  }
  function testCreate(ctor: ClockConstructor): ClockInterface {
    console.log(ctor)
    return new ctor(1, 2)
  }
  class Test implements ClockInterface {
    constructor(hour: number, minute: number) {
      console.log(hour, minute)
    }
    tick() { }
  }
  const type: ClockInterface = new Test(3, 4)
  const t1 = testCreate(Test)

  // 接口继承
  interface Animal {
    type: string
  }
  interface Person {
    name: string
  }
  interface FemalePerson extends Animal, Person {
    hair: number
  }
  let fp: FemalePerson = { type: '', name: '', hair: 1 }
  let fp1 = {} as FemalePerson
  fp1.hair = 4
  console.log(fp, fp1)

  // 接口继承类
  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control implements SelectableControl {
    select() { }
  }

  class TextBox extends Control {
    select() { }
  }

  // 错误：“Image”类型缺少“state”属性。
  // class Image implements SelectableControl {
  //   select() { }
  // }

  // class Location {
  // }
  class Animal1 {
    protected name: string;
    constructor(theName: string, age: string) {
      this.name = theName;
      console.log(theName, age)
    }
  }
  class Rhino extends Animal1 {
    constructor(theName: string, age: string) {
      super(theName, age); console.log(this.name)
    }
  }
  const p = new Rhino('2', '3')
}
function genericTest() {
  /**
   * 传入参数类型 === 传出参数类型
   * @param arg 
   * @returns 
   */
  function testT<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
  }
  type TypeT = <T>(arg: T[]) => T[]
  interface InterT<T> {
    (arg: T[]): T[]
  }
  const test: TypeT = testT
  const test1: InterT<number> = testT
}
function enumTest() {
  console.log(typeof ['tesla', 'model 3', 'model X', 'model Y'])
  for(let i in  ['tesla', 'model 3', 'model X', 'model Y']) {
    console.log(i)
  }
  /**
   * 等同于
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 3] = "A";
    })(Enum || (Enum = {}));
    var a = Enum.A;
    var T = Enum[a];
   */
  enum Enum {
    A = 2,
    B = 1
  }
  const a = Enum.A
  const nameofa = Enum[a]
  console.log(a, nameofa)
  // 等同于
  // var b = 3 /* B */;
  // var C = 4 /* C */;
  const enum Enum1 {
    B = 3,
    C = 4
  }
  const b = Enum1.B
  const C = Enum1.C
}
function typesTest() {
  interface Types {
    name: string
    age: number
    title: string
  }
  interface Expected1 {
    title: string
  }
  type ReadOnlyTypes<T> = {
    readonly [K in keyof T]: T[K]
  }
  type test1 = 'title' | 'age'
  type MyPick<T, K extends keyof T> = {
    [P in  K]: T[P]
  }
  type Mu = MyPick<Types, test1>
  // console.log(a)
  const test: ReadOnlyTypes<Types> = { name: '1', age: 1, title: '' }
  // test.name = 1
}