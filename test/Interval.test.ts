import {
  NumberSet,
  Interval,
  ParseError,
  Real,
  RealWithInf,
  NonNegative,
  NonNegativeWithInf,
  NonPositiveWithNegInf,
  NonPositive,
  Positive,
  Negative,
  NegativeWithNegInf,
  PositiveWithInf,
  NumberTransform,
} from '../src';

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

test('toString', () => {
  expect(Closed.toString()).toEqual('[-1,1]');
  expect(BottomClosed.toString()).toEqual('[-1,1)');
  expect(TopClosed.toString()).toEqual('(-1,1]');
  expect(Open.toString()).toEqual('(-1,1)');
});

test('IsEmpty', () => {
  expect(Closed.isEmpty()).toBeFalsy();
  expect(EmptyOpenPoint.isEmpty()).toBeTruthy();
  expect(EmptyCrossed.isEmpty()).toBeTruthy();
});

test('equals', () => {
  expect(Closed).toEqual(Closed);
  expect(Closed).not.toEqual(Open);
  expect(Closed).not.toEqual(BottomClosed);
  expect(Closed).not.toEqual(TopClosed);
  expect(EmptyOpenPoint).toEqual(EmptyCrossed);
});

test('contains', () => {
  expect(Closed.contains(-2)).toBeFalsy();
  expect(Closed.contains(-1)).toBeTruthy();
  expect(Closed.contains(0)).toBeTruthy();
  expect(Closed.contains(1)).toBeTruthy();
  expect(Closed.contains(2)).toBeFalsy();

  expect(Open.contains(-2)).toBeFalsy();
  expect(Open.contains(-1)).toBeFalsy();
  expect(Open.contains(0)).toBeTruthy();
  expect(Open.contains(1)).toBeFalsy();
  expect(Open.contains(2)).toBeFalsy();

  expect(BottomClosed.contains(-2)).toBeFalsy();
  expect(BottomClosed.contains(-1)).toBeTruthy();
  expect(BottomClosed.contains(0)).toBeTruthy();
  expect(BottomClosed.contains(1)).toBeFalsy();
  expect(BottomClosed.contains(2)).toBeFalsy();

  expect(TopClosed.contains(-2)).toBeFalsy();
  expect(TopClosed.contains(-1)).toBeFalsy();
  expect(TopClosed.contains(0)).toBeTruthy();
  expect(TopClosed.contains(1)).toBeTruthy();
  expect(TopClosed.contains(2)).toBeFalsy();
});

test('union', () => {
  expect(ClosedLower.union(ClosedUpper)).toEqual(Closed.toSet());
  expect(ClosedUpper.union(ClosedLower)).toEqual(Closed.toSet());
  expect(Open.union(OpenLower)).toEqual(Open.toSet());
  expect(Open.union(OpenUpper)).toEqual(Open.toSet());
  expect(Closed.union(ClosedUpper)).toEqual(Closed.toSet());
  expect(Closed.union(Open)).toEqual(Closed.toSet());
  expect(TopClosedLower.union(BottomClosedUpper)).toEqual(Open.toSet());
  expect(Middle.union(Outlier)).toEqual(NumberSet.from([Middle, Outlier]));
});

test('touches', () => {
  expect(EmptyOpenPoint.touches(Closed)).toBeFalsy();
  expect(Closed.touches(EmptyOpenPoint)).toBeFalsy();
  expect(EmptyCrossed.touches(Closed)).toBeFalsy();
  expect(Closed.touches(EmptyCrossed)).toBeFalsy();

  expect(Closed.touches(Closed)).toBeTruthy();
  expect(BottomClosed.touches(Closed)).toBeTruthy();
  expect(Closed.touches(BottomClosed)).toBeTruthy();
  expect(TopClosed.touches(Closed)).toBeTruthy();
  expect(Closed.touches(TopClosed)).toBeTruthy();
  expect(Open.touches(Closed)).toBeTruthy();
  expect(Closed.touches(Open)).toBeTruthy();
  expect(Open.touches(Open)).toBeTruthy();

  expect(ClosedLower.touches(ClosedUpper)).toBeTruthy();
  expect(ClosedUpper.touches(ClosedLower)).toBeTruthy();
  expect(TopClosedLower.touches(BottomClosedUpper)).toBeTruthy();
  expect(BottomClosedUpper.touches(TopClosedLower)).toBeTruthy();
  expect(OpenLower.touches(BottomClosedUpper)).toBeTruthy();
  expect(BottomClosedUpper.touches(OpenLower)).toBeTruthy();
  expect(OpenUpper.touches(TopClosedLower)).toBeTruthy();
  expect(TopClosedLower.touches(OpenUpper)).toBeTruthy();
  expect(OpenUpper.touches(OpenLower)).toBeFalsy();
  expect(OpenLower.touches(OpenUpper)).toBeFalsy();

  expect(OpenLower.touches(Middle)).toBeTruthy();
  expect(Middle.touches(OpenLower)).toBeTruthy();
  expect(OpenUpper.touches(Middle)).toBeTruthy();
  expect(Middle.touches(OpenUpper)).toBeTruthy();
});

