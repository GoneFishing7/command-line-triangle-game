import BotInterface from "./BotInterface"
import Board from "../Board"
import { getRandomElementFromArray } from "../Utils"

export default class RandomBot implements BotInterface {
  getMove = (board: Board) => {
    let possibleMoves = board.getEmptyCells()
    return getRandomElementFromArray(possibleMoves)
  }
  getEval = () => Math.floor(Math.random() * 3 - 1)
}
