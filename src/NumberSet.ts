import { Interval, ParseError } from '.';

/**
 * A set of numbers represented by the union of disjoint intervals
 *
 * @remarks
 * Supports the most common set operations
 *
 * - _Note: Most functions use {@link Interval} functions internally.
 * It's advised that all provided {@link Interval}s use the same
 * {@link NumberTransform}._
 *
 */
export class NumberSet {
  readonly intervals: ReadonlyArray<Interval>;

  /**
   * Constructs a new {@link NumberSet} from the given intervals.
   *
   * @remarks
   * Note that the intervals are stored internally in a "normalized" manner meaning
   *  - intersecting intervals are merged
   *  - empty intervals are omitted
   *  - the intervals are sorted by their lower bound in ascending order
   *
   * @param intervals - Intervals representing this set
   */
  static from(intervals: ReadonlyArray<Interval>): NumberSet {
    return new NumberSet(intervals);
  }

  /**
   * @internal
   */
  private constructor(
    intervals: ReadonlyArray<Interval>,
    intervalState?: IntervalState
  ) {
    this.intervals =
      intervalState === IntervalState.Normalized
        ? intervals
        : NumberSet._normalize(
            intervals,
            intervalState === IntervalState.Sorted
          );
  }

  /**
   * @internal
   */
  private static _normalize(
    intervals: ReadonlyArray<Interval>,
    isSorted: boolean
  ): ReadonlyArray<Interval> {
    let modifiedIntervals = intervals.filter((i) => !i.isEmpty());
    if (modifiedIntervals.length === 0) {
      return modifiedIntervals;
    }

    if (!isSorted) {
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
    }
    modifiedIntervals = modifiedIntervals.reduce<Interval[]>(
      (prev, current) => {
        if (!prev.length) {
          return [current];
        }
        const last = prev[prev.length - 1];
        if (last.touches(current)) {
          // Beware: Interval.union tries to construct a NumberSet of two intervals
          // if the intervals don't touch. If we don't check the touching
          // condition as above, we create an infinite loop
          const union = last.union(current).intervals[0];
          prev[prev.length - 1] = union;
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
   * @returns This set's string representation
   */
  toString(): string {
    return `{${this.intervals.map((i) => i.toString()).join(', ')}}`;
  }

  /**
   * Constructs a {@link NumberSet} from a string representation
   *
   * @remarks
   * Expects a list of {@link Interval} string representations separated by ", "
   * surrounded by curly braces. See {@link Interval.fromString} for more information on
   * formatting intervals.
   *
   * Prefer constructing directly from {@link Interval}s instead of strings if possible
   *
   * @example
   * ``` ts
   * NumberSet.fromString("{(-1,0), (0,1)}").equals(new NumberSet([
   *  Interval.Open(-1,0), Interval.Open(0,1)
   * ])); // true
   * ```
   *
   * @param s - String representation of the {@link NumberSet}
   * @returns {@link NumberSet} corresponding to the string representation
   * @throws {@link ParseError} if s is malformed
   *
   * @alpha
   */
  static fromString(s: string): NumberSet {
    const trimmed = s.trim();
    if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
      throw new ParseError(
        `The provided string "${s}" is not of a valid NumberSet format.`
      );
    }
    const intervalReps: string[] = trimmed
      .slice(1, -1)
      .split(', ')
      .filter((t) => t.length);
    // TODO try catch and then throw more specific error
    const intervals: Interval[] = intervalReps.map((rep) =>
      Interval.fromString(rep)
    );
    return new NumberSet(intervals);
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
   * @param other - {@link NumberSet} to compare to
   * @returns True if both sets represent the same abstract set
   */
  equals(other: NumberSet): boolean {
    if (this.intervals.length !== other.intervals.length) {
      return false;
    }
    for (let i = 0; i < this.intervals.length; ++i) {
      // possible because of the normalized intervals array
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
    let [l, r] = [0, this.intervals.length - 1];
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      const interval = this.intervals[m];
      if (x < interval.lowerBound) {
        r = m - 1;
      } else if (interval.upperBound < x) {
        l = m + 1;
      } else {
        // possible because of the normalized intervals array
        return interval.contains(x);
      }
    }
    return false;
  }

  /**
   *
   * @param other - {@link NumberSet} to merge with
   * @returns The union of both sets, e.g. a new {@link NumberSet} containing
   * all elements included in `one` of the source sets
   */
  union(other: NumberSet): NumberSet {
    // sort the intervals to help the sorting in NumberSet._normalize
    const sorted: Interval[] = [];
    let [i, j] = [0, 0];
    while (i < this.intervals.length && j < other.intervals.length) {
      if (
        this.intervals[i].lowerBound < other.intervals[j].lowerBound ||
        (this.intervals[i].lowerBoundIncluded &&
          this.intervals[i].lowerBound === other.intervals[j].lowerBound)
      ) {
        sorted.push(this.intervals[i++]);
      } else {
        sorted.push(other.intervals[j++]);
      }
    }
    sorted.push(...this.intervals.slice(i));
    sorted.push(...other.intervals.slice(j));

    return new NumberSet(sorted, IntervalState.Sorted);
  }

  /**
   *
   * @param other - {@link NumberSet}  to check for intersection
   * @returns True if the sets aren't disjoint, e.g. their intersection
   * is not empty
   */
  intersects(other: NumberSet): boolean {
    let [i, j] = [0, 0];
    while (i < this.intervals.length && j < other.intervals.length) {
      if (this.intervals[i].intersects(other.intervals[j])) {
        return true;
      }
      this.intervals[i].upperBound <= other.intervals[j].lowerBound ? ++i : ++j;
    }
    return false;
  }

  /**
   *
   * @param other - {@link NumberSet} to intersect with
   * @returns The overlap of both sets, e.g. a new {@link NumberSet} containing
   * all elements included in `both` of the source sets
   */
  intersection(other: NumberSet): NumberSet {
    const intersections: Interval[] = [];
    let [i, j] = [0, 0];
    while (i < this.intervals.length && j < other.intervals.length) {
      const [I, J] = [this.intervals[i], other.intervals[j]];
      if (I.intersects(J)) {
        intersections.push(I.intersection(J));
      }

      // condition is only right because of the normalization:
      // if both upper bounds are equal they can't have further intersections
      // since they would need to intersect at their upper bound; thus, the
      // interval they would intersect with touches the other interval
      this.intervals[i].upperBound < other.intervals[j].upperBound ? ++i : ++j;
    }

    return new NumberSet(intersections, IntervalState.Normalized);
  }

  /**
   *
   * @param other - {@link NumberSet} to subtract
   * @returns The difference of both sets, e.g. a new {@link NumberSet}
   *  containing all elements included in `this` and not in other
   */
  without(other: NumberSet): NumberSet {
    const result: Interval[] = [];
    let [i, j] = [0, 0];
    while (i < this.intervals.length) {
      let I = this.intervals[i++];
      while (j < other.intervals.length) {
        const J = other.intervals[j];
        if (I.intersects(J)) {
          const diff = I.without(J).intervals;
          if (diff.length === 0) {
            /*  I  xx ?
                J _____ 
                we need the next I */
            break;
          } else if (diff.length === 1) {
            I = diff[0];
            if (I.upperBound == J.lowerBound) {
              /*  I ___x ?
                  J    ___ 
                  we need the next I */
              result.push(I);
              break;
            } // I.lowerBound == J.upperBound
            /*  I   x___
                J ___ ?
                we need the next J */
          } else if (diff.length === 2) {
            /*  I  __xx__
                J    __ ?
                we need the next J */
            result.push(diff[0]);
            I = diff[1];
          }
        } else {
          if (I.upperBound <= J.lowerBound) {
            /*  I ___ ?
                J     ___ 
                we need the next I */
            result.push(I);
            break;
          }
          /*  I     ___
              J ___ ?    
              we need the next J */
        }
        ++j;
      }
      if (j === other.intervals.length) {
        result.push(I);
        break;
      }
    }

    result.push(...this.intervals.slice(i));
    return new NumberSet(result, IntervalState.Normalized);
  }

  /**
   *
   * @param other -
   * @returns The symmetric difference of both sets, e.g. a new {@link NumberSet}
   *  containing all elements included in `exactly` one of the sets
   */
  symDiff(other: NumberSet): NumberSet {
    /*
    performance might increase if we do the operation by hand
    but is the headache really worth? we'd get rid of a readable 
    one-liner while staying in O(n+m)
    */

    /* 
    We intentionally write the term without function calls on other
    to avoid mixing number transforms
    */
    return this.union(other).without(this.intersection(other));
  }
}

// TODO get rid of doc warning
/**
 * @internal
 */
enum IntervalState {
  Sorted,
  Normalized,
}
