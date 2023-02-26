import { Interval } from '.';

/**
 * (0,0)
 */
export const Empty = Interval.Open(0, 0);
/**
 * [Infinity,Infinity]
 */
export const Inf = Interval.Point(Infinity);

/**
 * (-Infinity, Infinity)
 */
export const Real = Interval.Open(-Infinity, Infinity);
/**
 * [-Infinity, Infinity]
 */
export const RealWithInf = Interval.Closed(-Infinity, Infinity);

/**
 * [0,Infinity)
 */
export const NonNegative = Interval.BottomClosed(0, Infinity);
/**
 * [0,Infinity]
 */
export const NonNegativeWithInf = Interval.Closed(0, Infinity);
/**
 * (0,Infinity)
 */
export const Positive = Interval.Open(0, Infinity);
/**
 * (0,Infinity]
 */
export const PositiveWithInf = Interval.TopClosed(0, Infinity);

/**
 * (-Infinity, 0]
 */
export const NonPositive = Interval.TopClosed(-Infinity, 0);
/**
 * [-Infinity, 0]
 */
export const NonPositiveWithNegInf = Interval.Closed(-Infinity, 0);
/**
 * (-Infinity, 0)
 */
export const Negative = Interval.Open(-Infinity, 0);
/**
 * [-Infinity, 0)
 */
export const NegativeWithNegInf = Interval.BottomClosed(-Infinity, 0);
