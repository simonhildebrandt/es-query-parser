import grammar from "./grammar.js"
import nearley from "nearley"


function parse(value) {
  var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  return p.feed(value)
}

function validate(value) {
  try {
    return parse(value).results.length > 0
  } catch(e) {
    return false
  }
}

function incomplete(value) {
  try {
    return parse(value).results.length == 0
  } catch(e) {
    return false
  }
}

// Here's how Nearley works:
/*
function validate(value) {
  try {
    if (parse(value).results.length > 0) {
      return "Valid."
    } else {
      return "Not *yet* valid."
    }
  } catch(e) {
    return "Not valid."
  }
}
*/

module.exports = { parse, validate, incomplete }
