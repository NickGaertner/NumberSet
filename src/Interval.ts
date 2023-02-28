import { Empty, NumberSet } from '.';

export type NumberTransform = (x: number) => number;
const numberId: NumberTransform = (x) => x;
/**
 * A connected set represented by its endpoints {@link lowerBound} and {@link upperBound}
 *
 * @remarks
 * Supports the most common set operations and can be constructed from a string.<br>
 * Consider using the aliases described down below instead of the constructor for convenience.
 *
 * Some common intervals are already defined like {@link Real} and {@link NonNegative}.
 *
 * All intervals can be constructed with a {@link NumberTransform} that can be used to
 * - include sanity checks, like `Number.isSafeInteger(x)` (think of them as type constraints)
 * - actually transform the bounds, for example clamping the values to nonnegative numbers
 *
 * The {@link NumberTransform} is propagated by all functions returning {@link Interval} or {@link NumberSet}
 * using the {@link NumberTransform} from the __called__ {@link Interval}
 *  - _Note: If your {@link NumberTransform} throws then all functions that use it can throw as well!_
 *  - _Note: The {@link NumberTransform} should be idempotent!_
 *
 * Aliases:
 * - {@link Interval.Closed}
 * - {@link Interval.BottomClosed} (={@link Interval.TopOpen})
 * - {@link Interval.TopClosed} (={@link Interval.BottomOpen})
 * - {@link Interval.Open}
 * - {@link Interval.Point}
 */
export class Interval {
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly lowerBoundIncluded: boolean;
  readonly upperBoundIncluded: boolean;
  readonly numberTransform: NumberTransform;

  /**
   *
   * @remarks
   * Consider using the aliases {@link Closed}, {@link BottomClosed}, {@link TopClosed}, {@link Open} and {@link Point} instead for convenience
   *
   * @param lowerBound - The interval's lower endpoint
   * @param upperBound - The interval's upper endpoint
   * @param lowerBoundIncluded - Indicates wether {@link lowerBound} should be included
   * @param upperBoundIncluded -Indicates wether {@link upperBound} should be included
   * @param numberTransform - Transform function applied to the bounds and propagated
   * to new intervals created by member functions
   */
  constructor({
    lowerBound,
    upperBound,
    lowerBoundIncluded,
    upperBoundIncluded,
    numberTransform = numberId,
  }: {
    lowerBound: number;
    upperBound: number;
    lowerBoundIncluded: boolean;
    upperBoundIncluded: boolean;
    numberTransform?: NumberTransform;
  }) {
    this.numberTransform = numberTransform;
    this.lowerBound = this.numberTransform(lowerBound);
    this.upperBound = this.numberTransform(upperBound);
    this.lowerBoundIncluded = lowerBoundIncluded;
    this.upperBoundIncluded = upperBoundIncluded;
  }

  /**
   * Transforms the {@link Interval} to its string representation using square brackets for included and parentheses for excluded endpoints
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
   * Constructs an {@link Interval} from a string representation
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
   * @param s - String representation of the {@link Interval}
   * @param numberTransform - See {@link Interval} for more information
   * @returns {@link Interval} corresponding to the string representation
   * @throws {@link ParseError} if s is malformed
   */
  static fromString(s: string, numberTransform?: NumberTransform): Interval {
    const match = s.trim().match(intervalRegex);
    if (!match || !match.groups) {
      throw new ParseError(
        `The provided string "${s}" is not of a valid interval format.`
      );
    }
    const { openingBracket, lower, upper, closingBracket } = match.groups;

    const lowerBound = parseFloat(lower);
    const upperBound = parseFloat(upper);

    if (isNaN(lowerBound)) {
      throw new ParseError(
        `The provided substring "${lower}" couldn't be parsed to a number.`
      );
    }
    if (isNaN(upperBound)) {
      throw new ParseError(
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
      numberTransform,
    });
  }

  /**
   *
   * @returns NumberSet equivalent to this {@link Interval}
   */
  toSet(): NumberSet {
    return NumberSet.from([this]);
  }

