import { parse, validate } from './es_querystring.js'

$('#data').on('input', (event) => {
  if(validate(event.target.value)) {
    $('#error').html("")
    $('#results').html(JSON.stringify(parse(event.target.value).results, null, '\t'))
    console.log(parse(event.target.value).results)
  } else {
    $('#error').html(event.target.value + " isn't a valid query")
    $('#results').html("")
  }
})
