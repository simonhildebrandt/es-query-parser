// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
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
    {"name": "MAIN", "symbols": ["clause"]},
    {"name": "clause", "symbols": ["clause", "_", "logical", "_", "clause"]},
    {"name": "clause", "symbols": [{"literal":"("}, "_", "clause", "_", {"literal":")"}]},
    {"name": "clause", "symbols": ["match"]},
    {"name": "logical$string$1", "symbols": [{"literal":"A"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logical", "symbols": ["logical$string$1"]},
    {"name": "logical$string$2", "symbols": [{"literal":"O"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "logical", "symbols": ["logical$string$2"]},
    {"name": "match", "symbols": ["field", {"literal":":"}, "string"]},
    {"name": "match", "symbols": ["string"]},
    {"name": "field$ebnf$1", "symbols": ["wordchars"]},
    {"name": "field$ebnf$1", "symbols": ["field$ebnf$1", "wordchars"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "field", "symbols": ["field$ebnf$1"]},
    {"name": "string$ebnf$1", "symbols": ["value"]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"]},
    {"name": "string$ebnf$2", "symbols": ["value"]},
    {"name": "string$ebnf$2", "symbols": ["string$ebnf$2", "value"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": [{"literal":"\""}, "string$ebnf$2", {"literal":"\""}]},
    {"name": "value", "symbols": ["wordchars"]},
    {"name": "value", "symbols": [{"literal":"\\"}, "escaped_value"]},
    {"name": "escaped_value", "symbols": [/[\(\)]/]},
    {"name": "wordchars", "symbols": [/[a-zA-Z0-9]/]}
]
  , ParserStart: "MAIN"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
