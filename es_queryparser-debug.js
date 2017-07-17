(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _es_querystring = require('./es_querystring.js');

var _es_querystring2 = _interopRequireDefault(_es_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$('#data').on('input', function (event) {
  var result = new _es_querystring2.default(event.target.value);
  if (result.isValid()) {
    $('#error').html("");
    $('#results').html(JSON.stringify(result.results(), null, '\t'));
    $('#data').css({ borderColor: '#AAFFAA' });
  } else {
    if (result.isIncomplete()) {
      $('#error').html(result.input + " isn't a complete query");
      $('#data').css({ borderColor: '#FFFFAA' });
      $('#results').html("");
    } else {
      $('#error').html('"' + event.target.value + "\" has an error at " + (result.errorOffset() + 1));
      $('#data').css({ borderColor: '#FFAAAA' });
      $('#results').html("");
    }
  }
});

},{"./es_querystring.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grammar = require("./grammar.js");

var _grammar2 = _interopRequireDefault(_grammar);

var _nearley = require("nearley");

var _nearley2 = _interopRequireDefault(_nearley);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParseResult = function () {
  function ParseResult(input) {
    _classCallCheck(this, ParseResult);

    this.input = input;
    this.parser = new _nearley2.default.Parser(_grammar2.default.ParserRules, _grammar2.default.ParserStart);

    try {
      this.parser.feed(this.input);
    } catch (e) {
      this.error = e;
    }
  }

  _createClass(ParseResult, [{
    key: "results",
    value: function results() {
      return this.parser.results || [];
    }
  }, {
    key: "resultCount",
    value: function resultCount() {
      return this.results().length;
    }
  }, {
    key: "isIncomplete",
    value: function isIncomplete() {
      return !this.error && this.resultCount() == 0;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.resultCount() > 0;
    }
  }, {
    key: "errorOffset",
    value: function errorOffset() {
      return this.error.offset;
    }
  }]);

  return ParseResult;
}();

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


exports.default = ParseResult;

},{"./grammar.js":3,"nearley":4}],3:[function(require,module,exports){
"use strict";

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
    function id(x) {
        return x[0];
    }
    var grammar = {
        Lexer: undefined,
        ParserRules: [{ "name": "_$ebnf$1", "symbols": [] }, { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "__$ebnf$1", "symbols": ["wschar"] }, { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function postprocess(d) {
                return null;
            } }, { "name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id }, { "name": "MAIN", "symbols": ["_", "clause", "_"], "postprocess": function postprocess(data, location, reject) {
                return data[1][0];
            }
        }, { "name": "clause", "symbols": ["grouped"] }, { "name": "clause", "symbols": ["bracketed"] }, { "name": "clause", "symbols": ["simple"] }, { "name": "grouped", "symbols": ["clause", "__", "logical", "__", "clause"], "postprocess": function postprocess(data, location, reject) {
                return { type: "logical", offset: location, operator: data[2][0][0], children: [data[0][0], data[4][0]] };
            }
        }, { "name": "simple", "symbols": ["match"], "postprocess": function postprocess(data, location, reject) {
                return { type: "simple", offset: location, value: data[0][0] };
            }
        }, { "name": "bracketed", "symbols": [{ "literal": "(" }, "_", "clause", "_", { "literal": ")" }], "postprocess": function postprocess(data, location, reject) {
                return { type: "bracketed", offset: location, value: data[2][0] };
            }
        }, { "name": "logical", "symbols": ["logicaloperator"] }, { "name": "logicaloperator$string$1", "symbols": [{ "literal": "A" }, { "literal": "N" }, { "literal": "D" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "logicaloperator", "symbols": ["logicaloperator$string$1"] }, { "name": "logicaloperator$string$2", "symbols": [{ "literal": "O" }, { "literal": "R" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "logicaloperator", "symbols": ["logicaloperator$string$2"] }, { "name": "match", "symbols": ["field_and_string"] }, { "name": "match", "symbols": ["string"] }, { "name": "field_and_string", "symbols": ["field", { "literal": ":" }, "string"], "postprocess": function postprocess(data, location, reject) {
                return { type: 'field', offset: location, field: data[0], value: data[2].value };
            }
        }, { "name": "field$ebnf$1", "symbols": ["wordchars"] }, { "name": "field$ebnf$1", "symbols": ["field$ebnf$1", "wordchars"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "field", "symbols": ["field$ebnf$1"], "postprocess": function postprocess(data, location, reject) {
                return data[0].join("");
            }
        }, { "name": "string", "symbols": ["string_or_quoted_string"], "postprocess": function postprocess(data, location, reject) {
                return { type: 'field', offset: location, field: null, value: data[0][0] };
            }
        }, { "name": "string_or_quoted_string", "symbols": ["values"] }, { "name": "string_or_quoted_string", "symbols": ["quoted_string"] }, { "name": "values$ebnf$1", "symbols": ["value"] }, { "name": "values$ebnf$1", "symbols": ["values$ebnf$1", "value"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "values", "symbols": ["values$ebnf$1"], "postprocess": function postprocess(data, location, reject) {
                return { type: "literal", offset: location, value: data[0].join("") };
            }
        }, { "name": "quoted_string$ebnf$1", "symbols": ["value_or_space"] }, { "name": "quoted_string$ebnf$1", "symbols": ["quoted_string$ebnf$1", "value_or_space"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "quoted_string", "symbols": [{ "literal": "\"" }, "quoted_string$ebnf$1", { "literal": "\"" }], "postprocess": function postprocess(data, location, reject) {
                return { type: "quoted", offset: location, value: data[1].join("") };
            }
        }, { "name": "value", "symbols": ["wordchars"] }, { "name": "value", "symbols": [{ "literal": "\\" }, "escaped_value"] }, { "name": "value_or_space", "symbols": ["value"] }, { "name": "value_or_space", "symbols": [{ "literal": " " }] }, { "name": "escaped_value", "symbols": [/[\(\)]/] }, { "name": "wordchars", "symbols": [/[a-zA-Z0-9_-]/] }],
        ParserStart: "MAIN"
    };
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = grammar;
    } else {
        window.grammar = grammar;
    }
})();

},{}],4:[function(require,module,exports){
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

function Rule(name, symbols, postprocess) {
    this.id = ++Rule.highestId;
    this.name = name;
    this.symbols = symbols;        // a list of literal | regex class | nonterminal
    this.postprocess = postprocess;
    return this;
}
Rule.highestId = 0;

Rule.prototype.toString = function(withCursorAt) {
    function stringifySymbolSequence (e) {
        return e.literal ? JSON.stringify(e.literal) :
               e.type ? '%' + e.type : e.toString();
    }
    var symbolSequence = (typeof withCursorAt === "undefined")
                         ? this.symbols.map(stringifySymbolSequence).join(' ')
                         : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                             + " ● "
                             + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
    return this.name + " → " + symbolSequence;
}


// a State is a rule at a position from a given starting point in the input stream (reference)
function State(rule, dot, reference, wantedBy) {
    this.rule = rule;
    this.dot = dot;
    this.reference = reference;
    this.data = [];
    this.wantedBy = wantedBy;
    this.isComplete = this.dot === rule.symbols.length;
}

State.prototype.toString = function() {
    return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
};

State.prototype.nextState = function(child) {
    var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
    state.left = this;
    state.right = child;
    if (state.isComplete) {
        state.data = state.build();
    }
    return state;
};

State.prototype.build = function() {
    var children = [];
    var node = this;
    do {
        children.push(node.right.data);
        node = node.left;
    } while (node.left);
    children.reverse();
    return children;
};

State.prototype.finish = function() {
    if (this.rule.postprocess) {
        this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
    }
};


function Column(grammar, index) {
    this.grammar = grammar;
    this.index = index;
    this.states = [];
    this.wants = {}; // states indexed by the non-terminal they expect
    this.scannable = []; // list of states that expect a token
    this.completed = {}; // states that are nullable
}


Column.prototype.process = function(nextColumn) {
    var states = this.states;
    var wants = this.wants;
    var completed = this.completed;

    for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
        var state = states[w];

        if (state.isComplete) {
            state.finish();
            if (state.data !== Parser.fail) {
                // complete
                var wantedBy = state.wantedBy;
                for (var i = wantedBy.length; i--; ) { // this line is hot
                    var left = wantedBy[i];
                    this.complete(left, state);
                }

                // special-case nullables
                if (state.reference === this.index) {
                    // make sure future predictors of this rule get completed.
                    var exp = state.rule.name;
                    (this.completed[exp] = this.completed[exp] || []).push(state);
                }
            }

        } else {
            // queue scannable states
            var exp = state.rule.symbols[state.dot];
            if (typeof exp !== 'string') {
                this.scannable.push(state);
                continue;
            }

            // predict
            if (wants[exp]) {
                wants[exp].push(state);

                if (completed.hasOwnProperty(exp)) {
                    var nulls = completed[exp];
                    for (var i = 0; i < nulls.length; i++) {
                        var right = nulls[i];
                        this.complete(state, right);
                    }
                }
            } else {
                wants[exp] = [state];
                this.predict(exp);
            }
        }
    }
}

Column.prototype.predict = function(exp) {
    var rules = this.grammar.byName[exp] || [];

    for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        var wantedBy = this.wants[exp];
        var s = new State(r, 0, this.index, wantedBy);
        this.states.push(s);
    }
}

Column.prototype.complete = function(left, right) {
    var inp = right.rule.name;
    if (left.rule.symbols[left.dot] === inp) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }
}


function Grammar(rules, start) {
    this.rules = rules;
    this.start = start || this.rules[0].name;
    var byName = this.byName = {};
    this.rules.forEach(function(rule) {
        if (!byName.hasOwnProperty(rule.name)) {
            byName[rule.name] = [];
        }
        byName[rule.name].push(rule);
    });
}

// So we can allow passing (rules, start) directly to Parser for backwards compatibility
Grammar.fromCompiled = function(rules, start) {
    var lexer = rules.Lexer;
    if (rules.ParserStart) {
      start = rules.ParserStart;
      rules = rules.ParserRules;
    }
    var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
    var g = new Grammar(rules, start);
    g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
    return g;
}


function StreamLexer() {
  this.reset("");
}

StreamLexer.prototype.reset = function(data, state) {
    this.buffer = data;
    this.index = 0;
    this.line = state ? state.line : 1;
    this.lastLineBreak = state ? -state.col : 0;
}

StreamLexer.prototype.next = function() {
    if (this.index < this.buffer.length) {
        var ch = this.buffer[this.index++];
        if (ch === '\n') {
          this.line += 1;
          this.lastLineBreak = this.index;
        }
        return {value: ch};
    }
}

StreamLexer.prototype.save = function() {
  return {
    line: this.line,
    col: this.index - this.lastLineBreak,
  }
}

StreamLexer.prototype.formatError = function(token, message) {
    // nb. this gets called after consuming the offending token,
    // so the culprit is index-1
    var buffer = this.buffer;
    if (typeof buffer === 'string') {
        var nextLineBreak = buffer.indexOf('\n', this.index);
        if (nextLineBreak === -1) nextLineBreak = buffer.length;
        var line = buffer.substring(this.lastLineBreak, nextLineBreak)
        var col = this.index - this.lastLineBreak;
        message += " at line " + this.line + " col " + col + ":\n\n";
        message += "  " + line + "\n"
        message += "  " + Array(col).join(" ") + "^"
        return message;
    } else {
        return message + " at index " + (this.index - 1);
    }
}


function Parser(rules, start, options) {
    if (rules instanceof Grammar) {
        var grammar = rules;
        var options = start;
    } else {
        var grammar = Grammar.fromCompiled(rules, start);
    }
    this.grammar = grammar;

    // Read options
    this.options = {
        keepHistory: false,
        lexer: grammar.lexer || new StreamLexer,
    };
    for (var key in (options || {})) {
        this.options[key] = options[key];
    }

    // Setup lexer
    this.lexer = this.options.lexer;
    this.lexerState = undefined;

    // Setup a table
    var column = new Column(grammar, 0);
    var table = this.table = [column];

    // I could be expecting anything.
    column.wants[grammar.start] = [];
    column.predict(grammar.start);
    // TODO what if start rule is nullable?
    column.process();
    this.current = 0; // token index
}

// create a reserved token for indicating a parse fail
Parser.fail = {};

Parser.prototype.feed = function(chunk) {
    var lexer = this.lexer;
    lexer.reset(chunk, this.lexerState);

    var token;
    while (token = lexer.next()) {
        // We add new states to table[current+1]
        var column = this.table[this.current];

        // GC unused states
        if (!this.options.keepHistory) {
            delete this.table[this.current - 1];
        }

        var n = this.current + 1;
        var nextColumn = new Column(this.grammar, n);
        this.table.push(nextColumn);

        // Advance all tokens that expect the symbol
        var literal = token.value;
        var value = lexer.constructor === StreamLexer ? token.value : token;
        var scannable = column.scannable;
        for (var w = scannable.length; w--; ) {
            var state = scannable[w];
            var expect = state.rule.symbols[state.dot];
            // Try to consume the token
            // either regex or literal
            if (expect.test ? expect.test(value) :
                expect.type ? expect.type === token.type
                            : expect.literal === literal) {
                // Add it
                var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                nextColumn.states.push(next);
            }
        }

        // Next, for each of the rules, we either
        // (a) complete it, and try to see if the reference row expected that
        //     rule
        // (b) predict the next nonterminal it expects by adding that
        //     nonterminal's start state
        // To prevent duplication, we also keep track of rules we have already
        // added

        nextColumn.process();

        // If needed, throw an error:
        if (nextColumn.states.length === 0) {
            // No states at all! This is not good.
            var message = this.lexer.formatError(token, "invalid syntax") + "\n";
            message += "Unexpected " + (token.type ? token.type + " token: " : "");
            message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
            var err = new Error(message);
            err.offset = this.current;
            err.token = token;
            throw err;
        }

        // maybe save lexer state
        if (this.options.keepHistory) {
          column.lexerState = lexer.save()
        }

        this.current++;
    }
    if (column) {
      this.lexerState = lexer.save()
    }

    // Incrementally keep track of results
    this.results = this.finish();

    // Allow chaining, for whatever it's worth
    return this;
};

Parser.prototype.save = function() {
    var column = this.table[this.current];
    column.lexerState = this.lexerState;
    return column;
};

Parser.prototype.restore = function(column) {
    var index = column.index;
    this.current = index;
    this.table[index] = column;
    this.table.splice(index + 1);
    this.lexerState = column.lexerState;

    // Incrementally keep track of results
    this.results = this.finish();
};

// nb. deprecated: use save/restore instead!
Parser.prototype.rewind = function(index) {
    if (!this.options.keepHistory) {
        throw new Error('set option `keepHistory` to enable rewinding')
    }
    // nb. recall column (table) indicies fall between token indicies.
    //        col 0   --   token 0   --   col 1
    this.restore(this.table[index]);
};

Parser.prototype.finish = function() {
    // Return the possible parsings
    var considerations = [];
    var start = this.grammar.start;
    var column = this.table[this.table.length - 1]
    column.states.forEach(function (t) {
        if (t.rule.name === start
                && t.dot === t.rule.symbols.length
                && t.reference === 0
                && t.data !== Parser.fail) {
            considerations.push(t);
        }
    });
    return considerations.map(function(c) {return c.data; });
};

return {
    Parser: Parser,
    Grammar: Grammar,
    Rule: Rule,
};

}));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vLmpzIiwiZXNfcXVlcnlzdHJpbmcuanMiLCJncmFtbWFyLmpzIiwibm9kZV9tb2R1bGVzL25lYXJsZXkvbGliL25lYXJsZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxFQUFFLE9BQUYsRUFBVyxFQUFYLENBQWMsT0FBZCxFQUF1QixVQUFDLEtBQUQsRUFBVztBQUNoQyxNQUFJLFNBQVMsNkJBQWUsTUFBTSxNQUFOLENBQWEsS0FBNUIsQ0FBYjtBQUNBLE1BQUcsT0FBTyxPQUFQLEVBQUgsRUFBcUI7QUFDbkIsTUFBRSxRQUFGLEVBQVksSUFBWixDQUFpQixFQUFqQjtBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsS0FBSyxTQUFMLENBQWUsT0FBTyxPQUFQLEVBQWYsRUFBaUMsSUFBakMsRUFBdUMsSUFBdkMsQ0FBbkI7QUFDQSxNQUFFLE9BQUYsRUFBVyxHQUFYLENBQWUsRUFBQyxhQUFhLFNBQWQsRUFBZjtBQUNELEdBSkQsTUFJTztBQUNMLFFBQUcsT0FBTyxZQUFQLEVBQUgsRUFBMEI7QUFDeEIsUUFBRSxRQUFGLEVBQVksSUFBWixDQUFpQixPQUFPLEtBQVAsR0FBZSx5QkFBaEM7QUFDQSxRQUFFLE9BQUYsRUFBVyxHQUFYLENBQWUsRUFBQyxhQUFhLFNBQWQsRUFBZjtBQUNBLFFBQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsRUFBbkI7QUFDRCxLQUpELE1BSU87QUFDTCxRQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLE1BQU0sTUFBTSxNQUFOLENBQWEsS0FBbkIsR0FBMkIscUJBQTNCLElBQW9ELE9BQU8sV0FBUCxLQUF1QixDQUEzRSxDQUFqQjtBQUNBLFFBQUUsT0FBRixFQUFXLEdBQVgsQ0FBZSxFQUFDLGFBQWEsU0FBZCxFQUFmO0FBQ0EsUUFBRSxVQUFGLEVBQWMsSUFBZCxDQUFtQixFQUFuQjtBQUNEO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBQYXJzZVJzdWx0IGZyb20gJy4vZXNfcXVlcnlzdHJpbmcuanMnXG5cbiQoJyNkYXRhJykub24oJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gIGxldCByZXN1bHQgPSBuZXcgUGFyc2VSc3VsdChldmVudC50YXJnZXQudmFsdWUpXG4gIGlmKHJlc3VsdC5pc1ZhbGlkKCkpIHtcbiAgICAkKCcjZXJyb3InKS5odG1sKFwiXCIpXG4gICAgJCgnI3Jlc3VsdHMnKS5odG1sKEpTT04uc3RyaW5naWZ5KHJlc3VsdC5yZXN1bHRzKCksIG51bGwsICdcXHQnKSlcbiAgICAkKCcjZGF0YScpLmNzcyh7Ym9yZGVyQ29sb3I6ICcjQUFGRkFBJ30pXG4gIH0gZWxzZSB7XG4gICAgaWYocmVzdWx0LmlzSW5jb21wbGV0ZSgpKSB7XG4gICAgICAkKCcjZXJyb3InKS5odG1sKHJlc3VsdC5pbnB1dCArIFwiIGlzbid0IGEgY29tcGxldGUgcXVlcnlcIilcbiAgICAgICQoJyNkYXRhJykuY3NzKHtib3JkZXJDb2xvcjogJyNGRkZGQUEnfSlcbiAgICAgICQoJyNyZXN1bHRzJykuaHRtbChcIlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjZXJyb3InKS5odG1sKCdcIicgKyBldmVudC50YXJnZXQudmFsdWUgKyBcIlxcXCIgaGFzIGFuIGVycm9yIGF0IFwiICsgKHJlc3VsdC5lcnJvck9mZnNldCgpICsgMSkpXG4gICAgICAkKCcjZGF0YScpLmNzcyh7Ym9yZGVyQ29sb3I6ICcjRkZBQUFBJ30pXG4gICAgICAkKCcjcmVzdWx0cycpLmh0bWwoXCJcIilcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgZ3JhbW1hciBmcm9tIFwiLi9ncmFtbWFyLmpzXCJcbmltcG9ydCBuZWFybGV5IGZyb20gXCJuZWFybGV5XCJcblxuXG5jbGFzcyBQYXJzZVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0XG4gICAgdGhpcy5wYXJzZXIgPSBuZXcgbmVhcmxleS5QYXJzZXIoZ3JhbW1hci5QYXJzZXJSdWxlcywgZ3JhbW1hci5QYXJzZXJTdGFydClcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhcnNlci5mZWVkKHRoaXMuaW5wdXQpXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLmVycm9yID0gZVxuICAgIH1cbiAgfVxuXG4gIHJlc3VsdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VyLnJlc3VsdHMgfHwgW11cbiAgfVxuXG4gIHJlc3VsdENvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdHMoKS5sZW5ndGhcbiAgfVxuXG4gIGlzSW5jb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuZXJyb3IgJiYgdGhpcy5yZXN1bHRDb3VudCgpID09IDBcbiAgfVxuXG4gIGlzVmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0Q291bnQoKSA+IDBcbiAgfVxuXG4gIGVycm9yT2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLmVycm9yLm9mZnNldFxuICB9XG59XG5cbi8vIEhlcmUncyBob3cgTmVhcmxleSB3b3Jrczpcbi8qXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSkge1xuICB0cnkge1xuICAgIGlmIChwYXJzZSh2YWx1ZSkucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gXCJWYWxpZC5cIlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJOb3QgKnlldCogdmFsaWQuXCJcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBcIk5vdCB2YWxpZC5cIlxuICB9XG59XG4qL1xuZXhwb3J0IGRlZmF1bHQgUGFyc2VSZXN1bHRcbiIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cbnZhciBncmFtbWFyID0ge1xuICAgIExleGVyOiB1bmRlZmluZWQsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIl8kZWJuZiQxXCIsIFwid3NjaGFyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJfXCIsIFwic3ltYm9sc1wiOiBbXCJfJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIl9fJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wid3NjaGFyXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiX18kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJfXyRlYm5mJDFcIiwgXCJ3c2NoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIl9fXCIsIFwic3ltYm9sc1wiOiBbXCJfXyRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJ3c2NoYXJcIiwgXCJzeW1ib2xzXCI6IFsvWyBcXHRcXG5cXHZcXGZdL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJNQUlOXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIFwiY2xhdXNlXCIsIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gZGF0YVsxXVswXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJjbGF1c2VcIiwgXCJzeW1ib2xzXCI6IFtcImdyb3VwZWRcIl19LFxuICAgIHtcIm5hbWVcIjogXCJjbGF1c2VcIiwgXCJzeW1ib2xzXCI6IFtcImJyYWNrZXRlZFwiXX0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wic2ltcGxlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZ3JvdXBlZFwiLCBcInN5bWJvbHNcIjogW1wiY2xhdXNlXCIsIFwiX19cIiwgXCJsb2dpY2FsXCIsIFwiX19cIiwgXCJjbGF1c2VcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIHsgdHlwZTogXCJsb2dpY2FsXCIsIG9mZnNldDogbG9jYXRpb24sIG9wZXJhdG9yOiBkYXRhWzJdWzBdWzBdLCBjaGlsZHJlbjogW2RhdGFbMF1bMF0sIGRhdGFbNF1bMF1dIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwic2ltcGxlXCIsIFwic3ltYm9sc1wiOiBbXCJtYXRjaFwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiBcInNpbXBsZVwiLCBvZmZzZXQ6IGxvY2F0aW9uLCB2YWx1ZTogZGF0YVswXVswXSB9O1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImJyYWNrZXRlZFwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIihcIn0sIFwiX1wiLCBcImNsYXVzZVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKVwifV0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIHsgdHlwZTogXCJicmFja2V0ZWRcIiwgb2Zmc2V0OiBsb2NhdGlvbiwgdmFsdWU6IGRhdGFbMl1bMF0gfTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2FsXCIsIFwic3ltYm9sc1wiOiBbXCJsb2dpY2Fsb3BlcmF0b3JcIl19LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2Fsb3BlcmF0b3Ikc3RyaW5nJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJBXCJ9LCB7XCJsaXRlcmFsXCI6XCJOXCJ9LCB7XCJsaXRlcmFsXCI6XCJEXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2Fsb3BlcmF0b3JcIiwgXCJzeW1ib2xzXCI6IFtcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMVwiXX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIk9cIn0sIHtcImxpdGVyYWxcIjpcIlJcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvclwiLCBcInN5bWJvbHNcIjogW1wibG9naWNhbG9wZXJhdG9yJHN0cmluZyQyXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwibWF0Y2hcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkX2FuZF9zdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJtYXRjaFwiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGRfYW5kX3N0cmluZ1wiLCBcInN5bWJvbHNcIjogW1wiZmllbGRcIiwge1wibGl0ZXJhbFwiOlwiOlwifSwgXCJzdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIHsgdHlwZTogJ2ZpZWxkJywgb2Zmc2V0OiBsb2NhdGlvbiwgZmllbGQ6IGRhdGFbMF0sIHZhbHVlOiBkYXRhWzJdLnZhbHVlIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ3b3JkY2hhcnNcIl19LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkJGVibmYkMVwiLCBcIndvcmRjaGFyc1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGRcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gZGF0YVswXS5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZ1wiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIHsgdHlwZTogJ2ZpZWxkJywgb2Zmc2V0OiBsb2NhdGlvbiwgZmllbGQ6IG51bGwsIHZhbHVlOiBkYXRhWzBdWzBdIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlc1wiXX0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZ19vcl9xdW90ZWRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJxdW90ZWRfc3RyaW5nXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVzJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZXMkZWJuZiQxXCIsIFwidmFsdWVcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlc1wiLCBcInN5bWJvbHNcIjogW1widmFsdWVzJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiBcImxpdGVyYWxcIiwgb2Zmc2V0OiBsb2NhdGlvbiwgdmFsdWU6IGRhdGFbMF0uam9pbihcIlwiKSB9O1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZV9vcl9zcGFjZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCBcInZhbHVlX29yX3NwYWNlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJxdW90ZWRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcIlwifSwgXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCB7XCJsaXRlcmFsXCI6XCJcXFwiXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiBcInF1b3RlZFwiLCBvZmZzZXQ6IGxvY2F0aW9uLCB2YWx1ZTogZGF0YVsxXS5qb2luKFwiXCIpIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcIndvcmRjaGFyc1wiXX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcXFwifSwgXCJlc2NhcGVkX3ZhbHVlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVfb3Jfc3BhY2VcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVfb3Jfc3BhY2VcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIgXCJ9XX0sXG4gICAge1wibmFtZVwiOiBcImVzY2FwZWRfdmFsdWVcIiwgXCJzeW1ib2xzXCI6IFsvW1xcKFxcKV0vXX0sXG4gICAge1wibmFtZVwiOiBcIndvcmRjaGFyc1wiLCBcInN5bWJvbHNcIjogWy9bYS16QS1aMC05Xy1dL119XG5dXG4gICwgUGFyc2VyU3RhcnQ6IFwiTUFJTlwiXG59XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICBtb2R1bGUuZXhwb3J0cyA9IGdyYW1tYXI7XG59IGVsc2Uge1xuICAgd2luZG93LmdyYW1tYXIgPSBncmFtbWFyO1xufVxufSkoKTtcbiIsIihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QubmVhcmxleSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiBSdWxlKG5hbWUsIHN5bWJvbHMsIHBvc3Rwcm9jZXNzKSB7XG4gICAgdGhpcy5pZCA9ICsrUnVsZS5oaWdoZXN0SWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnN5bWJvbHMgPSBzeW1ib2xzOyAgICAgICAgLy8gYSBsaXN0IG9mIGxpdGVyYWwgfCByZWdleCBjbGFzcyB8IG5vbnRlcm1pbmFsXG4gICAgdGhpcy5wb3N0cHJvY2VzcyA9IHBvc3Rwcm9jZXNzO1xuICAgIHJldHVybiB0aGlzO1xufVxuUnVsZS5oaWdoZXN0SWQgPSAwO1xuXG5SdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKHdpdGhDdXJzb3JBdCkge1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlIChlKSB7XG4gICAgICAgIHJldHVybiBlLmxpdGVyYWwgPyBKU09OLnN0cmluZ2lmeShlLmxpdGVyYWwpIDpcbiAgICAgICAgICAgICAgIGUudHlwZSA/ICclJyArIGUudHlwZSA6IGUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdmFyIHN5bWJvbFNlcXVlbmNlID0gKHR5cGVvZiB3aXRoQ3Vyc29yQXQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN5bWJvbHMubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICA6ICggICB0aGlzLnN5bWJvbHMuc2xpY2UoMCwgd2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIOKXjyBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMuc3ltYm9scy5zbGljZSh3aXRoQ3Vyc29yQXQpLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpICAgICApO1xuICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIiDihpIgXCIgKyBzeW1ib2xTZXF1ZW5jZTtcbn1cblxuXG4vLyBhIFN0YXRlIGlzIGEgcnVsZSBhdCBhIHBvc2l0aW9uIGZyb20gYSBnaXZlbiBzdGFydGluZyBwb2ludCBpbiB0aGUgaW5wdXQgc3RyZWFtIChyZWZlcmVuY2UpXG5mdW5jdGlvbiBTdGF0ZShydWxlLCBkb3QsIHJlZmVyZW5jZSwgd2FudGVkQnkpIHtcbiAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgIHRoaXMuZG90ID0gZG90O1xuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMud2FudGVkQnkgPSB3YW50ZWRCeTtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSB0aGlzLmRvdCA9PT0gcnVsZS5zeW1ib2xzLmxlbmd0aDtcbn1cblxuU3RhdGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwie1wiICsgdGhpcy5ydWxlLnRvU3RyaW5nKHRoaXMuZG90KSArIFwifSwgZnJvbTogXCIgKyAodGhpcy5yZWZlcmVuY2UgfHwgMCk7XG59O1xuXG5TdGF0ZS5wcm90b3R5cGUubmV4dFN0YXRlID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUodGhpcy5ydWxlLCB0aGlzLmRvdCArIDEsIHRoaXMucmVmZXJlbmNlLCB0aGlzLndhbnRlZEJ5KTtcbiAgICBzdGF0ZS5sZWZ0ID0gdGhpcztcbiAgICBzdGF0ZS5yaWdodCA9IGNoaWxkO1xuICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgIHN0YXRlLmRhdGEgPSBzdGF0ZS5idWlsZCgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59O1xuXG5TdGF0ZS5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgbm9kZSA9IHRoaXM7XG4gICAgZG8ge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUucmlnaHQuZGF0YSk7XG4gICAgICAgIG5vZGUgPSBub2RlLmxlZnQ7XG4gICAgfSB3aGlsZSAobm9kZS5sZWZ0KTtcbiAgICBjaGlsZHJlbi5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuU3RhdGUucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJ1bGUucG9zdHByb2Nlc3MpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5ydWxlLnBvc3Rwcm9jZXNzKHRoaXMuZGF0YSwgdGhpcy5yZWZlcmVuY2UsIFBhcnNlci5mYWlsKTtcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIENvbHVtbihncmFtbWFyLCBpbmRleCkge1xuICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVzID0gW107XG4gICAgdGhpcy53YW50cyA9IHt9OyAvLyBzdGF0ZXMgaW5kZXhlZCBieSB0aGUgbm9uLXRlcm1pbmFsIHRoZXkgZXhwZWN0XG4gICAgdGhpcy5zY2FubmFibGUgPSBbXTsgLy8gbGlzdCBvZiBzdGF0ZXMgdGhhdCBleHBlY3QgYSB0b2tlblxuICAgIHRoaXMuY29tcGxldGVkID0ge307IC8vIHN0YXRlcyB0aGF0IGFyZSBudWxsYWJsZVxufVxuXG5cbkNvbHVtbi5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKG5leHRDb2x1bW4pIHtcbiAgICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gICAgdmFyIHdhbnRzID0gdGhpcy53YW50cztcbiAgICB2YXIgY29tcGxldGVkID0gdGhpcy5jb21wbGV0ZWQ7XG5cbiAgICBmb3IgKHZhciB3ID0gMDsgdyA8IHN0YXRlcy5sZW5ndGg7IHcrKykgeyAvLyBuYi4gd2UgcHVzaCgpIGR1cmluZyBpdGVyYXRpb25cbiAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW3ddO1xuXG4gICAgICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICBzdGF0ZS5maW5pc2goKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5kYXRhICE9PSBQYXJzZXIuZmFpbCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgdmFyIHdhbnRlZEJ5ID0gc3RhdGUud2FudGVkQnk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHdhbnRlZEJ5Lmxlbmd0aDsgaS0tOyApIHsgLy8gdGhpcyBsaW5lIGlzIGhvdFxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IHdhbnRlZEJ5W2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKGxlZnQsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsLWNhc2UgbnVsbGFibGVzXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlZmVyZW5jZSA9PT0gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgZnV0dXJlIHByZWRpY3RvcnMgb2YgdGhpcyBydWxlIGdldCBjb21wbGV0ZWQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBzdGF0ZS5ydWxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNvbXBsZXRlZFtleHBdID0gdGhpcy5jb21wbGV0ZWRbZXhwXSB8fCBbXSkucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBxdWV1ZSBzY2FubmFibGUgc3RhdGVzXG4gICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4cCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5uYWJsZS5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcHJlZGljdFxuICAgICAgICAgICAgaWYgKHdhbnRzW2V4cF0pIHtcbiAgICAgICAgICAgICAgICB3YW50c1tleHBdLnB1c2goc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5oYXNPd25Qcm9wZXJ0eShleHApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudWxscyA9IGNvbXBsZXRlZFtleHBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoc3RhdGUsIHJpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2FudHNbZXhwXSA9IFtzdGF0ZV07XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0KGV4cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkNvbHVtbi5wcm90b3R5cGUucHJlZGljdCA9IGZ1bmN0aW9uKGV4cCkge1xuICAgIHZhciBydWxlcyA9IHRoaXMuZ3JhbW1hci5ieU5hbWVbZXhwXSB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSBydWxlc1tpXTtcbiAgICAgICAgdmFyIHdhbnRlZEJ5ID0gdGhpcy53YW50c1tleHBdO1xuICAgICAgICB2YXIgcyA9IG5ldyBTdGF0ZShyLCAwLCB0aGlzLmluZGV4LCB3YW50ZWRCeSk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2gocyk7XG4gICAgfVxufVxuXG5Db2x1bW4ucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICB2YXIgaW5wID0gcmlnaHQucnVsZS5uYW1lO1xuICAgIGlmIChsZWZ0LnJ1bGUuc3ltYm9sc1tsZWZ0LmRvdF0gPT09IGlucCkge1xuICAgICAgICB2YXIgY29weSA9IGxlZnQubmV4dFN0YXRlKHJpZ2h0KTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChjb3B5KTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gR3JhbW1hcihydWxlcywgc3RhcnQpIHtcbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0IHx8IHRoaXMucnVsZXNbMF0ubmFtZTtcbiAgICB2YXIgYnlOYW1lID0gdGhpcy5ieU5hbWUgPSB7fTtcbiAgICB0aGlzLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICBpZiAoIWJ5TmFtZS5oYXNPd25Qcm9wZXJ0eShydWxlLm5hbWUpKSB7XG4gICAgICAgICAgICBieU5hbWVbcnVsZS5uYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGJ5TmFtZVtydWxlLm5hbWVdLnB1c2gocnVsZSk7XG4gICAgfSk7XG59XG5cbi8vIFNvIHdlIGNhbiBhbGxvdyBwYXNzaW5nIChydWxlcywgc3RhcnQpIGRpcmVjdGx5IHRvIFBhcnNlciBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbkdyYW1tYXIuZnJvbUNvbXBpbGVkID0gZnVuY3Rpb24ocnVsZXMsIHN0YXJ0KSB7XG4gICAgdmFyIGxleGVyID0gcnVsZXMuTGV4ZXI7XG4gICAgaWYgKHJ1bGVzLlBhcnNlclN0YXJ0KSB7XG4gICAgICBzdGFydCA9IHJ1bGVzLlBhcnNlclN0YXJ0O1xuICAgICAgcnVsZXMgPSBydWxlcy5QYXJzZXJSdWxlcztcbiAgICB9XG4gICAgdmFyIHJ1bGVzID0gcnVsZXMubWFwKGZ1bmN0aW9uIChyKSB7IHJldHVybiAobmV3IFJ1bGUoci5uYW1lLCByLnN5bWJvbHMsIHIucG9zdHByb2Nlc3MpKTsgfSk7XG4gICAgdmFyIGcgPSBuZXcgR3JhbW1hcihydWxlcywgc3RhcnQpO1xuICAgIGcubGV4ZXIgPSBsZXhlcjsgLy8gbmIuIHN0b3JpbmcgbGV4ZXIgb24gR3JhbW1hciBpcyBpZmZ5LCBidXQgdW5hdm9pZGFibGVcbiAgICByZXR1cm4gZztcbn1cblxuXG5mdW5jdGlvbiBTdHJlYW1MZXhlcigpIHtcbiAgdGhpcy5yZXNldChcIlwiKTtcbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oZGF0YSwgc3RhdGUpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGRhdGE7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5saW5lID0gc3RhdGUgPyBzdGF0ZS5saW5lIDogMTtcbiAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSBzdGF0ZSA/IC1zdGF0ZS5jb2wgOiAwO1xufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaCA9IHRoaXMuYnVmZmVyW3RoaXMuaW5kZXgrK107XG4gICAgICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgICAgICB0aGlzLmxpbmUgKz0gMTtcbiAgICAgICAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSB0aGlzLmluZGV4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGNofTtcbiAgICB9XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbGluZTogdGhpcy5saW5lLFxuICAgIGNvbDogdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhayxcbiAgfVxufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbih0b2tlbiwgbWVzc2FnZSkge1xuICAgIC8vIG5iLiB0aGlzIGdldHMgY2FsbGVkIGFmdGVyIGNvbnN1bWluZyB0aGUgb2ZmZW5kaW5nIHRva2VuLFxuICAgIC8vIHNvIHRoZSBjdWxwcml0IGlzIGluZGV4LTFcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKHR5cGVvZiBidWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmluZGV4T2YoJ1xcbicsIHRoaXMuaW5kZXgpO1xuICAgICAgICBpZiAobmV4dExpbmVCcmVhayA9PT0gLTEpIG5leHRMaW5lQnJlYWsgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB2YXIgbGluZSA9IGJ1ZmZlci5zdWJzdHJpbmcodGhpcy5sYXN0TGluZUJyZWFrLCBuZXh0TGluZUJyZWFrKVxuICAgICAgICB2YXIgY29sID0gdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhaztcbiAgICAgICAgbWVzc2FnZSArPSBcIiBhdCBsaW5lIFwiICsgdGhpcy5saW5lICsgXCIgY29sIFwiICsgY29sICsgXCI6XFxuXFxuXCI7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgbGluZSArIFwiXFxuXCJcbiAgICAgICAgbWVzc2FnZSArPSBcIiAgXCIgKyBBcnJheShjb2wpLmpvaW4oXCIgXCIpICsgXCJeXCJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UgKyBcIiBhdCBpbmRleCBcIiArICh0aGlzLmluZGV4IC0gMSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIFBhcnNlcihydWxlcywgc3RhcnQsIG9wdGlvbnMpIHtcbiAgICBpZiAocnVsZXMgaW5zdGFuY2VvZiBHcmFtbWFyKSB7XG4gICAgICAgIHZhciBncmFtbWFyID0gcnVsZXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gc3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGdyYW1tYXIgPSBHcmFtbWFyLmZyb21Db21waWxlZChydWxlcywgc3RhcnQpO1xuICAgIH1cbiAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuXG4gICAgLy8gUmVhZCBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBrZWVwSGlzdG9yeTogZmFsc2UsXG4gICAgICAgIGxleGVyOiBncmFtbWFyLmxleGVyIHx8IG5ldyBTdHJlYW1MZXhlcixcbiAgICB9O1xuICAgIGZvciAodmFyIGtleSBpbiAob3B0aW9ucyB8fCB7fSkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgLy8gU2V0dXAgbGV4ZXJcbiAgICB0aGlzLmxleGVyID0gdGhpcy5vcHRpb25zLmxleGVyO1xuICAgIHRoaXMubGV4ZXJTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgIC8vIFNldHVwIGEgdGFibGVcbiAgICB2YXIgY29sdW1uID0gbmV3IENvbHVtbihncmFtbWFyLCAwKTtcbiAgICB2YXIgdGFibGUgPSB0aGlzLnRhYmxlID0gW2NvbHVtbl07XG5cbiAgICAvLyBJIGNvdWxkIGJlIGV4cGVjdGluZyBhbnl0aGluZy5cbiAgICBjb2x1bW4ud2FudHNbZ3JhbW1hci5zdGFydF0gPSBbXTtcbiAgICBjb2x1bW4ucHJlZGljdChncmFtbWFyLnN0YXJ0KTtcbiAgICAvLyBUT0RPIHdoYXQgaWYgc3RhcnQgcnVsZSBpcyBudWxsYWJsZT9cbiAgICBjb2x1bW4ucHJvY2VzcygpO1xuICAgIHRoaXMuY3VycmVudCA9IDA7IC8vIHRva2VuIGluZGV4XG59XG5cbi8vIGNyZWF0ZSBhIHJlc2VydmVkIHRva2VuIGZvciBpbmRpY2F0aW5nIGEgcGFyc2UgZmFpbFxuUGFyc2VyLmZhaWwgPSB7fTtcblxuUGFyc2VyLnByb3RvdHlwZS5mZWVkID0gZnVuY3Rpb24oY2h1bmspIHtcbiAgICB2YXIgbGV4ZXIgPSB0aGlzLmxleGVyO1xuICAgIGxleGVyLnJlc2V0KGNodW5rLCB0aGlzLmxleGVyU3RhdGUpO1xuXG4gICAgdmFyIHRva2VuO1xuICAgIHdoaWxlICh0b2tlbiA9IGxleGVyLm5leHQoKSkge1xuICAgICAgICAvLyBXZSBhZGQgbmV3IHN0YXRlcyB0byB0YWJsZVtjdXJyZW50KzFdXG4gICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG5cbiAgICAgICAgLy8gR0MgdW51c2VkIHN0YXRlc1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGFibGVbdGhpcy5jdXJyZW50IC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbiA9IHRoaXMuY3VycmVudCArIDE7XG4gICAgICAgIHZhciBuZXh0Q29sdW1uID0gbmV3IENvbHVtbih0aGlzLmdyYW1tYXIsIG4pO1xuICAgICAgICB0aGlzLnRhYmxlLnB1c2gobmV4dENvbHVtbik7XG5cbiAgICAgICAgLy8gQWR2YW5jZSBhbGwgdG9rZW5zIHRoYXQgZXhwZWN0IHRoZSBzeW1ib2xcbiAgICAgICAgdmFyIGxpdGVyYWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIHZhbHVlID0gbGV4ZXIuY29uc3RydWN0b3IgPT09IFN0cmVhbUxleGVyID8gdG9rZW4udmFsdWUgOiB0b2tlbjtcbiAgICAgICAgdmFyIHNjYW5uYWJsZSA9IGNvbHVtbi5zY2FubmFibGU7XG4gICAgICAgIGZvciAodmFyIHcgPSBzY2FubmFibGUubGVuZ3RoOyB3LS07ICkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gc2Nhbm5hYmxlW3ddO1xuICAgICAgICAgICAgdmFyIGV4cGVjdCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN1bWUgdGhlIHRva2VuXG4gICAgICAgICAgICAvLyBlaXRoZXIgcmVnZXggb3IgbGl0ZXJhbFxuICAgICAgICAgICAgaWYgKGV4cGVjdC50ZXN0ID8gZXhwZWN0LnRlc3QodmFsdWUpIDpcbiAgICAgICAgICAgICAgICBleHBlY3QudHlwZSA/IGV4cGVjdC50eXBlID09PSB0b2tlbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBleHBlY3QubGl0ZXJhbCA9PT0gbGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBpdFxuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gc3RhdGUubmV4dFN0YXRlKHtkYXRhOiB2YWx1ZSwgdG9rZW46IHRva2VuLCBpc1Rva2VuOiB0cnVlLCByZWZlcmVuY2U6IG4gLSAxfSk7XG4gICAgICAgICAgICAgICAgbmV4dENvbHVtbi5zdGF0ZXMucHVzaChuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5leHQsIGZvciBlYWNoIG9mIHRoZSBydWxlcywgd2UgZWl0aGVyXG4gICAgICAgIC8vIChhKSBjb21wbGV0ZSBpdCwgYW5kIHRyeSB0byBzZWUgaWYgdGhlIHJlZmVyZW5jZSByb3cgZXhwZWN0ZWQgdGhhdFxuICAgICAgICAvLyAgICAgcnVsZVxuICAgICAgICAvLyAoYikgcHJlZGljdCB0aGUgbmV4dCBub250ZXJtaW5hbCBpdCBleHBlY3RzIGJ5IGFkZGluZyB0aGF0XG4gICAgICAgIC8vICAgICBub250ZXJtaW5hbCdzIHN0YXJ0IHN0YXRlXG4gICAgICAgIC8vIFRvIHByZXZlbnQgZHVwbGljYXRpb24sIHdlIGFsc28ga2VlcCB0cmFjayBvZiBydWxlcyB3ZSBoYXZlIGFscmVhZHlcbiAgICAgICAgLy8gYWRkZWRcblxuICAgICAgICBuZXh0Q29sdW1uLnByb2Nlc3MoKTtcblxuICAgICAgICAvLyBJZiBuZWVkZWQsIHRocm93IGFuIGVycm9yOlxuICAgICAgICBpZiAobmV4dENvbHVtbi5zdGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBObyBzdGF0ZXMgYXQgYWxsISBUaGlzIGlzIG5vdCBnb29kLlxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmxleGVyLmZvcm1hdEVycm9yKHRva2VuLCBcImludmFsaWQgc3ludGF4XCIpICsgXCJcXG5cIjtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJVbmV4cGVjdGVkIFwiICsgKHRva2VuLnR5cGUgPyB0b2tlbi50eXBlICsgXCIgdG9rZW46IFwiIDogXCJcIik7XG4gICAgICAgICAgICBtZXNzYWdlICs9IEpTT04uc3RyaW5naWZ5KHRva2VuLnZhbHVlICE9PSB1bmRlZmluZWQgPyB0b2tlbi52YWx1ZSA6IHRva2VuKSArIFwiXFxuXCI7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgZXJyLm9mZnNldCA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgICAgIGVyci50b2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWF5YmUgc2F2ZSBsZXhlciBzdGF0ZVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgICAgY29sdW1uLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudCsrO1xuICAgIH1cbiAgICBpZiAoY29sdW1uKSB7XG4gICAgICB0aGlzLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICB9XG5cbiAgICAvLyBJbmNyZW1lbnRhbGx5IGtlZXAgdHJhY2sgb2YgcmVzdWx0c1xuICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZmluaXNoKCk7XG5cbiAgICAvLyBBbGxvdyBjaGFpbmluZywgZm9yIHdoYXRldmVyIGl0J3Mgd29ydGhcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblBhcnNlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG4gICAgY29sdW1uLmxleGVyU3RhdGUgPSB0aGlzLmxleGVyU3RhdGU7XG4gICAgcmV0dXJuIGNvbHVtbjtcbn07XG5cblBhcnNlci5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uKGNvbHVtbikge1xuICAgIHZhciBpbmRleCA9IGNvbHVtbi5pbmRleDtcbiAgICB0aGlzLmN1cnJlbnQgPSBpbmRleDtcbiAgICB0aGlzLnRhYmxlW2luZGV4XSA9IGNvbHVtbjtcbiAgICB0aGlzLnRhYmxlLnNwbGljZShpbmRleCArIDEpO1xuICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGNvbHVtbi5sZXhlclN0YXRlO1xuXG4gICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xufTtcblxuLy8gbmIuIGRlcHJlY2F0ZWQ6IHVzZSBzYXZlL3Jlc3RvcmUgaW5zdGVhZCFcblBhcnNlci5wcm90b3R5cGUucmV3aW5kID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldCBvcHRpb24gYGtlZXBIaXN0b3J5YCB0byBlbmFibGUgcmV3aW5kaW5nJylcbiAgICB9XG4gICAgLy8gbmIuIHJlY2FsbCBjb2x1bW4gKHRhYmxlKSBpbmRpY2llcyBmYWxsIGJldHdlZW4gdG9rZW4gaW5kaWNpZXMuXG4gICAgLy8gICAgICAgIGNvbCAwICAgLS0gICB0b2tlbiAwICAgLS0gICBjb2wgMVxuICAgIHRoaXMucmVzdG9yZSh0aGlzLnRhYmxlW2luZGV4XSk7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJldHVybiB0aGUgcG9zc2libGUgcGFyc2luZ3NcbiAgICB2YXIgY29uc2lkZXJhdGlvbnMgPSBbXTtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLmdyYW1tYXIuc3RhcnQ7XG4gICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy50YWJsZS5sZW5ndGggLSAxXVxuICAgIGNvbHVtbi5zdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodC5ydWxlLm5hbWUgPT09IHN0YXJ0XG4gICAgICAgICAgICAgICAgJiYgdC5kb3QgPT09IHQucnVsZS5zeW1ib2xzLmxlbmd0aFxuICAgICAgICAgICAgICAgICYmIHQucmVmZXJlbmNlID09PSAwXG4gICAgICAgICAgICAgICAgJiYgdC5kYXRhICE9PSBQYXJzZXIuZmFpbCkge1xuICAgICAgICAgICAgY29uc2lkZXJhdGlvbnMucHVzaCh0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25zaWRlcmF0aW9ucy5tYXAoZnVuY3Rpb24oYykge3JldHVybiBjLmRhdGE7IH0pO1xufTtcblxucmV0dXJuIHtcbiAgICBQYXJzZXI6IFBhcnNlcixcbiAgICBHcmFtbWFyOiBHcmFtbWFyLFxuICAgIFJ1bGU6IFJ1bGUsXG59O1xuXG59KSk7XG4iXX0=
