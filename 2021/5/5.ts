const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  interface Vent {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  var lines: string[] = data.split(/\r?\n/)
  var vents: Vent[] = new Array(lines.length)

  // init vents
  for (var i: number = 0; i < lines.length; i++) {
    var line: string[] = lines[i].split("->")

    if (line.length < 2) {
      continue
    }

    var xy1: string[] = line[0].split(",")
    var x1: number = parseInt(xy1[0])
    var y1: number = parseInt(xy1[1])
    var xy2: string[] = line[1].split(",")
    var x2: number = parseInt(xy2[0])
    var y2: number = parseInt(xy2[1])

    var vent: Vent = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    }
    vents[i] = vent
  }

  // part 1 & 2
  var overlaps = {}
  vents.forEach(function (vent: Vent) {
    // if (vent.x1 !== vent.x2 && vent.y1 !== vent.y2) {
    //   return
    // }

    var x: number = vent.x1
    var go1: boolean = true

    while (go1) {

      var y: number = vent.y1
      var go2: boolean = true

      while (go2) {
        if (overlaps[x] !== undefined && overlaps[x][y] !== undefined) {
          overlaps[x][y] += 1
        } else if (overlaps[x] !== undefined) {
          overlaps[x][y] = 1
        } else {
          overlaps[x] = {}
          overlaps[x][y] = 1
        }

        if (y == vent.y2) {
          go2 = false
        }

        if (x == vent.x2) {
          go1 = false
        }

        if (vent.x1 !== vent.x2 && vent.y1 !== vent.y2) {
          if (y < vent.y2) {
            y++
          } else {
            y--
          }

          if (x < vent.x2) {
            x++
          } else {
            x--
          }
        } else if (y < vent.y2) {
          y++
        } else {
          y--
        }
      }

      if (x == vent.x2) {
        go1 = false
      }

      if (x < vent.x2) {
        x++
      } else {
        x--
      }
    }
  })

  
  var count: number = 0
  Object.keys(overlaps).forEach(function (x) {
    Object.keys(overlaps[x]).forEach(function (y) {
      if (overlaps[x][y] > 1) {
        count += 1
      }
    })
  })

  console.log(count)
  
})
