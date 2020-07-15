import Board from "./Board"

test("getting and setting", () => {
  // New board
  let board = new Board(6)
  // Set a few cells
  board.setCell("P", { startPoint: 0, endPoint: 1 })
  board.setCell("C", { startPoint: 5, endPoint: 1 })
  // Make sure I get the same ones back, while also testing flipping
  expect([
    board.getCell({ startPoint: 0, endPoint: 1 }),
    board.getCell({ startPoint: 1, endPoint: 0 }),
  ]).toEqual(Array(2).fill("P"))
  expect([
    board.getCell({ startPoint: 1, endPoint: 5 }),
    board.getCell({ startPoint: 5, endPoint: 1 }),
  ]).toEqual(Array(2).fill("C"))
  // Make sure bad setting is safe
  for (let i = 0; i < 6; i++) {
    expect(() => {
      board.setCell("P", { startPoint: i, endPoint: i })
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
  decisiveBoard.setCell("P", { startPoint: 0, endPoint: 5 })
  decisiveBoard.setCell("P", { startPoint: 4, endPoint: 5 })
  decisiveBoard.setCell("P", { startPoint: 4, endPoint: 0 })
  // Make sure even board returns even
  expect(evenBoard.getLoser()).toBe(null)
  // Make sure decisive board returns the loser
  expect(decisiveBoard.getLoser()).toBe("P")
})

test("get empty squares", () => {
  // Make small board
  let board = new Board(4)
  // Make some cells non-empty
  board.setCell("P", { startPoint: 0, endPoint: 1 })
  board.setCell("P", { startPoint: 0, endPoint: 2 })
  board.setCell("P", { startPoint: 0, endPoint: 3 })
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

test("size getter", () => {
  let board = new Board(5)
  // Make sure size getter works
  expect(board.size).toBe(5)
})

test("basic copy features", () => {
  // Make a board with a cell
  let oldBoard = new Board(5)
  oldBoard.setCell("P", {
    startPoint: 1,
    endPoint: 2,
  })
  let newBoard = Board.deepCopy(oldBoard)
  expect(newBoard.getCell({ startPoint: 1, endPoint: 2 })).toBe("P")
  expect(newBoard.getCell({ startPoint: 1, endPoint: 4 })).toBe(null)
})

test("deep copy without move", () => {
  let oldBoard = new Board(5)
  let newBoard = Board.deepCopy(oldBoard)
  oldBoard.setCell("P", {
    startPoint: 1,
    endPoint: 2,
  })
  expect(newBoard.getCell({ startPoint: 1, endPoint: 2 })).toBe(null)
})

test("deep copy with move", () => {
  let oldBoard = new Board(5)
  let newBoard = Board.deepCopyWithMove(oldBoard, "P", {
    startPoint: 1,
    endPoint: 2,
  })
  oldBoard.setCell("P", {
    startPoint: 1,
    endPoint: 3,
  })
  expect(newBoard.getCell({ startPoint: 1, endPoint: 3 })).toBe(null)
  expect(oldBoard.getCell({ startPoint: 1, endPoint: 2 })).toBe(null)
})
