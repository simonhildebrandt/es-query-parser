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
		return { type: "logical", start: location, operator: data[2], children: [data[0][0], data[4][0]] };
	}
%}

simple -> match {%
	function (data, location, reject) {
		return { type: "simple", start: location, value: data[0][0] };
	}
%}

bracketed -> "(" _ clause _ ")" {%
	function (data, location, reject) {
		return { type: "bracketed", start: location, value: data[2][0] };
	}
%}

logical -> logicaloperator {%
	function (data, location, reject) {
		return { value: data[0][0], start: location };
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
		return { type: 'field', start: location, field: data[0], value: data[2].value };
	}
%}

field -> wordchar:+ {%
	function (data, location, reject) {
		return data[0].join("");
	}
%}

string -> string_or_quoted_string {%
	function (data, location, reject) {
		return { type: 'field', start: location, field: null, value: data[0][0][0] };
	}
%}

string_or_quoted_string -> weightable_string weight:?

weightable_string -> values
                  | quoted_string

weight -> "~" weight_number

weight_number -> [0-9]

values -> value:+ {%
	function (data, location, reject) {
		return { type: "literal", start: location, value: data[0].join("") };
	}
%}

quoted_string -> "\"" value_or_space:+ "\"" {%
	function (data, location, reject) {
		return { type: "quoted", start: location, value: data[1].join("") };
	}
%}

value -> wordchar
       | "\\" escaped_value
			 | wildcard

value_or_space -> value
                | " "

escaped_value -> [\(\)\?]

wildcard -> [\?]

wordchar -> [a-zA-Z0-9_-]
