import assert from 'assert';
import { Interval } from '.';

export class NumberSet {
  private intervals: Interval[];

  constructor(intervals: ReadonlyArray<Interval>) {
    this.intervals = [...intervals];
    this.normalize();
  }

  toString(): string {
    return `{${this.intervals.map((i) => i.toString()).join(', ')}}`;
  }

  *[Symbol.iterator]() {
    yield* this.intervals;
  }

  isEmpty(): boolean {
    return this.intervals.length === 0;
  }

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

  contains(x: number): boolean {
    for (const I of this.intervals) {
      if (I.contains(x)) {
        return true;
      }
    }
    return false;
  }

  union(other: NumberSet): NumberSet {
    return new NumberSet([...this.intervals, ...other.intervals]);
  }

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

  intersection(other: NumberSet): NumberSet {
    const intersections = this.intervals.flatMap((i) =>
      other.intervals.map((j) => i.intersection(j))
    );
    return new NumberSet(intersections);
  }

  without(other: NumberSet): NumberSet {
    const difference = this.intervals.flatMap(
      (minuend) =>
        other.intervals
          .map((subtrahend) => minuend.without(subtrahend))
          .reduce((prev, current) => prev.intersection(current)).intervals
    );
    return new NumberSet(difference);
  }

  symDiff(other: NumberSet): NumberSet {
    const symDiff = [
      ...this.without(other).intervals,
      ...other.without(this).intervals,
    ];
    return new NumberSet(symDiff);
  }

  normalize(): void {
    this.intervals = this.intervals.filter((i) => !i.isEmpty());
    if (this.isEmpty()) {
      return;
    }
    this.intervals.sort((a, b) => {
      const delta = a.lowerBound - b.lowerBound;
      if (delta !== 0) {
        return delta;
      }
      if (a.lowerBoundIncluded === b.lowerBoundIncluded) {
        return 0;
      }
      return a.lowerBoundIncluded ? -1 : 1;
    });

    this.intervals = this.intervals.reduce<Interval[]>((prev, current) => {
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
    }, []);

    this.intervals.reduce((i, j) => {
      assert(
        i.upperBound < j.lowerBound ||
          (i.upperBound === j.lowerBound &&
            !i.upperBoundIncluded &&
            !j.lowerBoundIncluded)
      );

      return j;
    });
    this.intervals.forEach((i) => assert(!i.isEmpty()));
  }
}
