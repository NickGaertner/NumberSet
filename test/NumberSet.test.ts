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

  expect(NumberSet.from([OpenLower, Middle, OpenUpper]).intervals).toEqual([
    Open,
  ]);
  expect(NumberSet.from([OpenUpper, Middle, OpenLower]).intervals).toEqual([
    Open,
  ]);

  expect(
    NumberSet.from([BottomClosedLower, Middle, TopClosedUpper]).intervals
  ).toEqual([Closed]);
  expect(
    NumberSet.from([TopClosedUpper, Middle, BottomClosedLower]).intervals
  ).toEqual([Closed]);

  expect(NumberSet.from([ClosedLower, Middle, ClosedUpper]).intervals).toEqual([
    Closed,
  ]);
  expect(NumberSet.from([ClosedUpper, Middle, ClosedLower]).intervals).toEqual([
    Closed,
  ]);
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
  const set = NumberSet.from([OpenLower, OpenUpper]);
  expect(set.contains(-2)).toBeFalsy();
  expect(set.contains(-1)).toBeFalsy();
  expect(set.contains(-0.5)).toBeTruthy();
  expect(set.contains(0)).toBeFalsy();
  expect(set.contains(0.5)).toBeTruthy();
  expect(set.contains(1)).toBeFalsy();
  expect(set.contains(2)).toBeFalsy();
});

test('union', () => {
  expect(
    NumberSet.from([ClosedLower]).union(NumberSet.from([ClosedUpper]))
  ).toEqual(NumberSet.from([Closed]));
  expect(
    NumberSet.from([ClosedUpper]).union(NumberSet.from([ClosedLower]))
  ).toEqual(NumberSet.from([Closed]));

  expect(
    NumberSet.from([TopClosedLower]).union(
      NumberSet.from([BottomClosedUpper, Outlier])
    )
  ).toEqual(NumberSet.from([Open, Outlier]));
  expect(
    NumberSet.from([BottomClosedUpper, Outlier]).union(
      NumberSet.from([TopClosedLower])
    )
  ).toEqual(NumberSet.from([Open, Outlier]));

  expect(
    NumberSet.from([BottomClosedLower]).union(NumberSet.from([OpenLower]))
  ).toEqual(NumberSet.from([BottomClosedLower]));
  expect(
    NumberSet.from([OpenLower]).union(NumberSet.from([BottomClosedLower]))
  ).toEqual(NumberSet.from([BottomClosedLower]));

  expect(
    NumberSet.from([TopClosedLower]).union(NumberSet.from([OpenLower]))
  ).toEqual(NumberSet.from([TopClosedLower]));
  expect(
    NumberSet.from([OpenLower]).union(NumberSet.from([TopClosedLower]))
  ).toEqual(NumberSet.from([TopClosedLower]));

  expect(NumberSet.from([Middle]).union(NumberSet.from([OpenLower]))).toEqual(
    NumberSet.from([TopClosedLower])
  );
  expect(NumberSet.from([OpenLower]).union(NumberSet.from([Middle]))).toEqual(
    NumberSet.from([TopClosedLower])
  );

  expect(NumberSet.from([Middle]).union(NumberSet.from([OpenUpper]))).toEqual(
    NumberSet.from([BottomClosedUpper])
  );
  expect(NumberSet.from([OpenUpper]).union(NumberSet.from([Middle]))).toEqual(
    NumberSet.from([BottomClosedUpper])
  );
});

test('intersects', () => {
  expect(
    NumberSet.from([ClosedLower]).intersects(NumberSet.from([ClosedUpper]))
  ).toBeTruthy();
  expect(
    NumberSet.from([ClosedUpper]).intersects(NumberSet.from([ClosedLower]))
  ).toBeTruthy();

  expect(
    NumberSet.from([ClosedLower]).intersects(NumberSet.from([OpenUpper]))
  ).toBeFalsy();
  expect(
    NumberSet.from([OpenUpper]).intersects(NumberSet.from([ClosedLower]))
  ).toBeFalsy();

  expect(
    NumberSet.from([OpenLower]).intersects(NumberSet.from([OpenUpper]))
  ).toBeFalsy();
  expect(
    NumberSet.from([OpenLower, Outlier]).intersects(NumberSet.from([OpenUpper]))
  ).toBeFalsy();

  expect(
    NumberSet.from([OpenLower, OpenUpper]).intersects(NumberSet.from([Middle]))
  ).toBeFalsy();
  expect(
    NumberSet.from([Middle]).intersects(NumberSet.from([OpenLower, OpenUpper]))
  ).toBeFalsy();

  expect(
    NumberSet.from([OpenLower, ClosedUpper]).intersects(
      NumberSet.from([Middle])
    )
  ).toBeTruthy();
  expect(
    NumberSet.from([Middle]).intersects(
      NumberSet.from([OpenLower, ClosedUpper])
    )
  ).toBeTruthy();

  expect(
    NumberSet.from([ClosedLower, OpenUpper]).intersects(
      NumberSet.from([Middle])
    )
  ).toBeTruthy();
  expect(
    NumberSet.from([Middle]).intersects(
      NumberSet.from([ClosedLower, OpenUpper])
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