test('intersects', () => {
  expect(EmptyOpenPoint.intersects(Closed)).toBeFalsy();
  expect(Closed.intersects(EmptyOpenPoint)).toBeFalsy();
  expect(EmptyCrossed.intersects(Closed)).toBeFalsy();
  expect(Closed.intersects(EmptyCrossed)).toBeFalsy();

  expect(Closed.intersects(Closed)).toBeTruthy();
  expect(BottomClosed.intersects(Closed)).toBeTruthy();
  expect(Closed.intersects(BottomClosed)).toBeTruthy();
  expect(TopClosed.intersects(Closed)).toBeTruthy();
  expect(Closed.intersects(TopClosed)).toBeTruthy();
  expect(Open.intersects(Closed)).toBeTruthy();
  expect(Closed.intersects(Open)).toBeTruthy();
  expect(Open.intersects(Open)).toBeTruthy();

  expect(ClosedLower.intersects(ClosedUpper)).toBeTruthy();
  expect(ClosedUpper.intersects(ClosedLower)).toBeTruthy();
  expect(TopClosedLower.intersects(BottomClosedUpper)).toBeTruthy();
  expect(BottomClosedUpper.intersects(TopClosedLower)).toBeTruthy();
  expect(OpenLower.intersects(BottomClosedUpper)).toBeFalsy();
  expect(BottomClosedUpper.intersects(OpenLower)).toBeFalsy();
  expect(OpenUpper.intersects(TopClosedLower)).toBeFalsy();
  expect(TopClosedLower.intersects(OpenUpper)).toBeFalsy();
  expect(OpenUpper.intersects(OpenLower)).toBeFalsy();
  expect(OpenLower.intersects(OpenUpper)).toBeFalsy();
});

test('intersection', () => {
  expect(EmptyOpenPoint.intersection(Closed)).toEqual(EmptyOpenPoint);
  expect(Closed.intersection(EmptyOpenPoint)).toEqual(EmptyOpenPoint);
  expect(EmptyCrossed.intersection(Closed)).toEqual(EmptyOpenPoint);
  expect(Closed.intersection(EmptyCrossed)).toEqual(EmptyOpenPoint);

  expect(Closed.intersection(Closed)).toEqual(Closed);
  expect(BottomClosed.intersection(Closed)).toEqual(BottomClosed);
  expect(Closed.intersection(BottomClosed)).toEqual(BottomClosed);
  expect(TopClosed.intersection(Closed)).toEqual(TopClosed);
  expect(Closed.intersection(TopClosed)).toEqual(TopClosed);
  expect(Open.intersection(Closed)).toEqual(Open);
  expect(Closed.intersection(Open)).toEqual(Open);
  expect(Open.intersection(Open)).toEqual(Open);

  expect(ClosedLower.intersection(ClosedUpper)).toEqual(Middle);
  expect(ClosedUpper.intersection(ClosedLower)).toEqual(Middle);
  expect(TopClosedLower.intersection(BottomClosedUpper)).toEqual(Middle);
  expect(BottomClosedUpper.intersection(TopClosedLower)).toEqual(Middle);
  expect(OpenLower.intersection(OpenUpper)).toEqual(EmptyOpenPoint);
});

test('without', () => {
  expect(ClosedLower.without(ClosedUpper)).toEqual(BottomClosedLower.toSet());
  expect(Closed.without(Outlier)).toEqual(Closed.toSet());
  expect(OpenLower.without(OpenUpper)).toEqual(OpenLower.toSet());
  expect(Closed.without(Middle)).toEqual(
    NumberSet.from([BottomClosedLower, TopClosedUpper])
  );
});

