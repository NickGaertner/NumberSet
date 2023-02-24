import { NumberSet } from '.';

/**
 * A connected set represented by its boundries {@link lowerBound} and {@link upperBound}
 *
 * @remarks
 * Supports the most common set operations and can be constructed from a string.<br>
 * Consider using the aliases {@link Closed}, {@link BottomClosed}, {@link TopClosed}, {@link Open} and {@link Point} instead of the constructor for conveniance.
 * Some common intervals are defined as static members like {@link Real} and {@link NonNegative}.
 *
 * @alpha
 */
export class Interval {
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly lowerBoundIncluded: boolean;
  readonly upperBoundIncluded: boolean;

  /**
   *
   * @remarks
   * Consider using the aliases {@link Closed}, {@link BottomClosed}, {@link TopClosed}, {@link Open} and {@link Point} instead for conveniance
   *
   * @param lowerBound - The interval's lower endpoint
   * @param upperBound - The interval's upper endpoint
   * @param lowerBoundIncluded - Indicates wether {@link lowerBound} should be included
   * @param upperBoundIncluded -Indicates wether {@link upperBound} should be included
   */
  constructor({
    lowerBound,
    upperBound,
    lowerBoundIncluded,
    upperBoundIncluded,
  }: {
    lowerBound: number;
    upperBound: number;
    lowerBoundIncluded: boolean;
    upperBoundIncluded: boolean;
  }) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.lowerBoundIncluded = lowerBoundIncluded;
    this.upperBoundIncluded = upperBoundIncluded;
  }

  /**
   * Transforms the interval to its string representation using square brackets for included and parentheses for excluded endpoints
   *
   * @example
   * ``` ts
   * console.log(Interval.BottomClosed(0,1)) // "[0,1)"
   * ```
   *
   * @returns This interval's string representation
   */
  toString(): string {
    const openingBracket =
      OpeningBracket[this.lowerBoundIncluded ? 'inclusive' : 'exclusive'][0];
    const closingBracket =
      ClosingBracket[this.upperBoundIncluded ? 'inclusive' : 'exclusive'][0];
    return `${openingBracket}${this.lowerBound},${this.upperBound}${closingBracket}`;
  }

  /**
   * Constructs an interval from its string representation
   *
   * @remarks
   * Included endpoints are denoted by square brackets and excluded ones by either parentheses or reversed square brackets.
   * Prefer constructing directly from number values instead of strings if possible
   * @example
   * ``` ts
   * Interval.fromString("[0,1)").equals(Interval.BottomClosed(0,1)) // true
   * Interval.fromString("[0,1[").equals(Interval.fromString("[0,1)")) // true
   * ```
   *
   * @param s - String representation of the interval
   * @returns Interval corresponding to the string representation
   * @throws {@link IntervalParseError} if s is malformed
   */
  static fromString(s: string): Interval {
    const match = s.trim().match(intervalRegex);
    if (!match || !match.groups) {
      throw new IntervalParseError(
        `The provided string "${s}" is not of a valid interval format.`
      );
    }
    const { openingBracket, lower, upper, closingBracket } = match.groups;

    const lowerBound = parseFloat(lower);
    const upperBound = parseFloat(upper);

    if (isNaN(lowerBound)) {
      throw new IntervalParseError(
        `The provided substring "${lower}" couldn't be parsed to a number.`
      );
    }
    if (isNaN(upperBound)) {
      throw new IntervalParseError(
        `The provided substring "${upper}" couldn't be parsed to a number.`
      );
    }

    const getInclusion = (bracket: string, bracketGroup: BracketGroup) =>
      bracketGroup.inclusive.includes(bracket) ? true : false;
    const lowerBoundIncluded = getInclusion(openingBracket, OpeningBracket);
    const upperBoundIncluded = getInclusion(closingBracket, ClosingBracket);

    return new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded,
      upperBoundIncluded,
    });
  }

  /**
   *
   * @returns NumberSet equivalent to this interval
   */
  toSet(): NumberSet {
    return new NumberSet([this]);
  }

  /**
   *
   * @returns True if this interval equals an empty set
   */
  isEmpty() {
    return (
      this.upperBound < this.lowerBound ||
      (this.lowerBound === this.upperBound &&
        !(this.lowerBoundIncluded && this.upperBoundIncluded))
    );
  }

  /**
   *
   * @param other - Interval to compare to
   * @returns True if the intervals represent the same set
   */
  equals(other: Interval) {
    return (
      (this.lowerBound === other.lowerBound &&
        this.lowerBoundIncluded === other.lowerBoundIncluded &&
        this.upperBound === other.upperBound &&
        this.upperBoundIncluded === other.upperBoundIncluded) ||
      (this.isEmpty() && other.isEmpty())
    );
  }

  /**
   *
   * @param x - Number to search
   * @returns True if x is included in this interval
   */
  contains(x: number) {
    return (
      (this.lowerBound < x && x < this.upperBound) ||
      (this.lowerBoundIncluded && x === this.lowerBound) ||
      (this.upperBoundIncluded && x === this.upperBound)
    );
  }

  /**
   *
   * @param other - Interval to merge with
   * @returns The union of both intervals, e.g. a new interval containing all elements included in `either` of the source intervals
   */
  union(other: Interval): NumberSet {
    if (!this.intersects(other)) {
      return new NumberSet([this, other]);
    }
    const getLowerBound: () => [number, boolean] = () => {
      if (this.lowerBound < other.lowerBound) {
        return [this.lowerBound, this.lowerBoundIncluded];
      }
      if (other.lowerBound < this.lowerBound) {
        return [other.lowerBound, other.lowerBoundIncluded];
      }
      // equality
      return [
        this.lowerBound,
        this.lowerBoundIncluded || other.lowerBoundIncluded,
      ];
    };
    const [lowerBound, lowerBoundIncluded] = getLowerBound();

    const getUpperBound: () => [number, boolean] = () => {
      if (this.upperBound < other.upperBound) {
        return [other.upperBound, other.upperBoundIncluded];
      } else if (other.upperBound < this.upperBound) {
        return [this.upperBound, this.upperBoundIncluded];
      } else {
        // equality
        return [
          this.upperBound,
          this.upperBoundIncluded || other.upperBoundIncluded,
        ];
      }
    };
    const [upperBound, upperBoundIncluded] = getUpperBound();

    return new NumberSet([
      new Interval({
        lowerBound,
        upperBound,
        lowerBoundIncluded,
        upperBoundIncluded,
      }),
    ]);
  }

  /**
   *
   * @param other - Interval to check for overlap
   * @returns True if the intervals overlap, e.g. their intersection is not the empty set
   */
  intersects(other: Interval): boolean {
    if (this.isEmpty() || other.isEmpty()) {
      return false;
    }
    if (
      this.contains(other.lowerBound) ||
      this.contains(other.upperBound) ||
      other.contains(this.lowerBound) ||
      other.contains(this.upperBound)
    ) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param other - Interval to intersect with
   * @returns The overlap of both intervals, e.g. a new interval containing all elements included in `both` of the source intervals
   */
  intersection(other: Interval): Interval {
    if (!this.intersects(other)) {
      return Interval.Empty;
    }
    const getLowerBound: () => [number, boolean] = () => {
      if (this.lowerBound < other.lowerBound) {
        return [other.lowerBound, other.lowerBoundIncluded];
      }
      if (other.lowerBound < this.lowerBound) {
        return [this.lowerBound, this.lowerBoundIncluded];
      }
      // equality
      return [
        this.lowerBound,
        this.lowerBoundIncluded && other.lowerBoundIncluded,
      ];
    };
    const [lowerBound, lowerBoundIncluded] = getLowerBound();

    const getUpperBound: () => [number, boolean] = () => {
      if (this.upperBound < other.upperBound) {
        return [this.upperBound, this.upperBoundIncluded];
      } else if (other.upperBound < this.upperBound) {
        return [other.upperBound, other.upperBoundIncluded];
      } else {
        // equality
        return [
          this.upperBound,
          this.upperBoundIncluded && other.upperBoundIncluded,
        ];
      }
    };
    const [upperBound, upperBoundIncluded] = getUpperBound();

    return new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded,
      upperBoundIncluded,
    });
  }

  /**
   *
   * @param other - Interval to substract
   * @returns The difference of both intervals, e.g. a new interval containing all elements included in `this` and not in other
   */
  without(other: Interval): NumberSet {
    if (!this.intersects(other)) {
      return new NumberSet([this]);
    }
    const intersection = this.intersection(other);
    const lower = new Interval({
      lowerBound: this.lowerBound,
      upperBound: intersection.lowerBound,
      lowerBoundIncluded: this.lowerBoundIncluded,
      upperBoundIncluded: !intersection.lowerBoundIncluded,
    });
    const upper = new Interval({
      lowerBound: intersection.upperBound,
      upperBound: this.upperBound,
      lowerBoundIncluded: !intersection.upperBoundIncluded,
      upperBoundIncluded: this.upperBoundIncluded,
    });
    return new NumberSet([lower, upper].filter((i) => !i.isEmpty()));
  }
  /**
   *
   * @param other -
   * @returns The symmetric difference of both intervals, e.g. a new interval containing all elements included in exactly one of the intervals
   */
  symDiff(other: Interval): NumberSet {
    return this.without(other).union(other.without(this));
  }

  // aliases for convenience
  /**
   * (0,0)
   */
  static readonly Empty = new Interval({
    lowerBound: 0,
    upperBound: 0,
    lowerBoundIncluded: false,
    upperBoundIncluded: false,
  });
  /**
   *
   * @param lowerBound -
   * @param upperBound -
   * @returns [lowerBound,upperBound]
   */
  static readonly Closed = (lowerBound: number, upperBound: number) =>
    new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded: true,
      upperBoundIncluded: true,
    });
  /**
   *
   * @param lowerBound -
   * @param upperBound -
   * @returns (lowerBound,upperBound)
   */
  static readonly Open = (lowerBound: number, upperBound: number) =>
    new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded: false,
      upperBoundIncluded: false,
    });
  /**
   *
   * @param lowerBound -
   * @param upperBound -
   * @returns [lowerBound,upperBound)
   */
  static readonly BottomClosed = (lowerBound: number, upperBound: number) =>
    new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded: true,
      upperBoundIncluded: false,
    });
  /**
   *
   * @param lowerBound -
   * @param upperBound -
   * @returns (lowerBound,upperBound]
   */
  static readonly TopClosed = (lowerBound: number, upperBound: number) =>
    new Interval({
      lowerBound,
      upperBound,
      lowerBoundIncluded: false,
      upperBoundIncluded: true,
    });
  /**
   *
   * @param x -
   * @returns [x,x]
   */
  static readonly Point = (x: number) => this.Closed(x, x);

  /**
   * [Infinity,Infinity]
   */
  static readonly Inf = this.Point(Infinity);

  /**
   * (-Infinity, Infinity)
   */
  static readonly Real = this.Open(-Infinity, Infinity);
  /**
   * [-Infinity, Infinity]
   */
  static readonly RealWithInf = this.Closed(-Infinity, Infinity);

  /**
   * [0,Infinity)
   */
  static readonly NonNegative = this.BottomClosed(0, Infinity);
  /**
   * [0,Infinity]
   */
  static readonly NonNegativeWithInf = this.Closed(0, Infinity);
  /**
   * (0,Infinity)
   */
  static readonly Positive = this.Open(0, Infinity);
  /**
   * (0,Infinity]
   */
  static readonly PositiveWithInf = this.TopClosed(0, Infinity);

  /**
   * (-Infinity, 0]
   */
  static readonly NonPositive = this.TopClosed(-Infinity, 0);
  /**
   * [-Infinity, 0]
   */
  static readonly NonPositiveWithNegInf = this.Closed(-Infinity, 0);
  /**
   * (-Infinity, 0)
   */
  static readonly Negative = this.Open(-Infinity, 0);
  /**
   * [-Infinity, 0)
   */
  static readonly NegativeWithNeginf = this.BottomClosed(-Infinity, 0);
}

interface BracketGroup {
  readonly inclusive: readonly string[];
  readonly exclusive: readonly string[];
}

const OpeningBracket: BracketGroup = {
  inclusive: ['['],
  exclusive: ['(', ']'],
} as const;

const ClosingBracket: BracketGroup = {
  inclusive: [']'],
  exclusive: [')', '['],
} as const;

const openingBracketGroup = `(?<openingBracket>[
  ${[...OpeningBracket.inclusive, ...OpeningBracket.exclusive]
    .map((b) => `\\${b}`)
    .join(',')}
])`;

const closingBracketGroup = `(?<closingBracket>[
  ${[...ClosingBracket.inclusive, ...ClosingBracket.exclusive]
    .map((b) => `\\${b}`)
    .join(',')}
])`;

const lowerBoundGroup = '(?<lower>[^,]*)';
const upperBoundGroup = '(?<upper>[^,]*)';

const intervalRegex = new RegExp(
  openingBracketGroup +
    lowerBoundGroup +
    ',' +
    upperBoundGroup +
    closingBracketGroup
);

/**
 * Thrown when {@link Interval.toString} is called with malformed input
 */
export class IntervalParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}
