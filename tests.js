var tap = require('tap')
var Parser = require('./lib/index.js').Parser;

var dud = new Parser(')')
tap.pass(dud.isValid(), false)
tap.pass(dud.isIncomplete(), false)
tap.pass(dud.errorOffset(), 1)

var unfinished = new Parser('(')
tap.pass(unfinished.isValid(), false)
tap.pass(unfinished.isIncomplete(), true)

// Special characters...
// + - && || ! ( ) { } [ ] ^ " ~ * ? : \

var tests = [
  // 'val?e',
  // 'value*',
  // 'value~0.8',
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

tests.forEach((test, i) => {
  var p = new Parser(test)
  tap.matchSnapshot(p.results(), test)
})
