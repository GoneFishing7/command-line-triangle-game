// Player is P
// Computer is C

import Board from "./Board"
import { PositionInterface } from "./PointInterface"

import Enquirer from "enquirer"
import RandomBot from "./Bots/RandomBot"
import { cellToString } from "./Utils"
import BasicBot from "./Bots/BasicBot"

interface Options {
  isPlayerMovingFirst: boolean
  botMode: string
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
      {
        type: "select",
        name: "botMode",
        message: "Bot mode",
        choices: ["Easy", "Hard"],
      },
    ]
    // @ts-ignore
    Enquirer.prompt(optionsPrompt).then((options: Options) => {
      this.runWithOptions(options)
    })
  }
  async runWithOptions(options: Options) {
    let bot = options.botMode === "Hard" ? new BasicBot() : new RandomBot()
    console.log(bot.name)
    let isPlayersTurn = options.isPlayerMovingFirst
    while (this.board.getEmptyCells().length !== 0 && !this.board.getLoser()) {
      if (isPlayersTurn) {
        let playersMove = await this.getPlayerMove()
        this.board.setCell("P", playersMove)
        console.log(`Your move: ${cellToString(playersMove)}`)
        isPlayersTurn = !isPlayersTurn
      } else {
        let computersMove = bot.getMove(this.board, "C")
        console.log(`Computer's move: ${cellToString(computersMove)}`)
        this.board.setCell("C", computersMove)
        isPlayersTurn = !isPlayersTurn
      }
    }
    if (this.board.getLoser()) {
      console.log(
        `${this.board.getLoser() === "C" ? "Player" : "Computer"} wins!`
      )
    } else {
      console.log("It's a tie... is this even possible?!?!?")
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
      move = await Enquirer.prompt(cellPrompt)
      // Adjust so input that it is 0-based, not 1-based
      move.startPoint -= 1
      move.endPoint -= 1
    } while (this.board.getCell(move) !== null)
    return move
  }
}
