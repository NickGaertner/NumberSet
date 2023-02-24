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
import { NumberSet } from '../src/NumberSet';
import { Interval } from '../src/Interval';

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

test('infinity & predefined intervals', () => {
  expect(Interval.Inf.toString()).toEqual(`[Infinity,Infinity]`);

  expect(Interval.Inf.isEmpty()).toBeFalsy();
  expect(Interval.Closed(Infinity, 0).isEmpty()).toBeTruthy();

  expect(Interval.Inf).toEqual(Interval.Inf);

  expect(Interval.Inf.contains(Infinity)).toBeTruthy();
  expect(Interval.Inf.contains(0)).toBeFalsy();
  expect(Interval.Real.contains(0)).toBeTruthy();
  expect(Interval.Real.contains(Infinity)).toBeFalsy();
  expect(Interval.RealWithInf.contains(0)).toBeTruthy();
  expect(Interval.RealWithInf.contains(Infinity)).toBeTruthy();

  expect(Interval.Inf.union(Interval.Inf)).toEqual(
    new NumberSet([Interval.Inf])
  );
  expect(Interval.Inf.union(Closed)).toEqual(
    new NumberSet([Interval.Inf, Closed])
  );
  expect(Interval.NonNegative.union(Interval.NonPositive)).toEqual(
    new NumberSet([Interval.Real])
  );
  expect(
    Interval.NonNegativeWithInf.union(Interval.NonPositiveWithNegInf)
  ).toEqual(new NumberSet([Interval.RealWithInf]));

  expect(Interval.NonNegative.intersects(Interval.NonPositive)).toBeTruthy();
  expect(
    Interval.NonNegativeWithInf.intersects(Interval.NonPositiveWithNegInf)
  ).toBeTruthy();
  expect(Interval.Real.intersects(Interval.RealWithInf)).toBeTruthy();

  expect(Interval.NonNegative.intersection(Interval.NonPositive)).toEqual(
    Middle
  );
  expect(
    Interval.NonNegativeWithInf.intersection(Interval.NonPositiveWithNegInf)
  ).toEqual(Middle);
  expect(Interval.Real.intersection(Interval.RealWithInf)).toEqual(
    Interval.Real
  );

  expect(Interval.Real.without(Middle)).toEqual(
    new NumberSet([Interval.Negative, Interval.Positive])
  );
  expect(Interval.NonNegativeWithInf.without(Interval.Inf)).toEqual(
    new NumberSet([Interval.NonNegative])
  );

  expect(Interval.NonNegative.symDiff(Interval.NonPositive)).toEqual(
    new NumberSet([Interval.Negative, Interval.Positive])
  );
  expect(
    Interval.NonNegativeWithInf.symDiff(Interval.NonPositiveWithNegInf)
  ).toEqual(
    new NumberSet([Interval.NegativeWithNeginf, Interval.PositiveWithInf])
  );
});
