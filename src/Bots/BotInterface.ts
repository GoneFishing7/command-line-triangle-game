import Board from "../Board"

export default interface BotInterface {
  getMove: (
    board: Board
  ) => {
    startPoint: number | null | undefined
    endPoint: number | null | undefined
  }
  getEval: (board: Board) => number
}
