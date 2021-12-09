const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    var lines: string[] = data.split(/\r?\n/)

    // part 1
    var horizontal: number = 0
    var depth: number = 0

    for (var i: number = 0; i < lines.length; i++) {
        let line: string[] = lines[i].split(/[ ,]+/)
        switch (line[0]) {
        case "forward":
            horizontal += parseInt(line[1])
            break
        case "down":
            depth += parseInt(line[1])
            break
        case "up":
            depth -= parseInt(line[1])
            break
        }
    }
    console.log(horizontal * depth)

    // part 1
    var horizontal: number = 0
    var depth: number = 0
    var aim: number = 0

    for (var i: number = 0; i < lines.length; i++) {
        let line: string[] = lines[i].split(/[ ,]+/)
        var x: number = parseInt(line[1])
        switch (line[0]) {
        case "forward":
            horizontal += x
            depth += (aim * x)
            break
        case "down":
            aim += x
            break
        case "up":
            aim -= x
            break
        }
    }
    console.log(horizontal * depth)
})
