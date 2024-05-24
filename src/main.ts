function createElement<T extends HTMLElement = HTMLDivElement>(element : T) : T {
  return element
}
createElement(document.createElement('button'))
createElement(document.createElement('ul'))

// ---------------------
interface IProps<T extends HTMLElement = HTMLButtonElement> {
  children: T;
}
const propsElementButton : IProps = {
  children: createElement(document.createElement('button'))
}
const propsElementDiv : IProps<HTMLDivElement> = {
  children: createElement(document.createElement('div'))
}

// ---------------------
type VehicleList = 'toyota' | 'honda' | 'bmw'
type MotorcycleList = 'yamaha' | 'vespa'
type Vehicle<T = VehicleList> = T
const getVehicleBrand = <T = VehicleList>(value : Vehicle<T>) : T => value
getVehicleBrand('bmw')
getVehicleBrand<MotorcycleList>('yamaha')

// ---------------------
type PartialObject<T> = {
  [K in keyof T]?: T[K]
}
type GetterFunc<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] 
}
interface Motorcycle {
  name: string;
  model: string;
}
type MotorcycleGetter = GetterFunc<Motorcycle>
const motorcycleGetter : MotorcycleGetter = {
  getModel: () => 'model',
  getName: () => 'name'
}

// ------------------------
type ObjectEvent<
  Events extends {
    funcName: string;
    params: { [key: string]: boolean | string | number | Array<string | number> }
}> = {
  [K in Events as K['funcName']]: (event: K['params']) => void
}

type EventClick = {
  funcName: 'onClick',
  params: {
    coordinate: number[]
  }
}
const objectEvent : ObjectEvent<EventClick> = {
  onClick: (event) => {
    console.log(event)
  }
}

// --------------------------
type InferFunc<T> = T extends (...props: infer U) => void ? U  : never

const buttonFunc = (label: string, onClick : () => void) => {
  console.log('button')
}
type ButtonFunc = InferFunc<typeof buttonFunc>