test('symDiff', () => {
  expect(ClosedLower.symDiff(ClosedUpper)).toEqual(
    NumberSet.from([BottomClosedLower, TopClosedUpper])
  );
  expect(ClosedUpper.symDiff(ClosedLower)).toEqual(
    NumberSet.from([BottomClosedLower, TopClosedUpper])
  );
  expect(OpenLower.symDiff(OpenUpper)).toEqual(
    NumberSet.from([OpenLower, OpenUpper])
  );
  expect(OpenUpper.symDiff(OpenLower)).toEqual(
    NumberSet.from([OpenLower, OpenUpper])
  );
});

test('fromString', () => {
  expect(Interval.fromString('[-1,1]')).toEqual(Closed);
  expect(Interval.fromString('[-1,1)')).toEqual(BottomClosed);
  expect(Interval.fromString('(-1,1]')).toEqual(TopClosed);
  expect(Interval.fromString('(-1,1)')).toEqual(Open);
  expect(Interval.fromString(']-1,1[')).toEqual(Open);

  expect(Interval.fromString(' [ -1 , 1 ] ')).toEqual(Closed);

  expect(() => Interval.fromString('Not an interval')).toThrow(ParseError);
  expect(() => Interval.fromString('{0,0}')).toThrow(ParseError);
  expect(() => Interval.fromString('[NaN,0]')).toThrow(ParseError);
  expect(() => Interval.fromString('[0,NaN]')).toThrow(ParseError);
});

test('translatedBy', () => {
  expect(Closed.translatedBy(0)).toEqual(Closed);
  expect(Closed.translatedBy(Infinity)).toEqual(Interval.Point(Infinity));
  expect(EmptyCrossed.translatedBy(1)).toEqual(EmptyCrossed);

  expect(ClosedLower.translatedBy(1)).toEqual(ClosedUpper);
  expect(ClosedUpper.translatedBy(-1)).toEqual(ClosedLower);

  expect(OpenLower.translatedBy(1)).toEqual(OpenUpper);
  expect(OpenUpper.translatedBy(-1)).toEqual(OpenLower);

  expect(BottomClosedLower.translatedBy(1)).toEqual(BottomClosedUpper);
  expect(BottomClosedUpper.translatedBy(-1)).toEqual(BottomClosedLower);

  expect(TopClosedLower.translatedBy(1)).toEqual(TopClosedUpper);
  expect(TopClosedUpper.translatedBy(-1)).toEqual(TopClosedLower);
});

test('scaledBy', () => {
  expect(() => Closed.scaledBy(Infinity)).toThrow(RangeError);
  expect(() => Closed.scaledBy(-Infinity)).toThrow(RangeError);

  expect(ClosedUpper.scaledBy(2)).toEqual(Interval.Closed(0, 2));
  expect(Closed.scaledBy(1)).toEqual(Closed);
  expect(Closed.scaledBy(0)).toEqual(Middle);
  expect(EmptyCrossed.scaledBy(2)).toEqual(EmptyCrossed);
  expect(Open.scaledBy(0)).toEqual(EmptyCrossed);

  expect(ClosedUpper.scaledBy(-1)).toEqual(ClosedLower);
  expect(OpenUpper.scaledBy(-1)).toEqual(OpenLower);
  expect(TopClosedUpper.scaledBy(-1)).toEqual(TopClosedLower);
  expect(BottomClosedUpper.scaledBy(-1)).toEqual(BottomClosedLower);

  expect(ClosedLower.scaledBy(-1)).toEqual(ClosedUpper);
  expect(OpenLower.scaledBy(-1)).toEqual(OpenUpper);
  expect(TopClosedLower.scaledBy(-1)).toEqual(TopClosedUpper);
  expect(BottomClosedLower.scaledBy(-1)).toEqual(BottomClosedUpper);

  expect(Interval.Closed(-0.5, 0.5).scaledBy(2)).toEqual(Closed);
  expect(Interval.Open(-0.5, 0.5).scaledBy(2)).toEqual(Open);
  expect(Interval.BottomClosed(-0.5, 0.5).scaledBy(2)).toEqual(BottomClosed);
  expect(Interval.TopClosed(-0.5, 0.5).scaledBy(2)).toEqual(TopClosed);

  expect(Interval.Closed(-0.5, 0.5).scaledBy(-2)).toEqual(Closed);
  expect(Interval.Open(-0.5, 0.5).scaledBy(-2)).toEqual(Open);
  expect(Interval.BottomClosed(-0.5, 0.5).scaledBy(-2)).toEqual(BottomClosed);
  expect(Interval.TopClosed(-0.5, 0.5).scaledBy(-2)).toEqual(TopClosed);

  expect(Closed.scaledBy(0.5)).toEqual(Interval.Closed(-0.5, 0.5));
  expect(Open.scaledBy(0.5)).toEqual(Interval.Open(-0.5, 0.5));
  expect(BottomClosed.scaledBy(0.5)).toEqual(Interval.BottomClosed(-0.5, 0.5));
  expect(TopClosed.scaledBy(0.5)).toEqual(Interval.TopClosed(-0.5, 0.5));

  expect(Closed.scaledBy(-0.5)).toEqual(Interval.Closed(-0.5, 0.5));
  expect(Open.scaledBy(-0.5)).toEqual(Interval.Open(-0.5, 0.5));
  expect(BottomClosed.scaledBy(-0.5)).toEqual(Interval.BottomClosed(-0.5, 0.5));
  expect(TopClosed.scaledBy(-0.5)).toEqual(Interval.TopClosed(-0.5, 0.5));
});

