import Board from "../Board"
import BasicBot from "./BasicBot"

test("get eval", () => {
  let board = new Board(5)
  let bot = new BasicBot()
  board.setCell("P", { startPoint: 0, endPoint: 1 })
  board.setCell("P", { startPoint: 1, endPoint: 2 })
  board.setCell("P", { startPoint: 0, endPoint: 2 })
  expect(bot.getEval(board, "P")).toBe(1)
  board = new Board(5)
  expect(bot.getEval(board, "C")).toBe(0)
})
test("get move", () => {
  let board = new Board(5)
  let bot = new BasicBot()
  board.setCell("C", { startPoint: 0, endPoint: 2 })
  board.setCell("C", { startPoint: 0, endPoint: 3 })
  board.setCell("C", { startPoint: 0, endPoint: 4 })
  board.setCell("C", { startPoint: 1, endPoint: 3 })
  board.setCell("C", { startPoint: 1, endPoint: 4 })
  let moves = new Array(1000).fill(null).map(() => bot.getMove(board, "C"))
  for (const move of moves) {
    expect(move).toEqual({ startPoint: 1, endPoint: 2 })
  }
  // Single move tests; not reliable due to randomness
  // let move = bot.getMove(board, "C")
  // expect(move).toEqual({ startPoint: 1, endPoint: 2 })
})
