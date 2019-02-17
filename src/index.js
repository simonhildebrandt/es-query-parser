import grammar from "../grammar.js"
import nearley from "nearley"

class Parser {
  constructor(input) {
    this.input = input
    this.parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

    try {
      this.parser.feed(this.input)
    } catch(e) {
      console.error(e)
      this.error = e
    }
  }

  results() {
    return this.parser.results || []
  }

  resultCount() {
    return this.results().length
  }

  isIncomplete() {
    return !this.error && this.resultCount() == 0
  }

  isValid() {
    return !this.error && this.resultCount() > 0
  }

  errorOffset() {
    return this.error.offset
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

export { Parser }