test('interior', () => {
  expect(Closed.interior()).toEqual(Open);
  expect(TopClosed.interior()).toEqual(Open);
  expect(BottomClosed.interior()).toEqual(Open);
  expect(Open.interior()).toEqual(Open);
  expect(EmptyCrossed.interior()).toEqual(EmptyCrossed);
});

test('closure', () => {
  expect(Closed.closure()).toEqual(Closed);
  expect(TopClosed.closure()).toEqual(Closed);
  expect(BottomClosed.closure()).toEqual(Closed);
  expect(Open.closure()).toEqual(Closed);
  expect(EmptyCrossed.closure()).toEqual(EmptyCrossed);
});

test('diameter & radius', () => {
  expect(Interval.Closed(0, 1).diameter()).toEqual(1);
  expect(Interval.TopClosed(0, 1).diameter()).toEqual(1);
  expect(Interval.BottomClosed(0, 1).diameter()).toEqual(1);
  expect(Interval.Open(0, 1).diameter()).toEqual(1);
  expect(EmptyCrossed.diameter()).toEqual(0);

  expect(Interval.Closed(0, 2).radius()).toEqual(1);
  expect(Interval.TopClosed(0, 2).radius()).toEqual(1);
  expect(Interval.BottomClosed(0, 2).radius()).toEqual(1);
  expect(Interval.Open(0, 2).radius()).toEqual(1);
  expect(EmptyCrossed.radius()).toEqual(0);

  expect(Interval.Closed(0, 1).diameter()).toEqual(
    Interval.Closed(0, 2).radius()
  );
  expect(Interval.TopClosed(0, 1).diameter()).toEqual(
    Interval.TopClosed(0, 2).radius()
  );
  expect(Interval.BottomClosed(0, 1).diameter()).toEqual(
    Interval.BottomClosed(0, 2).radius()
  );
  expect(Interval.Open(0, 1).diameter()).toEqual(Interval.Open(0, 2).radius());
  expect(EmptyCrossed.diameter()).toEqual(EmptyCrossed.radius());
});

test('center', () => {
  expect(Closed.center()).toEqual(0);
  expect(TopClosed.center()).toEqual(0);
  expect(BottomClosed.center()).toEqual(0);
  expect(Open.center()).toEqual(0);
  expect(EmptyCrossed.center()).toEqual(NaN);
  expect(Interval.Open(-1, 2).center()).toEqual(0.5);
  expect(Interval.Open(-2, 1).center()).toEqual(-0.5);
});

