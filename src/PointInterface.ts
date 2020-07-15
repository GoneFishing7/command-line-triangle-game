// The type that defines an actual cell
export type Cell = "P" | "C" | null | undefined

// The type that defines where a cell can be placed
export interface PositionInterface {
  startPoint: number
  endPoint: number
}
