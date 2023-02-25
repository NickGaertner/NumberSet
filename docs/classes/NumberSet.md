[numberset](../README.md) / [Exports](../modules.md) / NumberSet

# Class: NumberSet

A set of numbers represented by the union of disjoint intervals

**`Remarks`**

Supports the most common set operations

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
- [normalize](NumberSet.md#normalize)

## Constructors

### constructor

• **new NumberSet**(`intervals`)

Constructs a new NumberSet from the given intervals.

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

[src/NumberSet.ts:26](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L26)

## Properties

### intervals

• `Readonly` **intervals**: readonly [`Interval`](Interval.md)[]

#### Defined in

[src/NumberSet.ts:13](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L13)

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

[src/NumberSet.ts:100](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L100)

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

[src/NumberSet.ts:134](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L134)

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | NumberSet to compare to |

#### Returns

`boolean`

True if both sets represent the same abstract set

#### Defined in

[src/NumberSet.ts:117](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L117)

___

### intersection

▸ **intersection**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | NumberSet to intersect with |

#### Returns

[`NumberSet`](NumberSet.md)

The overlap of both sets, e.g. a new NumberSet containing
all elements included in `both` of the source sets

#### Defined in

[src/NumberSet.ts:176](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L176)

___

### intersects

▸ **intersects**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | NumberSet to check for intersection |

#### Returns

`boolean`

True if the sets aren't disjoint, e.g. their intersection
is not empty

#### Defined in

[src/NumberSet.ts:159](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L159)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

True if the set is empty

#### Defined in

[src/NumberSet.ts:108](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L108)

___

### symDiff

▸ **symDiff**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) |

#### Returns

[`NumberSet`](NumberSet.md)

The symmetric difference of both sets, e.g. a new NumberSet
 containing all elements included in `exactly` one of the sets

#### Defined in

[src/NumberSet.ts:205](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L205)

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

[src/NumberSet.ts:83](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L83)

___

### union

▸ **union**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | NumberSet to merge with |

#### Returns

[`NumberSet`](NumberSet.md)

The union of both sets, e.g. a new NumberSet containing
all elements included in `one` of the source sets

#### Defined in

[src/NumberSet.ts:149](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L149)

___

### without

▸ **without**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NumberSet`](NumberSet.md) | NumberSet to subtract |

#### Returns

[`NumberSet`](NumberSet.md)

The difference of both sets, e.g. a new NumberSet
 containing all elements included in `this` and not in other

#### Defined in

[src/NumberSet.ts:189](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L189)

___

### normalize

▸ `Static` `Private` **normalize**(`intervals`): readonly [`Interval`](Interval.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `intervals` | readonly [`Interval`](Interval.md)[] |

#### Returns

readonly [`Interval`](Interval.md)[]

#### Defined in

[src/NumberSet.ts:30](https://github.com/NickGaertner/NumberSet/blob/e590408/src/NumberSet.ts#L30)
