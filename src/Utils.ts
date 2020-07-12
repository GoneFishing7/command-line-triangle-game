import { PositionInterface } from "./PointInterface"

function getRandomElementFromArray(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pointToString(point: PositionInterface) {
  return `${point.startPoint + 1}---${point.endPoint + 1}`
}

export { getRandomElementFromArray, pointToString }
