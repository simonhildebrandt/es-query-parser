var tap = require('tap')
var Parser = require('./lib/index.js').Parser;

var dud = new Parser(')')
tap.notOk(dud.isValid)
tap.notOk(dud.isIncomplete)
tap.match(dud.errorOffset, 0)

var unfinished = new Parser('(')
tap.notOk(unfinished.isValid)
tap.ok(unfinished.isIncomplete)

// Special characters...
// + - && || ! ( ) { } [ ] ^ " ~ * ? : \

var tests = [
  'val?e',                  // Wildcard
  'val\\?e',                // Escaped question mark
  'val\\(e',                // Escaped left bracket
  // 'value*',
  'value~0',
  // '"several values"~10',
  // 'update_at:[20020101 TO 20030101]',
  // 'username:[Simon TO Thomas]',
  // 'boosted^4',
  // 'title:(+return +"pink panther")',
  // 'logicaloperator isinvsible',
  // 'logical ! operator',
  // 'logical +operator',
  // 'logical -operator',
  'value',
  'field:value',
  'logical OR operator',
  'logical AND operator',
  'logical && operator',
  'logical NOT operator',
  '(grouped)',
  '  wschar  ',
  '"quoted"'
]

tests.forEach((test) => {
  var p = new Parser(test)
  tap.ok(p.isValid, `${test} wasn't valid`)
  tap.matchSnapshot(p.results, test)
})

var test = "logical && operator junk!"
var p = new Parser(test, true)
tap.ok(p.isValid, `${test} wasn't valid`)
tap.matchSnapshot(p.results, test)

var test = "logical && operator OR"
var p = new Parser(test, true)
tap.ok(p.isValid, `${test} wasn't valid`)
tap.matchSnapshot(p.results, test)
