import BotInterface from "./BotInterface"
import Board from "../Board"

class RandomBot implements BotInterface {
  getMove = (board: Board) => {
    // TODO: Implement
    throw "not implemented"
    return {
      startPoint: 1,
      endPoint: 1,
    }
  }
  getEval = () => 0
}
