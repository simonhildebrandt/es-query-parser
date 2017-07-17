import ParseRsult from './es_querystring.js'

$('#data').on('input', (event) => {
  let result = new ParseRsult(event.target.value)
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
})
