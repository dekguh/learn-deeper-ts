// PICK
interface TodoPick {
  title: string
  description: string
  completed: boolean
}

type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
}

type TodoPreview = MyPick<TodoPick, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

// READ ONLY
interface TodoReadonly {
  title: string
  description: string
}

type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}

const todoReadonly: MyReadonly<TodoReadonly> = {
  title: "Hey",
  description: "foobar"
}

todoReadonly.title = "Hello" // Error: cannot reassign a readonly property
todoReadonly.description = "barFoo" // Error: cannot reassign a readonly property

// TUPPLE TO OBJECT
const tupleToObj = ['tesla', 'model 3', 'model X', 'model Y'] as const
type TupleToObject<T extends readonly string[]> = {
  readonly [Key in T[number]]: Key;
}

type resultTuppleToObject = TupleToObject<typeof tupleToObj> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// FIRST ARRAY
type arr1First = ['a', 'b', 'c']
type arr2First = [3, 2, 1]

type First<T extends unknown[]> = T[0]

type head1First = First<arr1First> // expected to be 'a'
type head2First = First<arr2First> // expected to be 3

// LENGTH
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
type Length<T extends string[]> = T['length']
type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5

// EXCLUDE
type MyExclude<T, K extends T> = T extends K ? never : T
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// AWAITED
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R> ? R : never
type ExampleType = Promise<string>
type ResultAwaited = MyAwaited<ExampleType> // string

// IF
type If<T extends boolean, V1, V2> = T extends true ? V1 : V2
type Aif = If<true, 'a', 'b'>  // expected to be 'a'
type Bif = If<false, 'a', 'b'> // expected to be 'b'

// CONCAT
type Concat<T1 extends unknown[], T2 extends unknown[]> = [...T1, ...T2]
type ResultConcat = Concat<[1], [2]> // expected to be [1, 2]

// INCLUDES
type Includes<T extends Array<unknown>, K extends string> = T extends Array<infer R> ? K extends R ? true : false : never
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>

// PUSH
type Push<T extends unknown[], V> = [...T, V]
type ResultPush = Push<[1, 2], '3'> // [1, 2, '3']

// UNSHIFT
type Unshift<T extends unknown[], V> = [V, ...T]
type ResultUnshift = Unshift<[1, 2], 0> // [0, 1, 2]

// PARAMETERS
const foo = (arg1: string, arg2: number): void => {}
type MyParameters<T extends (...args: any[]) => void> = T extends (...args: infer R) => void ? R : never
type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]