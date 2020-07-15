import BotInterface from "./BotInterface"
import Board from "../Board"
import { getRandomElementFromArray } from "../Utils"

export default class BasicBot implements BotInterface {
  name = "Basic Bot"
  getMove = (board: Board, toMove: "C" | "P") => {
    const possibleMoves = board.getEmptyCells()
    let comWinningMoves = []
    let drawingMoves = []
    let plyWinningMoves = []
    for (const move of possibleMoves) {
      const boardWithMove = Board.deepCopyWithMove(board, toMove, move)
      const boardWithMoveEval = this.getEval(
        boardWithMove,
        this.reverse(toMove)
      )
      if (boardWithMoveEval === -1) {
        plyWinningMoves.push(move)
      } else if (boardWithMoveEval === 0) {
        drawingMoves.push(move)
      } else if (boardWithMoveEval === 1) {
        comWinningMoves.push(move)
      } else {
        throw "Something really bad happened! ┗|｀O′|┛"
      }
    }
    if (toMove === "C") {
      if (comWinningMoves.length) {
        return getRandomElementFromArray(comWinningMoves)
      } else if (drawingMoves.length) {
        return getRandomElementFromArray(drawingMoves)
      } else {
        return getRandomElementFromArray(plyWinningMoves)
      }
    } else {
      if (plyWinningMoves.length) {
        return getRandomElementFromArray(plyWinningMoves)
      } else if (drawingMoves.length) {
        return getRandomElementFromArray(drawingMoves)
      } else {
        return getRandomElementFromArray(comWinningMoves)
      }
    }
  }
  getEval = (board: Board, toMove: "C" | "P") => {
    if (board.getLoser()) {
      return board.getLoser() === "P" ? 1 : -1
    } else {
      let possibleOpponentMoves = board.getEmptyCells()
      if (this.hasNonLosingMove(board, toMove)) {
        return 0
      } else {
        return toMove === "C" ? 1 : -1
      }
    }
  }
  private hasNonLosingMove(board: Board, toMove: "C" | "P"): boolean {
    let possibleMoves = board.getEmptyCells()
    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i]
      let boardWithNewMove = Board.deepCopyWithMove(board, toMove, move)
      if (boardWithNewMove.getLoser() !== toMove) {
        return true
      }
    }
    return false
  }
  private reverse = (cell: "P" | "C") =>
    cell === "C" ? "P" : cell === "P" ? "C" : cell
}
