// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "MAIN", "symbols": ["_", "clause", "_"], "postprocess": 
        function (data, location, reject) {
        	return data[1][0];
        }
        },
    {"name": "clause", "symbols": ["grouped"]},
    {"name": "clause", "symbols": ["bracketed"]},
    {"name": "clause", "symbols": ["simple"]},
    {"name": "grouped", "symbols": ["clause", "__", "logical", "__", "clause"], "postprocess": 
        function (data, location, reject) {
        	return { type: "logical", start: location, operator: data[2], children: [data[0][0], data[4][0]] };
        }
        },
    {"name": "simple", "symbols": ["match"], "postprocess": 
        function (data, location, reject) {
        	return { type: "simple", start: location, value: data[0][0] };
        }
        },
    {"name": "bracketed", "symbols": [{"literal":"("}, "_", "clause", "_", {"literal":")"}], "postprocess": 
        function (data, location, reject) {
        	return { type: "bracketed", start: location, value: data[2][0] };
        }
        },
    {"name": "logical", "symbols": ["logicaloperator"], "postprocess": 
        function (data, location, reject) {
        	return { value: data[0][0], start: location };
        }
        },
    {"name": "logicaloperator$string$1", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicaloperator", "symbols": ["logicaloperator$string$1"]},
    {"name": "logicaloperator$string$2", "symbols": [{"literal":"O"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicaloperator", "symbols": ["logicaloperator$string$2"]},
    {"name": "logicaloperator$string$3", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicaloperator", "symbols": ["logicaloperator$string$3"]},
    {"name": "logicaloperator$string$4", "symbols": [{"literal":"&"}, {"literal":"&"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicaloperator", "symbols": ["logicaloperator$string$4"]},
    {"name": "logicaloperator$string$5", "symbols": [{"literal":"|"}, {"literal":"|"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logicaloperator", "symbols": ["logicaloperator$string$5"]},
    {"name": "match", "symbols": ["field_and_string"]},
    {"name": "match", "symbols": ["string"]},
    {"name": "field_and_string", "symbols": ["field", {"literal":":"}, "string"], "postprocess": 
        function (data, location, reject) {
        	return { type: 'field', start: location, field: data[0], value: data[2].value };
        }
        },
    {"name": "field$ebnf$1", "symbols": ["wordchar"]},
    {"name": "field$ebnf$1", "symbols": ["field$ebnf$1", "wordchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "field", "symbols": ["field$ebnf$1"], "postprocess": 
        function (data, location, reject) {
        	return data[0].join("");
        }
        },
    {"name": "string", "symbols": ["string_or_quoted_string"], "postprocess": 
        function (data, location, reject) {
        	return { type: 'field', start: location, field: null, value: data[0][0][0] };
        }
        },
    {"name": "string_or_quoted_string$ebnf$1", "symbols": ["weight"], "postprocess": id},
    {"name": "string_or_quoted_string$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "string_or_quoted_string", "symbols": ["weightable_string", "string_or_quoted_string$ebnf$1"]},
    {"name": "weightable_string", "symbols": ["values"]},
    {"name": "weightable_string", "symbols": ["quoted_string"]},
    {"name": "weight", "symbols": [{"literal":"~"}, "weight_number"]},
    {"name": "weight_number", "symbols": [/[0-9]/]},
    {"name": "values$ebnf$1", "symbols": ["value"]},
    {"name": "values$ebnf$1", "symbols": ["values$ebnf$1", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "values", "symbols": ["values$ebnf$1"], "postprocess": 
        function (data, location, reject) {
        	return { type: "literal", start: location, value: data[0].join("") };
        }
        },
    {"name": "quoted_string$ebnf$1", "symbols": ["value_or_space"]},
    {"name": "quoted_string$ebnf$1", "symbols": ["quoted_string$ebnf$1", "value_or_space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "quoted_string", "symbols": [{"literal":"\""}, "quoted_string$ebnf$1", {"literal":"\""}], "postprocess": 
        function (data, location, reject) {
        	return { type: "quoted", start: location, value: data[1].join("") };
        }
        },
    {"name": "value", "symbols": ["wordchar"]},
    {"name": "value", "symbols": [{"literal":"\\"}, "escaped_value"]},
    {"name": "value", "symbols": ["wildcard"]},
    {"name": "value_or_space", "symbols": ["value"]},
    {"name": "value_or_space", "symbols": [{"literal":" "}]},
    {"name": "escaped_value", "symbols": [/[\(\)\?]/]},
    {"name": "wildcard", "symbols": [/[\?]/]},
    {"name": "wordchar", "symbols": [/[a-zA-Z0-9_-]/]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
