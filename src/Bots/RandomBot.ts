import BotInterface from "./BotInterface"
import Board from "../Board"
import { getRandomElementFromArray } from "../Utils"

export default class RandomBot implements BotInterface {
  getMove = (board: Board) => {
    // Get all possible moves
    let possibleMoves = board.getEmptyCells()
    // Pick a random one
    return getRandomElementFromArray(possibleMoves)
  }
  getEval = (_board?: Board) => Math.floor(Math.random() * 3 - 1)
}
