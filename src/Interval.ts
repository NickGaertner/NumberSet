import { NumberSet } from './NumberSet';

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

const lowerBoundGroup = '(?<lowerBound>[^,]*)';
const upperBoundGroup = '(?<upperBound>[^,]*)';

const intervalRegex = new RegExp(
  openingBracketGroup +
    lowerBoundGroup +
    ',' +
    upperBoundGroup +
    closingBracketGroup
);

export class Interval {
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly lowerBoundIncluded: boolean;
  readonly upperBoundIncluded: boolean;

  constructor(
    lowerBound: number,
    upperBound: number,
    lowerBoundIncluded: boolean,
    upperBoundIncluded: boolean
  ) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
    this.lowerBoundIncluded = lowerBoundIncluded;
    this.upperBoundIncluded = upperBoundIncluded;
  }

  toString(): string {
    const openingBracket =
      OpeningBracket[this.lowerBoundIncluded ? 'inclusive' : 'exclusive'][0];
    const closingBracket =
      ClosingBracket[this.upperBoundIncluded ? 'inclusive' : 'exclusive'][0];
    return `${openingBracket}${this.lowerBound},${this.upperBound}${closingBracket}`;
  }

  static fromString(s: string): Interval {
    const match = s.trim().match(intervalRegex);
    if (!match || !match.groups) {
      throw new Error(
        `The provided string "${s}" is not of a valid interval format.`
      );
    }
    const { openingBracket, lowerBound, upperBound, closingBracket } =
      match.groups;

    const lowerBoundParsed = parseFloat(lowerBound);
    const upperBoundParsed = parseFloat(upperBound);

    if (isNaN(lowerBoundParsed)) {
      throw new Error(
        `The provided substring "${lowerBound}" couldn't be parsed to a number.`
      );
    }
    if (isNaN(upperBoundParsed)) {
      throw new Error(
        `The provided substring "${upperBound}" couldn't be parsed to a number.`
      );
    }

    const getInclusion = (bracket: string, bracketGroup: BracketGroup) =>
      bracketGroup.inclusive.includes(bracket) ? true : false;
    const lowerBoundIncluded = getInclusion(openingBracket, OpeningBracket);
    const upperBoundIncluded = getInclusion(closingBracket, ClosingBracket);

    return new Interval(
      lowerBoundParsed,
      upperBoundParsed,
      lowerBoundIncluded,
      upperBoundIncluded
    );
  }

  toSet(): NumberSet {
    return new NumberSet([this]);
  }

  isEmpty() {
    return (
      this.upperBound < this.lowerBound ||
      (this.lowerBound === this.upperBound &&
        !(this.lowerBoundIncluded && this.upperBoundIncluded))
    );
  }

  equals(other: Interval) {
    return (
      (this.lowerBound === other.lowerBound &&
        this.lowerBoundIncluded === other.lowerBoundIncluded &&
        this.upperBound === other.upperBound &&
        this.upperBoundIncluded === other.upperBoundIncluded) ||
      (this.isEmpty() && other.isEmpty())
    );
  }

  contains(x: number) {
    return (
      (this.lowerBound < x && x < this.upperBound) ||
      (this.lowerBoundIncluded && x === this.lowerBound) ||
      (this.upperBoundIncluded && x === this.upperBound)
    );
  }

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
      new Interval(
        lowerBound,
        upperBound,
        lowerBoundIncluded,
        upperBoundIncluded
      ),
    ]);
  }

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

    return new Interval(
      lowerBound,
      upperBound,
      lowerBoundIncluded,
      upperBoundIncluded
    );
  }

  without(other: Interval): NumberSet {
    if (!this.intersects(other)) {
      return new NumberSet([this]);
    }
    const intersection = this.intersection(other);
    const lower = new Interval(
      this.lowerBound,
      intersection.lowerBound,
      this.lowerBoundIncluded,
      !intersection.lowerBoundIncluded
    );
    const upper = new Interval(
      intersection.upperBound,
      this.upperBound,
      !intersection.upperBoundIncluded,
      this.upperBoundIncluded
    );
    return new NumberSet([lower, upper].filter((i) => !i.isEmpty()));
  }

  symDiff(other: Interval): NumberSet {
    return this.without(other).union(other.without(this));
  }

  // aliases for convenience
  static readonly Empty = new Interval(0, 0, false, false);
  static readonly Closed = (lowerBound: number, upperBound: number) =>
    new Interval(lowerBound, upperBound, true, true);
  static readonly Open = (lowerBound: number, upperBound: number) =>
    new Interval(lowerBound, upperBound, false, false);
  static readonly BottomClosed = (lowerBound: number, upperBound: number) =>
    new Interval(lowerBound, upperBound, true, false);
  static readonly TopClosed = (lowerBound: number, upperBound: number) =>
    new Interval(lowerBound, upperBound, false, true);
  static readonly Point = (x: number) => this.Closed(x, x);

  static readonly Inf = this.Point(Infinity);

  static readonly Real = this.Open(-Infinity, Infinity);
  static readonly RealWithInf = this.Closed(-Infinity, Infinity);

  static readonly NonNegative = this.BottomClosed(0, Infinity);
  static readonly NonNegativeWithInf = this.Closed(0, Infinity);
  static readonly Positive = this.Open(0, Infinity);
  static readonly PositiveWithInf = this.TopClosed(0, Infinity);

  static readonly NonPositive = this.TopClosed(-Infinity, 0);
  static readonly NonPositiveWithNegInf = this.Closed(-Infinity, 0);
  static readonly Negative = this.Open(-Infinity, 0);
  static readonly NegativeWithNeginf = this.BottomClosed(-Infinity, 0);
}
