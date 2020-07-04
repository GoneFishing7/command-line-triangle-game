import Board from "../Board"
import { PositionInterface } from "../PointInterface"

export default interface BotInterface {
  getMove: (board: Board) => PositionInterface
  getEval: (board: Board) => number
}
