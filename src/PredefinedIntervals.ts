import { Interval, NumberTransform } from '.';

/**
 * (0,0)
 */
export const Empty = (numberTransform?: NumberTransform) =>
  Interval.Open(0, 0, numberTransform);
/**
 * [Infinity,Infinity]
 */
export const Inf = (numberTransform?: NumberTransform) =>
  Interval.Point(Infinity, numberTransform);

/**
 * (-Infinity, Infinity)
 */
export const Real = (numberTransform?: NumberTransform) =>
  Interval.Open(-Infinity, Infinity, numberTransform);
/**
 * [-Infinity, Infinity]
 */
export const RealWithInf = (numberTransform?: NumberTransform) =>
  Interval.Closed(-Infinity, Infinity, numberTransform);

/**
 * [0,Infinity)
 */
export const NonNegative = (numberTransform?: NumberTransform) =>
  Interval.BottomClosed(0, Infinity, numberTransform);
/**
 * [0,Infinity]
 */
export const NonNegativeWithInf = (numberTransform?: NumberTransform) =>
  Interval.Closed(0, Infinity, numberTransform);
/**
 * (0,Infinity)
 */
export const Positive = (numberTransform?: NumberTransform) =>
  Interval.Open(0, Infinity, numberTransform);
/**
 * (0,Infinity]
 */
export const PositiveWithInf = (numberTransform?: NumberTransform) =>
  Interval.TopClosed(0, Infinity, numberTransform);

/**
 * (-Infinity, 0]
 */
export const NonPositive = (numberTransform?: NumberTransform) =>
  Interval.TopClosed(-Infinity, 0, numberTransform);
/**
 * [-Infinity, 0]
 */
export const NonPositiveWithNegInf = (numberTransform?: NumberTransform) =>
  Interval.Closed(-Infinity, 0, numberTransform);
/**
 * (-Infinity, 0)
 */
export const Negative = (numberTransform?: NumberTransform) =>
  Interval.Open(-Infinity, 0, numberTransform);
/**
 * [-Infinity, 0)
 */
export const NegativeWithNegInf = (numberTransform?: NumberTransform) =>
  Interval.BottomClosed(-Infinity, 0, numberTransform);
