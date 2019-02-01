import { Parser } from '../es/index.js'

const process = value => {
  let result = new Parser(value)
  if(result.isValid()) {
    $('#error').html("")
    $('#results').html(JSON.stringify(result.results(), null, '\t'))
    $('#data').css({borderColor: '#AAFFAA'})
  } else {
    if(result.isIncomplete()) {
      $('#error').html(result.input + " isn't a complete query")
      $('#data').css({borderColor: '#FFFFAA'})
      $('#results').html("")
    } else {
      $('#error').html('"' + event.target.value + "\" has an error at " + (result.errorOffset() + 1))
      $('#data').css({borderColor: '#FFAAAA'})
      $('#results').html("")
    }
  }
}

$('#data').on('input', event => process(event.target.value))

const test = 'testing:fields OR (trying AND "fixing")'

$('#data').val(test).trigger('input')
