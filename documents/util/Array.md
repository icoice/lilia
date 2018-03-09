# Array

## util.Array.pile

    // result: [ [0, 1, 2], [3, 4, 5], [6, 7, 9] ];
    util.Array.pile(3, [0, 1, 2, 3, 4, 5, 6, 7, 9]);

## util.Array.toMap

    // result: { a: 0 }
    util.Array.toMap({ a: 0, b: 1, c: 2 }, ['a']);

## util.Array.toMaps

    // result: [ { name: 0, key: 'a' } ]
    util.Array.toMaps({ a: 0, b: 1, c: 2 }, ['a'], (k, n) => { name: n, key: k })

## util.Array.rename

    // result: [ { b: 1, d: 2} ]
    util.Array.rename({ a: 'b', c: 'd' }, [ { a: 1, c: 2} ])
