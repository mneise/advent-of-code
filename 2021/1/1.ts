const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  var lines: string[] = data.split(/\r?\n/)
  var length: number = lines.length

  // Part 1
  var prevNumber: number = parseInt(lines[0])
  var x: number = 0
  for (var i: number = 1; i < length; i++) {
    let currentNumber: number = parseInt(lines[i])
    if (currentNumber > prevNumber) {
      x++
    }
    prevNumber = currentNumber
  }
  console.log(x)

  // Part 2
  var prevSum: number = lines.slice(0, 3)
      .map(numStr => parseInt(numStr))
      .reduce((partial_sum, a) => partial_sum + a, 0)
  var x: number = 0
  for (var i: number = 1; i < length; i++) {
    if ( (i + 3) > length) {
      break
    }

    let currentSum: number = lines.slice(i, i + 3)
        .map(numStr => parseInt(numStr))
        .reduce((partial_sum, a) => partial_sum + a, 0)

    if (currentSum > prevSum) {
      x++
    }

    prevSum = currentSum
  }
  console.log(x)
})
