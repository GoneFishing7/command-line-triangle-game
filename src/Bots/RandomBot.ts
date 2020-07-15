import BotInterface from "./BotInterface"
import Board from "../Board"
import { getRandomElementFromArray } from "../Utils"

export default class RandomBot implements BotInterface {
  name = "Random Bot"
  getMove = (board: Board) => {
    // Get all possible moves
    let possibleMoves = board.getEmptyCells()
    // Pick a random one
    return getRandomElementFromArray(possibleMoves)
  }
  // @ts-ignore
  getEval = (_board?: Board, _toMove?: "C" | "P") =>
    Math.floor(Math.random() * 3 - 1)
}
