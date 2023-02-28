import { Inf, Interval, NumberSet, ParseError } from '../src';
import {
  BottomClosedLower,
  BottomClosedUpper,
  Closed,
  ClosedLower,
  ClosedUpper,
  EmptyCrossed,
  EmptyOpenPoint,
  Middle,
  Open,
  OpenLower,
  OpenUpper,
  Outlier,
  TopClosedLower,
  TopClosedUpper,
} from './TestUtils';

test('normalize', () => {
  expect(
    NumberSet.from([
      OpenLower,
      OpenUpper,
      Closed,
      Open,
      BottomClosedUpper,
      Outlier,
    ])
  ).toEqual(NumberSet.from([Closed, Outlier]));
});

test('toString', () => {
  expect(NumberSet.from([Closed]).toString()).toEqual(`{${Closed}}`);
  expect(NumberSet.from([Middle, Outlier]).toString()).toEqual(
    `{${Middle}, ${Outlier}}`
  );
});

test('fromString', () => {
  expect(NumberSet.fromString('{}')).toEqual(EmptyOpenPoint.toSet());
  expect(NumberSet.fromString('{[-1,1]}')).toEqual(Closed.toSet());
  expect(NumberSet.fromString('{[-1,1], (0,0)}')).toEqual(Closed.toSet());
  expect(NumberSet.fromString('{[ -1,1 ], ( 0,0 ) }')).toEqual(Closed.toSet());

  expect(() => NumberSet.fromString('Not an set')).toThrowError(ParseError);
  expect(() => NumberSet.fromString('{Not intervals}')).toThrowError(
    ParseError
  );
  expect(() => NumberSet.fromString('{[NaN,0], (0,0)}')).toThrowError(
    ParseError
  );
});

test('iterator', () => {
  expect([...NumberSet.from([])]).toEqual([]);
  expect([...NumberSet.from([Middle, Outlier])]).toEqual([Middle, Outlier]);
});

test('IsEmpty', () => {
  expect(NumberSet.from([Closed]).isEmpty()).toBeFalsy();
  expect(NumberSet.from([EmptyOpenPoint]).isEmpty()).toBeTruthy();
  expect(NumberSet.from([EmptyCrossed]).isEmpty()).toBeTruthy();
});

test('equals', () => {
  expect(NumberSet.from([])).toEqual(NumberSet.from([]));
  expect(NumberSet.from([])).not.toEqual(NumberSet.from([Inf()]));
  expect(NumberSet.from([Closed])).toEqual(NumberSet.from([Closed]));
  expect(NumberSet.from([Closed])).not.toEqual(NumberSet.from([Open]));
  expect(NumberSet.from([Closed, Open])).toEqual(
    NumberSet.from([Open, Closed])
  );
  expect(NumberSet.from([ClosedLower, ClosedUpper])).toEqual(
    NumberSet.from([Closed])
  );
  expect(
    NumberSet.from([
      OpenLower,
      OpenUpper,
      Closed,
      Open,
      BottomClosedUpper,
      Outlier,
    ])
  ).toEqual(NumberSet.from([Closed, Outlier]));
});

test('contains', () => {
  const indexes = Array.from({ length: 1000 }, (n, i) => i);
  const largeSet = NumberSet.from(indexes.map((i) => Interval.Open(i, i + 1)));
  const start = performance.now();

  indexes.forEach((i) => {
    expect(largeSet.contains(i)).toBeFalsy();
    expect(largeSet.contains(i + 0.5)).toBeTruthy();
  });
  console.log('********** TIME:', performance.now() - start);
});

test('union', () => {
  expect(
    NumberSet.from([ClosedLower]).union(NumberSet.from([ClosedUpper]))
  ).toEqual(NumberSet.from([Closed]));
  expect(
    NumberSet.from([TopClosedLower]).union(
      NumberSet.from([BottomClosedUpper, Outlier])
    )
  ).toEqual(NumberSet.from([Open, Outlier]));
});

test('intersects', () => {
  expect(
    NumberSet.from([ClosedLower]).intersects(NumberSet.from([ClosedUpper]))
  ).toBeTruthy();
  expect(
    NumberSet.from([OpenLower]).intersects(NumberSet.from([OpenUpper]))
  ).toBeFalsy();
  expect(
    NumberSet.from([OpenLower, Outlier]).intersects(NumberSet.from([OpenUpper]))
  ).toBeFalsy();
  expect(
    NumberSet.from([OpenLower, Outlier]).intersects(
      NumberSet.from([OpenUpper, Outlier])
    )
  ).toBeTruthy();
});

test('intersection', () => {
  expect(
    NumberSet.from([ClosedLower]).intersection(NumberSet.from([ClosedUpper]))
  ).toEqual(NumberSet.from([Middle]));

  expect(
    NumberSet.from([Closed]).intersection(
      NumberSet.from([BottomClosedLower, TopClosedUpper])
    )
  ).toEqual(NumberSet.from([BottomClosedLower, TopClosedUpper]));
  expect(
    NumberSet.from([OpenLower]).intersection(NumberSet.from([OpenUpper]))
  ).toEqual(NumberSet.from([]));
});

test('without', () => {
  expect(
    NumberSet.from([OpenLower]).without(NumberSet.from([OpenUpper]))
  ).toEqual(NumberSet.from([OpenLower]));
  expect(
    NumberSet.from([OpenUpper]).without(NumberSet.from([OpenLower]))
  ).toEqual(NumberSet.from([OpenUpper]));

  expect(
    NumberSet.from([ClosedLower]).without(NumberSet.from([ClosedUpper]))
  ).toEqual(NumberSet.from([BottomClosedLower]));
  expect(
    NumberSet.from([ClosedUpper]).without(NumberSet.from([ClosedLower]))
  ).toEqual(NumberSet.from([TopClosedUpper]));

  expect(
    NumberSet.from([Closed]).without(NumberSet.from([Middle, Outlier]))
  ).toEqual(NumberSet.from([BottomClosedLower, TopClosedUpper]));
  expect(
    NumberSet.from([Middle, Outlier]).without(NumberSet.from([Closed]))
  ).toEqual(NumberSet.from([Outlier]));

  expect(
    NumberSet.from([0, 1, 2, 3].map((n) => Interval.Open(n, n + 1))).without(
      NumberSet.from(
        [0, 1, 2, 3, 4].map((n) => Interval.Open(n - 0.5, n + 0.5))
      )
    )
  ).toEqual(NumberSet.from([0.5, 1.5, 2.5, 3.5].map((n) => Interval.Point(n))));
});

test('symDiff', () => {
  expect(
    NumberSet.from([ClosedLower]).symDiff(NumberSet.from([ClosedUpper]))
  ).toEqual(NumberSet.from([BottomClosedLower, TopClosedUpper]));
  expect(
    NumberSet.from([OpenLower]).symDiff(NumberSet.from([OpenUpper]))
  ).toEqual(NumberSet.from([OpenLower, OpenUpper]));
});
