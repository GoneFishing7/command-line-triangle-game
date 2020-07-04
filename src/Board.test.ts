import Board from "./Board"

test("getting and setting", () => {
  let board = new Board(6)
  board.setCell("X", { startPoint: 0, endPoint: 1 })
  board.setCell("O", { startPoint: 5, endPoint: 1 })
  expect([
    board.getCell({ startPoint: 0, endPoint: 1 }),
    board.getCell({ startPoint: 1, endPoint: 0 }),
  ]).toEqual(Array(2).fill("X"))
  expect([
    board.getCell({ startPoint: 1, endPoint: 5 }),
    board.getCell({ startPoint: 5, endPoint: 1 }),
  ]).toEqual(Array(2).fill("O"))
})

test("generation", () => {
  let board = new Board(6)
  expect([
    board.getCell({ startPoint: 0, endPoint: 0 }),
    board.getCell({ startPoint: 1, endPoint: 1 }),
    board.getCell({ startPoint: 2, endPoint: 2 }),
  ]).toEqual(Array(3).fill(undefined))
})

test("decisive position detection", () => {
  let evenBoard = new Board(5)
  let decisiveBoard = new Board(5)
  decisiveBoard.setCell("X", { startPoint: 0, endPoint: 5 })
  decisiveBoard.setCell("X", { startPoint: 4, endPoint: 5 })
  decisiveBoard.setCell("X", { startPoint: 4, endPoint: 0 })
  expect(evenBoard.isDecisive()).toBe(null)
  expect(decisiveBoard.isDecisive()).toBe("X")
})

test("get empty squares", () => {
  let board = new Board(4)
  board.setCell("X", { startPoint: 0, endPoint: 1 })
  board.setCell("X", { startPoint: 0, endPoint: 2 })
  board.setCell("X", { startPoint: 0, endPoint: 3 })
  expect(board.getEmptyCells()).toEqual([
    {
      startPoint: 1,
      endPoint: 2,
    },
    {
      startPoint: 1,
      endPoint: 3,
    },
    {
      startPoint: 2,
      endPoint: 3,
    },
  ])
})
