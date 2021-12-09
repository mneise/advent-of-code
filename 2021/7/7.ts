const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  var positions: number[] = data.split(",").map(x => parseInt(x))
  var maxPosition: number = Math.max(...positions)

  // part 1
  var minFuel: number = null
  for (var i: number = 0; i <= maxPosition; i++) {
    var tempFuel: number = 0
    for (var j: number = 0; j < positions.length; j++) {
      tempFuel += Math.abs(i - positions[j])
    }
    if (minFuel == null) {
      minFuel = tempFuel
    } else if (tempFuel < minFuel) {
      minFuel = tempFuel
    }
  }

  console.log(minFuel)

  // part 2
  var minFuel: number = null
  for (var i: number = 0; i <= maxPosition; i++) {
    var tempFuel: number = 0
    for (var j: number = 0; j < positions.length; j++) {
      var abs: number = Math.abs(i - positions[j])
      var cost: number = 0
      for (var k: number = 1; k <= abs; k++) {
        cost += k
      }
      tempFuel += cost
    }
    if (minFuel == null) {
      minFuel = tempFuel
    } else if (tempFuel < minFuel) {
      minFuel = tempFuel
    }
  }
  console.log(minFuel)
})
