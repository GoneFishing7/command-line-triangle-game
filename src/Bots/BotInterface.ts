import Board from "../Board"
import { PositionInterface, Cell } from "../PointInterface"

export default interface BotInterface {
  name: string
  /**
   * Genereates a move for the board passed in
   */
  getMove: (board: Board, toMove: "C" | "P") => PositionInterface
  /**
   * Generates an eval for the board passed in.
   * 1 for computer winning,
   * 0 for drawing or even,
   * -1 for player winning
   */
  getEval: (board: Board, toMove: "C" | "P") => 1 | 0 | -1
}
