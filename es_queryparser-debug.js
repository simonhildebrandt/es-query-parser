(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _es_querystring = require('./es_querystring.js');

$('#data').on('input', function (event) {
  if ((0, _es_querystring.validate)(event.target.value)) {
    $('#error').html("");
    $('#results').html(JSON.stringify((0, _es_querystring.parse)(event.target.value).results, null, '\t'));
    console.log((0, _es_querystring.parse)(event.target.value).results);
  } else {
    $('#error').html(event.target.value + " isn't a valid query");
    $('#results').html("");
  }
});

},{"./es_querystring.js":2}],2:[function(require,module,exports){
"use strict";

var _grammar = require("./grammar.js");

var _grammar2 = _interopRequireDefault(_grammar);

var _nearley = require("nearley");

var _nearley2 = _interopRequireDefault(_nearley);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(value) {
  var p = new _nearley2.default.Parser(_grammar2.default.ParserRules, _grammar2.default.ParserStart);
  return p.feed(value);
}

function validate(value) {
  try {
    return parse(value).results.length > 0;
  } catch (e) {
    return false;
  }
}

function incomplete(value) {
  try {
    return parse(value).results.length == 0;
  } catch (e) {
    return false;
  }
}

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

module.exports = { parse: parse, validate: validate, incomplete: incomplete };

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
                return ["logical", data[2][0][0], data[0][0], data[4][0]];
            }
        }, { "name": "simple", "symbols": ["match"], "postprocess": function postprocess(data, location, reject) {
                return ["simple", data[0][0]];
            }
        }, { "name": "bracketed", "symbols": [{ "literal": "(" }, "_", "clause", "_", { "literal": ")" }], "postprocess": function postprocess(data, location, reject) {
                return ["bracketed", data[2][0]];
            }
        }, { "name": "logical", "symbols": ["logicaloperator"] }, { "name": "logicaloperator$string$1", "symbols": [{ "literal": "A" }, { "literal": "N" }, { "literal": "D" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "logicaloperator", "symbols": ["logicaloperator$string$1"] }, { "name": "logicaloperator$string$2", "symbols": [{ "literal": "O" }, { "literal": "R" }], "postprocess": function joiner(d) {
                return d.join('');
            } }, { "name": "logicaloperator", "symbols": ["logicaloperator$string$2"] }, { "name": "match", "symbols": ["field_and_string"] }, { "name": "match", "symbols": ["string"] }, { "name": "field_and_string", "symbols": ["field", { "literal": ":" }, "string"], "postprocess": function postprocess(data, location, reject) {
                return ["attribute", data[0], data[2][1]];
            }
        }, { "name": "field$ebnf$1", "symbols": ["wordchars"] }, { "name": "field$ebnf$1", "symbols": ["field$ebnf$1", "wordchars"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "field", "symbols": ["field$ebnf$1"], "postprocess": function postprocess(data, location, reject) {
                return data[0].join("");
            }
        }, { "name": "string", "symbols": ["string_or_quoted_string"], "postprocess": function postprocess(data, location, reject) {
                return ["attribute", data[0][0], "default"];
            }
        }, { "name": "string_or_quoted_string", "symbols": ["values"] }, { "name": "string_or_quoted_string", "symbols": ["quoted_string"] }, { "name": "values$ebnf$1", "symbols": ["value"] }, { "name": "values$ebnf$1", "symbols": ["values$ebnf$1", "value"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "values", "symbols": ["values$ebnf$1"], "postprocess": function postprocess(data, location, reject) {
                return ["literal", data[0].join("")];
            }
        }, { "name": "quoted_string$ebnf$1", "symbols": ["value_or_space"] }, { "name": "quoted_string$ebnf$1", "symbols": ["quoted_string$ebnf$1", "value_or_space"], "postprocess": function arrpush(d) {
                return d[0].concat([d[1]]);
            } }, { "name": "quoted_string", "symbols": [{ "literal": "\"" }, "quoted_string$ebnf$1", { "literal": "\"" }], "postprocess": function postprocess(data, location, reject) {
                return ["quoted", data[1].join("")];
            }
        }, { "name": "value", "symbols": ["wordchars"] }, { "name": "value", "symbols": [{ "literal": "\\" }, "escaped_value"] }, { "name": "value_or_space", "symbols": ["value"] }, { "name": "value_or_space", "symbols": ["__"] }, { "name": "escaped_value", "symbols": [/[\(\)]/] }, { "name": "wordchars", "symbols": [/[a-zA-Z0-9]/] }],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vLmpzIiwiZXNfcXVlcnlzdHJpbmcuanMiLCJncmFtbWFyLmpzIiwibm9kZV9tb2R1bGVzL25lYXJsZXkvbGliL25lYXJsZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLEVBQUUsT0FBRixFQUFXLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFVBQUMsS0FBRCxFQUFXO0FBQ2hDLE1BQUcsOEJBQVMsTUFBTSxNQUFOLENBQWEsS0FBdEIsQ0FBSCxFQUFpQztBQUMvQixNQUFFLFFBQUYsRUFBWSxJQUFaLENBQWlCLEVBQWpCO0FBQ0EsTUFBRSxVQUFGLEVBQWMsSUFBZCxDQUFtQixLQUFLLFNBQUwsQ0FBZSwyQkFBTSxNQUFNLE1BQU4sQ0FBYSxLQUFuQixFQUEwQixPQUF6QyxFQUFrRCxJQUFsRCxFQUF3RCxJQUF4RCxDQUFuQjtBQUNBLFlBQVEsR0FBUixDQUFZLDJCQUFNLE1BQU0sTUFBTixDQUFhLEtBQW5CLEVBQTBCLE9BQXRDO0FBQ0QsR0FKRCxNQUlPO0FBQ0wsTUFBRSxRQUFGLEVBQVksSUFBWixDQUFpQixNQUFNLE1BQU4sQ0FBYSxLQUFiLEdBQXFCLHNCQUF0QztBQUNBLE1BQUUsVUFBRixFQUFjLElBQWQsQ0FBbUIsRUFBbkI7QUFDRDtBQUNGLENBVEQ7Ozs7O0FDRkE7Ozs7QUFDQTs7Ozs7O0FBR0EsU0FBUyxLQUFULENBQWUsS0FBZixFQUFzQjtBQUNwQixNQUFJLElBQUksSUFBSSxrQkFBUSxNQUFaLENBQW1CLGtCQUFRLFdBQTNCLEVBQXdDLGtCQUFRLFdBQWhELENBQVI7QUFDQSxTQUFPLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBUDtBQUNEOztBQUVELFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUN2QixNQUFJO0FBQ0YsV0FBTyxNQUFNLEtBQU4sRUFBYSxPQUFiLENBQXFCLE1BQXJCLEdBQThCLENBQXJDO0FBQ0Qs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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgcGFyc2UsIHZhbGlkYXRlIH0gZnJvbSAnLi9lc19xdWVyeXN0cmluZy5qcydcblxuJCgnI2RhdGEnKS5vbignaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgaWYodmFsaWRhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKSkge1xuICAgICQoJyNlcnJvcicpLmh0bWwoXCJcIilcbiAgICAkKCcjcmVzdWx0cycpLmh0bWwoSlNPTi5zdHJpbmdpZnkocGFyc2UoZXZlbnQudGFyZ2V0LnZhbHVlKS5yZXN1bHRzLCBudWxsLCAnXFx0JykpXG4gICAgY29uc29sZS5sb2cocGFyc2UoZXZlbnQudGFyZ2V0LnZhbHVlKS5yZXN1bHRzKVxuICB9IGVsc2Uge1xuICAgICQoJyNlcnJvcicpLmh0bWwoZXZlbnQudGFyZ2V0LnZhbHVlICsgXCIgaXNuJ3QgYSB2YWxpZCBxdWVyeVwiKVxuICAgICQoJyNyZXN1bHRzJykuaHRtbChcIlwiKVxuICB9XG59KVxuIiwiaW1wb3J0IGdyYW1tYXIgZnJvbSBcIi4vZ3JhbW1hci5qc1wiXG5pbXBvcnQgbmVhcmxleSBmcm9tIFwibmVhcmxleVwiXG5cblxuZnVuY3Rpb24gcGFyc2UodmFsdWUpIHtcbiAgdmFyIHAgPSBuZXcgbmVhcmxleS5QYXJzZXIoZ3JhbW1hci5QYXJzZXJSdWxlcywgZ3JhbW1hci5QYXJzZXJTdGFydClcbiAgcmV0dXJuIHAuZmVlZCh2YWx1ZSlcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcGFyc2UodmFsdWUpLnJlc3VsdHMubGVuZ3RoID4gMFxuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmNvbXBsZXRlKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbHVlKS5yZXN1bHRzLmxlbmd0aCA9PSAwXG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8vIEhlcmUncyBob3cgTmVhcmxleSB3b3Jrczpcbi8qXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSkge1xuICB0cnkge1xuICAgIGlmIChwYXJzZSh2YWx1ZSkucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gXCJWYWxpZC5cIlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJOb3QgKnlldCogdmFsaWQuXCJcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBcIk5vdCB2YWxpZC5cIlxuICB9XG59XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcGFyc2UsIHZhbGlkYXRlLCBpbmNvbXBsZXRlIH1cbiIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXlcbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7cmV0dXJuIHhbMF07IH1cbnZhciBncmFtbWFyID0ge1xuICAgIExleGVyOiB1bmRlZmluZWQsXG4gICAgUGFyc2VyUnVsZXM6IFtcbiAgICB7XCJuYW1lXCI6IFwiXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwiXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIl8kZWJuZiQxXCIsIFwid3NjaGFyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJfXCIsIFwic3ltYm9sc1wiOiBbXCJfJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIl9fJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wid3NjaGFyXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiX18kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJfXyRlYm5mJDFcIiwgXCJ3c2NoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIl9fXCIsIFwic3ltYm9sc1wiOiBbXCJfXyRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJ3c2NoYXJcIiwgXCJzeW1ib2xzXCI6IFsvWyBcXHRcXG5cXHZcXGZdL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJNQUlOXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIFwiY2xhdXNlXCIsIFwiX1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gZGF0YVsxXVswXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJjbGF1c2VcIiwgXCJzeW1ib2xzXCI6IFtcImdyb3VwZWRcIl19LFxuICAgIHtcIm5hbWVcIjogXCJjbGF1c2VcIiwgXCJzeW1ib2xzXCI6IFtcImJyYWNrZXRlZFwiXX0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wic2ltcGxlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZ3JvdXBlZFwiLCBcInN5bWJvbHNcIjogW1wiY2xhdXNlXCIsIFwiX19cIiwgXCJsb2dpY2FsXCIsIFwiX19cIiwgXCJjbGF1c2VcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFsgXCJsb2dpY2FsXCIsIGRhdGFbMl1bMF1bMF0sIGRhdGFbMF1bMF0sIGRhdGFbNF1bMF0gXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJzaW1wbGVcIiwgXCJzeW1ib2xzXCI6IFtcIm1hdGNoXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBbIFwic2ltcGxlXCIsIGRhdGFbMF1bMF0gXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJicmFja2V0ZWRcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIoXCJ9LCBcIl9cIiwgXCJjbGF1c2VcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBbIFwiYnJhY2tldGVkXCIsIGRhdGFbMl1bMF0gXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2FsXCIsIFwic3ltYm9sc1wiOiBbXCJsb2dpY2Fsb3BlcmF0b3JcIl19LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2Fsb3BlcmF0b3Ikc3RyaW5nJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJBXCJ9LCB7XCJsaXRlcmFsXCI6XCJOXCJ9LCB7XCJsaXRlcmFsXCI6XCJEXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJsb2dpY2Fsb3BlcmF0b3JcIiwgXCJzeW1ib2xzXCI6IFtcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMVwiXX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIk9cIn0sIHtcImxpdGVyYWxcIjpcIlJcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvclwiLCBcInN5bWJvbHNcIjogW1wibG9naWNhbG9wZXJhdG9yJHN0cmluZyQyXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwibWF0Y2hcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkX2FuZF9zdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJtYXRjaFwiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGRfYW5kX3N0cmluZ1wiLCBcInN5bWJvbHNcIjogW1wiZmllbGRcIiwge1wibGl0ZXJhbFwiOlwiOlwifSwgXCJzdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFsgXCJhdHRyaWJ1dGVcIiwgZGF0YVswXSwgZGF0YVsyXVsxXSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImZpZWxkJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wid29yZGNoYXJzXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJmaWVsZCRlYm5mJDFcIiwgXCJ3b3JkY2hhcnNcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImZpZWxkXCIsIFwic3ltYm9sc1wiOiBbXCJmaWVsZCRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIGRhdGFbMF0uam9pbihcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJzdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFtcInN0cmluZ19vcl9xdW90ZWRfc3RyaW5nXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBbIFwiYXR0cmlidXRlXCIsIGRhdGFbMF1bMF0sIFwiZGVmYXVsdFwiIF07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlc1wiXX0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZ19vcl9xdW90ZWRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJxdW90ZWRfc3RyaW5nXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVzJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZXMkZWJuZiQxXCIsIFwidmFsdWVcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlc1wiLCBcInN5bWJvbHNcIjogW1widmFsdWVzJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gW1wibGl0ZXJhbFwiLCBkYXRhWzBdLmpvaW4oXCJcIikgXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVfb3Jfc3BhY2VcIl19LFxuICAgIHtcIm5hbWVcIjogXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wicXVvdGVkX3N0cmluZyRlYm5mJDFcIiwgXCJ2YWx1ZV9vcl9zcGFjZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwicXVvdGVkX3N0cmluZ1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXCJcIn0sIFwicXVvdGVkX3N0cmluZyRlYm5mJDFcIiwge1wibGl0ZXJhbFwiOlwiXFxcIlwifV0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFtcInF1b3RlZFwiLCBkYXRhWzFdLmpvaW4oXCJcIikgXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZVwiLCBcInN5bWJvbHNcIjogW1wid29yZGNoYXJzXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJcXFxcXCJ9LCBcImVzY2FwZWRfdmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZV9vcl9zcGFjZVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZV9vcl9zcGFjZVwiLCBcInN5bWJvbHNcIjogW1wiX19cIl19LFxuICAgIHtcIm5hbWVcIjogXCJlc2NhcGVkX3ZhbHVlXCIsIFwic3ltYm9sc1wiOiBbL1tcXChcXCldL119LFxuICAgIHtcIm5hbWVcIjogXCJ3b3JkY2hhcnNcIiwgXCJzeW1ib2xzXCI6IFsvW2EtekEtWjAtOV0vXX1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJNQUlOXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuIiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5uZWFybGV5ID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24oKSB7XG5cbmZ1bmN0aW9uIFJ1bGUobmFtZSwgc3ltYm9scywgcG9zdHByb2Nlc3MpIHtcbiAgICB0aGlzLmlkID0gKytSdWxlLmhpZ2hlc3RJZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuc3ltYm9scyA9IHN5bWJvbHM7ICAgICAgICAvLyBhIGxpc3Qgb2YgbGl0ZXJhbCB8IHJlZ2V4IGNsYXNzIHwgbm9udGVybWluYWxcbiAgICB0aGlzLnBvc3Rwcm9jZXNzID0gcG9zdHByb2Nlc3M7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5SdWxlLmhpZ2hlc3RJZCA9IDA7XG5cblJ1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24od2l0aEN1cnNvckF0KSB7XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UgKGUpIHtcbiAgICAgICAgcmV0dXJuIGUubGl0ZXJhbCA/IEpTT04uc3RyaW5naWZ5KGUubGl0ZXJhbCkgOlxuICAgICAgICAgICAgICAgZS50eXBlID8gJyUnICsgZS50eXBlIDogZS50b1N0cmluZygpO1xuICAgIH1cbiAgICB2YXIgc3ltYm9sU2VxdWVuY2UgPSAodHlwZW9mIHdpdGhDdXJzb3JBdCA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3ltYm9scy5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgIDogKCAgIHRoaXMuc3ltYm9scy5zbGljZSgwLCB3aXRoQ3Vyc29yQXQpLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIg4pePIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5zeW1ib2xzLnNsaWNlKHdpdGhDdXJzb3JBdCkubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJykgICAgICk7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArIFwiIOKGkiBcIiArIHN5bWJvbFNlcXVlbmNlO1xufVxuXG5cbi8vIGEgU3RhdGUgaXMgYSBydWxlIGF0IGEgcG9zaXRpb24gZnJvbSBhIGdpdmVuIHN0YXJ0aW5nIHBvaW50IGluIHRoZSBpbnB1dCBzdHJlYW0gKHJlZmVyZW5jZSlcbmZ1bmN0aW9uIFN0YXRlKHJ1bGUsIGRvdCwgcmVmZXJlbmNlLCB3YW50ZWRCeSkge1xuICAgIHRoaXMucnVsZSA9IHJ1bGU7XG4gICAgdGhpcy5kb3QgPSBkb3Q7XG4gICAgdGhpcy5yZWZlcmVuY2UgPSByZWZlcmVuY2U7XG4gICAgdGhpcy5kYXRhID0gW107XG4gICAgdGhpcy53YW50ZWRCeSA9IHdhbnRlZEJ5O1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IHRoaXMuZG90ID09PSBydWxlLnN5bWJvbHMubGVuZ3RoO1xufVxuXG5TdGF0ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJ7XCIgKyB0aGlzLnJ1bGUudG9TdHJpbmcodGhpcy5kb3QpICsgXCJ9LCBmcm9tOiBcIiArICh0aGlzLnJlZmVyZW5jZSB8fCAwKTtcbn07XG5cblN0YXRlLnByb3RvdHlwZS5uZXh0U3RhdGUgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSh0aGlzLnJ1bGUsIHRoaXMuZG90ICsgMSwgdGhpcy5yZWZlcmVuY2UsIHRoaXMud2FudGVkQnkpO1xuICAgIHN0YXRlLmxlZnQgPSB0aGlzO1xuICAgIHN0YXRlLnJpZ2h0ID0gY2hpbGQ7XG4gICAgaWYgKHN0YXRlLmlzQ29tcGxldGUpIHtcbiAgICAgICAgc3RhdGUuZGF0YSA9IHN0YXRlLmJ1aWxkKCk7XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbn07XG5cblN0YXRlLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgIHZhciBub2RlID0gdGhpcztcbiAgICBkbyB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2gobm9kZS5yaWdodC5kYXRhKTtcbiAgICAgICAgbm9kZSA9IG5vZGUubGVmdDtcbiAgICB9IHdoaWxlIChub2RlLmxlZnQpO1xuICAgIGNoaWxkcmVuLnJldmVyc2UoKTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG59O1xuXG5TdGF0ZS5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucnVsZS5wb3N0cHJvY2Vzcykge1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnJ1bGUucG9zdHByb2Nlc3ModGhpcy5kYXRhLCB0aGlzLnJlZmVyZW5jZSwgUGFyc2VyLmZhaWwpO1xuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gQ29sdW1uKGdyYW1tYXIsIGluZGV4KSB7XG4gICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcbiAgICB0aGlzLndhbnRzID0ge307IC8vIHN0YXRlcyBpbmRleGVkIGJ5IHRoZSBub24tdGVybWluYWwgdGhleSBleHBlY3RcbiAgICB0aGlzLnNjYW5uYWJsZSA9IFtdOyAvLyBsaXN0IG9mIHN0YXRlcyB0aGF0IGV4cGVjdCBhIHRva2VuXG4gICAgdGhpcy5jb21wbGV0ZWQgPSB7fTsgLy8gc3RhdGVzIHRoYXQgYXJlIG51bGxhYmxlXG59XG5cblxuQ29sdW1uLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24obmV4dENvbHVtbikge1xuICAgIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgICB2YXIgd2FudHMgPSB0aGlzLndhbnRzO1xuICAgIHZhciBjb21wbGV0ZWQgPSB0aGlzLmNvbXBsZXRlZDtcblxuICAgIGZvciAodmFyIHcgPSAwOyB3IDwgc3RhdGVzLmxlbmd0aDsgdysrKSB7IC8vIG5iLiB3ZSBwdXNoKCkgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICB2YXIgc3RhdGUgPSBzdGF0ZXNbd107XG5cbiAgICAgICAgaWYgKHN0YXRlLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHN0YXRlLmZpbmlzaCgpO1xuICAgICAgICAgICAgaWYgKHN0YXRlLmRhdGEgIT09IFBhcnNlci5mYWlsKSB7XG4gICAgICAgICAgICAgICAgLy8gY29tcGxldGVcbiAgICAgICAgICAgICAgICB2YXIgd2FudGVkQnkgPSBzdGF0ZS53YW50ZWRCeTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gd2FudGVkQnkubGVuZ3RoOyBpLS07ICkgeyAvLyB0aGlzIGxpbmUgaXMgaG90XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gd2FudGVkQnlbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUobGVmdCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNwZWNpYWwtY2FzZSBudWxsYWJsZXNcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUucmVmZXJlbmNlID09PSB0aGlzLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBmdXR1cmUgcHJlZGljdG9ycyBvZiB0aGlzIHJ1bGUgZ2V0IGNvbXBsZXRlZC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuY29tcGxldGVkW2V4cF0gPSB0aGlzLmNvbXBsZXRlZFtleHBdIHx8IFtdKS5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHF1ZXVlIHNjYW5uYWJsZSBzdGF0ZXNcbiAgICAgICAgICAgIHZhciBleHAgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nhbm5hYmxlLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwcmVkaWN0XG4gICAgICAgICAgICBpZiAod2FudHNbZXhwXSkge1xuICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0ucHVzaChzdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmhhc093blByb3BlcnR5KGV4cCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bGxzID0gY29tcGxldGVkW2V4cF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByaWdodCA9IG51bGxzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShzdGF0ZSwgcmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YW50c1tleHBdID0gW3N0YXRlXTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWRpY3QoZXhwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuQ29sdW1uLnByb3RvdHlwZS5wcmVkaWN0ID0gZnVuY3Rpb24oZXhwKSB7XG4gICAgdmFyIHJ1bGVzID0gdGhpcy5ncmFtbWFyLmJ5TmFtZVtleHBdIHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgciA9IHJ1bGVzW2ldO1xuICAgICAgICB2YXIgd2FudGVkQnkgPSB0aGlzLndhbnRzW2V4cF07XG4gICAgICAgIHZhciBzID0gbmV3IFN0YXRlKHIsIDAsIHRoaXMuaW5kZXgsIHdhbnRlZEJ5KTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChzKTtcbiAgICB9XG59XG5cbkNvbHVtbi5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgIHZhciBpbnAgPSByaWdodC5ydWxlLm5hbWU7XG4gICAgaWYgKGxlZnQucnVsZS5zeW1ib2xzW2xlZnQuZG90XSA9PT0gaW5wKSB7XG4gICAgICAgIHZhciBjb3B5ID0gbGVmdC5uZXh0U3RhdGUocmlnaHQpO1xuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKGNvcHkpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBHcmFtbWFyKHJ1bGVzLCBzdGFydCkge1xuICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQgfHwgdGhpcy5ydWxlc1swXS5uYW1lO1xuICAgIHZhciBieU5hbWUgPSB0aGlzLmJ5TmFtZSA9IHt9O1xuICAgIHRoaXMucnVsZXMuZm9yRWFjaChmdW5jdGlvbihydWxlKSB7XG4gICAgICAgIGlmICghYnlOYW1lLmhhc093blByb3BlcnR5KHJ1bGUubmFtZSkpIHtcbiAgICAgICAgICAgIGJ5TmFtZVtydWxlLm5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0ucHVzaChydWxlKTtcbiAgICB9KTtcbn1cblxuLy8gU28gd2UgY2FuIGFsbG93IHBhc3NpbmcgKHJ1bGVzLCBzdGFydCkgZGlyZWN0bHkgdG8gUGFyc2VyIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuR3JhbW1hci5mcm9tQ29tcGlsZWQgPSBmdW5jdGlvbihydWxlcywgc3RhcnQpIHtcbiAgICB2YXIgbGV4ZXIgPSBydWxlcy5MZXhlcjtcbiAgICBpZiAocnVsZXMuUGFyc2VyU3RhcnQpIHtcbiAgICAgIHN0YXJ0ID0gcnVsZXMuUGFyc2VyU3RhcnQ7XG4gICAgICBydWxlcyA9IHJ1bGVzLlBhcnNlclJ1bGVzO1xuICAgIH1cbiAgICB2YXIgcnVsZXMgPSBydWxlcy5tYXAoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIChuZXcgUnVsZShyLm5hbWUsIHIuc3ltYm9scywgci5wb3N0cHJvY2VzcykpOyB9KTtcbiAgICB2YXIgZyA9IG5ldyBHcmFtbWFyKHJ1bGVzLCBzdGFydCk7XG4gICAgZy5sZXhlciA9IGxleGVyOyAvLyBuYi4gc3RvcmluZyBsZXhlciBvbiBHcmFtbWFyIGlzIGlmZnksIGJ1dCB1bmF2b2lkYWJsZVxuICAgIHJldHVybiBnO1xufVxuXG5cbmZ1bmN0aW9uIFN0cmVhbUxleGVyKCkge1xuICB0aGlzLnJlc2V0KFwiXCIpO1xufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbihkYXRhLCBzdGF0ZSkge1xuICAgIHRoaXMuYnVmZmVyID0gZGF0YTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmxpbmUgPSBzdGF0ZSA/IHN0YXRlLmxpbmUgOiAxO1xuICAgIHRoaXMubGFzdExpbmVCcmVhayA9IHN0YXRlID8gLXN0YXRlLmNvbCA6IDA7XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNoID0gdGhpcy5idWZmZXJbdGhpcy5pbmRleCsrXTtcbiAgICAgICAgaWYgKGNoID09PSAnXFxuJykge1xuICAgICAgICAgIHRoaXMubGluZSArPSAxO1xuICAgICAgICAgIHRoaXMubGFzdExpbmVCcmVhayA9IHRoaXMuaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogY2h9O1xuICAgIH1cbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBsaW5lOiB0aGlzLmxpbmUsXG4gICAgY29sOiB0aGlzLmluZGV4IC0gdGhpcy5sYXN0TGluZUJyZWFrLFxuICB9XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uKHRva2VuLCBtZXNzYWdlKSB7XG4gICAgLy8gbmIuIHRoaXMgZ2V0cyBjYWxsZWQgYWZ0ZXIgY29uc3VtaW5nIHRoZSBvZmZlbmRpbmcgdG9rZW4sXG4gICAgLy8gc28gdGhlIGN1bHByaXQgaXMgaW5kZXgtMVxuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBpZiAodHlwZW9mIGJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIG5leHRMaW5lQnJlYWsgPSBidWZmZXIuaW5kZXhPZignXFxuJywgdGhpcy5pbmRleCk7XG4gICAgICAgIGlmIChuZXh0TGluZUJyZWFrID09PSAtMSkgbmV4dExpbmVCcmVhayA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIHZhciBsaW5lID0gYnVmZmVyLnN1YnN0cmluZyh0aGlzLmxhc3RMaW5lQnJlYWssIG5leHRMaW5lQnJlYWspXG4gICAgICAgIHZhciBjb2wgPSB0aGlzLmluZGV4IC0gdGhpcy5sYXN0TGluZUJyZWFrO1xuICAgICAgICBtZXNzYWdlICs9IFwiIGF0IGxpbmUgXCIgKyB0aGlzLmxpbmUgKyBcIiBjb2wgXCIgKyBjb2wgKyBcIjpcXG5cXG5cIjtcbiAgICAgICAgbWVzc2FnZSArPSBcIiAgXCIgKyBsaW5lICsgXCJcXG5cIlxuICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIEFycmF5KGNvbCkuam9pbihcIiBcIikgKyBcIl5cIlxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZSArIFwiIGF0IGluZGV4IFwiICsgKHRoaXMuaW5kZXggLSAxKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gUGFyc2VyKHJ1bGVzLCBzdGFydCwgb3B0aW9ucykge1xuICAgIGlmIChydWxlcyBpbnN0YW5jZW9mIEdyYW1tYXIpIHtcbiAgICAgICAgdmFyIGdyYW1tYXIgPSBydWxlcztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBzdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZ3JhbW1hciA9IEdyYW1tYXIuZnJvbUNvbXBpbGVkKHJ1bGVzLCBzdGFydCk7XG4gICAgfVxuICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG5cbiAgICAvLyBSZWFkIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgIGtlZXBIaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgbGV4ZXI6IGdyYW1tYXIubGV4ZXIgfHwgbmV3IFN0cmVhbUxleGVyLFxuICAgIH07XG4gICAgZm9yICh2YXIga2V5IGluIChvcHRpb25zIHx8IHt9KSkge1xuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9XG5cbiAgICAvLyBTZXR1cCBsZXhlclxuICAgIHRoaXMubGV4ZXIgPSB0aGlzLm9wdGlvbnMubGV4ZXI7XG4gICAgdGhpcy5sZXhlclN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gU2V0dXAgYSB0YWJsZVxuICAgIHZhciBjb2x1bW4gPSBuZXcgQ29sdW1uKGdyYW1tYXIsIDApO1xuICAgIHZhciB0YWJsZSA9IHRoaXMudGFibGUgPSBbY29sdW1uXTtcblxuICAgIC8vIEkgY291bGQgYmUgZXhwZWN0aW5nIGFueXRoaW5nLlxuICAgIGNvbHVtbi53YW50c1tncmFtbWFyLnN0YXJ0XSA9IFtdO1xuICAgIGNvbHVtbi5wcmVkaWN0KGdyYW1tYXIuc3RhcnQpO1xuICAgIC8vIFRPRE8gd2hhdCBpZiBzdGFydCBydWxlIGlzIG51bGxhYmxlP1xuICAgIGNvbHVtbi5wcm9jZXNzKCk7XG4gICAgdGhpcy5jdXJyZW50ID0gMDsgLy8gdG9rZW4gaW5kZXhcbn1cblxuLy8gY3JlYXRlIGEgcmVzZXJ2ZWQgdG9rZW4gZm9yIGluZGljYXRpbmcgYSBwYXJzZSBmYWlsXG5QYXJzZXIuZmFpbCA9IHt9O1xuXG5QYXJzZXIucHJvdG90eXBlLmZlZWQgPSBmdW5jdGlvbihjaHVuaykge1xuICAgIHZhciBsZXhlciA9IHRoaXMubGV4ZXI7XG4gICAgbGV4ZXIucmVzZXQoY2h1bmssIHRoaXMubGV4ZXJTdGF0ZSk7XG5cbiAgICB2YXIgdG9rZW47XG4gICAgd2hpbGUgKHRva2VuID0gbGV4ZXIubmV4dCgpKSB7XG4gICAgICAgIC8vIFdlIGFkZCBuZXcgc3RhdGVzIHRvIHRhYmxlW2N1cnJlbnQrMV1cbiAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy5jdXJyZW50XTtcblxuICAgICAgICAvLyBHQyB1bnVzZWQgc3RhdGVzXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50YWJsZVt0aGlzLmN1cnJlbnQgLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuID0gdGhpcy5jdXJyZW50ICsgMTtcbiAgICAgICAgdmFyIG5leHRDb2x1bW4gPSBuZXcgQ29sdW1uKHRoaXMuZ3JhbW1hciwgbik7XG4gICAgICAgIHRoaXMudGFibGUucHVzaChuZXh0Q29sdW1uKTtcblxuICAgICAgICAvLyBBZHZhbmNlIGFsbCB0b2tlbnMgdGhhdCBleHBlY3QgdGhlIHN5bWJvbFxuICAgICAgICB2YXIgbGl0ZXJhbCA9IHRva2VuLnZhbHVlO1xuICAgICAgICB2YXIgdmFsdWUgPSBsZXhlci5jb25zdHJ1Y3RvciA9PT0gU3RyZWFtTGV4ZXIgPyB0b2tlbi52YWx1ZSA6IHRva2VuO1xuICAgICAgICB2YXIgc2Nhbm5hYmxlID0gY29sdW1uLnNjYW5uYWJsZTtcbiAgICAgICAgZm9yICh2YXIgdyA9IHNjYW5uYWJsZS5sZW5ndGg7IHctLTsgKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBzY2FubmFibGVbd107XG4gICAgICAgICAgICB2YXIgZXhwZWN0ID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICAvLyBUcnkgdG8gY29uc3VtZSB0aGUgdG9rZW5cbiAgICAgICAgICAgIC8vIGVpdGhlciByZWdleCBvciBsaXRlcmFsXG4gICAgICAgICAgICBpZiAoZXhwZWN0LnRlc3QgPyBleHBlY3QudGVzdCh2YWx1ZSkgOlxuICAgICAgICAgICAgICAgIGV4cGVjdC50eXBlID8gZXhwZWN0LnR5cGUgPT09IHRva2VuLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGV4cGVjdC5saXRlcmFsID09PSBsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGl0XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBzdGF0ZS5uZXh0U3RhdGUoe2RhdGE6IHZhbHVlLCB0b2tlbjogdG9rZW4sIGlzVG9rZW46IHRydWUsIHJlZmVyZW5jZTogbiAtIDF9KTtcbiAgICAgICAgICAgICAgICBuZXh0Q29sdW1uLnN0YXRlcy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTmV4dCwgZm9yIGVhY2ggb2YgdGhlIHJ1bGVzLCB3ZSBlaXRoZXJcbiAgICAgICAgLy8gKGEpIGNvbXBsZXRlIGl0LCBhbmQgdHJ5IHRvIHNlZSBpZiB0aGUgcmVmZXJlbmNlIHJvdyBleHBlY3RlZCB0aGF0XG4gICAgICAgIC8vICAgICBydWxlXG4gICAgICAgIC8vIChiKSBwcmVkaWN0IHRoZSBuZXh0IG5vbnRlcm1pbmFsIGl0IGV4cGVjdHMgYnkgYWRkaW5nIHRoYXRcbiAgICAgICAgLy8gICAgIG5vbnRlcm1pbmFsJ3Mgc3RhcnQgc3RhdGVcbiAgICAgICAgLy8gVG8gcHJldmVudCBkdXBsaWNhdGlvbiwgd2UgYWxzbyBrZWVwIHRyYWNrIG9mIHJ1bGVzIHdlIGhhdmUgYWxyZWFkeVxuICAgICAgICAvLyBhZGRlZFxuXG4gICAgICAgIG5leHRDb2x1bW4ucHJvY2VzcygpO1xuXG4gICAgICAgIC8vIElmIG5lZWRlZCwgdGhyb3cgYW4gZXJyb3I6XG4gICAgICAgIGlmIChuZXh0Q29sdW1uLnN0YXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIE5vIHN0YXRlcyBhdCBhbGwhIFRoaXMgaXMgbm90IGdvb2QuXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMubGV4ZXIuZm9ybWF0RXJyb3IodG9rZW4sIFwiaW52YWxpZCBzeW50YXhcIikgKyBcIlxcblwiO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIlVuZXhwZWN0ZWQgXCIgKyAodG9rZW4udHlwZSA/IHRva2VuLnR5cGUgKyBcIiB0b2tlbjogXCIgOiBcIlwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gSlNPTi5zdHJpbmdpZnkodG9rZW4udmFsdWUgIT09IHVuZGVmaW5lZCA/IHRva2VuLnZhbHVlIDogdG9rZW4pICsgXCJcXG5cIjtcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICBlcnIub2Zmc2V0ID0gdGhpcy5jdXJyZW50O1xuICAgICAgICAgICAgZXJyLnRva2VuID0gdG9rZW47XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYXliZSBzYXZlIGxleGVyIHN0YXRlXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICBjb2x1bW4ubGV4ZXJTdGF0ZSA9IGxleGVyLnNhdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgfVxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGxleGVyLnNhdmUoKVxuICAgIH1cblxuICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcblxuICAgIC8vIEFsbG93IGNoYWluaW5nLCBmb3Igd2hhdGV2ZXIgaXQncyB3b3J0aFxuICAgIHJldHVybiB0aGlzO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy5jdXJyZW50XTtcbiAgICBjb2x1bW4ubGV4ZXJTdGF0ZSA9IHRoaXMubGV4ZXJTdGF0ZTtcbiAgICByZXR1cm4gY29sdW1uO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgdmFyIGluZGV4ID0gY29sdW1uLmluZGV4O1xuICAgIHRoaXMuY3VycmVudCA9IGluZGV4O1xuICAgIHRoaXMudGFibGVbaW5kZXhdID0gY29sdW1uO1xuICAgIHRoaXMudGFibGUuc3BsaWNlKGluZGV4ICsgMSk7XG4gICAgdGhpcy5sZXhlclN0YXRlID0gY29sdW1uLmxleGVyU3RhdGU7XG5cbiAgICAvLyBJbmNyZW1lbnRhbGx5IGtlZXAgdHJhY2sgb2YgcmVzdWx0c1xuICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZmluaXNoKCk7XG59O1xuXG4vLyBuYi4gZGVwcmVjYXRlZDogdXNlIHNhdmUvcmVzdG9yZSBpbnN0ZWFkIVxuUGFyc2VyLnByb3RvdHlwZS5yZXdpbmQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zLmtlZXBIaXN0b3J5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc2V0IG9wdGlvbiBga2VlcEhpc3RvcnlgIHRvIGVuYWJsZSByZXdpbmRpbmcnKVxuICAgIH1cbiAgICAvLyBuYi4gcmVjYWxsIGNvbHVtbiAodGFibGUpIGluZGljaWVzIGZhbGwgYmV0d2VlbiB0b2tlbiBpbmRpY2llcy5cbiAgICAvLyAgICAgICAgY29sIDAgICAtLSAgIHRva2VuIDAgICAtLSAgIGNvbCAxXG4gICAgdGhpcy5yZXN0b3JlKHRoaXMudGFibGVbaW5kZXhdKTtcbn07XG5cblBhcnNlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBwb3NzaWJsZSBwYXJzaW5nc1xuICAgIHZhciBjb25zaWRlcmF0aW9ucyA9IFtdO1xuICAgIHZhciBzdGFydCA9IHRoaXMuZ3JhbW1hci5zdGFydDtcbiAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLnRhYmxlLmxlbmd0aCAtIDFdXG4gICAgY29sdW1uLnN0YXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0LnJ1bGUubmFtZSA9PT0gc3RhcnRcbiAgICAgICAgICAgICAgICAmJiB0LmRvdCA9PT0gdC5ydWxlLnN5bWJvbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgJiYgdC5yZWZlcmVuY2UgPT09IDBcbiAgICAgICAgICAgICAgICAmJiB0LmRhdGEgIT09IFBhcnNlci5mYWlsKSB7XG4gICAgICAgICAgICBjb25zaWRlcmF0aW9ucy5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnNpZGVyYXRpb25zLm1hcChmdW5jdGlvbihjKSB7cmV0dXJuIGMuZGF0YTsgfSk7XG59O1xuXG5yZXR1cm4ge1xuICAgIFBhcnNlcjogUGFyc2VyLFxuICAgIEdyYW1tYXI6IEdyYW1tYXIsXG4gICAgUnVsZTogUnVsZSxcbn07XG5cbn0pKTtcbiJdfQ==
