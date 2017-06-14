@builtin "whitespace.ne"

MAIN -> clause

clause -> clause _ logical _ clause
		| "(" _ clause _ ")"
        | match

logical -> "AND"
         | "OR"

match -> field ":" string
      | string

field -> wordchars:+

string -> value:+
        | "\"" value_or_space:+ "\""

value -> wordchars
       | "\\" escaped_value

value_or_space -> value
                 | " "

escaped_value -> [\(\)]

wordchars -> [a-zA-Z0-9]
