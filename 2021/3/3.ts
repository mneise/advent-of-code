const fs = require('fs')

function transpose(arr: string[][]): number[][] {
    return arr[0].map((_, colIndex) => arr.map(row => parseInt(row[colIndex])))
}

function countOccurrences(arr: number[]): number[] {
    return arr.reduce(function (acc, x) {
        acc[x] += 1
        return acc
    },[0, 0])
}

function mostFrequent(arr: number[]): number {
    var occurrences: number[] = countOccurrences(arr)
    if (occurrences[0] > occurrences[1]) {
        return 0
    } else {
        return 1
    }
}

function leastFrequent(arr: number[]) {
    var occurrences: number[] = countOccurrences(arr)
    if (occurrences[1] < occurrences[0]) {
        return 1
    } else {
        return 0
    }
}

fs.readFile('input.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    var lines: string[][] = data.split(/\r?\n/).map((line) => {return line.split("")})

    // part 1
    var transposed: number[][] = transpose(lines)

    var gamma: number[] = transposed.map(mostFrequent)
    var gammaDec: number = parseInt(gamma.join(''), 2)

    var epsilon: number[] = gamma.map((x: number) => {
        if (x == 1) {
            return 0
        } else {
            return 1
        }
    })
    var epsilonDec: number = parseInt(epsilon.join(''), 2)
    
    console.log(gammaDec * epsilonDec)

    // part 2
    var vals: string[][] = lines

    // oxygen
    var i: number = 0
    while (vals.length > 1) {
        var transposed: number[][] = transpose(vals)
        var x: number = mostFrequent(transposed[i])
        vals = vals.filter(arr => parseInt(arr[i]) == x)
        i++
    }
    var oxygen: number = parseInt(vals[0].join(''), 2)

    // co2
    var i: number = 0
    vals = lines
    while (vals.length > 1) {
        var transposed: number[][] = transpose(vals)
        var x: number = leastFrequent(transposed[i])
        vals = vals.filter(arr => parseInt(arr[i]) == x)
        i++
    }
    var co2: number = parseInt(vals[0].join(''), 2)

    console.log(oxygen * co2)
})
