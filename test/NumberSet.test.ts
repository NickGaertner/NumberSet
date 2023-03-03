import { Inf, Interval, NumberSet, ParseError, RealWithInf } from '../src';
import {
  BottomClosed,
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
  TopClosed,
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

test('interior', () => {
  expect(NumberSet.from([Closed]).interior()).toEqual(NumberSet.from([Open]));
  expect(NumberSet.from([TopClosed]).interior()).toEqual(
    NumberSet.from([Open])
  );
  expect(NumberSet.from([BottomClosed]).interior()).toEqual(
    NumberSet.from([Open])
  );
  expect(NumberSet.from([Open]).interior()).toEqual(NumberSet.from([Open]));
  expect(NumberSet.from([EmptyCrossed]).interior()).toEqual(
    NumberSet.from([EmptyCrossed])
  );

  expect(
    NumberSet.from([
      Interval.Closed(-2, -1),
      Middle,
      Interval.Closed(1, 2),
    ]).interior()
  ).toEqual(NumberSet.from([Interval.Open(-2, -1), Interval.Open(1, 2)]));
});

test('closure', () => {
  expect(NumberSet.from([Closed]).closure()).toEqual(NumberSet.from([Closed]));
  expect(NumberSet.from([TopClosed]).closure()).toEqual(
    NumberSet.from([Closed])
  );
  expect(NumberSet.from([BottomClosed]).closure()).toEqual(
    NumberSet.from([Closed])
  );
  expect(NumberSet.from([Open]).closure()).toEqual(NumberSet.from([Closed]));
  expect(NumberSet.from([EmptyCrossed]).closure()).toEqual(
    NumberSet.from([EmptyCrossed])
  );

  expect(
    NumberSet.from([Interval.Open(-2, -1), Interval.Open(1, 2)]).closure()
  ).toEqual(NumberSet.from([Interval.Closed(-2, -1), Interval.Closed(1, 2)]));
});

test('diameter & radius', () => {
  expect(NumberSet.from([Interval.Closed(0, 1)]).diameter()).toEqual(1);
  expect(NumberSet.from([Interval.TopClosed(0, 1)]).diameter()).toEqual(1);
  expect(NumberSet.from([Interval.BottomClosed(0, 1)]).diameter()).toEqual(1);
  expect(NumberSet.from([Interval.Open(0, 1)]).diameter()).toEqual(1);
  expect(NumberSet.from([EmptyCrossed]).diameter()).toEqual(0);

  expect(NumberSet.from([Interval.Closed(0, 2)]).radius()).toEqual(1);
  expect(NumberSet.from([Interval.TopClosed(0, 2)]).radius()).toEqual(1);
  expect(NumberSet.from([Interval.BottomClosed(0, 2)]).radius()).toEqual(1);
  expect(NumberSet.from([Interval.Open(0, 2)]).radius()).toEqual(1);
  expect(NumberSet.from([EmptyCrossed]).radius()).toEqual(0);

  expect(NumberSet.from([Interval.Closed(0, 1)]).diameter()).toEqual(
    NumberSet.from([Interval.Closed(0, 2)]).radius()
  );
  expect(NumberSet.from([Interval.TopClosed(0, 1)]).diameter()).toEqual(
    NumberSet.from([Interval.TopClosed(0, 2)]).radius()
  );
  expect(NumberSet.from([Interval.BottomClosed(0, 1)]).diameter()).toEqual(
    NumberSet.from([Interval.BottomClosed(0, 2)]).radius()
  );
  expect(NumberSet.from([Interval.Open(0, 1)]).diameter()).toEqual(
    NumberSet.from([Interval.Open(0, 2)]).radius()
  );
  expect(NumberSet.from([EmptyCrossed]).diameter()).toEqual(
    NumberSet.from([EmptyCrossed]).radius()
  );
});

test('diameter & radius', () => {
  expect(NumberSet.from([Interval.Closed(0, 1)]).volume()).toEqual(
    NumberSet.from([Interval.Closed(0, 1)]).diameter()
  );

  expect(NumberSet.from([EmptyCrossed]).volume()).toEqual(0);
  expect(NumberSet.from([OpenLower, OpenUpper]).volume()).toEqual(2);
  expect(
    NumberSet.from([
      Interval.Open(0, 1),
      Interval.Open(2, 3),
      Interval.Open(4, 10),
    ]).volume()
  ).toEqual(8);
});

test('center', () => {
  expect(NumberSet.from([Closed]).center()).toEqual(Closed.center());
  expect(NumberSet.from([TopClosed]).center()).toEqual(TopClosed.center());
  expect(NumberSet.from([BottomClosed]).center()).toEqual(
    BottomClosed.center()
  );
  expect(NumberSet.from([Open]).center()).toEqual(Open.center());
  expect(NumberSet.from([EmptyCrossed]).center()).toEqual(
    EmptyCrossed.center()
  );

  expect(NumberSet.from([OpenLower, OpenUpper]).center()).toEqual(0);
  expect(NumberSet.from([Interval.Open(0, 2)]).center()).toEqual(1);
  expect(NumberSet.from([OpenLower, Interval.Open(0, 2)]).center()).toEqual(
    0.5
  );
  expect(NumberSet.from([Interval.Open(-2, 0)]).center()).toEqual(-1);
  expect(NumberSet.from([Interval.Open(-2, 0), OpenUpper]).center()).toEqual(
    -0.5
  );
});

test('translatedBy', () => {
  expect(Closed.toSet().translatedBy(0)).toEqual(Closed.toSet());
  expect(Closed.toSet().translatedBy(Infinity)).toEqual(Inf().toSet());
  expect(EmptyCrossed.toSet().translatedBy(1)).toEqual(EmptyCrossed.toSet());

  expect(ClosedLower.toSet().translatedBy(1)).toEqual(ClosedUpper.toSet());
  expect(ClosedUpper.toSet().translatedBy(-1)).toEqual(ClosedLower.toSet());

  expect(OpenLower.toSet().translatedBy(1)).toEqual(OpenUpper.toSet());
  expect(OpenUpper.toSet().translatedBy(-1)).toEqual(OpenLower.toSet());

  expect(BottomClosedLower.toSet().translatedBy(1)).toEqual(
    BottomClosedUpper.toSet()
  );
  expect(BottomClosedUpper.toSet().translatedBy(-1)).toEqual(
    BottomClosedLower.toSet()
  );

  expect(TopClosedLower.toSet().translatedBy(1)).toEqual(
    TopClosedUpper.toSet()
  );
  expect(TopClosedUpper.toSet().translatedBy(-1)).toEqual(
    TopClosedLower.toSet()
  );
});

test('scaledBy', () => {
  expect(() => Closed.toSet().scaledBy(Infinity)).toThrow(RangeError);
  expect(() => Closed.toSet().scaledBy(-Infinity)).toThrow(RangeError);

  expect(ClosedUpper.toSet().scaledBy(2)).toEqual(
    Interval.Closed(0, 2).toSet()
  );
  expect(Closed.toSet().scaledBy(1)).toEqual(Closed.toSet());
  expect(Closed.toSet().scaledBy(0)).toEqual(Middle.toSet());
  expect(EmptyCrossed.scaledBy(2)).toEqual(EmptyCrossed.toSet());
  expect(Open.toSet().scaledBy(0)).toEqual(EmptyCrossed.toSet());

  expect(ClosedUpper.toSet().scaledBy(-1)).toEqual(ClosedLower.toSet());
  expect(OpenUpper.toSet().scaledBy(-1)).toEqual(OpenLower.toSet());
  expect(TopClosedUpper.toSet().scaledBy(-1)).toEqual(TopClosedLower.toSet());
  expect(BottomClosedUpper.toSet().scaledBy(-1)).toEqual(
    BottomClosedLower.toSet()
  );
});
