import Board from "./Board"
import { PositionInterface } from "./PointInterface"

import Enquirer from "enquirer"

interface Options {
  isPlayerMovingFirst: boolean
}

export default class Game {
  readonly NUM_POINTS = 5
  board: Board
  constructor() {
    this.board = new Board(this.NUM_POINTS)
    console.log(`This game is using ${this.NUM_POINTS} points`)
  }

  start() {
    const optionsPrompt = [
      {
        type: "toggle",
        name: "isPlayerMovingFirst",
        message: "Are you moving first?",
        enabled: "Yes",
        disabled: "No",
        initial: "Yes",
      },
    ]
    // @ts-ignore
    Enquirer.prompt(optionsPrompt).then((options: Options) => {
      this.runWithOptions(options)
    })
  }
  async runWithOptions(options: Options) {
    console.log(options)
    let isPlayersTurn = options.isPlayerMovingFirst
    let i = 0
    while (
      // this.board.getEmptyCells().length !== 0 &&
      // !this.board.isDecisive()
      i < 10
    ) {
      if (isPlayersTurn) {
        let playersMove = await this.getPlayerMove()
      }
      console.log("finished loop")
      i++
    }
  }
  async getPlayerMove(): Promise<PositionInterface> {
    let cellPrompt = [
      {
        type: "numeral",
        name: "startPoint",
        message: "Where is your start point?",
        validate: (_n: string) => true,
      },
      {
        type: "numeral",
        name: "endPoint",
        message: "Where is your end point?",
        validate: (_n: string) => true,
      },
    ]
    let move: PositionInterface
    do {
      console.log("Did the thing")
      move = await Enquirer.prompt(cellPrompt)
      console.log(this.board.getCell(move))
    } while (this.board.getCell(move) !== null)
    return move
  }
}
