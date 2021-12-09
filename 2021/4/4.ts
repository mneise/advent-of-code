const fs = require('fs')

var bingoNumbers: string[] = ("83,69,34,46,30,23,19,75,22,37,89,78,32,39,11,44,95,43,26,48,84,53,94,88,18,40,62,35,27,42,15,2,91,20,4,64,99,71,54,97,52,36,28,7,74,45,70,86,98,1,61,50,68,6,77,8,57,47,51,72,65,3,49,24,79,13,17,92,41,80,63,67,82,90,55,0,10,93,38,21,59,73,33,31,9,76,5,66,16,58,85,87,12,29,25,14,96,56,60,81").split(",")

function transpose(arr: string[][]): string[][] {
  return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))
}

function rowBingo (row: string[]) : boolean {
  return row.every(function(x: string) {
    return (x == "x")
  })
}

function isBingoBoard (board: string[][]) : boolean {
  for (var j: number = 0; j < board.length; j++) {
    if (rowBingo(board[j])) {
      return true
    }
  }

  var boardTransposed: string[][] = transpose(board)
  for (var j: number = 0; j < board.length; j++) {
    if (rowBingo(boardTransposed[j])) {
      return true
    }
  }

  return false
}

function isBingo (boards: string[][][]) {
  for (var i: number = 0; i < boards.length; i++) {
    var board: string[][] = boards[i]
    if (isBingoBoard(board)) {
      return i
    }
  }
  return null
}

function markBoard (row: string[], bingoNum: string) {
  for (var i: number = 0; i < row.length; i++) {
    if (row[i] == bingoNum) {
      row[i] = "x"
    }
  }
  return row
}

function markBoards (boards: string[][][], bingoNum: string) : string[][][] {
  for (var j: number = 0; j < boards.length; j++) {
    var board: string[][] = boards[j]
    for (var k: number = 0; k < board.length; k++) {
      var row: string[] = board[k]
      board[k] = markBoard(row, bingoNum)
    }
  }
  return boards
}

function calcSum(board: string[][]) : number {
  var sum: number = 0
  for (var i: number = 0; i < board.length; i++) {
    for (var j: number = 0; j < board[i].length; j++) {
      var x = board[i][j]
      if (x != "x") {
        sum += parseInt(x)
      }
    }
  }
  return sum
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  var lines: string[] = data.split(/\r?\n/)

  var boards: string[][][] = new Array(Math.ceil(lines.length / 6))
  for (var i: number = 0; i < boards.length; i++) {
    boards[i] = new Array(5)
  }

  // init board
  for (var i: number = 0; i < lines.length; i++) {
    var line: string[] = lines[i].split(" ").filter(x => x)
    if (line.length < 5) {
      continue
    }

    var boardNum: number = Math.floor(i / 6)
    var rowNum: number = i % 6
    boards[boardNum][rowNum] = line
  }

  // part 1
  for (var i: number = 0; i < bingoNumbers.length; i++) {
    var bingoNum: string = bingoNumbers[i]

    boards = markBoards(boards, bingoNum)
    
    var bingoBoardNum = isBingo(boards)
    if (bingoBoardNum !== null) {
      var bingoBoard: string[][] = boards[bingoBoardNum]
      console.log(parseInt(bingoNum) * calcSum(bingoBoard))
      break;
    }
  }

  // part 2
  for (var i: number = 0; i < bingoNumbers.length; i++) {
    var bingoNum: string = bingoNumbers[i]

    var tempBoards: string[][][] = boards

    boards = markBoards(boards, bingoNum)
    boards = boards.filter(function(board: string[][]) {
      return ((isBingoBoard(board)) == false)
    })

    if (boards.length == 0) {
      console.log(calcSum(tempBoards[0]) * parseInt(bingoNum))
      break;
    }

  }
})