  /**
   *
   * @returns True if this {@link Interval} equals an empty set
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
   * @param other - {@link Interval} to compare to
   * @returns True if the {@link Interval}s represent the same set
   */
  equals(other: Interval): boolean {
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
   * @param x - Number to search for
   * @returns True if x is included in this {@link Interval}
   */
  contains(x: number): boolean {
    return (
      (this.lowerBound < x && x < this.upperBound) ||
      (this.lowerBoundIncluded && x === this.lowerBound) ||
      (this.upperBoundIncluded && x === this.upperBound)
    );
  }

  /**
   *
   * @param other - {@link Interval} to merge with
   * @returns The union of both {@link Interval}s, e.g. a new {@link Interval} containing all elements included in `either` of the source {@link Interval}s
   */
  union(other: Interval): NumberSet {
    if (!this.intersects(other)) {
      return NumberSet.from([this, other]);
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

    return NumberSet.from([
      new Interval({
        lowerBound,
        upperBound,
        lowerBoundIncluded,
        upperBoundIncluded,
        numberTransform: this.numberTransform,
      }),
    ]);
  }

  /**
   *
   * @param other - {@link Interval} to check for overlap
   * @returns True if the {@link Interval}s overlap, e.g. their intersection is not the empty set
   */
  intersects(other: Interval): boolean {
    if (this.isEmpty() || other.isEmpty()) {
      return false;
    }

    const cond0 =
      this.lowerBoundIncluded && other.upperBoundIncluded
        ? this.lowerBound <= other.upperBound
        : this.lowerBound < other.upperBound;
    const cond1 =
      other.lowerBoundIncluded && this.upperBoundIncluded
        ? other.lowerBound <= this.upperBound
        : other.lowerBound < this.upperBound;
    return cond0 && cond1;
  }

  /**
   *
   * @param other - {@link Interval} to intersect with
   * @returns The overlap of both {@link Interval}s, e.g. a new {@link Interval} containing all elements included in `both` of the source {@link Interval}s
   */
  intersection(other: Interval): Interval {
    if (!this.intersects(other)) {
      return Empty(this.numberTransform);
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
      numberTransform: this.numberTransform,
    });
  }

  /**
   *
   * @param other - {@link Interval} to subtract
   * @returns The difference of both {@link Interval}s, e.g. a new {@link Interval} containing all elements included in `this` and not in other
   */
  without(other: Interval): NumberSet {
    if (!this.intersects(other)) {
      return NumberSet.from([this]);
    }
    const intersection = this.intersection(other);
    const lower = new Interval({
      lowerBound: this.lowerBound,
      upperBound: intersection.lowerBound,
      lowerBoundIncluded: this.lowerBoundIncluded,
      upperBoundIncluded: !intersection.lowerBoundIncluded,
      numberTransform: this.numberTransform,
    });
    const upper = new Interval({
      lowerBound: intersection.upperBound,
      upperBound: this.upperBound,
      lowerBoundIncluded: !intersection.upperBoundIncluded,
      upperBoundIncluded: this.upperBoundIncluded,
      numberTransform: this.numberTransform,
    });
    return NumberSet.from([lower, upper].filter((i) => !i.isEmpty()));
  }
  /**
   *
   * @param other -
   * @returns The symmetric difference of both {@link Interval}s, e.g. a new {@link Interval} containing all elements included in exactly one of the {@link Interval}s
   */
  symDiff(other: Interval): NumberSet {
    /* 
    We intentionally write the term without function calls on other
    to avoid mixing number transforms
    */
    return this.union(other).without(this.intersection(other).toSet());
  }

  /* Aliases for constructing new intervals*/

  /**
   *
   * @internal
   */
  private static readonly _withInclusion =
    (lowerBoundIncluded: boolean, upperBoundIncluded: boolean) =>
    (
      lowerBound: number,
      upperBound: number,
      numberTransform?: NumberTransform
    ) =>
      new Interval({
        lowerBound,
        upperBound,
        lowerBoundIncluded,
        upperBoundIncluded,
        numberTransform,
      });

  /**
   * See {@link Interval} for more information
   * @returns [lowerBound,upperBound]
   */
  static readonly Closed = this._withInclusion(true, true);
  /**
   * See {@link Interval} for more information
   * @returns (lowerBound,upperBound)
   */
  static readonly Open = this._withInclusion(false, false);
  /**
   * See {@link Interval} for more information
   * @returns [lowerBound,upperBound)
   */
  static readonly BottomClosed = this._withInclusion(true, false);
  /**
   * Same as {@link BottomClosed}
   * See {@link Interval} for more information
   * @returns [lowerBound,upperBound)
   */
  static readonly TopOpen = this.BottomClosed;
  /**
   * See {@link Interval} for more information
   * @returns (lowerBound,upperBound]
   */
  static readonly TopClosed = this._withInclusion(false, true);
  /**
   * Same as {@link TopClosed}
   * See {@link Interval} for more information
   * @returns (lowerBound,upperBound]
   */
  static readonly BottomOpen = this.TopClosed;
  /**
   * See {@link Interval} for more information
   * @returns [x,x]
   */
  static readonly Point = (x: number, numberTransform?: NumberTransform) =>
    this.Closed(x, x, numberTransform);
}

/**
 * Thrown when {@link Interval.fromString} or {@link NumberSet.fromString} is called with malformed input
 */
export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
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
