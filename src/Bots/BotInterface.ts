import Board from "../Board"
import { PositionInterface } from "../PointInterface"

export default interface BotInterface {
  /**
   * Genereates a move for the board passed in
   */
  getMove: (board: Board) => PositionInterface
  /**
   * Generates an eval for the board passed in
   */
  getEval: (board: Board) => number
}
