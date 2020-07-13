import Board from "./Board"

test("getting and setting", () => {
  // New board
  let board = new Board(6)
  // Set a few cells
  board.setCell("X", { startPoint: 0, endPoint: 1 })
  board.setCell("O", { startPoint: 5, endPoint: 1 })
  // Make sure I get the same ones back, while also testing flipping
  expect([
    board.getCell({ startPoint: 0, endPoint: 1 }),
    board.getCell({ startPoint: 1, endPoint: 0 }),
  ]).toEqual(Array(2).fill("X"))
  expect([
    board.getCell({ startPoint: 1, endPoint: 5 }),
    board.getCell({ startPoint: 5, endPoint: 1 }),
  ]).toEqual(Array(2).fill("O"))
  // Make sure bad setting is safe
  for (let i = 0; i < 6; i++) {
    expect(() => {
      board.setCell("X", { startPoint: i, endPoint: i })
    }).toThrow()
  }
})

test("generation", () => {
  // New board
  const boardSize = 5
  let board = new Board(boardSize)
  // Make sure the right points are undefined
  for (let i = 0; i < boardSize; i++) {
    expect(board.getCell({ startPoint: i, endPoint: i })).toBe(undefined)
  }
  // Make sure the other indexes generated right
  for (let startPoint = 0; startPoint < boardSize; startPoint++) {
    for (let endPoint = startPoint + 1; endPoint < boardSize; endPoint++) {
      expect(board.getCell({ startPoint, endPoint })).toBe(null)
    }
  }
})

test("decisive position detection", () => {
  // Make boards
  let evenBoard = new Board(5)
  let decisiveBoard = new Board(5)
  // Make decisive boared actually decisive
  decisiveBoard.setCell("X", { startPoint: 0, endPoint: 5 })
  decisiveBoard.setCell("X", { startPoint: 4, endPoint: 5 })
  decisiveBoard.setCell("X", { startPoint: 4, endPoint: 0 })
  // Make sure even board returns even
  expect(evenBoard.isDecisive()).toBe(null)
  // Make sure decisive board returns the loser
  expect(decisiveBoard.isDecisive()).toBe("X")
})

test("get empty squares", () => {
  // Make small board
  let board = new Board(4)
  // Make some cells non-empty
  board.setCell("X", { startPoint: 0, endPoint: 1 })
  board.setCell("X", { startPoint: 0, endPoint: 2 })
  board.setCell("X", { startPoint: 0, endPoint: 3 })
  // Make sure all the other cells are returned
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
