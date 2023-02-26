import {
  NumberSet,
  Interval,
  IntervalParseError,
  Inf,
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
  expect(Middle.union(Outlier)).toEqual(new NumberSet([Middle, Outlier]));
});

test('intersects', () => {
  expect(ClosedLower.intersects(ClosedUpper)).toBeTruthy();
  expect(ClosedUpper.intersects(ClosedLower)).toBeTruthy();
  expect(TopClosedLower.intersects(BottomClosedUpper)).toBeTruthy();
  expect(BottomClosedUpper.intersects(TopClosedLower)).toBeTruthy();
  expect(OpenLower.intersects(OpenUpper)).toBeFalsy();
  expect(Closed.intersects(EmptyOpenPoint)).toBeFalsy();
});

test('intersection', () => {
  expect(Closed.intersection(Closed)).toEqual(Closed);
  expect(Closed.intersection(Open)).toEqual(Open);
  expect(ClosedLower.intersection(ClosedUpper)).toEqual(Middle);
  expect(TopClosedLower.intersection(BottomClosedUpper)).toEqual(Middle);
  expect(BottomClosedUpper.intersection(TopClosedLower)).toEqual(Middle);
  expect(OpenLower.intersection(OpenUpper)).toEqual(EmptyCrossed);
  expect(Closed.intersection(EmptyOpenPoint)).toEqual(EmptyCrossed);
});

test('without', () => {
  expect(ClosedLower.without(ClosedUpper)).toEqual(BottomClosedLower.toSet());
  expect(Closed.without(Outlier)).toEqual(Closed.toSet());
  expect(OpenLower.without(OpenUpper)).toEqual(OpenLower.toSet());
  expect(Closed.without(Middle)).toEqual(
    new NumberSet([BottomClosedLower, TopClosedUpper])
  );
});

test('symDiff', () => {
  expect(ClosedLower.symDiff(ClosedUpper)).toEqual(
    new NumberSet([BottomClosedLower, TopClosedUpper])
  );
  expect(OpenLower.symDiff(OpenUpper)).toEqual(
    new NumberSet([OpenLower, OpenUpper])
  );
});

test('fromString', () => {
  expect(Interval.fromString('[-1,1]')).toEqual(Closed);
  expect(Interval.fromString('[-1,1)')).toEqual(BottomClosed);
  expect(Interval.fromString('(-1,1]')).toEqual(TopClosed);
  expect(Interval.fromString('(-1,1)')).toEqual(Open);
  expect(Interval.fromString(']-1,1[')).toEqual(Open);

  expect(Interval.fromString(' [ -1 , 1 ] ')).toEqual(Closed);

  expect(() => Interval.fromString('Not an interval')).toThrowError(
    IntervalParseError
  );
  expect(() => Interval.fromString('{0,0}')).toThrowError(IntervalParseError);
  expect(() => Interval.fromString('[NaN,0]')).toThrowError(IntervalParseError);
  expect(() => Interval.fromString('[0,NaN]')).toThrowError(IntervalParseError);
});

test('infinity & predefined intervals', () => {
  expect(Inf().toString()).toEqual(`[Infinity,Infinity]`);

  expect(Inf().isEmpty()).toBeFalsy();
  expect(Interval.Closed(Infinity, 0).isEmpty()).toBeTruthy();

  expect(Inf).toEqual(Inf);

  expect(Inf().contains(Infinity)).toBeTruthy();
  expect(Inf().contains(0)).toBeFalsy();
  expect(Real().contains(0)).toBeTruthy();
  expect(Real().contains(Infinity)).toBeFalsy();
  expect(RealWithInf().contains(0)).toBeTruthy();
  expect(RealWithInf().contains(Infinity)).toBeTruthy();

  expect(Inf().union(Inf())).toEqual(new NumberSet([Inf()]));
  expect(Inf().union(Closed)).toEqual(new NumberSet([Inf(), Closed]));
  expect(NonNegative().union(NonPositive())).toEqual(new NumberSet([Real()]));
  expect(NonNegativeWithInf().union(NonPositiveWithNegInf())).toEqual(
    new NumberSet([RealWithInf()])
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
    new NumberSet([Negative(), Positive()])
  );
  expect(NonNegativeWithInf().without(Inf())).toEqual(
    new NumberSet([NonNegative()])
  );

  expect(NonNegative().symDiff(NonPositive())).toEqual(
    new NumberSet([Negative(), Positive()])
  );
  expect(NonNegativeWithInf().symDiff(NonPositiveWithNegInf())).toEqual(
    new NumberSet([NegativeWithNegInf(), PositiveWithInf()])
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
    new NumberSet([
      Interval.BottomClosed(0, 0.25),
      Interval.TopClosed(0.5, 0.75),
    ])
  );
  expect(Interval.Closed(-0.5, 0.5).symDiff(clampedInterval)).toEqual(
    new NumberSet([
      Interval.BottomClosed(-0.5, 0.25),
      Interval.TopClosed(0.5, 0.75),
    ])
  );
});
