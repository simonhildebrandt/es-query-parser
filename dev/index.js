(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _index = require("../es/index.js");

$('#data').on('input', function (event) {
  var result = new _index.Parser(event.target.value);

  if (result.isValid()) {
    $('#error').html("");
    $('#results').html(JSON.stringify(result.results(), null, '\t'));
    $('#data').css({
      borderColor: '#AAFFAA'
    });
  } else {
    if (result.isIncomplete()) {
      $('#error').html(result.input + " isn't a complete query");
      $('#data').css({
        borderColor: '#FFFFAA'
      });
      $('#results').html("");
    } else {
      $('#error').html('"' + event.target.value + "\" has an error at " + (result.errorOffset() + 1));
      $('#data').css({
        borderColor: '#FFAAAA'
      });
      $('#results').html("");
    }
  }
});

},{"../es/index.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _grammar = _interopRequireDefault(require("../grammar.js"));

var _nearley = _interopRequireDefault(require("nearley"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Parser =
/*#__PURE__*/
function () {
  function Parser(input) {
    _classCallCheck(this, Parser);

    this.input = input;
    this.parser = new _nearley.default.Parser(_grammar.default.ParserRules, _grammar.default.ParserStart);

    try {
      this.parser.feed(this.input);
    } catch (e) {
      this.error = e;
    }
  }

  _createClass(Parser, [{
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

  return Parser;
}(); // Here's how Nearley works:

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


exports.Parser = Parser;

},{"../grammar.js":3,"nearley":4}],3:[function(require,module,exports){
"use strict";

// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  var grammar = {
    Lexer: undefined,
    ParserRules: [{
      "name": "_$ebnf$1",
      "symbols": []
    }, {
      "name": "_$ebnf$1",
      "symbols": ["_$ebnf$1", "wschar"],
      "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      "name": "_",
      "symbols": ["_$ebnf$1"],
      "postprocess": function postprocess(d) {
        return null;
      }
    }, {
      "name": "__$ebnf$1",
      "symbols": ["wschar"]
    }, {
      "name": "__$ebnf$1",
      "symbols": ["__$ebnf$1", "wschar"],
      "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      "name": "__",
      "symbols": ["__$ebnf$1"],
      "postprocess": function postprocess(d) {
        return null;
      }
    }, {
      "name": "wschar",
      "symbols": [/[ \t\n\v\f]/],
      "postprocess": id
    }, {
      "name": "MAIN",
      "symbols": ["_", "clause", "_"],
      "postprocess": function postprocess(data, location, reject) {
        return data[1][0];
      }
    }, {
      "name": "clause",
      "symbols": ["grouped"]
    }, {
      "name": "clause",
      "symbols": ["bracketed"]
    }, {
      "name": "clause",
      "symbols": ["simple"]
    }, {
      "name": "grouped",
      "symbols": ["clause", "__", "logical", "__", "clause"],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: "logical",
          offset: location,
          operator: data[2][0][0],
          children: [data[0][0], data[4][0]]
        };
      }
    }, {
      "name": "simple",
      "symbols": ["match"],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: "simple",
          offset: location,
          value: data[0][0]
        };
      }
    }, {
      "name": "bracketed",
      "symbols": [{
        "literal": "("
      }, "_", "clause", "_", {
        "literal": ")"
      }],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: "bracketed",
          offset: location,
          value: data[2][0]
        };
      }
    }, {
      "name": "logical",
      "symbols": ["logicaloperator"]
    }, {
      "name": "logicaloperator$string$1",
      "symbols": [{
        "literal": "A"
      }, {
        "literal": "N"
      }, {
        "literal": "D"
      }],
      "postprocess": function joiner(d) {
        return d.join('');
      }
    }, {
      "name": "logicaloperator",
      "symbols": ["logicaloperator$string$1"]
    }, {
      "name": "logicaloperator$string$2",
      "symbols": [{
        "literal": "O"
      }, {
        "literal": "R"
      }],
      "postprocess": function joiner(d) {
        return d.join('');
      }
    }, {
      "name": "logicaloperator",
      "symbols": ["logicaloperator$string$2"]
    }, {
      "name": "match",
      "symbols": ["field_and_string"]
    }, {
      "name": "match",
      "symbols": ["string"]
    }, {
      "name": "field_and_string",
      "symbols": ["field", {
        "literal": ":"
      }, "string"],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: 'field',
          offset: location,
          field: data[0],
          value: data[2].value
        };
      }
    }, {
      "name": "field$ebnf$1",
      "symbols": ["wordchars"]
    }, {
      "name": "field$ebnf$1",
      "symbols": ["field$ebnf$1", "wordchars"],
      "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      "name": "field",
      "symbols": ["field$ebnf$1"],
      "postprocess": function postprocess(data, location, reject) {
        return data[0].join("");
      }
    }, {
      "name": "string",
      "symbols": ["string_or_quoted_string"],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: 'field',
          offset: location,
          field: null,
          value: data[0][0]
        };
      }
    }, {
      "name": "string_or_quoted_string",
      "symbols": ["values"]
    }, {
      "name": "string_or_quoted_string",
      "symbols": ["quoted_string"]
    }, {
      "name": "values$ebnf$1",
      "symbols": ["value"]
    }, {
      "name": "values$ebnf$1",
      "symbols": ["values$ebnf$1", "value"],
      "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      "name": "values",
      "symbols": ["values$ebnf$1"],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: "literal",
          offset: location,
          value: data[0].join("")
        };
      }
    }, {
      "name": "quoted_string$ebnf$1",
      "symbols": ["value_or_space"]
    }, {
      "name": "quoted_string$ebnf$1",
      "symbols": ["quoted_string$ebnf$1", "value_or_space"],
      "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      "name": "quoted_string",
      "symbols": [{
        "literal": "\""
      }, "quoted_string$ebnf$1", {
        "literal": "\""
      }],
      "postprocess": function postprocess(data, location, reject) {
        return {
          type: "quoted",
          offset: location,
          value: data[1].join("")
        };
      }
    }, {
      "name": "value",
      "symbols": ["wordchars"]
    }, {
      "name": "value",
      "symbols": [{
        "literal": "\\"
      }, "escaped_value"]
    }, {
      "name": "value_or_space",
      "symbols": ["value"]
    }, {
      "name": "value_or_space",
      "symbols": [{
        "literal": " "
      }]
    }, {
      "name": "escaped_value",
      "symbols": [/[\(\)]/]
    }, {
      "name": "wordchars",
      "symbols": [/[a-zA-Z0-9_-]/]
    }],
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
        var copy = left.nextState(right);
        this.states.push(copy);
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
            var literal = token.text !== undefined ? token.text : token.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvZGVtby5qcyIsImVzL2luZGV4LmpzIiwiZ3JhbW1hci5qcyIsIm5vZGVfbW9kdWxlcy9uZWFybGV5L2xpYi9uZWFybGV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsRUFBWCxDQUFjLE9BQWQsRUFBdUIsVUFBQyxLQUFELEVBQVc7QUFDaEMsTUFBSSxNQUFNLEdBQUcsSUFBSSxhQUFKLENBQVcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxLQUF4QixDQUFiOztBQUNBLE1BQUcsTUFBTSxDQUFDLE9BQVAsRUFBSCxFQUFxQjtBQUNuQixJQUFBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxJQUFaLENBQWlCLEVBQWpCO0FBQ0EsSUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsSUFBZCxDQUFtQixJQUFJLENBQUMsU0FBTCxDQUFlLE1BQU0sQ0FBQyxPQUFQLEVBQWYsRUFBaUMsSUFBakMsRUFBdUMsSUFBdkMsQ0FBbkI7QUFDQSxJQUFBLENBQUMsQ0FBQyxPQUFELENBQUQsQ0FBVyxHQUFYLENBQWU7QUFBQyxNQUFBLFdBQVcsRUFBRTtBQUFkLEtBQWY7QUFDRCxHQUpELE1BSU87QUFDTCxRQUFHLE1BQU0sQ0FBQyxZQUFQLEVBQUgsRUFBMEI7QUFDeEIsTUFBQSxDQUFDLENBQUMsUUFBRCxDQUFELENBQVksSUFBWixDQUFpQixNQUFNLENBQUMsS0FBUCxHQUFlLHlCQUFoQztBQUNBLE1BQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLEdBQVgsQ0FBZTtBQUFDLFFBQUEsV0FBVyxFQUFFO0FBQWQsT0FBZjtBQUNBLE1BQUEsQ0FBQyxDQUFDLFVBQUQsQ0FBRCxDQUFjLElBQWQsQ0FBbUIsRUFBbkI7QUFDRCxLQUpELE1BSU87QUFDTCxNQUFBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxJQUFa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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnLi4vZXMvaW5kZXguanMnXG5cbiQoJyNkYXRhJykub24oJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gIGxldCByZXN1bHQgPSBuZXcgUGFyc2VyKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgaWYocmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICQoJyNlcnJvcicpLmh0bWwoXCJcIilcbiAgICAkKCcjcmVzdWx0cycpLmh0bWwoSlNPTi5zdHJpbmdpZnkocmVzdWx0LnJlc3VsdHMoKSwgbnVsbCwgJ1xcdCcpKVxuICAgICQoJyNkYXRhJykuY3NzKHtib3JkZXJDb2xvcjogJyNBQUZGQUEnfSlcbiAgfSBlbHNlIHtcbiAgICBpZihyZXN1bHQuaXNJbmNvbXBsZXRlKCkpIHtcbiAgICAgICQoJyNlcnJvcicpLmh0bWwocmVzdWx0LmlucHV0ICsgXCIgaXNuJ3QgYSBjb21wbGV0ZSBxdWVyeVwiKVxuICAgICAgJCgnI2RhdGEnKS5jc3Moe2JvcmRlckNvbG9yOiAnI0ZGRkZBQSd9KVxuICAgICAgJCgnI3Jlc3VsdHMnKS5odG1sKFwiXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNlcnJvcicpLmh0bWwoJ1wiJyArIGV2ZW50LnRhcmdldC52YWx1ZSArIFwiXFxcIiBoYXMgYW4gZXJyb3IgYXQgXCIgKyAocmVzdWx0LmVycm9yT2Zmc2V0KCkgKyAxKSlcbiAgICAgICQoJyNkYXRhJykuY3NzKHtib3JkZXJDb2xvcjogJyNGRkFBQUEnfSlcbiAgICAgICQoJyNyZXN1bHRzJykuaHRtbChcIlwiKVxuICAgIH1cbiAgfVxufSlcbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuaW1wb3J0IGdyYW1tYXIgZnJvbSBcIi4uL2dyYW1tYXIuanNcIjtcbmltcG9ydCBuZWFybGV5IGZyb20gXCJuZWFybGV5XCI7XG5cbnZhciBQYXJzZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQYXJzZXIoaW5wdXQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFyc2VyKTtcblxuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLnBhcnNlciA9IG5ldyBuZWFybGV5LlBhcnNlcihncmFtbWFyLlBhcnNlclJ1bGVzLCBncmFtbWFyLlBhcnNlclN0YXJ0KTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhcnNlci5mZWVkKHRoaXMuaW5wdXQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlO1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQYXJzZXIsIFt7XG4gICAga2V5OiBcInJlc3VsdHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzdWx0cygpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlci5yZXN1bHRzIHx8IFtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZXN1bHRDb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXN1bHRDb3VudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdHMoKS5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzSW5jb21wbGV0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0luY29tcGxldGUoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuZXJyb3IgJiYgdGhpcy5yZXN1bHRDb3VudCgpID09IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImlzVmFsaWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc3VsdENvdW50KCkgPiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlcnJvck9mZnNldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvck9mZnNldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yLm9mZnNldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGFyc2VyO1xufSgpOyAvLyBIZXJlJ3MgaG93IE5lYXJsZXkgd29ya3M6XG5cbi8qXG5mdW5jdGlvbiB2YWxpZGF0ZSh2YWx1ZSkge1xuICB0cnkge1xuICAgIGlmIChwYXJzZSh2YWx1ZSkucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gXCJWYWxpZC5cIlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJOb3QgKnlldCogdmFsaWQuXCJcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBcIk5vdCB2YWxpZC5cIlxuICB9XG59XG4qL1xuXG5cbmV4cG9ydCB7IFBhcnNlciB9OyIsIi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IG5lYXJsZXksIHZlcnNpb24gMi4xNi4wXG4vLyBodHRwOi8vZ2l0aHViLmNvbS9IYXJkbWF0aDEyMy9uZWFybGV5XG4oZnVuY3Rpb24gKCkge1xuZnVuY3Rpb24gaWQoeCkgeyByZXR1cm4geFswXTsgfVxudmFyIGdyYW1tYXIgPSB7XG4gICAgTGV4ZXI6IHVuZGVmaW5lZCxcbiAgICBQYXJzZXJSdWxlczogW1xuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJfJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiXyRlYm5mJDFcIiwgXCJ3c2NoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcIl9cIiwgXCJzeW1ib2xzXCI6IFtcIl8kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX18kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ3c2NoYXJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJfXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiLCBcIndzY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX19cIiwgXCJzeW1ib2xzXCI6IFtcIl9fJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcIndzY2hhclwiLCBcInN5bWJvbHNcIjogWy9bIFxcdFxcblxcdlxcZl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcIk1BSU5cIiwgXCJzeW1ib2xzXCI6IFtcIl9cIiwgXCJjbGF1c2VcIiwgXCJfXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBkYXRhWzFdWzBdO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wiZ3JvdXBlZFwiXX0sXG4gICAge1wibmFtZVwiOiBcImNsYXVzZVwiLCBcInN5bWJvbHNcIjogW1wiYnJhY2tldGVkXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwiY2xhdXNlXCIsIFwic3ltYm9sc1wiOiBbXCJzaW1wbGVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJncm91cGVkXCIsIFwic3ltYm9sc1wiOiBbXCJjbGF1c2VcIiwgXCJfX1wiLCBcImxvZ2ljYWxcIiwgXCJfX1wiLCBcImNsYXVzZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiBcImxvZ2ljYWxcIiwgb2Zmc2V0OiBsb2NhdGlvbiwgb3BlcmF0b3I6IGRhdGFbMl1bMF1bMF0sIGNoaWxkcmVuOiBbZGF0YVswXVswXSwgZGF0YVs0XVswXV0gfTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJzaW1wbGVcIiwgXCJzeW1ib2xzXCI6IFtcIm1hdGNoXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiB7IHR5cGU6IFwic2ltcGxlXCIsIG9mZnNldDogbG9jYXRpb24sIHZhbHVlOiBkYXRhWzBdWzBdIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiYnJhY2tldGVkXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiKFwifSwgXCJfXCIsIFwiY2xhdXNlXCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCIpXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiBcImJyYWNrZXRlZFwiLCBvZmZzZXQ6IGxvY2F0aW9uLCB2YWx1ZTogZGF0YVsyXVswXSB9O1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxcIiwgXCJzeW1ib2xzXCI6IFtcImxvZ2ljYWxvcGVyYXRvclwiXX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvciRzdHJpbmckMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIkFcIn0sIHtcImxpdGVyYWxcIjpcIk5cIn0sIHtcImxpdGVyYWxcIjpcIkRcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImxvZ2ljYWxvcGVyYXRvclwiLCBcInN5bWJvbHNcIjogW1wibG9naWNhbG9wZXJhdG9yJHN0cmluZyQxXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwibG9naWNhbG9wZXJhdG9yJHN0cmluZyQyXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiT1wifSwge1wibGl0ZXJhbFwiOlwiUlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwibG9naWNhbG9wZXJhdG9yXCIsIFwic3ltYm9sc1wiOiBbXCJsb2dpY2Fsb3BlcmF0b3Ikc3RyaW5nJDJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJtYXRjaFwiLCBcInN5bWJvbHNcIjogW1wiZmllbGRfYW5kX3N0cmluZ1wiXX0sXG4gICAge1wibmFtZVwiOiBcIm1hdGNoXCIsIFwic3ltYm9sc1wiOiBbXCJzdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZF9hbmRfc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJmaWVsZFwiLCB7XCJsaXRlcmFsXCI6XCI6XCJ9LCBcInN0cmluZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiAnZmllbGQnLCBvZmZzZXQ6IGxvY2F0aW9uLCBmaWVsZDogZGF0YVswXSwgdmFsdWU6IGRhdGFbMl0udmFsdWUgfTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIndvcmRjaGFyc1wiXX0sXG4gICAge1wibmFtZVwiOiBcImZpZWxkJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiZmllbGQkZWJuZiQxXCIsIFwid29yZGNoYXJzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJmaWVsZFwiLCBcInN5bWJvbHNcIjogW1wiZmllbGQkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiBkYXRhWzBdLmpvaW4oXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbXCJzdHJpbmdfb3JfcXVvdGVkX3N0cmluZ1wiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24gKGRhdGEsIGxvY2F0aW9uLCByZWplY3QpIHtcbiAgICAgICAgXHRyZXR1cm4geyB0eXBlOiAnZmllbGQnLCBvZmZzZXQ6IGxvY2F0aW9uLCBmaWVsZDogbnVsbCwgdmFsdWU6IGRhdGFbMF1bMF0gfTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJzdHJpbmdfb3JfcXVvdGVkX3N0cmluZ1wiLCBcInN5bWJvbHNcIjogW1widmFsdWVzXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwic3RyaW5nX29yX3F1b3RlZF9zdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFtcInF1b3RlZF9zdHJpbmdcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZXMkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZVwiXX0sXG4gICAge1wibmFtZVwiOiBcInZhbHVlcyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlcyRlYm5mJDFcIiwgXCJ2YWx1ZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVzXCIsIFwic3ltYm9sc1wiOiBbXCJ2YWx1ZXMkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiB7IHR5cGU6IFwibGl0ZXJhbFwiLCBvZmZzZXQ6IGxvY2F0aW9uLCB2YWx1ZTogZGF0YVswXS5qb2luKFwiXCIpIH07XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwicXVvdGVkX3N0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlX29yX3NwYWNlXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwicXVvdGVkX3N0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIFwidmFsdWVfb3Jfc3BhY2VcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInF1b3RlZF9zdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJcXFwiXCJ9LCBcInF1b3RlZF9zdHJpbmckZWJuZiQxXCIsIHtcImxpdGVyYWxcIjpcIlxcXCJcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbiAoZGF0YSwgbG9jYXRpb24sIHJlamVjdCkge1xuICAgICAgICBcdHJldHVybiB7IHR5cGU6IFwicXVvdGVkXCIsIG9mZnNldDogbG9jYXRpb24sIHZhbHVlOiBkYXRhWzFdLmpvaW4oXCJcIikgfTtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZVwiLCBcInN5bWJvbHNcIjogW1wid29yZGNoYXJzXCJdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJcXFxcXCJ9LCBcImVzY2FwZWRfdmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZV9vcl9zcGFjZVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZV9vcl9zcGFjZVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIiBcIn1dfSxcbiAgICB7XCJuYW1lXCI6IFwiZXNjYXBlZF92YWx1ZVwiLCBcInN5bWJvbHNcIjogWy9bXFwoXFwpXS9dfSxcbiAgICB7XCJuYW1lXCI6IFwid29yZGNoYXJzXCIsIFwic3ltYm9sc1wiOiBbL1thLXpBLVowLTlfLV0vXX1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJNQUlOXCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuIiwiKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5uZWFybGV5ID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24oKSB7XG5cbiAgICBmdW5jdGlvbiBSdWxlKG5hbWUsIHN5bWJvbHMsIHBvc3Rwcm9jZXNzKSB7XG4gICAgICAgIHRoaXMuaWQgPSArK1J1bGUuaGlnaGVzdElkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN5bWJvbHMgPSBzeW1ib2xzOyAgICAgICAgLy8gYSBsaXN0IG9mIGxpdGVyYWwgfCByZWdleCBjbGFzcyB8IG5vbnRlcm1pbmFsXG4gICAgICAgIHRoaXMucG9zdHByb2Nlc3MgPSBwb3N0cHJvY2VzcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFJ1bGUuaGlnaGVzdElkID0gMDtcblxuICAgIFJ1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24od2l0aEN1cnNvckF0KSB7XG4gICAgICAgIGZ1bmN0aW9uIHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5saXRlcmFsID8gSlNPTi5zdHJpbmdpZnkoZS5saXRlcmFsKSA6XG4gICAgICAgICAgICAgICAgICAgZS50eXBlID8gJyUnICsgZS50eXBlIDogZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzeW1ib2xTZXF1ZW5jZSA9ICh0eXBlb2Ygd2l0aEN1cnNvckF0ID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3ltYm9scy5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICggICB0aGlzLnN5bWJvbHMuc2xpY2UoMCwgd2l0aEN1cnNvckF0KS5tYXAoc3RyaW5naWZ5U3ltYm9sU2VxdWVuY2UpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiDil48gXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgdGhpcy5zeW1ib2xzLnNsaWNlKHdpdGhDdXJzb3JBdCkubWFwKHN0cmluZ2lmeVN5bWJvbFNlcXVlbmNlKS5qb2luKCcgJykgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIiDihpIgXCIgKyBzeW1ib2xTZXF1ZW5jZTtcbiAgICB9XG5cblxuICAgIC8vIGEgU3RhdGUgaXMgYSBydWxlIGF0IGEgcG9zaXRpb24gZnJvbSBhIGdpdmVuIHN0YXJ0aW5nIHBvaW50IGluIHRoZSBpbnB1dCBzdHJlYW0gKHJlZmVyZW5jZSlcbiAgICBmdW5jdGlvbiBTdGF0ZShydWxlLCBkb3QsIHJlZmVyZW5jZSwgd2FudGVkQnkpIHtcbiAgICAgICAgdGhpcy5ydWxlID0gcnVsZTtcbiAgICAgICAgdGhpcy5kb3QgPSBkb3Q7XG4gICAgICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlO1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy53YW50ZWRCeSA9IHdhbnRlZEJ5O1xuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSB0aGlzLmRvdCA9PT0gcnVsZS5zeW1ib2xzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwie1wiICsgdGhpcy5ydWxlLnRvU3RyaW5nKHRoaXMuZG90KSArIFwifSwgZnJvbTogXCIgKyAodGhpcy5yZWZlcmVuY2UgfHwgMCk7XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5uZXh0U3RhdGUgPSBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUodGhpcy5ydWxlLCB0aGlzLmRvdCArIDEsIHRoaXMucmVmZXJlbmNlLCB0aGlzLndhbnRlZEJ5KTtcbiAgICAgICAgc3RhdGUubGVmdCA9IHRoaXM7XG4gICAgICAgIHN0YXRlLnJpZ2h0ID0gY2hpbGQ7XG4gICAgICAgIGlmIChzdGF0ZS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICBzdGF0ZS5kYXRhID0gc3RhdGUuYnVpbGQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUucmlnaHQuZGF0YSk7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5sZWZ0O1xuICAgICAgICB9IHdoaWxlIChub2RlLmxlZnQpO1xuICAgICAgICBjaGlsZHJlbi5yZXZlcnNlKCk7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9O1xuXG4gICAgU3RhdGUucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5ydWxlLnBvc3Rwcm9jZXNzKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnJ1bGUucG9zdHByb2Nlc3ModGhpcy5kYXRhLCB0aGlzLnJlZmVyZW5jZSwgUGFyc2VyLmZhaWwpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgZnVuY3Rpb24gQ29sdW1uKGdyYW1tYXIsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy53YW50cyA9IHt9OyAvLyBzdGF0ZXMgaW5kZXhlZCBieSB0aGUgbm9uLXRlcm1pbmFsIHRoZXkgZXhwZWN0XG4gICAgICAgIHRoaXMuc2Nhbm5hYmxlID0gW107IC8vIGxpc3Qgb2Ygc3RhdGVzIHRoYXQgZXhwZWN0IGEgdG9rZW5cbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB7fTsgLy8gc3RhdGVzIHRoYXQgYXJlIG51bGxhYmxlXG4gICAgfVxuXG5cbiAgICBDb2x1bW4ucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihuZXh0Q29sdW1uKSB7XG4gICAgICAgIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgICAgICAgdmFyIHdhbnRzID0gdGhpcy53YW50cztcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IHRoaXMuY29tcGxldGVkO1xuXG4gICAgICAgIGZvciAodmFyIHcgPSAwOyB3IDwgc3RhdGVzLmxlbmd0aDsgdysrKSB7IC8vIG5iLiB3ZSBwdXNoKCkgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW3ddO1xuXG4gICAgICAgICAgICBpZiAoc3RhdGUuaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5kYXRhICE9PSBQYXJzZXIuZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICB2YXIgd2FudGVkQnkgPSBzdGF0ZS53YW50ZWRCeTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHdhbnRlZEJ5Lmxlbmd0aDsgaS0tOyApIHsgLy8gdGhpcyBsaW5lIGlzIGhvdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlZnQgPSB3YW50ZWRCeVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUobGVmdCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lhbC1jYXNlIG51bGxhYmxlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUucmVmZXJlbmNlID09PSB0aGlzLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgZnV0dXJlIHByZWRpY3RvcnMgb2YgdGhpcyBydWxlIGdldCBjb21wbGV0ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gc3RhdGUucnVsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuY29tcGxldGVkW2V4cF0gPSB0aGlzLmNvbXBsZXRlZFtleHBdIHx8IFtdKS5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBxdWV1ZSBzY2FubmFibGUgc3RhdGVzXG4gICAgICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXhwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5uYWJsZS5wdXNoKHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcHJlZGljdFxuICAgICAgICAgICAgICAgIGlmICh3YW50c1tleHBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhbnRzW2V4cF0ucHVzaChzdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5oYXNPd25Qcm9wZXJ0eShleHApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVsbHMgPSBjb21wbGV0ZWRbZXhwXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBudWxsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKHN0YXRlLCByaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YW50c1tleHBdID0gW3N0YXRlXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0KGV4cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQ29sdW1uLnByb3RvdHlwZS5wcmVkaWN0ID0gZnVuY3Rpb24oZXhwKSB7XG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMuZ3JhbW1hci5ieU5hbWVbZXhwXSB8fCBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgciA9IHJ1bGVzW2ldO1xuICAgICAgICAgICAgdmFyIHdhbnRlZEJ5ID0gdGhpcy53YW50c1tleHBdO1xuICAgICAgICAgICAgdmFyIHMgPSBuZXcgU3RhdGUociwgMCwgdGhpcy5pbmRleCwgd2FudGVkQnkpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvbHVtbi5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgICB2YXIgY29weSA9IGxlZnQubmV4dFN0YXRlKHJpZ2h0KTtcbiAgICAgICAgdGhpcy5zdGF0ZXMucHVzaChjb3B5KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIEdyYW1tYXIocnVsZXMsIHN0YXJ0KSB7XG4gICAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0IHx8IHRoaXMucnVsZXNbMF0ubmFtZTtcbiAgICAgICAgdmFyIGJ5TmFtZSA9IHRoaXMuYnlOYW1lID0ge307XG4gICAgICAgIHRoaXMucnVsZXMuZm9yRWFjaChmdW5jdGlvbihydWxlKSB7XG4gICAgICAgICAgICBpZiAoIWJ5TmFtZS5oYXNPd25Qcm9wZXJ0eShydWxlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgYnlOYW1lW3J1bGUubmFtZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ5TmFtZVtydWxlLm5hbWVdLnB1c2gocnVsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNvIHdlIGNhbiBhbGxvdyBwYXNzaW5nIChydWxlcywgc3RhcnQpIGRpcmVjdGx5IHRvIFBhcnNlciBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICBHcmFtbWFyLmZyb21Db21waWxlZCA9IGZ1bmN0aW9uKHJ1bGVzLCBzdGFydCkge1xuICAgICAgICB2YXIgbGV4ZXIgPSBydWxlcy5MZXhlcjtcbiAgICAgICAgaWYgKHJ1bGVzLlBhcnNlclN0YXJ0KSB7XG4gICAgICAgICAgc3RhcnQgPSBydWxlcy5QYXJzZXJTdGFydDtcbiAgICAgICAgICBydWxlcyA9IHJ1bGVzLlBhcnNlclJ1bGVzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBydWxlcyA9IHJ1bGVzLm1hcChmdW5jdGlvbiAocikgeyByZXR1cm4gKG5ldyBSdWxlKHIubmFtZSwgci5zeW1ib2xzLCByLnBvc3Rwcm9jZXNzKSk7IH0pO1xuICAgICAgICB2YXIgZyA9IG5ldyBHcmFtbWFyKHJ1bGVzLCBzdGFydCk7XG4gICAgICAgIGcubGV4ZXIgPSBsZXhlcjsgLy8gbmIuIHN0b3JpbmcgbGV4ZXIgb24gR3JhbW1hciBpcyBpZmZ5LCBidXQgdW5hdm9pZGFibGVcbiAgICAgICAgcmV0dXJuIGc7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBTdHJlYW1MZXhlcigpIHtcbiAgICAgIHRoaXMucmVzZXQoXCJcIik7XG4gICAgfVxuXG4gICAgU3RyZWFtTGV4ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oZGF0YSwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5idWZmZXIgPSBkYXRhO1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5saW5lID0gc3RhdGUgPyBzdGF0ZS5saW5lIDogMTtcbiAgICAgICAgdGhpcy5sYXN0TGluZUJyZWFrID0gc3RhdGUgPyAtc3RhdGUuY29sIDogMDtcbiAgICB9XG5cbiAgICBTdHJlYW1MZXhlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdGhpcy5idWZmZXJbdGhpcy5pbmRleCsrXTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5lICs9IDE7XG4gICAgICAgICAgICAgIHRoaXMubGFzdExpbmVCcmVhayA9IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge3ZhbHVlOiBjaH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBTdHJlYW1MZXhlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogdGhpcy5saW5lLFxuICAgICAgICBjb2w6IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWssXG4gICAgICB9XG4gICAgfVxuXG4gICAgU3RyZWFtTGV4ZXIucHJvdG90eXBlLmZvcm1hdEVycm9yID0gZnVuY3Rpb24odG9rZW4sIG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gbmIuIHRoaXMgZ2V0cyBjYWxsZWQgYWZ0ZXIgY29uc3VtaW5nIHRoZSBvZmZlbmRpbmcgdG9rZW4sXG4gICAgICAgIC8vIHNvIHRoZSBjdWxwcml0IGlzIGluZGV4LTFcbiAgICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICBpZiAodHlwZW9mIGJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmluZGV4T2YoJ1xcbicsIHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgaWYgKG5leHRMaW5lQnJlYWsgPT09IC0xKSBuZXh0TGluZUJyZWFrID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBsaW5lID0gYnVmZmVyLnN1YnN0cmluZyh0aGlzLmxhc3RMaW5lQnJlYWssIG5leHRMaW5lQnJlYWspXG4gICAgICAgICAgICB2YXIgY29sID0gdGhpcy5pbmRleCAtIHRoaXMubGFzdExpbmVCcmVhaztcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCIgYXQgbGluZSBcIiArIHRoaXMubGluZSArIFwiIGNvbCBcIiArIGNvbCArIFwiOlxcblxcblwiO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIiAgXCIgKyBsaW5lICsgXCJcXG5cIlxuICAgICAgICAgICAgbWVzc2FnZSArPSBcIiAgXCIgKyBBcnJheShjb2wpLmpvaW4oXCIgXCIpICsgXCJeXCJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UgKyBcIiBhdCBpbmRleCBcIiArICh0aGlzLmluZGV4IC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIFBhcnNlcihydWxlcywgc3RhcnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHJ1bGVzIGluc3RhbmNlb2YgR3JhbW1hcikge1xuICAgICAgICAgICAgdmFyIGdyYW1tYXIgPSBydWxlcztcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gc3RhcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZ3JhbW1hciA9IEdyYW1tYXIuZnJvbUNvbXBpbGVkKHJ1bGVzLCBzdGFydCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcblxuICAgICAgICAvLyBSZWFkIG9wdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAga2VlcEhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICAgICAgbGV4ZXI6IGdyYW1tYXIubGV4ZXIgfHwgbmV3IFN0cmVhbUxleGVyLFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gKG9wdGlvbnMgfHwge30pKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHVwIGxleGVyXG4gICAgICAgIHRoaXMubGV4ZXIgPSB0aGlzLm9wdGlvbnMubGV4ZXI7XG4gICAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBTZXR1cCBhIHRhYmxlXG4gICAgICAgIHZhciBjb2x1bW4gPSBuZXcgQ29sdW1uKGdyYW1tYXIsIDApO1xuICAgICAgICB2YXIgdGFibGUgPSB0aGlzLnRhYmxlID0gW2NvbHVtbl07XG5cbiAgICAgICAgLy8gSSBjb3VsZCBiZSBleHBlY3RpbmcgYW55dGhpbmcuXG4gICAgICAgIGNvbHVtbi53YW50c1tncmFtbWFyLnN0YXJ0XSA9IFtdO1xuICAgICAgICBjb2x1bW4ucHJlZGljdChncmFtbWFyLnN0YXJ0KTtcbiAgICAgICAgLy8gVE9ETyB3aGF0IGlmIHN0YXJ0IHJ1bGUgaXMgbnVsbGFibGU/XG4gICAgICAgIGNvbHVtbi5wcm9jZXNzKCk7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDA7IC8vIHRva2VuIGluZGV4XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgcmVzZXJ2ZWQgdG9rZW4gZm9yIGluZGljYXRpbmcgYSBwYXJzZSBmYWlsXG4gICAgUGFyc2VyLmZhaWwgPSB7fTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUuZmVlZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgICAgIHZhciBsZXhlciA9IHRoaXMubGV4ZXI7XG4gICAgICAgIGxleGVyLnJlc2V0KGNodW5rLCB0aGlzLmxleGVyU3RhdGUpO1xuXG4gICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgd2hpbGUgKHRva2VuID0gbGV4ZXIubmV4dCgpKSB7XG4gICAgICAgICAgICAvLyBXZSBhZGQgbmV3IHN0YXRlcyB0byB0YWJsZVtjdXJyZW50KzFdXG4gICAgICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuXG4gICAgICAgICAgICAvLyBHQyB1bnVzZWQgc3RhdGVzXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudCAtIDFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbiA9IHRoaXMuY3VycmVudCArIDE7XG4gICAgICAgICAgICB2YXIgbmV4dENvbHVtbiA9IG5ldyBDb2x1bW4odGhpcy5ncmFtbWFyLCBuKTtcbiAgICAgICAgICAgIHRoaXMudGFibGUucHVzaChuZXh0Q29sdW1uKTtcblxuICAgICAgICAgICAgLy8gQWR2YW5jZSBhbGwgdG9rZW5zIHRoYXQgZXhwZWN0IHRoZSBzeW1ib2xcbiAgICAgICAgICAgIHZhciBsaXRlcmFsID0gdG9rZW4udGV4dCAhPT0gdW5kZWZpbmVkID8gdG9rZW4udGV4dCA6IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gbGV4ZXIuY29uc3RydWN0b3IgPT09IFN0cmVhbUxleGVyID8gdG9rZW4udmFsdWUgOiB0b2tlbjtcbiAgICAgICAgICAgIHZhciBzY2FubmFibGUgPSBjb2x1bW4uc2Nhbm5hYmxlO1xuICAgICAgICAgICAgZm9yICh2YXIgdyA9IHNjYW5uYWJsZS5sZW5ndGg7IHctLTsgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gc2Nhbm5hYmxlW3ddO1xuICAgICAgICAgICAgICAgIHZhciBleHBlY3QgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gY29uc3VtZSB0aGUgdG9rZW5cbiAgICAgICAgICAgICAgICAvLyBlaXRoZXIgcmVnZXggb3IgbGl0ZXJhbFxuICAgICAgICAgICAgICAgIGlmIChleHBlY3QudGVzdCA/IGV4cGVjdC50ZXN0KHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdC50eXBlID8gZXhwZWN0LnR5cGUgPT09IHRva2VuLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBleHBlY3QubGl0ZXJhbCA9PT0gbGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgaXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBzdGF0ZS5uZXh0U3RhdGUoe2RhdGE6IHZhbHVlLCB0b2tlbjogdG9rZW4sIGlzVG9rZW46IHRydWUsIHJlZmVyZW5jZTogbiAtIDF9KTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbi5zdGF0ZXMucHVzaChuZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5leHQsIGZvciBlYWNoIG9mIHRoZSBydWxlcywgd2UgZWl0aGVyXG4gICAgICAgICAgICAvLyAoYSkgY29tcGxldGUgaXQsIGFuZCB0cnkgdG8gc2VlIGlmIHRoZSByZWZlcmVuY2Ugcm93IGV4cGVjdGVkIHRoYXRcbiAgICAgICAgICAgIC8vICAgICBydWxlXG4gICAgICAgICAgICAvLyAoYikgcHJlZGljdCB0aGUgbmV4dCBub250ZXJtaW5hbCBpdCBleHBlY3RzIGJ5IGFkZGluZyB0aGF0XG4gICAgICAgICAgICAvLyAgICAgbm9udGVybWluYWwncyBzdGFydCBzdGF0ZVxuICAgICAgICAgICAgLy8gVG8gcHJldmVudCBkdXBsaWNhdGlvbiwgd2UgYWxzbyBrZWVwIHRyYWNrIG9mIHJ1bGVzIHdlIGhhdmUgYWxyZWFkeVxuICAgICAgICAgICAgLy8gYWRkZWRcblxuICAgICAgICAgICAgbmV4dENvbHVtbi5wcm9jZXNzKCk7XG5cbiAgICAgICAgICAgIC8vIElmIG5lZWRlZCwgdGhyb3cgYW4gZXJyb3I6XG4gICAgICAgICAgICBpZiAobmV4dENvbHVtbi5zdGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gTm8gc3RhdGVzIGF0IGFsbCEgVGhpcyBpcyBub3QgZ29vZC5cbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMubGV4ZXIuZm9ybWF0RXJyb3IodG9rZW4sIFwiaW52YWxpZCBzeW50YXhcIikgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJVbmV4cGVjdGVkIFwiICsgKHRva2VuLnR5cGUgPyB0b2tlbi50eXBlICsgXCIgdG9rZW46IFwiIDogXCJcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSArPSBKU09OLnN0cmluZ2lmeSh0b2tlbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdG9rZW4udmFsdWUgOiB0b2tlbikgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgZXJyLm9mZnNldCA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgICAgICAgICBlcnIudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1heWJlIHNhdmUgbGV4ZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgY29sdW1uLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGxleGVyLnNhdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcblxuICAgICAgICAvLyBBbGxvdyBjaGFpbmluZywgZm9yIHdoYXRldmVyIGl0J3Mgd29ydGhcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLmN1cnJlbnRdO1xuICAgICAgICBjb2x1bW4ubGV4ZXJTdGF0ZSA9IHRoaXMubGV4ZXJTdGF0ZTtcbiAgICAgICAgcmV0dXJuIGNvbHVtbjtcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGNvbHVtbi5pbmRleDtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXg7XG4gICAgICAgIHRoaXMudGFibGVbaW5kZXhdID0gY29sdW1uO1xuICAgICAgICB0aGlzLnRhYmxlLnNwbGljZShpbmRleCArIDEpO1xuICAgICAgICB0aGlzLmxleGVyU3RhdGUgPSBjb2x1bW4ubGV4ZXJTdGF0ZTtcblxuICAgICAgICAvLyBJbmNyZW1lbnRhbGx5IGtlZXAgdHJhY2sgb2YgcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSB0aGlzLmZpbmlzaCgpO1xuICAgIH07XG5cbiAgICAvLyBuYi4gZGVwcmVjYXRlZDogdXNlIHNhdmUvcmVzdG9yZSBpbnN0ZWFkIVxuICAgIFBhcnNlci5wcm90b3R5cGUucmV3aW5kID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2V0IG9wdGlvbiBga2VlcEhpc3RvcnlgIHRvIGVuYWJsZSByZXdpbmRpbmcnKVxuICAgICAgICB9XG4gICAgICAgIC8vIG5iLiByZWNhbGwgY29sdW1uICh0YWJsZSkgaW5kaWNpZXMgZmFsbCBiZXR3ZWVuIHRva2VuIGluZGljaWVzLlxuICAgICAgICAvLyAgICAgICAgY29sIDAgICAtLSAgIHRva2VuIDAgICAtLSAgIGNvbCAxXG4gICAgICAgIHRoaXMucmVzdG9yZSh0aGlzLnRhYmxlW2luZGV4XSk7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFJldHVybiB0aGUgcG9zc2libGUgcGFyc2luZ3NcbiAgICAgICAgdmFyIGNvbnNpZGVyYXRpb25zID0gW107XG4gICAgICAgIHZhciBzdGFydCA9IHRoaXMuZ3JhbW1hci5zdGFydDtcbiAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy50YWJsZS5sZW5ndGggLSAxXVxuICAgICAgICBjb2x1bW4uc3RhdGVzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICh0LnJ1bGUubmFtZSA9PT0gc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgJiYgdC5kb3QgPT09IHQucnVsZS5zeW1ib2xzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAmJiB0LnJlZmVyZW5jZSA9PT0gMFxuICAgICAgICAgICAgICAgICAgICAmJiB0LmRhdGEgIT09IFBhcnNlci5mYWlsKSB7XG4gICAgICAgICAgICAgICAgY29uc2lkZXJhdGlvbnMucHVzaCh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb25zaWRlcmF0aW9ucy5tYXAoZnVuY3Rpb24oYykge3JldHVybiBjLmRhdGE7IH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBQYXJzZXI6IFBhcnNlcixcbiAgICAgICAgR3JhbW1hcjogR3JhbW1hcixcbiAgICAgICAgUnVsZTogUnVsZSxcbiAgICB9O1xuXG59KSk7XG4iXX0=
