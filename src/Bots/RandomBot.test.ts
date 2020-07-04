import Board from "../Board"
import RandomBot from "./RandomBot"

test("bot eval", () => {
  let board = new Board(6)
  let randomBot = new RandomBot()
  // get 100 evals
  let evals = new Array(100).fill(null).map(() => randomBot.getEval())
  // Make sure they're in the right range
  expect(evals.every((n) => n > -2 && n < 2)).toBe(true)
})

test("bot moving", () => {
  let board = new Board(6)
  board.setCell("X", {
    startPoint: 1,
    endPoint: 2,
  })
  let randomBot = new RandomBot()
  // get 100 moves
  let moves = new Array(100).fill(null).map(() => randomBot.getMove(board))
  // Make sure they're possible
  expect(moves.every((move) => board.getCell(move) === null)).toBe(true)
})
