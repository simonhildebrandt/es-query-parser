/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`tests.js TAP > val?e 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'literal', offset: 0, value: 'val?e' } ] } } ]
`

exports[`tests.js TAP > val\\?e 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'literal', offset: 0, value: 'val\\\\,?e' } ] } } ]
`

exports[`tests.js TAP > val\\(e 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'literal', offset: 0, value: 'val\\\\,(e' } ] } } ]
`

exports[`tests.js TAP > value~0 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'literal', offset: 0, value: 'value' } ] } } ]
`

exports[`tests.js TAP > value 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'literal', offset: 0, value: 'value' } ] } } ]
`

exports[`tests.js TAP > field:value 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: 'field',
       value: [ { type: 'literal', offset: 6, value: 'value' } ] } } ]
`

exports[`tests.js TAP > logical OR operator 1`] = `
[ { type: 'logical',
    offset: 0,
    operator: { value: 'OR', offset: 8 },
    children: 
     [ { type: 'simple',
         offset: 0,
         value: 
          { type: 'field',
            offset: 0,
            field: null,
            value: [ { type: 'literal', offset: 0, value: 'logical' } ] } },
       { type: 'simple',
         offset: 11,
         value: 
          { type: 'field',
            offset: 11,
            field: null,
            value: [ { type: 'literal', offset: 11, value: 'operator' } ] } } ] } ]
`

exports[`tests.js TAP > logical AND operator 1`] = `
[ { type: 'logical',
    offset: 0,
    operator: { value: 'AND', offset: 8 },
    children: 
     [ { type: 'simple',
         offset: 0,
         value: 
          { type: 'field',
            offset: 0,
            field: null,
            value: [ { type: 'literal', offset: 0, value: 'logical' } ] } },
       { type: 'simple',
         offset: 12,
         value: 
          { type: 'field',
            offset: 12,
            field: null,
            value: [ { type: 'literal', offset: 12, value: 'operator' } ] } } ] } ]
`

exports[`tests.js TAP > logical && operator 1`] = `
[ { type: 'logical',
    offset: 0,
    operator: { value: '&&', offset: 8 },
    children: 
     [ { type: 'simple',
         offset: 0,
         value: 
          { type: 'field',
            offset: 0,
            field: null,
            value: [ { type: 'literal', offset: 0, value: 'logical' } ] } },
       { type: 'simple',
         offset: 11,
         value: 
          { type: 'field',
            offset: 11,
            field: null,
            value: [ { type: 'literal', offset: 11, value: 'operator' } ] } } ] } ]
`

exports[`tests.js TAP > logical NOT operator 1`] = `
[ { type: 'logical',
    offset: 0,
    operator: { value: 'NOT', offset: 8 },
    children: 
     [ { type: 'simple',
         offset: 0,
         value: 
          { type: 'field',
            offset: 0,
            field: null,
            value: [ { type: 'literal', offset: 0, value: 'logical' } ] } },
       { type: 'simple',
         offset: 12,
         value: 
          { type: 'field',
            offset: 12,
            field: null,
            value: [ { type: 'literal', offset: 12, value: 'operator' } ] } } ] } ]
`

exports[`tests.js TAP > (grouped) 1`] = `
[ { type: 'bracketed',
    offset: 0,
    value: 
     { type: 'simple',
       offset: 1,
       value: 
        { type: 'field',
          offset: 1,
          field: null,
          value: [ { type: 'literal', offset: 1, value: 'grouped' } ] } } } ]
`

exports[`tests.js TAP >   wschar   1`] = `
[ { type: 'simple',
    offset: 2,
    value: 
     { type: 'field',
       offset: 2,
       field: null,
       value: [ { type: 'literal', offset: 2, value: 'wschar' } ] } } ]
`

exports[`tests.js TAP > "quoted" 1`] = `
[ { type: 'simple',
    offset: 0,
    value: 
     { type: 'field',
       offset: 0,
       field: null,
       value: [ { type: 'quoted', offset: 0, value: 'quoted' } ] } } ]
`
