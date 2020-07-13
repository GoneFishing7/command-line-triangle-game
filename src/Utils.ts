import { PositionInterface } from "./PointInterface"

function getRandomElementFromArray(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)]
}

function cellToString(point: PositionInterface) {
  // Return tne point in a human readable format
  return `${point.startPoint + 1}---${point.endPoint + 1}`
}

export { getRandomElementFromArray, cellToString }
