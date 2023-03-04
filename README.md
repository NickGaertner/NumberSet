# NumberSet

![GitHub package.json version](https://img.shields.io/github/package-json/v/NickGaertner/NumberSet)
![npm](https://img.shields.io/npm/v/numberset)
[![Test](https://github.com/NickGaertner/NumberSet/actions/workflows/test.yml/badge.svg)](https://github.com/NickGaertner/NumberSet/actions/workflows/test.yml)
![Coverage](https://img.shields.io/codeclimate/coverage/NickGaertner/NumberSet)
![GitHub](https://img.shields.io/github/license/NickGaertner/NumberSet)

A small library to handle intervals and sets that can be represented by a finite amount of intervals.

**NumberSet** provides two immutable classes -
[NumberSet](https://nickgaertner.github.io/NumberSet/classes/NumberSet.html) and
[Interval](https://nickgaertner.github.io/NumberSet/classes/Interval.html) -
capable of common arithmetic and set operations.
The library supports closed, open and half-open intervals (bounded and unbounded) and sets build out of them. Both intervals and sets can be constructed from string representations.
See the
[documentation](https://nickgaertner.github.io/NumberSet/)
for more details.

_If you need to query large sets that are changing all the time and you find this library lacking, consider using [interval trees](https://www.npmjs.com/search?q=interval%20tree&ranking=optimal) instead._

### Installation

```console
npm install numberset
```

### Usage

#### Interval

```ts
const unitInterval = Interval.Closed(0, 1);
const unitIntervalExplicit = new Interval({
  lowerBound: 0,
  upperBound: 1,
  lowerBoundIncluded: true,
  upperBoundIncluded: true,
});
const unitIntervalFromString = Interval.fromString('[0,1]');
unitInterval.equals(unitIntervalExplicit); // true
unitInterval.equals(unitIntervalFromString); // true

unitIntervalExplicit.intersects(Interval.BottomClosed(1, 2)); // true
unitIntervalExplicit.touches(Interval.Open(1, 2)); // true
unitIntervalExplicit.contains(0.5); // true
unitInterval.isEmpty(); // false
unitInterval.center(); // 0.5
unitInterval.diameter(); // 1
unitInterval.radius(); // 0.5

unitInterval.translatedBy(1); // [1,2]
unitInterval.scaledBy(2); // [0,2]
unitInterval.intersection(unitInterval.scaledBy(-1)); // [0,0]

// operations that might result in two intervals return NumberSets
unitInterval.without(unitInterval.interior()); // {[0,0], [1,1]}
unitInterval.union(unitInterval.scaledBy(-1)); // {[-1,1]}
unitInterval.symDiff(unitInterval.scaledBy(-1)); // {[-1,0), (0,1]}
```

#### NumberSet

```ts
const indices = [0, 1, 2, 3];
const fullSet = NumberSet.from(indices.map((p) => Interval.Closed(p, p + 1))); // {[0,4]}
const fullSetFromString = NumberSet.fromString('{[0,2], [2,4]}'); // {[0,4]}
fullSet.equals(fullSetFromString); // true, NumberSet "normalizes" the provided Intervals

fullSet.intersects(Interval.Closed(1, 2).toSet()); // true
fullSet.contains(1); // true
fullSet.isEmpty(); // false
fullSet.center(); // 2
fullSet.diameter(); // 4
fullSet.radius(); // 2
fullSet.volume(); // 4

const points = NumberSet.from(indices.map((p) => Interval.Point(p))); // {[0,0], [1,1], [2,2], [3,3]}
points.interior(); // {}
const withoutPoints = fullSet.without(points); // {(0,1), (1,2), (2,3), (3,4]}
withoutPoints.union(points); // {[0,4]}
withoutPoints.closure(); // {[0,4]}
fullSet.symDiff(points.scaledBy(-1)); // {[-3,-3], [-2,-2], [-1,-1], (0,4]}
points.translatedBy(-2); // {[-2,-2], [-1,-1], [0,0], [1,1]}
```

_See the
[documentation](https://nickgaertner.github.io/NumberSet/)
for further information._
