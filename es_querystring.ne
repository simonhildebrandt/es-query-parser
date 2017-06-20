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
		return [ "logical", data[2][0][0], data[0][0], data[4][0] ];
	}
%}

simple -> match {%
	function (data, location, reject) {
		return [ "simple", data[0][0] ];
	}
%}

bracketed -> "(" _ clause _ ")" {%
	function (data, location, reject) {
		return [ "bracketed", data[2][0] ];
	}
%}

logical -> logicaloperator

logicaloperator -> "AND"
      			     | "OR"

match -> field_and_string
       | string

field_and_string -> field ":" string {%
	function (data, location, reject) {
		return [ "attribute", data[0], data[2][1] ];
	}
%}

field -> wordchars:+ {%
	function (data, location, reject) {
		return data[0].join("");
	}
%}

string -> string_or_quoted_string {%
	function (data, location, reject) {
		return [ "attribute", data[0][0], "default" ];
	}
%}

string_or_quoted_string -> values
                         | quoted_string

values -> value:+ {%
	function (data, location, reject) {
		return ["literal", data[0].join("") ];
	}
%}

quoted_string -> "\"" value_or_space:+ "\"" {%
	function (data, location, reject) {
		return ["quoted", data[1].join("") ];
	}
%}

value -> wordchars
       | "\\" escaped_value

value_or_space -> value
                | __

escaped_value -> [\(\)]

wordchars -> [a-zA-Z0-9]
