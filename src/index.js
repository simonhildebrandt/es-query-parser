import grammar from "../grammar.js"
import nearley from "nearley"

class Parser {
  constructor(input, incremental=false) {
    let parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

    if (incremental) {
      // v2 - add better prediction
      // https://github.com/kach/nearley/issues/316
      let info = parser.save()

      this.error = false
      this.results = [...input].reduce((prev, character) => {
        try {
          parser.feed(character)
        } catch(e) {
          parser.restore(info)
        }

        let {results} = parser;
        return (results.length > 0 && results) || prev
      }, {})

    } else {
      try {
        parser.feed(input)
      } catch(e) {
        this.error = e
      }

      this.results = parser.results || []
    }
  }

  get resultCount() {
    return this.results.length
  }

  get isIncomplete() {
    return !this.error && this.resultCount == 0
  }

  get isValid() {
    return !this.error && this.resultCount > 0
  }

  get errorOffset() {
    return this.error && this.error.offset
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
