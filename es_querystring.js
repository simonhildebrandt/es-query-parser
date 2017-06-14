import grammar from "./grammar.js"
import nearley from "nearley"

function parse(value) {
  let p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  return p.feed(value)
}

function validate(value) {
  try {
    return parse(value).results.length > 0
  } catch(e) {
    return false
  }
}



export { parse, validate }
