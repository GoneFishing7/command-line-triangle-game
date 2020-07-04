import { Cell, PositionInterface } from "./PointInterface"

export default class Board {
  cells: Cell[][]

  /**
   * Creates an instance of Board.
   * @param numDots The number of dots on the board
   * @memberof Board
   */
  constructor(numDots: number) {
    // Fill up board with cells, represented by start and end points
    this.cells = Array(numDots)
      // Fill with null values to map arrays to. (note: undefined doesn't seem to work)
      .fill(null)
      // Turn each null value in the 1d array into an array,
      // leading to the original cells array becoming a 2d array.
      .map((_, arrIndex) =>
        Array(numDots)
          // Fill the inner arrays with null values
          .fill(null)
          // Map the array so that each combination of cells is expressed, but not twice.
          .map((_, cellIndex) => (cellIndex > arrIndex ? null : undefined))
      )
  }

  /**
   * Set the cell to a value given a starting point and an end point
   * @param value The value to set the square to.
   * @param startPoint The starting point of the cell to set the square to.
   * @param endPoint Then ending point of the cell to set the square to.
   * @memberof Board
   */
  setCell(value: Cell, { startPoint, endPoint }: PositionInterface) {
    // Make sure the cell is being indexed correctly
    if (startPoint > endPoint) {
      ;[startPoint, endPoint] = [endPoint, startPoint]
    }
    // Make sure there won't be any weird behaviour with setting
    // a cell where the start and end points are the same.
    if (startPoint === endPoint) {
      throw "Set Cell points were the same"
    }
    // Finally, update the cells
    this.cells[startPoint][endPoint] = value
  }

  /**
   * Get the cell, defined by a start and end point
   *
   * @param startPoint The start point
   * @param endPoint The endpoint
   * @returns The cell found at the location
   * @memberof Board
   */
  getCell({ startPoint, endPoint }: PositionInterface): Cell {
    // Make sure the cell is being indexed correctly
    if (startPoint > endPoint) {
      ;[startPoint, endPoint] = [endPoint, startPoint]
    }
    // Get the cell
    return this.cells[startPoint][endPoint]
  }

  /**
   * Check if the board is winning for any truthy value.
   * Not tested yet, hasn't experienced the hardships of life.
   *
   * @returns The winner, else null
   * @memberof Board
   */
  isDecisive(): Cell {
    // The points in the triangle will always be
    // in numeric order, to avoid overcounting

    // Choose a starting point.
    for (let firstPoint = 0; firstPoint < this.cells.length - 2; firstPoint++) {
      // Choose the next point
      for (
        let secondPoint = firstPoint + 1;
        secondPoint < this.cells[firstPoint].length - 1;
        secondPoint++
      ) {
        // Make sure the first cell isn't null or undefined
        if (this.getCell({ startPoint: firstPoint, endPoint: secondPoint })) {
          // Choose the third point
          for (
            let thirdPoint = secondPoint + 1;
            thirdPoint < this.cells[secondPoint].length;
            thirdPoint++
          ) {
            // Check if all cells using the points are equal.
            // If so, return that point
            let cellA = this.getCell({
              startPoint: firstPoint,
              endPoint: secondPoint,
            })
            let cellB = this.getCell({
              startPoint: firstPoint,
              endPoint: thirdPoint,
            })
            let cellC = this.getCell({
              startPoint: secondPoint,
              endPoint: thirdPoint,
            })
            if (cellA === cellB && cellB === cellC) {
              return cellA
            }
          }
        }
      }
    }
    return null
  }

  getEmptyCells(): PositionInterface[] {
    let emptyCells: PositionInterface[] = []
    for (let startPoint = 0; startPoint < this.cells.length - 1; startPoint++) {
      for (
        let endPoint = startPoint + 1;
        endPoint < this.cells[startPoint].length;
        endPoint++
      ) {
        if (!this.getCell({ startPoint, endPoint })) {
          emptyCells.push({ startPoint, endPoint })
        }
      }
    }
    return emptyCells
  }

  /**
   * The board, represented as a string
   *
   * @returns The board to string (that's what toString means 🤣)
   * @memberof Board
   */
  toString(): string {
    let horizontalLine = new String("-").repeat(this.cells[0].length * 4 + 1)
    // let horizontalLine = "";
    let returnString = horizontalLine
    for (let i = 0; i < this.cells.length; i++) {
      // console.log(`Row: ${this.cells[i]}`);
      returnString += "\n|"
      for (let j = 0; j < this.cells[i].length; j++) {
        // console.log(`Cell: ${this.cells[i][j]}`);
        const symbol =
          this.cells[i][j] === undefined
            ? "n"
            : this.cells[i][j]
            ? this.cells[i][j]
            : " "
        returnString += " " + symbol + " |"
      }
      returnString += "\n" + horizontalLine
    }
    return returnString
  }
}
