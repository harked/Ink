/*globals deepEqual,test,expect*/
Ink.requireModules(['Ink.Util.Array_1'], function (InkArray) {
    'use strict';
    module('ES5 additions');
    test('isArray', function () {
        var shouldBeArray = [[], [1]];

        var shouldNotBeArray = [
            null,
            void 0,
            '',
            'asd',
            123,
            { length: 1, '0': 'foo' }
        ];

        for (var i = 0, len = shouldNotBeArray.length; i < len; i++) {
            equal(InkArray.isArray(shouldNotBeArray[i]), false, 'isArray(' + shouldNotBeArray[i] + ') should be false!');
        }

        for (i = 0, len = shouldBeArray.length; i < len; i++) {
            equal(InkArray.isArray(shouldBeArray[i]), true, 'isArray(' + shouldBeArray[i] + ') should be true!');
        }
    });

    test('Map', function () {
        var inp = [3, 5, 2, 6];
        expect(9);
        var mapped = InkArray.map(inp, function (v, i, all) {
            deepEqual(v, inp[i]);
            deepEqual(all, inp);
            return v + 1;
        });
        deepEqual(mapped, [4, 6, 3, 7]);
    });

    test('forEach', function () {
        var inp = [3, 5, 2, 6];
        expect(9);
        InkArray.forEach(inp, function (v, i, all) {
            deepEqual(v, inp[i]);
            deepEqual(all, inp);
            all[i] = ('mess').charAt(i);
        });
        deepEqual(inp, ['m','e','s','s']);
    });

    test('filter', function () {
        var inp = [3, 5, 2, 6];
        expect(9);
        var filtered = InkArray.filter(inp, function (v, i, all) {
            deepEqual(v, inp[i]);
            deepEqual(all, inp);
            return v <= 3;
        });
        deepEqual(filtered, [3, 2]);
    });

    var sum = function (a, b) { return a + b }

    test('reduce', function () {
        equal(InkArray.reduce([1, 2, 3], sum), 6);
    })

    test('reduce(with initial value', function () {
        throws(function () {
            equal(InkArray.reduce([], sum), 6);
        });
        equal(InkArray.reduce([2, 3], sum, 1), 6);
        equal(InkArray.reduce([], sum, 'foo'), 'foo');
    })

    module('');

    test('map context', 1, function () {
        InkArray.map([1], function (v, i, all) {
            deepEqual(this, 'this');
        }, 'this');
    });
    test('forEach context', 1, function () {
        InkArray.forEach([1], function (v, i, all) {
            deepEqual(this, 'this');
        }, 'this');
    });
    test('filter context', 1, function () {
        InkArray.filter([1], function (v, i, all) {
            deepEqual(this, 'this');
        }, 'this');
    });

    test('groupBy()', function () {
        deepEqual(
            InkArray.groupBy('AAAABBBCCDAABBB'.split('')),
            [
                ['A', 'A', 'A', 'A'],
                ['B', 'B', 'B'],
                ['C', 'C'],
                ['D'],
                ['A', 'A'],
                ['B', 'B', 'B']
            ],
            'default behaviour');

        deepEqual(
            InkArray.groupBy(
                'AAAABBBCCDAABBB'.split(''),
                { pairs: true }),
            [
                ['A', ['A', 'A', 'A', 'A']],
                ['B', ['B', 'B', 'B']],
                ['C', ['C', 'C']],
                ['D', ['D']],
                ['A', ['A', 'A']],
                ['B', ['B', 'B', 'B']]
            ],
            'pairs:true');

        deepEqual(
            InkArray.groupBy(
                [0.1, 0.2, 0.3, 1.1, 1.2, 1.3, 2.5],
                { key: Math.floor }),
            [
                [0.1, 0.2, 0.3],
                [1.1, 1.2, 1.3],
                [2.5]
            ],
            'using a key function');

        deepEqual(
            InkArray.groupBy(
                [0.1, 0.2, 0.3, 1.1, 1.2, 1.3, 2.5],
                { key: Math.floor, pairs: true }),
            [
                [0, [0.1, 0.2, 0.3]],
                [1, [1.1, 1.2, 1.3]],
                [2, [2.5]]
            ],
            'key function and pairs:true');
    });
});
