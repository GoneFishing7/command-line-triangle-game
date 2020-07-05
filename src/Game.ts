const Confirm = require("prompt-confirm")

interface Options {
  isPlayerMovingFirst: boolean
}

export default class Game {
  readonly NUM_POINTS = 5
  start() {
    console.log(`This game is using ${this.NUM_POINTS} points`)
    const prompt = new Confirm("Do you want to move first?")
    prompt.run().then((isPlayerMovingFirst: boolean) => {
      this.runWithOptions({ isPlayerMovingFirst })
    })
  }
  runWithOptions(options: Options) {
    console.log(options)
  }
}
