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
    new NumberSet([
      OpenLower,
      OpenUpper,
      Closed,
      Open,
      BottomClosedUpper,
      Outlier,
    ])
  ).toEqual(new NumberSet([Closed, Outlier]));
});

test('toString', () => {
  expect(new NumberSet([Closed]).toString()).toEqual(`{${Closed}}`);
  expect(new NumberSet([Middle, Outlier]).toString()).toEqual(
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
  expect([...new NumberSet([])]).toEqual([]);
  expect([...new NumberSet([Middle, Outlier])]).toEqual([Middle, Outlier]);
});

test('IsEmpty', () => {
  expect(new NumberSet([Closed]).isEmpty()).toBeFalsy();
  expect(new NumberSet([EmptyOpenPoint]).isEmpty()).toBeTruthy();
  expect(new NumberSet([EmptyCrossed]).isEmpty()).toBeTruthy();
});

test('equals', () => {
  expect(new NumberSet([])).toEqual(new NumberSet([]));
  expect(new NumberSet([])).not.toEqual(new NumberSet([Inf()]));
  expect(new NumberSet([Closed])).toEqual(new NumberSet([Closed]));
  expect(new NumberSet([Closed])).not.toEqual(new NumberSet([Open]));
  expect(new NumberSet([Closed, Open])).toEqual(new NumberSet([Open, Closed]));
  expect(new NumberSet([ClosedLower, ClosedUpper])).toEqual(
    new NumberSet([Closed])
  );
  expect(
    new NumberSet([
      OpenLower,
      OpenUpper,
      Closed,
      Open,
      BottomClosedUpper,
      Outlier,
    ])
  ).toEqual(new NumberSet([Closed, Outlier]));
});

test.only('contains', () => {
  const indexes = Array.from({ length: 1000 }, (n, i) => i);
  const largeSet = new NumberSet(indexes.map((i) => Interval.Open(i, i + 1)));
  const start = performance.now();

  indexes.forEach((i) => {
    expect(largeSet.contains(i)).toBeFalsy();
    expect(largeSet.contains(i + 0.5)).toBeTruthy();
  });
  console.log('********** TIME:', performance.now() - start);
});

test('union', () => {
  expect(
    new NumberSet([ClosedLower]).union(new NumberSet([ClosedUpper]))
  ).toEqual(new NumberSet([Closed]));
  expect(
    new NumberSet([TopClosedLower]).union(
      new NumberSet([BottomClosedUpper, Outlier])
    )
  ).toEqual(new NumberSet([Open, Outlier]));
});

test('intersects', () => {
  expect(
    new NumberSet([ClosedLower]).intersects(new NumberSet([ClosedUpper]))
  ).toBeTruthy();
  expect(
    new NumberSet([OpenLower]).intersects(new NumberSet([OpenUpper]))
  ).toBeFalsy();
  expect(
    new NumberSet([OpenLower, Outlier]).intersects(new NumberSet([OpenUpper]))
  ).toBeFalsy();
  expect(
    new NumberSet([OpenLower, Outlier]).intersects(
      new NumberSet([OpenUpper, Outlier])
    )
  ).toBeTruthy();
});

test('intersection', () => {
  expect(
    new NumberSet([ClosedLower]).intersection(new NumberSet([ClosedUpper]))
  ).toEqual(new NumberSet([Middle]));

  expect(
    new NumberSet([Closed]).intersection(
      new NumberSet([BottomClosedLower, TopClosedUpper])
    )
  ).toEqual(new NumberSet([BottomClosedLower, TopClosedUpper]));
  expect(
    new NumberSet([OpenLower]).intersection(new NumberSet([OpenUpper]))
  ).toEqual(new NumberSet([]));
});

test('without', () => {
  expect(
    new NumberSet([ClosedLower]).without(new NumberSet([ClosedUpper]))
  ).toEqual(new NumberSet([BottomClosedLower]));
  expect(
    new NumberSet([OpenLower]).without(new NumberSet([OpenUpper]))
  ).toEqual(new NumberSet([OpenLower]));
  expect(
    new NumberSet([Closed]).without(new NumberSet([Middle, Outlier]))
  ).toEqual(new NumberSet([BottomClosedLower, TopClosedUpper]));
  expect(
    new NumberSet([0, 1, 2].map((n) => Interval.Open(n, n + 1))).without(
      new NumberSet([0, 1, 2, 3].map((n) => Interval.Open(n - 0.5, n + 0.5)))
    )
  ).toEqual(new NumberSet([0.5, 1.5, 2.5].map((n) => Interval.Point(n))));
  expect(
    new NumberSet([0, 1, 2, 3].map((n) => Interval.Open(n, n + 1))).without(
      new NumberSet([0, 1, 2, 3, 4].map((n) => Interval.Open(n - 0.5, n + 0.5)))
    )
  ).toEqual(new NumberSet([0.5, 1.5, 2.5, 3.5].map((n) => Interval.Point(n))));
});

test('symDiff', () => {
  expect(
    new NumberSet([ClosedLower]).symDiff(new NumberSet([ClosedUpper]))
  ).toEqual(new NumberSet([BottomClosedLower, TopClosedUpper]));
  expect(
    new NumberSet([OpenLower]).symDiff(new NumberSet([OpenUpper]))
  ).toEqual(new NumberSet([OpenLower, OpenUpper]));
});
