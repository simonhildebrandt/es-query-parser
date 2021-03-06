/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`tests.js TAP > val?e 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'literal', start: 0, value: 'val?e' } } } ]
`

exports[`tests.js TAP > val\\?e 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'literal', start: 0, value: 'val\\\\,?e' } } } ]
`

exports[`tests.js TAP > val\\(e 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'literal', start: 0, value: 'val\\\\,(e' } } } ]
`

exports[`tests.js TAP > value~0 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'literal', start: 0, value: 'value' } } } ]
`

exports[`tests.js TAP > value 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'literal', start: 0, value: 'value' } } } ]
`

exports[`tests.js TAP > field:value 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: 'field',
       value: { type: 'literal', start: 6, value: 'value' } } } ]
`

exports[`tests.js TAP > logical OR operator 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: 'OR', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 11,
         value: 
          { type: 'field',
            start: 11,
            field: null,
            value: { type: 'literal', start: 11, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > logical AND operator 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: 'AND', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 12,
         value: 
          { type: 'field',
            start: 12,
            field: null,
            value: { type: 'literal', start: 12, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > logical && operator 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: '&&', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 11,
         value: 
          { type: 'field',
            start: 11,
            field: null,
            value: { type: 'literal', start: 11, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > logical NOT operator 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: 'NOT', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 12,
         value: 
          { type: 'field',
            start: 12,
            field: null,
            value: { type: 'literal', start: 12, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > (grouped) 1`] = `
[ { type: 'bracketed',
    start: 0,
    value: 
     { type: 'simple',
       start: 1,
       value: 
        { type: 'field',
          start: 1,
          field: null,
          value: { type: 'literal', start: 1, value: 'grouped' } } } } ]
`

exports[`tests.js TAP >   wschar   1`] = `
[ { type: 'simple',
    start: 2,
    value: 
     { type: 'field',
       start: 2,
       field: null,
       value: { type: 'literal', start: 2, value: 'wschar' } } } ]
`

exports[`tests.js TAP > "quoted" 1`] = `
[ { type: 'simple',
    start: 0,
    value: 
     { type: 'field',
       start: 0,
       field: null,
       value: { type: 'quoted', start: 0, value: '"quoted"' } } } ]
`

exports[`tests.js TAP > logical && operator junk! 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: '&&', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 11,
         value: 
          { type: 'field',
            start: 11,
            field: null,
            value: { type: 'literal', start: 11, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > logical && operator OR 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: '&&', start: 8 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'logical' } } },
       { type: 'simple',
         start: 11,
         value: 
          { type: 'field',
            start: 11,
            field: null,
            value: { type: 'literal', start: 11, value: 'operator' } } } ] } ]
`

exports[`tests.js TAP > n-null OR theasdas:dasda- thisasdasdas 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: 'OR', start: 7 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'n-null' } } },
       { type: 'simple',
         start: 10,
         value: 
          { type: 'field',
            start: 10,
            field: 'theasdas',
            value: { type: 'literal', start: 19, value: 'dasda-' } } } ] } ]
`

exports[`tests.js TAP > this OR that:ss OR assas:s ! 1`] = `
[ { type: 'logical',
    start: 0,
    operator: { value: 'OR', start: 5 },
    children: 
     [ { type: 'simple',
         start: 0,
         value: 
          { type: 'field',
            start: 0,
            field: null,
            value: { type: 'literal', start: 0, value: 'this' } } },
       { type: 'logical',
         start: 8,
         operator: { value: 'OR', start: 16 },
         children: 
          [ { type: 'simple',
              start: 8,
              value: 
               { type: 'field',
                 start: 8,
                 field: 'that',
                 value: { type: 'literal', start: 13, value: 'ss' } } },
            { type: 'simple',
              start: 19,
              value: 
               { type: 'field',
                 start: 19,
                 field: 'assas',
                 value: { type: 'literal', start: 25, value: 's' } } } ] } ] },
  { type: 'logical',
    start: 0,
    operator: { value: 'OR', start: 16 },
    children: 
     [ { type: 'logical',
         start: 0,
         operator: { value: 'OR', start: 5 },
         children: 
          [ { type: 'simple',
              start: 0,
              value: 
               { type: 'field',
                 start: 0,
                 field: null,
                 value: { type: 'literal', start: 0, value: 'this' } } },
            { type: 'simple',
              start: 8,
              value: 
               { type: 'field',
                 start: 8,
                 field: 'that',
                 value: { type: 'literal', start: 13, value: 'ss' } } } ] },
       { type: 'simple',
         start: 19,
         value: 
          { type: 'field',
            start: 19,
            field: 'assas',
            value: { type: 'literal', start: 25, value: 's' } } } ] } ]
`
