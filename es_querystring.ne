# https://lucene.apache.org/core/2_9_4/queryparsersyntax.html

@builtin "whitespace.ne"

MAIN -> _ clause _ {%
	function (data, location, reject) {
		return data[1][0];
	}
%}

clause -> grouped
		    | bracketed
        | simple

grouped -> clause __ logical __ clause {%
	function (data, location, reject) {
		console.log('logical', data)
		return { type: "logical", offset: location, operator: data[2], children: [data[0][0], data[4][0]] };
	}
%}

simple -> match {%
	function (data, location, reject) {
		return { type: "simple", offset: location, value: data[0][0] };
	}
%}

bracketed -> "(" _ clause _ ")" {%
	function (data, location, reject) {
		return { type: "bracketed", offset: location, value: data[2][0] };
	}
%}

logical -> logicaloperator {%
	function (data, location, reject) {
		console.log('logicaloperator', data, location)
		return { value: data[0][0], offset: location };
	}
%}

logicaloperator -> "AND"
      			     | "OR"
      			     | "NOT"
      			     | "&&"

match -> field_and_string
       | string

field_and_string -> field ":" string {%
	function (data, location, reject) {
		return { type: 'field', offset: location, field: data[0], value: data[2].value };
	}
%}

field -> wordchars:+ {%
	function (data, location, reject) {
		return data[0].join("");
	}
%}

string -> string_or_quoted_string {%
	function (data, location, reject) {
		return { type: 'field', offset: location, field: null, value: data[0][0] };
	}
%}

string_or_quoted_string -> values
                         | quoted_string

values -> value:+ {%
	function (data, location, reject) {
		return { type: "literal", offset: location, value: data[0].join("") };
	}
%}

quoted_string -> "\"" value_or_space:+ "\"" {%
	function (data, location, reject) {
		return { type: "quoted", offset: location, value: data[1].join("") };
	}
%}

value -> wordchars
       | "\\" escaped_value

value_or_space -> value
                | " "

escaped_value -> [\(\)]

wordchars -> [a-zA-Z0-9_-]
