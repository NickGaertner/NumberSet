// TODO get rid of assert
import assert from 'assert';
import { Interval } from '.';

/**
 * A set of numbers represented by the union of disjoint intervals
 *
 * @remarks
 * Supports the most common set operations
 *
 * @alpha
 */
export class NumberSet {
  readonly intervals: ReadonlyArray<Interval>;

  /**
   * Constructs a new NumberSet from the given intervals.
   *
   * @remarks
   * Note that the intervals are stored internally in a "normalized" fashion meaning
   *  - intersecting intervals are merged
   *  - empty intervals are omitted
   *  - the intervals are sorted by their lower bound in ascending order
   *
   * @param intervals - Intervals representing this set
   */
  constructor(intervals: ReadonlyArray<Interval>) {
    this.intervals = NumberSet.normalize(intervals);
  }

  private static normalize(
    intervals: ReadonlyArray<Interval>
  ): ReadonlyArray<Interval> {
    let modifiedIntervals = intervals.filter((i) => !i.isEmpty());
    if (modifiedIntervals.length === 0) {
      return modifiedIntervals;
    }
    modifiedIntervals.sort((a, b) => {
      const delta = a.lowerBound - b.lowerBound;
      if (delta !== 0) {
        return delta;
      }
      if (a.lowerBoundIncluded === b.lowerBoundIncluded) {
        return 0;
      }
      return a.lowerBoundIncluded ? -1 : 1;
    });

    modifiedIntervals = modifiedIntervals.reduce<Interval[]>(
      (prev, current) => {
        if (!prev.length) {
          return [current];
        }
        const last = prev[prev.length - 1];
        if (last.intersects(current)) {
          const union = last.union(current).intervals;
          assert(union.length === 1);
          prev[prev.length - 1] = union[0];
        } else {
          prev.push(current);
        }
        return prev;
      },
      []
    );

    return modifiedIntervals;
  }

  /**
   * Transforms the set to its string representation by joining the intervals' string representation with ", "
   * and surrounding the result with braces
   *
   * @example
   * ``` ts
   * console.log(
   *   new NumberSet([Interval.Open(-1, 0), Interval.Open(0, 1)]).toString()
   * );
   * // "{(-1,0), (0,1)}"
   * ```
   *
   * @returns This set's string representation
   */
  toString(): string {
    return `{${this.intervals.map((i) => i.toString()).join(', ')}}`;
  }

  /**
   * Convenience generator to iterate over the internal intervals
   *
   * @example
   * ``` ts
   * const set = new NumberSet([Interval.Open(-1, 0), Interval.Open(0, 1)]);
   * for (const interval of set) {
   *   console.log(interval.toString());
   * }
   * // "(-1,0)"
   * // "(0,1)"
   * ```
   */
  *[Symbol.iterator](): Generator<Interval, void, undefined> {
    yield* this.intervals;
  }

  /**
   *
   * @returns True if the set is empty
   */
  isEmpty(): boolean {
    return this.intervals.length === 0;
  }

  /**
   *
   * @param other - NumberSet to compare to
   * @returns True if both sets represent the same abstract set
   */
  equals(other: NumberSet): boolean {
    if (this.intervals.length !== other.intervals.length) {
      return false;
    }
    for (let i = 0; i < this.intervals.length; ++i) {
      if (!this.intervals[i].equals(other.intervals[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   *
   * @param x - Number to search for
   * @returns True if x is included in this set
   */
  contains(x: number): boolean {
    for (const I of this.intervals) {
      if (I.contains(x)) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param other - NumberSet to merge with
   * @returns The union of both sets, e.g. a new NumberSet containing
   * all elements included in `one` of the source sets
   */
  union(other: NumberSet): NumberSet {
    return new NumberSet([...this.intervals, ...other.intervals]);
  }

  /**
   *
   * @param other - NumberSet to check for intersection
   * @returns True if the sets aren't disjoint, e.g. their intersection
   * is not empty
   */
  intersects(other: NumberSet): boolean {
    for (const i of this.intervals) {
      for (const j of other.intervals) {
        if (i.intersects(j)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   *
   * @param other - NumberSet to intersect with
   * @returns The overlap of both sets, e.g. a new NumberSet containing
   * all elements included in `both` of the source sets
   */
  intersection(other: NumberSet): NumberSet {
    const intersections = this.intervals.flatMap((i) =>
      other.intervals.map((j) => i.intersection(j))
    );
    return new NumberSet(intersections);
  }

  /**
   *
   * @param other - NumberSet to subtract
   * @returns The difference of both sets, e.g. a new NumberSet
   *  containing all elements included in `this` and not in other
   */
  without(other: NumberSet): NumberSet {
    const difference = this.intervals.flatMap(
      (minuend) =>
        other.intervals
          .map((subtrahend) => minuend.without(subtrahend))
          .reduce((prev, current) => prev.intersection(current)).intervals
    );
    return new NumberSet(difference);
  }

  /**
   *
   * @param other -
   * @returns The symmetric difference of both sets, e.g. a new NumberSet
   *  containing all elements included in `exactly` one of the sets
   */
  symDiff(other: NumberSet): NumberSet {
    const symDiff = [
      ...this.without(other).intervals,
      ...other.without(this).intervals,
    ];
    return new NumberSet(symDiff);
  }
}