test('infinity & predefined intervals', () => {
  const Inf = Interval.Point(Infinity);
  expect(Inf.toString()).toEqual(`[Infinity,Infinity]`);

  expect(Inf.isEmpty()).toBeFalsy();
  expect(Interval.Closed(Infinity, 0).isEmpty()).toBeTruthy();

  expect(Inf).toEqual(Inf);

  expect(Inf.contains(Infinity)).toBeTruthy();
  expect(Inf.contains(0)).toBeFalsy();
  expect(Real().contains(0)).toBeTruthy();
  expect(Real().contains(Infinity)).toBeFalsy();
  expect(RealWithInf().contains(0)).toBeTruthy();
  expect(RealWithInf().contains(Infinity)).toBeTruthy();

  expect(Inf.union(Inf)).toEqual(NumberSet.from([Inf]));
  expect(Inf.union(Closed)).toEqual(NumberSet.from([Inf, Closed]));
  expect(NonNegative().union(NonPositive())).toEqual(NumberSet.from([Real()]));
  expect(NonNegativeWithInf().union(NonPositiveWithNegInf())).toEqual(
    NumberSet.from([RealWithInf()])
  );

  expect(NonNegative().intersects(NonPositive())).toBeTruthy();
  expect(NonNegativeWithInf().intersects(NonPositiveWithNegInf())).toBeTruthy();
  expect(Real().intersects(RealWithInf())).toBeTruthy();

  expect(NonNegative().intersection(NonPositive())).toEqual(Middle);
  expect(NonNegativeWithInf().intersection(NonPositiveWithNegInf())).toEqual(
    Middle
  );
  expect(Real().intersection(RealWithInf())).toEqual(Real());

  expect(Real().without(Middle)).toEqual(
    NumberSet.from([Negative(), Positive()])
  );
  expect(NonNegativeWithInf().without(Inf)).toEqual(
    NumberSet.from([NonNegative()])
  );

  expect(NonNegative().symDiff(NonPositive())).toEqual(
    NumberSet.from([Negative(), Positive()])
  );
  expect(NonNegativeWithInf().symDiff(NonPositiveWithNegInf())).toEqual(
    NumberSet.from([NegativeWithNegInf(), PositiveWithInf()])
  );
});

test('number transforms as type constraints', () => {
  const checkInt: NumberTransform = (x) => {
    if (!Number.isSafeInteger(x)) {
      throw new Error();
    }
    return x;
  };
  expect(() => Interval.Point(Math.PI, checkInt)).toThrow();

  const integerInterval = Interval.Closed(0, 1, checkInt);

  expect(() => integerInterval.union(Interval.Point(0.5))).not.toThrow();
  expect(() => integerInterval.union(Interval.Closed(-0.5, 0.5))).toThrow();
  expect(() => Interval.Closed(-0.5, 0.5).union(integerInterval)).not.toThrow();

  expect(() => integerInterval.intersection(Interval.Point(0.5))).toThrow();
  expect(() =>
    Interval.Closed(-0.5, 0.5).intersection(integerInterval)
  ).not.toThrow();

  expect(() => integerInterval.without(Interval.Point(0.5))).toThrow();
  expect(() =>
    Interval.Closed(-0.5, 0.5).without(integerInterval)
  ).not.toThrow();

  expect(() => integerInterval.symDiff(Interval.Point(0.5))).toThrow();
  expect(() =>
    Interval.Closed(-0.5, 0.5).symDiff(integerInterval)
  ).not.toThrow();
});

test('number transforms as actual transforms', () => {
  const clampToUnit: NumberTransform = (x) => {
    return Math.min(Math.max(0, x), 1);
  };
  expect(Interval.Point(-1, clampToUnit)).toEqual(Interval.Point(0));

  const clampedInterval = Interval.Closed(0.25, 0.75, clampToUnit);

  expect(clampedInterval.union(Interval.Point(0.5))).toEqual(
    clampedInterval.toSet()
  );
  expect(clampedInterval.union(Interval.Closed(-0.5, 2))).toEqual(
    Interval.Closed(0, 1).toSet()
  );
  expect(Interval.Closed(-0.5, 2).union(clampedInterval)).toEqual(
    Interval.Closed(-0.5, 2).toSet()
  );

  expect(Interval.Closed(-0.5, 0.5).intersection(clampedInterval)).toEqual(
    Interval.Closed(0.25, 0.5)
  );

  expect(Interval.Closed(-0.5, 0.5).without(clampedInterval)).toEqual(
    Interval.BottomClosed(-0.5, 0.25).toSet()
  );

  expect(clampedInterval.symDiff(Interval.Closed(-0.5, 0.5))).toEqual(
    NumberSet.from([
      Interval.BottomClosed(0, 0.25),
      Interval.TopClosed(0.5, 0.75),
    ])
  );
  expect(Interval.Closed(-0.5, 0.5).symDiff(clampedInterval)).toEqual(
    NumberSet.from([
      Interval.BottomClosed(-0.5, 0.25),
      Interval.TopClosed(0.5, 0.75),
    ])
  );
});
