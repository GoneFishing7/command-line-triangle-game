import Board from "./Board"

const { Confirm } = require("enquirer")

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
    const prompt = new Confirm({
      name: "isPlayerMovingFirst",
      message: "Are you moving first",
    })
    prompt.run().then((isPlayerMovingFirst: boolean) => {
      this.runWithOptions({ isPlayerMovingFirst })
    })
  }
  async runWithOptions(options: Options) {
    // console.log(options)
    // let isPlayersTurn = options.isPlayerMovingFirst
    // while (
    //   this.board.getEmptyCells().length !== 0 &&
    //   !this.board.isDecisive()
    // ) {
    //   if (isPlayersTurn) {
    //     let playersMove = await getPlayerMove()
    //   }
    // }
  }
  // async getPlayerMove() {
  //   prompt.run().then((isPlayerMovingFirst: boolean) => {
  //     this.runWithOptions({ isPlayerMovingFirst })
  //   })
  // }
}
