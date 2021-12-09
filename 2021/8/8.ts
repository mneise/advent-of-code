const fs = require('fs')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  type Input = {
    patterns: string[];
    digits: string[];
  };

  var lines: string[] = data.split(/\r?\n/)
  var input: Input[] = new Array()

  // init
  for (var i: number = 0; i < lines.length; i++) {
    if (lines[i]) {
      var line: string[] = lines[i].split("|")
      var patterns: string[] = line[0].trim().split(" ")
      var digits: string[] = line[1].trim().split(" ")
      input[i] = {patterns: patterns,
                  digits: digits}
    }
  }

  // part 1
  var count: number = 0
  for (var i: number = 0; i < input.length; i++) {
    var digits: string[] = input[i].digits
    for (var j: number = 0; j < digits.length; j++) {
      var digit: string = digits[j]
      if (digit.length == 2 ||
          digit.length == 4 ||
          digit.length == 3 ||
          digit.length == 7) {
        count += 1
      }
    }
  }

  console.log(count)

  // part 2
  var count: number = 0
  for (var i: number = 0; i < input.length; i++) {
    var x: Input = input[i]
    var pattern: string[] = x.patterns
    var digits: string[] = x.digits

    var translation = {}
    var zero, one, two, three, four, five, six, seven, eight, nine;
    var a, b, c, d, e, f, g;

    // 1, 4, 7, 8
    for (var j: number = 0; j < pattern.length; j++) {
      var p: string = pattern[j]
      if (p.length == 2) {
        one = p
      }

      if (p.length == 3) {
        seven = p
      }
      
      if (p.length == 4) {
        four =  p
      }

      if (p.length == 7) {
        eight =  p
      }
    }

    a = seven.split("").filter(x => !one.includes(x))[0]
    
    var l5 = pattern.filter(x => x.length == 5)
    var l6: string[] = pattern.filter(x => x.length == 6)

    three = l5.filter(x => one.split("").every(y => x.includes(y)))[0]

    c = one.split("").filter(x => !l6.every(y => y.includes(x)))[0]
    
    five = l5.filter(x => !x.includes(c))[0]
    two = l5.filter(x => x.includes(c) && x !== three)[0]
    six = l6.filter(x => !x.includes(c))[0]

    e = six.split("").filter(x => !five.split("").includes(x))[0]

    nine = l6.filter(x => !x.includes(e))[0]
    zero = l6.filter(x => x !== nine && x !== six)[0]

    var digit: string = ""
    for (var j: number = 0; j < digits.length; j++) {
      var dg: string = digits[j]
      if (dg.length == zero.length && dg.split("").every(x => zero.includes(x))) {
        digit = digit.concat("0")
      }

      if (dg.length == one.length && dg.split("").every(x => one.includes(x))) {
        digit = digit.concat("1")
      }

      if (dg.length == two.length && dg.split("").every(x => two.includes(x))) {
        digit = digit.concat("2")
      }

      if (dg.length == three.length && dg.split("").every(x => three.includes(x))) {
        digit = digit.concat("3")
      } 

      if (dg.length == four.length && dg.split("").every(x => four.includes(x))) {
        digit = digit.concat("4")
      }

      if (dg.length == five.length && dg.split("").every(x => five.includes(x))) {
        digit = digit.concat("5")
      }

      if (dg.length == six.length && dg.split("").every(x => six.includes(x))) {
        digit = digit.concat("6")
      }

      if (dg.length == seven.length && dg.split("").every(x => seven.includes(x))) {
        digit = digit.concat("7")
      }

      if (dg.length == eight.length && dg.split("").every(x => eight.includes(x))) {
        digit = digit.concat("8")
      }

      if (dg.length == nine.length && dg.split("").every(x => nine.includes(x))) {
        digit = digit.concat("9")
      }
    }

    count += parseInt(digit)
  }

  console.log(count)
})
