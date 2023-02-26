[numberset](../README.md) / [Exports](../modules.md) / NumberSet

# Class: NumberSet

A set of numbers represented by the union of disjoint intervals

**`Remarks`**

Supports the most common set operations

- _Note: Most functions use [Interval](Interval.md) functions internally.
It's advised that all provided [Interval](Interval.md)s use the same
[NumberTransform](../modules.md#numbertransform)._

## Table of contents

### Constructors

- [constructor](NumberSet.md#constructor)

### Properties

- [intervals](NumberSet.md#intervals)

### Methods

- [[iterator]](NumberSet.md#[iterator])
- [contains](NumberSet.md#contains)
- [equals](NumberSet.md#equals)
- [intersection](NumberSet.md#intersection)
- [intersects](NumberSet.md#intersects)
- [isEmpty](NumberSet.md#isempty)
- [symDiff](NumberSet.md#symdiff)
- [toString](NumberSet.md#tostring)
- [union](NumberSet.md#union)
- [without](NumberSet.md#without)
- [\_normalize](NumberSet.md#_normalize)
- [fromString](NumberSet.md#fromstring)

## Constructors

### constructor

• **new NumberSet**(`intervals`)

Constructs a new [NumberSet](NumberSet.md) from the given intervals.

**`Remarks`**

Note that the intervals are stored internally in a "normalized" fashion meaning
 - intersecting intervals are merged
 - empty intervals are omitted
 - the intervals are sorted by their lower bound in ascending order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intervals` | readonly [`Interval`](Interval.md)[] | Intervals representing this set |

#### Defined in

[src/NumberSet.ts:28](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L28)

## Properties

### intervals

• `Readonly` **intervals**: readonly [`Interval`](Interval.md)[]

#### Defined in

[src/NumberSet.ts:15](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L15)

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`<[`Interval`](Interval.md), `void`, `undefined`\>

Convenience generator to iterate over the internal intervals

**`Example`**

``` ts
const set = new NumberSet([Interval.Open(-1, 0), Interval.Open(0, 1)]);
for (const interval of set) {
  console.log(interval.toString());
}
// "(-1,0)"
// "(0,1)"
```

#### Returns

`Generator`<[`Interval`](Interval.md), `void`, `undefined`\>

#### Defined in

[src/NumberSet.ts:143](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L143)

___

### contains

▸ **contains**(`x`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | Number to search for |

#### Returns

`boolean`

True if x is included in this set

#### Defined in

[src/NumberSet.ts:177](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L177)

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | [NumberSet](NumberSet.md) to compare to |

#### Returns

`boolean`

True if both sets represent the same abstract set

#### Defined in

[src/NumberSet.ts:160](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L160)

___

### intersection

▸ **intersection**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | [NumberSet](NumberSet.md) to intersect with |

#### Returns

[`NumberSet`](NumberSet.md)

The overlap of both sets, e.g. a new [NumberSet](NumberSet.md) containing
all elements included in `both` of the source sets

#### Defined in

[src/NumberSet.ts:219](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L219)

___

### intersects

▸ **intersects**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | [NumberSet](NumberSet.md) to check for intersection |

#### Returns

`boolean`

True if the sets aren't disjoint, e.g. their intersection
is not empty

#### Defined in

[src/NumberSet.ts:202](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L202)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

True if the set is empty

#### Defined in

[src/NumberSet.ts:151](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L151)

___

### symDiff

▸ **symDiff**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) |

#### Returns

[`NumberSet`](NumberSet.md)

The symmetric difference of both sets, e.g. a new [NumberSet](NumberSet.md)
 containing all elements included in `exactly` one of the sets

#### Defined in

[src/NumberSet.ts:259](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L259)

___

### toString

▸ **toString**(): `string`

Transforms the set to its string representation by joining the intervals' string representation with ", "
and surrounding the result with braces

**`Example`**

``` ts
console.log(
  new NumberSet([Interval.Open(-1, 0), Interval.Open(0, 1)]).toString()
);
// "{(-1,0), (0,1)}"
```

#### Returns

`string`

This set's string representation

#### Defined in

[src/NumberSet.ts:86](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L86)

___

### union

▸ **union**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | [NumberSet](NumberSet.md) to merge with |

#### Returns

[`NumberSet`](NumberSet.md)

The union of both sets, e.g. a new [NumberSet](NumberSet.md) containing
all elements included in `one` of the source sets

#### Defined in

[src/NumberSet.ts:192](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L192)

___

### without

▸ **without**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | [NumberSet](NumberSet.md) to subtract |

#### Returns

[`NumberSet`](NumberSet.md)

The difference of both sets, e.g. a new [NumberSet](NumberSet.md)
 containing all elements included in `this` and not in other

#### Defined in

[src/NumberSet.ts:232](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L232)

___

### \_normalize

▸ `Static` `Private` **_normalize**(`intervals`): readonly [`Interval`](Interval.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `intervals` | readonly [`Interval`](Interval.md)[] |

#### Returns

readonly [`Interval`](Interval.md)[]

#### Defined in

[src/NumberSet.ts:35](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L35)

___

### fromString

▸ `Static` **fromString**(`s`): [`NumberSet`](NumberSet.md)

Constructs a [NumberSet](NumberSet.md) from a string representation

**`Remarks`**

Expects a list of [Interval](Interval.md) string representations separated by ", "
surrounded by curly braces. See [fromString](Interval.md#fromstring) for more information on
formatting intervals.

Prefer constructing directly from [Interval](Interval.md)s instead of strings if possible

**`Example`**

``` ts
NumberSet.fromString("{(-1,0), (0,1)}").equals(new NumberSet([
 Interval.Open(-1,0), Interval.Open(0,1)
])); // true
```

**`Throws`**

TODO IntervalParseError if s is malformed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | String representation of the [NumberSet](NumberSet.md) |

#### Returns

[`NumberSet`](NumberSet.md)

[NumberSet](NumberSet.md) corresponding to the string representation

#### Defined in

[src/NumberSet.ts:113](https://github.com/NickGaertner/NumberSet/blob/8043dcf/src/NumberSet.ts#L113)
