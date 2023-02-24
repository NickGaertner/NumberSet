import { expect } from '@jest/globals';
import { Interval, NumberSet } from '../src';

// Empty
export const EmptyOpenPoint = Interval.Open(0, 0);
export const EmptyCrossed = Interval.Closed(1, -1);

// -1 to 1
export const Closed = Interval.Closed(-1, 1);
export const Open = Interval.Open(-1, 1);
export const BottomClosed = Interval.BottomClosed(-1, 1);
export const TopClosed = Interval.TopClosed(-1, 1);

// -1 to 0
export const ClosedLower = Interval.Closed(-1, 0);
export const TopClosedLower = Interval.TopClosed(-1, 0);
export const BottomClosedLower = Interval.BottomClosed(-1, 0);
export const OpenLower = Interval.Open(-1, 0);
// and 0 to 1
export const ClosedUpper = Interval.Closed(0, 1);
export const TopClosedUpper = Interval.TopClosed(0, 1);
export const BottomClosedUpper = Interval.BottomClosed(0, 1);
export const OpenUpper = Interval.Open(0, 1);

// Points
export const Middle = Interval.Point(0);
export const Outlier = Interval.Point(10);

// Extend jest equality testers to use our own equals methods
const intervalEquals = (x: Interval, y: Interval) => {
  if (x instanceof Interval && x instanceof Interval) {
    return x.equals(y);
  } else {
    return undefined;
  }
};
const numberSetEquals = (x: NumberSet, y: NumberSet) => {
  if (x instanceof NumberSet && x instanceof NumberSet) {
    return x.equals(y);
  } else {
    return undefined;
  }
};

expect.addEqualityTesters([intervalEquals, numberSetEquals]);
