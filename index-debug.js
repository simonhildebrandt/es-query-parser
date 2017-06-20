(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ESQueryParser = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _es_querystring = require('./es_querystring.js');

$('#data').on('input', function (event) {
  console.log((0, _es_querystring.validate)(event.target.value));
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
                return ["logical", data[2][0], data[0][0], data[4][0]];
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZW1vLmpzIiwiZXNfcXVlcnlzdHJpbmcuanMiLCJncmFtbWFyLmpzIiwibm9kZV9tb2R1bGVzL25lYXJsZXkvbGliL25lYXJsZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLEVBQUUsT0FBRixFQUFXLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFVBQUMsS0FBRCxFQUFXO0FBQ2hDLFVBQVEsR0FBUixDQUFZLDhCQUFTLE1BQU0sTUFBTixDQUFhLEtBQXRCLENBQVo7QUFDRCxDQUZEOzs7OztBQ0ZBOzs7O0FBQ0E7Ozs7OztBQUdBLFNBQVMsS0FBVCxDQUFlLEtBQWYsRUFBc0I7QUFDcEIsTUFBSSxJQUFJLElBQUksa0JBQVEsTUFBWixDQUFtQixrQkFBUSxXQUEzQixFQUF3QyxrQkFBUSxXQUFoRCxDQUFSO0FBQ0EsU0FBTyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVA7QUFDRDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDdkIsTUFBSTtBQUNGLFdBQU8sTUFBTSxLQUFOLEVBQWEsT0FBYixDQUFxQixNQUFyQixHQUE4QixDQUFyQztBQUNELEdBRkQsQ0FFRSxPQUFNLENBQU4sRUFBUztBQUNULFdBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxVQUFULENBQW9CLEtBQXBCLEVBQTJCO0FBQ3pCLE1BQUk7QUFDRixXQUFPLE1BQU0sS0FBTixFQUFhLE9BQWIsQ0FBcUIsTUFBckIsSUFBK0IsQ0FBdEM7QUFDRCxHQUZELENBRUUsT0FBTSxDQUFOLEVBQVM7QUFDVCxXQUFPLEtBQVA7QUFDRDtBQUNGOztBQUVEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsT0FBTyxPQUFQLEdBQWlCLEVBQUUsWUFBRixFQUFTLGtCQUFULEVBQW1CLHNCQUFuQixFQUFqQjs7Ozs7QUN4Q0E7QUFDQTtBQUNBLENBQUMsWUFBWTtBQUNiLGFBQVMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgcGFyc2UsIHZhbGlkYXRlIH0gZnJvbSAnLi9lc19xdWVyeXN0cmluZy5qcydcblxuJCgnI2RhdGEnKS5vbignaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgY29uc29sZS5sb2codmFsaWRhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKSlcbn0pXG4iLCJpbXBvcnQgZ3JhbW1hciBmcm9tIFwiLi9ncmFtbWFyLmpzXCJcbmltcG9ydCBuZWFybGV5IGZyb20gXCJuZWFybGV5XCJcblxuXG5mdW5jdGlvbiBwYXJzZSh2YWx1ZSkge1xuICB2YXIgcCA9IG5ldyBuZWFybGV5LlBhcnNlcihncmFtbWFyLlBhcnNlclJ1bGVzLCBncmFtbWFyLlBhcnNlclN0YXJ0KVxuICByZXR1cm4gcC5mZWVkKHZhbHVlKVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwYXJzZSh2YWx1ZSkucmVzdWx0cy5sZW5ndGggPiAwXG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluY29tcGxldGUodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcGFyc2UodmFsdWUpLnJlc3VsdHMubGVuZ3RoID09IDBcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLy8gSGVyZSdzIGhvdyBOZWFybGV5IHdvcmtzOlxuLypcbmZ1bmN0aW9uIHZhbGlkYXRlKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgaWYgKHBhcnNlKHZhbHVlKS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBcIlZhbGlkLlwiXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIk5vdCAqeWV0KiB2YWxpZC5cIlxuICAgIH1cbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIFwiTm90IHZhbGlkLlwiXG4gIH1cbn1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0geyBwYXJzZSwgdmFsaWRhdGUsIGluY29tcGxldGUgfVxuIiwiLy8gR2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkgYnkgbmVhcmxleVxuLy8gaHR0cDovL2dpdGh1Yi5jb20vSGFyZG1hdGgxMjMvbmVhcmxleVxuKGZ1bmN0aW9uICgpIHtcbmZ1bmN0aW9uIGlkKHgpIHtyZXR1cm4geFswXTsgfVxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IHVuZGVmaW5lZCxcbiAgICBQYXJzZXJSdWxlczogW1xuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiXyRlYm5mJDFcIiwgXCJ3c2NoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIl9cIiwgXCJzeW1ib2xzXCI6IFtcIl8kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX18kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ3c2NoYXJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJfXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiLCBcIndzY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX19cIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIndzY2hhclwiLCBcInN5bWJvbHNcIjogWy9bIFxcdFxcblxcdlxcZl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIk1BSU5cIiwgXCJzeW1ib2xzXCI6IFtcIl9cIiwgXCJjbGF1c2VcIiwgXCJfXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBkYXRhWzFdWzBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wiZ3JvdXBlZFwiXX0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wiYnJhY2tldGVkXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiY2xhdXNlXCIsIFwic3ltYm9sc1wiOiBbXCJzaW1wbGVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJncm91cGVkXCIsIFwic3ltYm9sc1wiOiBbXCJjbGF1c2VcIiwgXCJfX1wiLCBcImxvZ2ljYWxcIiwgXCJfX1wiLCBcImNsYXVzZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gWyBcImxvZ2ljYWxcIiwgZGF0YVsyXVswXSwgZGF0YVswXVswXSwgZGF0YVs0XVswXSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInNpbXBsZVwiLCBcInN5bWJvbHNcIjogW1wibWF0Y2hcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFsgXCJzaW1wbGVcIiwgZGF0YVswXVswXSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImJyYWNrZXRlZFwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIihcIn0sIFwiX1wiLCBcImNsYXVzZVwiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiKVwifV0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFsgXCJicmFja2V0ZWRcIiwgZGF0YVsyXVswXSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxcIiwgXCJzeW1ib2xzXCI6IFtcImxvZ2ljYWxvcGVyYXRvclwiXX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIkFcIn0sIHtcImxpdGVyYWxcIjpcIk5cIn0sIHtcImxpdGVyYWxcIjpcIkRcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvclwiLCBcInN5bWJvbHNcIjogW1wibG9naWNhbG9wZXJhdG9yJHN0cmluZyQxXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwibG9naWNhbG9wZXJhdG9yJHN0cmluZyQyXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiT1wifSwge1wibGl0ZXJhbFwiOlwiUlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibG9naWNhbG9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJsb2dpY2Fsb3BlcmF0b3Ikc3RyaW5nJDJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJtYXRjaFwiLCBcInN5bWJvbHNcIjogW1wiZmllbGRfYW5kX3N0cmluZ1wiXX0sXG4gICAge1wibmFtZVwiOiBcIm1hdGNoXCIsIFwic3ltYm9sc1wiOiBbXCJzdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZF9hbmRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJmaWVsZFwiLCB7XCJsaXRlcmFsXCI6XCI6XCJ9LCBcInN0cmluZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gWyBcImF0dHJpYnV0ZVwiLCBkYXRhWzBdLCBkYXRhWzJdWzFdIF07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ3b3JkY2hhcnNcIl19LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkJGVibmYkMVwiLCBcIndvcmRjaGFyc1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZmllbGRcIiwgXCJzeW1ib2xzXCI6IFtcImZpZWxkJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gZGF0YVswXS5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInN0cmluZ1wiLCBcInN5bWJvbHNcIjogW1wic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIl0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uIChkYXRhLCBsb2NhdGlvbiwgcmVqZWN0KSB7XG4gICAgICAgIFx0cmV0dXJuIFsgXCJhdHRyaWJ1dGVcIiwgZGF0YVswXVswXSwgXCJkZWZhdWx0XCIgXTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJzdHJpbmdfb3JfcXVvdGVkX3N0cmluZ1wiLCBcInN5bWJvbHNcIjogW1widmFsdWVzXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFtcInF1b3RlZF9zdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlcyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlcyRlYm5mJDFcIiwgXCJ2YWx1ZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVzXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZXMkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBbXCJsaXRlcmFsXCIsIGRhdGFbMF0uam9pbihcIlwiKSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZV9vcl9zcGFjZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCBcInZhbHVlX29yX3NwYWNlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJxdW90ZWRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcIlwifSwgXCJxdW90ZWRfc3RyaW5nJGVibmYkMVwiLCB7XCJsaXRlcmFsXCI6XCJcXFwiXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4gW1wicXVvdGVkXCIsIGRhdGFbMV0uam9pbihcIlwiKSBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlXCIsIFwic3ltYm9sc1wiOiBbXCJ3b3JkY2hhcnNcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXFxcIn0sIFwiZXNjYXBlZF92YWx1ZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlX29yX3NwYWNlXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlX29yX3NwYWNlXCIsIFwic3ltYm9sc1wiOiBbXCJfX1wiXX0sXG4gICAge1wibmFtZVwiOiBcImVzY2FwZWRfdmFsdWVcIiwgXCJzeW1ib2xzXCI6IFsvW1xcKFxcKV0vXX0sXG4gICAge1wibmFtZVwiOiBcIndvcmRjaGFyc1wiLCBcInN5bWJvbHNcIjogWy9bYS16QS1aMC05XS9dfVxuXVxuICAsIFBhcnNlclN0YXJ0OiBcIk1BSU5cIlxufVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgbW9kdWxlLmV4cG9ydHMgPSBncmFtbWFyO1xufSBlbHNlIHtcbiAgIHdpbmRvdy5ncmFtbWFyID0gZ3JhbW1hcjtcbn1cbn0pKCk7XG4iLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm5lYXJsZXkgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gUnVsZShuYW1lLCBzeW1ib2xzLCBwb3N0cHJvY2Vzcykge1xuICAgIHRoaXMuaWQgPSArK1J1bGUuaGlnaGVzdElkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zeW1ib2xzID0gc3ltYm9sczsgICAgICAgIC8vIGEgbGlzdCBvZiBsaXRlcmFsIHwgcmVnZXggY2xhc3MgfCBub250ZXJtaW5hbFxuICAgIHRoaXMucG9zdHByb2Nlc3MgPSBwb3N0cHJvY2VzcztcbiAgICByZXR1cm4gdGhpcztcbn1cblJ1bGUuaGlnaGVzdElkID0gMDtcblxuUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbih3aXRoQ3Vyc29yQXQpIHtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSAoZSkge1xuICAgICAgICByZXR1cm4gZS5saXRlcmFsID8gSlNPTi5zdHJpbmdpZnkoZS5saXRlcmFsKSA6XG4gICAgICAgICAgICAgICBlLnR5cGUgPyAnJScgKyBlLnR5cGUgOiBlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHZhciBzeW1ib2xTZXF1ZW5jZSA9ICh0eXBlb2Ygd2l0aEN1cnNvckF0ID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zeW1ib2xzLm1hcChzdHJpbmdpZnlTeW1ib2xTZXF1ZW5jZSkuam9pbignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiAoICAgdGhpcy5zeW1ib2xzLnNsaWNlKDAsIHdpdGhDdXJzb3JBdCkubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiDil48gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnN5bWJvbHMuc2xpY2Uod2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKSAgICAgKTtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgXCIg4oaSIFwiICsgc3ltYm9sU2VxdWVuY2U7XG59XG5cblxuLy8gYSBTdGF0ZSBpcyBhIHJ1bGUgYXQgYSBwb3NpdGlvbiBmcm9tIGEgZ2l2ZW4gc3RhcnRpbmcgcG9pbnQgaW4gdGhlIGlucHV0IHN0cmVhbSAocmVmZXJlbmNlKVxuZnVuY3Rpb24gU3RhdGUocnVsZSwgZG90LCByZWZlcmVuY2UsIHdhbnRlZEJ5KSB7XG4gICAgdGhpcy5ydWxlID0gcnVsZTtcbiAgICB0aGlzLmRvdCA9IGRvdDtcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLndhbnRlZEJ5ID0gd2FudGVkQnk7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gdGhpcy5kb3QgPT09IHJ1bGUuc3ltYm9scy5sZW5ndGg7XG59XG5cblN0YXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIntcIiArIHRoaXMucnVsZS50b1N0cmluZyh0aGlzLmRvdCkgKyBcIn0sIGZyb206IFwiICsgKHRoaXMucmVmZXJlbmNlIHx8IDApO1xufTtcblxuU3RhdGUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKHRoaXMucnVsZSwgdGhpcy5kb3QgKyAxLCB0aGlzLnJlZmVyZW5jZSwgdGhpcy53YW50ZWRCeSk7XG4gICAgc3RhdGUubGVmdCA9IHRoaXM7XG4gICAgc3RhdGUucmlnaHQgPSBjaGlsZDtcbiAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICBzdGF0ZS5kYXRhID0gc3RhdGUuYnVpbGQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuU3RhdGUucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgdmFyIG5vZGUgPSB0aGlzO1xuICAgIGRvIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChub2RlLnJpZ2h0LmRhdGEpO1xuICAgICAgICBub2RlID0gbm9kZS5sZWZ0O1xuICAgIH0gd2hpbGUgKG5vZGUubGVmdCk7XG4gICAgY2hpbGRyZW4ucmV2ZXJzZSgpO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbn07XG5cblN0YXRlLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5ydWxlLnBvc3Rwcm9jZXNzKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMucnVsZS5wb3N0cHJvY2Vzcyh0aGlzLmRhdGEsIHRoaXMucmVmZXJlbmNlLCBQYXJzZXIuZmFpbCk7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBDb2x1bW4oZ3JhbW1hciwgaW5kZXgpIHtcbiAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlcyA9IFtdO1xuICAgIHRoaXMud2FudHMgPSB7fTsgLy8gc3RhdGVzIGluZGV4ZWQgYnkgdGhlIG5vbi10ZXJtaW5hbCB0aGV5IGV4cGVjdFxuICAgIHRoaXMuc2Nhbm5hYmxlID0gW107IC8vIGxpc3Qgb2Ygc3RhdGVzIHRoYXQgZXhwZWN0IGEgdG9rZW5cbiAgICB0aGlzLmNvbXBsZXRlZCA9IHt9OyAvLyBzdGF0ZXMgdGhhdCBhcmUgbnVsbGFibGVcbn1cblxuXG5Db2x1bW4ucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihuZXh0Q29sdW1uKSB7XG4gICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICAgIHZhciB3YW50cyA9IHRoaXMud2FudHM7XG4gICAgdmFyIGNvbXBsZXRlZCA9IHRoaXMuY29tcGxldGVkO1xuXG4gICAgZm9yICh2YXIgdyA9IDA7IHcgPCBzdGF0ZXMubGVuZ3RoOyB3KyspIHsgLy8gbmIuIHdlIHB1c2goKSBkdXJpbmcgaXRlcmF0aW9uXG4gICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1t3XTtcblxuICAgICAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgc3RhdGUuZmluaXNoKCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgICAgICAgIHZhciB3YW50ZWRCeSA9IHN0YXRlLndhbnRlZEJ5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB3YW50ZWRCeS5sZW5ndGg7IGktLTsgKSB7IC8vIHRoaXMgbGluZSBpcyBob3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSB3YW50ZWRCeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShsZWZ0LCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbC1jYXNlIG51bGxhYmxlc1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5yZWZlcmVuY2UgPT09IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGZ1dHVyZSBwcmVkaWN0b3JzIG9mIHRoaXMgcnVsZSBnZXQgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5jb21wbGV0ZWRbZXhwXSA9IHRoaXMuY29tcGxldGVkW2V4cF0gfHwgW10pLnB1c2goc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcXVldWUgc2Nhbm5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FubmFibGUucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHByZWRpY3RcbiAgICAgICAgICAgIGlmICh3YW50c1tleHBdKSB7XG4gICAgICAgICAgICAgICAgd2FudHNbZXhwXS5wdXNoKHN0YXRlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuaGFzT3duUHJvcGVydHkoZXhwKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVsbHMgPSBjb21wbGV0ZWRbZXhwXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKHN0YXRlLCByaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0gPSBbc3RhdGVdO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdChleHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5Db2x1bW4ucHJvdG90eXBlLnByZWRpY3QgPSBmdW5jdGlvbihleHApIHtcbiAgICB2YXIgcnVsZXMgPSB0aGlzLmdyYW1tYXIuYnlOYW1lW2V4cF0gfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByID0gcnVsZXNbaV07XG4gICAgICAgIHZhciB3YW50ZWRCeSA9IHRoaXMud2FudHNbZXhwXTtcbiAgICAgICAgdmFyIHMgPSBuZXcgU3RhdGUociwgMCwgdGhpcy5pbmRleCwgd2FudGVkQnkpO1xuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKHMpO1xuICAgIH1cbn1cblxuQ29sdW1uLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgdmFyIGlucCA9IHJpZ2h0LnJ1bGUubmFtZTtcbiAgICBpZiAobGVmdC5ydWxlLnN5bWJvbHNbbGVmdC5kb3RdID09PSBpbnApIHtcbiAgICAgICAgdmFyIGNvcHkgPSBsZWZ0Lm5leHRTdGF0ZShyaWdodCk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2goY29weSk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIEdyYW1tYXIocnVsZXMsIHN0YXJ0KSB7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydCB8fCB0aGlzLnJ1bGVzWzBdLm5hbWU7XG4gICAgdmFyIGJ5TmFtZSA9IHRoaXMuYnlOYW1lID0ge307XG4gICAgdGhpcy5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGUpIHtcbiAgICAgICAgaWYgKCFieU5hbWUuaGFzT3duUHJvcGVydHkocnVsZS5uYW1lKSkge1xuICAgICAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBieU5hbWVbcnVsZS5uYW1lXS5wdXNoKHJ1bGUpO1xuICAgIH0pO1xufVxuXG4vLyBTbyB3ZSBjYW4gYWxsb3cgcGFzc2luZyAocnVsZXMsIHN0YXJ0KSBkaXJlY3RseSB0byBQYXJzZXIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5HcmFtbWFyLmZyb21Db21waWxlZCA9IGZ1bmN0aW9uKHJ1bGVzLCBzdGFydCkge1xuICAgIHZhciBsZXhlciA9IHJ1bGVzLkxleGVyO1xuICAgIGlmIChydWxlcy5QYXJzZXJTdGFydCkge1xuICAgICAgc3RhcnQgPSBydWxlcy5QYXJzZXJTdGFydDtcbiAgICAgIHJ1bGVzID0gcnVsZXMuUGFyc2VyUnVsZXM7XG4gICAgfVxuICAgIHZhciBydWxlcyA9IHJ1bGVzLm1hcChmdW5jdGlvbiAocikgeyByZXR1cm4gKG5ldyBSdWxlKHIubmFtZSwgci5zeW1ib2xzLCByLnBvc3Rwcm9jZXNzKSk7IH0pO1xuICAgIHZhciBnID0gbmV3IEdyYW1tYXIocnVsZXMsIHN0YXJ0KTtcbiAgICBnLmxleGVyID0gbGV4ZXI7IC8vIG5iLiBzdG9yaW5nIGxleGVyIG9uIEdyYW1tYXIgaXMgaWZmeSwgYnV0IHVuYXZvaWRhYmxlXG4gICAgcmV0dXJuIGc7XG59XG5cblxuZnVuY3Rpb24gU3RyZWFtTGV4ZXIoKSB7XG4gIHRoaXMucmVzZXQoXCJcIik7XG59XG5cblN0cmVhbUxleGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKGRhdGEsIHN0YXRlKSB7XG4gICAgdGhpcy5idWZmZXIgPSBkYXRhO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMubGluZSA9IHN0YXRlID8gc3RhdGUubGluZSA6IDE7XG4gICAgdGhpcy5sYXN0TGluZUJyZWFrID0gc3RhdGUgPyAtc3RhdGUuY29sIDogMDtcbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2ggPSB0aGlzLmJ1ZmZlclt0aGlzLmluZGV4KytdO1xuICAgICAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICAgICAgdGhpcy5saW5lICs9IDE7XG4gICAgICAgICAgdGhpcy5sYXN0TGluZUJyZWFrID0gdGhpcy5pbmRleDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3ZhbHVlOiBjaH07XG4gICAgfVxufVxuXG5TdHJlYW1MZXhlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICBjb2w6IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWssXG4gIH1cbn1cblxuU3RyZWFtTGV4ZXIucHJvdG90eXBlLmZvcm1hdEVycm9yID0gZnVuY3Rpb24odG9rZW4sIG1lc3NhZ2UpIHtcbiAgICAvLyBuYi4gdGhpcyBnZXRzIGNhbGxlZCBhZnRlciBjb25zdW1pbmcgdGhlIG9mZmVuZGluZyB0b2tlbixcbiAgICAvLyBzbyB0aGUgY3VscHJpdCBpcyBpbmRleC0xXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGlmICh0eXBlb2YgYnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgbmV4dExpbmVCcmVhayA9IGJ1ZmZlci5pbmRleE9mKCdcXG4nLCB0aGlzLmluZGV4KTtcbiAgICAgICAgaWYgKG5leHRMaW5lQnJlYWsgPT09IC0xKSBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyaW5nKHRoaXMubGFzdExpbmVCcmVhaywgbmV4dExpbmVCcmVhaylcbiAgICAgICAgdmFyIGNvbCA9IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWs7XG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgYXQgbGluZSBcIiArIHRoaXMubGluZSArIFwiIGNvbCBcIiArIGNvbCArIFwiOlxcblxcblwiO1xuICAgICAgICBtZXNzYWdlICs9IFwiICBcIiArIGxpbmUgKyBcIlxcblwiXG4gICAgICAgIG1lc3NhZ2UgKz0gXCIgIFwiICsgQXJyYXkoY29sKS5qb2luKFwiIFwiKSArIFwiXlwiXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlICsgXCIgYXQgaW5kZXggXCIgKyAodGhpcy5pbmRleCAtIDEpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBQYXJzZXIocnVsZXMsIHN0YXJ0LCBvcHRpb25zKSB7XG4gICAgaWYgKHJ1bGVzIGluc3RhbmNlb2YgR3JhbW1hcikge1xuICAgICAgICB2YXIgZ3JhbW1hciA9IHJ1bGVzO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBncmFtbWFyID0gR3JhbW1hci5mcm9tQ29tcGlsZWQocnVsZXMsIHN0YXJ0KTtcbiAgICB9XG4gICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcblxuICAgIC8vIFJlYWQgb3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAga2VlcEhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICBsZXhlcjogZ3JhbW1hci5sZXhlciB8fCBuZXcgU3RyZWFtTGV4ZXIsXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gKG9wdGlvbnMgfHwge30pKSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIC8vIFNldHVwIGxleGVyXG4gICAgdGhpcy5sZXhlciA9IHRoaXMub3B0aW9ucy5sZXhlcjtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBTZXR1cCBhIHRhYmxlXG4gICAgdmFyIGNvbHVtbiA9IG5ldyBDb2x1bW4oZ3JhbW1hciwgMCk7XG4gICAgdmFyIHRhYmxlID0gdGhpcy50YWJsZSA9IFtjb2x1bW5dO1xuXG4gICAgLy8gSSBjb3VsZCBiZSBleHBlY3RpbmcgYW55dGhpbmcuXG4gICAgY29sdW1uLndhbnRzW2dyYW1tYXIuc3RhcnRdID0gW107XG4gICAgY29sdW1uLnByZWRpY3QoZ3JhbW1hci5zdGFydCk7XG4gICAgLy8gVE9ETyB3aGF0IGlmIHN0YXJ0IHJ1bGUgaXMgbnVsbGFibGU/XG4gICAgY29sdW1uLnByb2Nlc3MoKTtcbiAgICB0aGlzLmN1cnJlbnQgPSAwOyAvLyB0b2tlbiBpbmRleFxufVxuXG4vLyBjcmVhdGUgYSByZXNlcnZlZCB0b2tlbiBmb3IgaW5kaWNhdGluZyBhIHBhcnNlIGZhaWxcblBhcnNlci5mYWlsID0ge307XG5cblBhcnNlci5wcm90b3R5cGUuZmVlZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgdmFyIGxleGVyID0gdGhpcy5sZXhlcjtcbiAgICBsZXhlci5yZXNldChjaHVuaywgdGhpcy5sZXhlclN0YXRlKTtcblxuICAgIHZhciB0b2tlbjtcbiAgICB3aGlsZSAodG9rZW4gPSBsZXhlci5uZXh0KCkpIHtcbiAgICAgICAgLy8gV2UgYWRkIG5ldyBzdGF0ZXMgdG8gdGFibGVbY3VycmVudCsxXVxuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuXG4gICAgICAgIC8vIEdDIHVudXNlZCBzdGF0ZXNcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudCAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG4gPSB0aGlzLmN1cnJlbnQgKyAxO1xuICAgICAgICB2YXIgbmV4dENvbHVtbiA9IG5ldyBDb2x1bW4odGhpcy5ncmFtbWFyLCBuKTtcbiAgICAgICAgdGhpcy50YWJsZS5wdXNoKG5leHRDb2x1bW4pO1xuXG4gICAgICAgIC8vIEFkdmFuY2UgYWxsIHRva2VucyB0aGF0IGV4cGVjdCB0aGUgc3ltYm9sXG4gICAgICAgIHZhciBsaXRlcmFsID0gdG9rZW4udmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZSA9IGxleGVyLmNvbnN0cnVjdG9yID09PSBTdHJlYW1MZXhlciA/IHRva2VuLnZhbHVlIDogdG9rZW47XG4gICAgICAgIHZhciBzY2FubmFibGUgPSBjb2x1bW4uc2Nhbm5hYmxlO1xuICAgICAgICBmb3IgKHZhciB3ID0gc2Nhbm5hYmxlLmxlbmd0aDsgdy0tOyApIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNjYW5uYWJsZVt3XTtcbiAgICAgICAgICAgIHZhciBleHBlY3QgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgIC8vIFRyeSB0byBjb25zdW1lIHRoZSB0b2tlblxuICAgICAgICAgICAgLy8gZWl0aGVyIHJlZ2V4IG9yIGxpdGVyYWxcbiAgICAgICAgICAgIGlmIChleHBlY3QudGVzdCA/IGV4cGVjdC50ZXN0KHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgZXhwZWN0LnR5cGUgPyBleHBlY3QudHlwZSA9PT0gdG9rZW4udHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZXhwZWN0LmxpdGVyYWwgPT09IGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgaXRcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHN0YXRlLm5leHRTdGF0ZSh7ZGF0YTogdmFsdWUsIHRva2VuOiB0b2tlbiwgaXNUb2tlbjogdHJ1ZSwgcmVmZXJlbmNlOiBuIC0gMX0pO1xuICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3RhdGVzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOZXh0LCBmb3IgZWFjaCBvZiB0aGUgcnVsZXMsIHdlIGVpdGhlclxuICAgICAgICAvLyAoYSkgY29tcGxldGUgaXQsIGFuZCB0cnkgdG8gc2VlIGlmIHRoZSByZWZlcmVuY2Ugcm93IGV4cGVjdGVkIHRoYXRcbiAgICAgICAgLy8gICAgIHJ1bGVcbiAgICAgICAgLy8gKGIpIHByZWRpY3QgdGhlIG5leHQgbm9udGVybWluYWwgaXQgZXhwZWN0cyBieSBhZGRpbmcgdGhhdFxuICAgICAgICAvLyAgICAgbm9udGVybWluYWwncyBzdGFydCBzdGF0ZVxuICAgICAgICAvLyBUbyBwcmV2ZW50IGR1cGxpY2F0aW9uLCB3ZSBhbHNvIGtlZXAgdHJhY2sgb2YgcnVsZXMgd2UgaGF2ZSBhbHJlYWR5XG4gICAgICAgIC8vIGFkZGVkXG5cbiAgICAgICAgbmV4dENvbHVtbi5wcm9jZXNzKCk7XG5cbiAgICAgICAgLy8gSWYgbmVlZGVkLCB0aHJvdyBhbiBlcnJvcjpcbiAgICAgICAgaWYgKG5leHRDb2x1bW4uc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gTm8gc3RhdGVzIGF0IGFsbCEgVGhpcyBpcyBub3QgZ29vZC5cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5sZXhlci5mb3JtYXRFcnJvcih0b2tlbiwgXCJpbnZhbGlkIHN5bnRheFwiKSArIFwiXFxuXCI7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiVW5leHBlY3RlZCBcIiArICh0b2tlbi50eXBlID8gdG9rZW4udHlwZSArIFwiIHRva2VuOiBcIiA6IFwiXCIpO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeSh0b2tlbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdG9rZW4udmFsdWUgOiB0b2tlbikgKyBcIlxcblwiO1xuICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIGVyci5vZmZzZXQgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgICAgICBlcnIudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1heWJlIHNhdmUgbGV4ZXIgc3RhdGVcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgIGNvbHVtbi5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQrKztcbiAgICB9XG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgdGhpcy5sZXhlclN0YXRlID0gbGV4ZXIuc2F2ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xuXG4gICAgLy8gQWxsb3cgY2hhaW5pbmcsIGZvciB3aGF0ZXZlciBpdCdzIHdvcnRoXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuICAgIGNvbHVtbi5sZXhlclN0YXRlID0gdGhpcy5sZXhlclN0YXRlO1xuICAgIHJldHVybiBjb2x1bW47XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbihjb2x1bW4pIHtcbiAgICB2YXIgaW5kZXggPSBjb2x1bW4uaW5kZXg7XG4gICAgdGhpcy5jdXJyZW50ID0gaW5kZXg7XG4gICAgdGhpcy50YWJsZVtpbmRleF0gPSBjb2x1bW47XG4gICAgdGhpcy50YWJsZS5zcGxpY2UoaW5kZXggKyAxKTtcbiAgICB0aGlzLmxleGVyU3RhdGUgPSBjb2x1bW4ubGV4ZXJTdGF0ZTtcblxuICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcbn07XG5cbi8vIG5iLiBkZXByZWNhdGVkOiB1c2Ugc2F2ZS9yZXN0b3JlIGluc3RlYWQhXG5QYXJzZXIucHJvdG90eXBlLnJld2luZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgb3B0aW9uIGBrZWVwSGlzdG9yeWAgdG8gZW5hYmxlIHJld2luZGluZycpXG4gICAgfVxuICAgIC8vIG5iLiByZWNhbGwgY29sdW1uICh0YWJsZSkgaW5kaWNpZXMgZmFsbCBiZXR3ZWVuIHRva2VuIGluZGljaWVzLlxuICAgIC8vICAgICAgICBjb2wgMCAgIC0tICAgdG9rZW4gMCAgIC0tICAgY29sIDFcbiAgICB0aGlzLnJlc3RvcmUodGhpcy50YWJsZVtpbmRleF0pO1xufTtcblxuUGFyc2VyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXR1cm4gdGhlIHBvc3NpYmxlIHBhcnNpbmdzXG4gICAgdmFyIGNvbnNpZGVyYXRpb25zID0gW107XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5ncmFtbWFyLnN0YXJ0O1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMudGFibGUubGVuZ3RoIC0gMV1cbiAgICBjb2x1bW4uc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQucnVsZS5uYW1lID09PSBzdGFydFxuICAgICAgICAgICAgICAgICYmIHQuZG90ID09PSB0LnJ1bGUuc3ltYm9scy5sZW5ndGhcbiAgICAgICAgICAgICAgICAmJiB0LnJlZmVyZW5jZSA9PT0gMFxuICAgICAgICAgICAgICAgICYmIHQuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgIGNvbnNpZGVyYXRpb25zLnB1c2godCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc2lkZXJhdGlvbnMubWFwKGZ1bmN0aW9uKGMpIHtyZXR1cm4gYy5kYXRhOyB9KTtcbn07XG5cbnJldHVybiB7XG4gICAgUGFyc2VyOiBQYXJzZXIsXG4gICAgR3JhbW1hcjogR3JhbW1hcixcbiAgICBSdWxlOiBSdWxlLFxufTtcblxufSkpO1xuIl19
