import { Inf, Interval, NumberSet } from '../src';
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
  expect(new NumberSet([])).not.toEqual(new NumberSet([Inf]));
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

test('contains', () => {
  const set = new NumberSet([Closed]);
  expect(set.contains(-2)).toBeFalsy();
  expect(set.contains(-1)).toBeTruthy();
  expect(set.contains(0)).toBeTruthy();
  expect(set.contains(1)).toBeTruthy();
  expect(set.contains(2)).toBeFalsy();
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
});

test('symDiff', () => {
  expect(
    new NumberSet([ClosedLower]).symDiff(new NumberSet([ClosedUpper]))
  ).toEqual(new NumberSet([BottomClosedLower, TopClosedUpper]));
  expect(
    new NumberSet([OpenLower]).symDiff(new NumberSet([OpenUpper]))
  ).toEqual(new NumberSet([OpenLower, OpenUpper]));
});
