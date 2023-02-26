[numberset](../README.md) / [Exports](../modules.md) / Interval

# Class: Interval

A connected set represented by its endpoints [lowerBound](Interval.md#lowerbound) and [upperBound](Interval.md#upperbound)

**`Remarks`**

Supports the most common set operations and can be constructed from a string.<br>
Consider using the aliases [Closed](Interval.md#closed), [BottomClosed](Interval.md#bottomclosed),
[TopClosed](Interval.md#topclosed), [Open](Interval.md#open) and [Point](Interval.md#point) instead
of the constructor for convenience.

Some common intervals are already defined like [Real](../modules.md#real) and [NonNegative](../modules.md#nonnegative).

All intervals can be constructed with a [NumberTransform](../modules.md#numbertransform) that can be used to
- include sanity checks, like `Number.isSafeInteger(x)` (think of them as type constraints)
- actually transform the bounds, for example clamping the values to nonnegative numbers
The [NumberTransform](../modules.md#numbertransform) is propagated by all functions returning [Interval](Interval.md) or [NumberSet](NumberSet.md)
using the [NumberTransform](../modules.md#numbertransform) from the __called__ [Interval](Interval.md)
 - _Note: If your [NumberTransform](../modules.md#numbertransform) throws then all functions that use it can throw as well!_
 - _Note: The [NumberTransform](../modules.md#numbertransform) should be idempotent!_

## Table of contents

### Constructors

- [constructor](Interval.md#constructor)

### Properties

- [lowerBound](Interval.md#lowerbound)
- [lowerBoundIncluded](Interval.md#lowerboundincluded)
- [numberTransform](Interval.md#numbertransform)
- [upperBound](Interval.md#upperbound)
- [upperBoundIncluded](Interval.md#upperboundincluded)
- [BottomClosed](Interval.md#bottomclosed)
- [Closed](Interval.md#closed)
- [Open](Interval.md#open)
- [TopClosed](Interval.md#topclosed)

### Methods

- [contains](Interval.md#contains)
- [equals](Interval.md#equals)
- [intersection](Interval.md#intersection)
- [intersects](Interval.md#intersects)
- [isEmpty](Interval.md#isempty)
- [symDiff](Interval.md#symdiff)
- [toSet](Interval.md#toset)
- [toString](Interval.md#tostring)
- [union](Interval.md#union)
- [without](Interval.md#without)
- [Point](Interval.md#point)
- [fromString](Interval.md#fromstring)
- [withInclusion](Interval.md#withinclusion)

## Constructors

### constructor

• **new Interval**(`«destructured»`)

**`Remarks`**

Consider using the aliases [Closed](Interval.md#closed), [BottomClosed](Interval.md#bottomclosed), [TopClosed](Interval.md#topclosed), [Open](Interval.md#open) and [Point](Interval.md#point) instead for convenience

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `lowerBound` | `number` |
| › `lowerBoundIncluded` | `boolean` |
| › `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |
| › `upperBound` | `number` |
| › `upperBoundIncluded` | `boolean` |

#### Defined in

[src/Interval.ts:44](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L44)

## Properties

### lowerBound

• `Readonly` **lowerBound**: `number`

#### Defined in

[src/Interval.ts:26](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L26)

___

### lowerBoundIncluded

• `Readonly` **lowerBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:28](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L28)

___

### numberTransform

• `Readonly` **numberTransform**: [`NumberTransform`](../modules.md#numbertransform)

#### Defined in

[src/Interval.ts:30](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L30)

___

### upperBound

• `Readonly` **upperBound**: `number`

#### Defined in

[src/Interval.ts:27](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L27)

___

### upperBoundIncluded

• `Readonly` **upperBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:29](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L29)

___

### BottomClosed

▪ `Static` `Readonly` **BottomClosed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

See [Interval](Interval.md) for more information

##### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

##### Returns

[`Interval`](Interval.md)

[lowerBound,upperBound)

#### Defined in

[src/Interval.ts:372](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L372)

___

### Closed

▪ `Static` `Readonly` **Closed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

See [Interval](Interval.md) for more information

##### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

##### Returns

[`Interval`](Interval.md)

[lowerBound,upperBound]

#### Defined in

[src/Interval.ts:362](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L362)

___

### Open

▪ `Static` `Readonly` **Open**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

See [Interval](Interval.md) for more information

##### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

##### Returns

[`Interval`](Interval.md)

(lowerBound,upperBound)

#### Defined in

[src/Interval.ts:367](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L367)

___

### TopClosed

▪ `Static` `Readonly` **TopClosed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

See [Interval](Interval.md) for more information

##### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

##### Returns

[`Interval`](Interval.md)

(lowerBound,upperBound]

#### Defined in

[src/Interval.ts:377](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L377)

## Methods

### contains

▸ **contains**(`x`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | Number to search for |

#### Returns

`boolean`

True if x is included in this [Interval](Interval.md)

#### Defined in

[src/Interval.ts:176](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L176)

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | [Interval](Interval.md) to compare to |

#### Returns

`boolean`

True if the [Interval](Interval.md)s represent the same set

#### Defined in

[src/Interval.ts:161](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L161)

___

### intersection

▸ **intersection**(`other`): [`Interval`](Interval.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | [Interval](Interval.md) to intersect with |

#### Returns

[`Interval`](Interval.md)

The overlap of both [Interval](Interval.md)s, e.g. a new [Interval](Interval.md) containing all elements included in `both` of the source [Interval](Interval.md)s

#### Defined in

[src/Interval.ts:259](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L259)

___

### intersects

▸ **intersects**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | [Interval](Interval.md) to check for overlap |

#### Returns

`boolean`

True if the [Interval](Interval.md)s overlap, e.g. their intersection is not the empty set

#### Defined in

[src/Interval.ts:239](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L239)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

True if this [Interval](Interval.md) equals an empty set

#### Defined in

[src/Interval.ts:148](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L148)

___

### symDiff

▸ **symDiff**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Interval`](Interval.md) |

#### Returns

[`NumberSet`](NumberSet.md)

The symmetric difference of both [Interval](Interval.md)s, e.g. a new [Interval](Interval.md) containing all elements included in exactly one of the [Interval](Interval.md)s

#### Defined in

[src/Interval.ts:333](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L333)

___

### toSet

▸ **toSet**(): [`NumberSet`](NumberSet.md)

#### Returns

[`NumberSet`](NumberSet.md)

NumberSet equivalent to this [Interval](Interval.md)

#### Defined in

[src/Interval.ts:140](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L140)

___

### toString

▸ **toString**(): `string`

Transforms the [Interval](Interval.md) to its string representation using square brackets for included and parentheses for excluded endpoints

**`Example`**

``` ts
console.log(Interval.BottomClosed(0,1)) // "[0,1)"
```

#### Returns

`string`

This interval's string representation

#### Defined in

[src/Interval.ts:74](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L74)

___

### union

▸ **union**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | [Interval](Interval.md) to merge with |

#### Returns

[`NumberSet`](NumberSet.md)

The union of both [Interval](Interval.md)s, e.g. a new [Interval](Interval.md) containing all elements included in `either` of the source [Interval](Interval.md)s

#### Defined in

[src/Interval.ts:189](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L189)

___

### without

▸ **without**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | [Interval](Interval.md) to subtract |

#### Returns

[`NumberSet`](NumberSet.md)

The difference of both [Interval](Interval.md)s, e.g. a new [Interval](Interval.md) containing all elements included in `this` and not in other

#### Defined in

[src/Interval.ts:307](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L307)

___

### Point

▸ `Static` `Readonly` **Point**(`x`, `numberTransform?`): [`Interval`](Interval.md)

See [Interval](Interval.md) for more information

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

#### Returns

[`Interval`](Interval.md)

[x,x]

#### Defined in

[src/Interval.ts:382](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L382)

___

### fromString

▸ `Static` **fromString**(`s`, `numberTransform?`): [`Interval`](Interval.md)

Constructs an [Interval](Interval.md) from its string representation

**`Remarks`**

Included endpoints are denoted by square brackets and excluded ones by either parentheses or reversed square brackets.
Prefer constructing directly from number values instead of strings if possible

**`Example`**

``` ts
Interval.fromString("[0,1)").equals(Interval.BottomClosed(0,1)) // true
Interval.fromString("[0,1[").equals(Interval.fromString("[0,1)")) // true
```

**`Throws`**

[IntervalParseError](IntervalParseError.md) if s is malformed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | String representation of the [Interval](Interval.md) |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) | See [Interval](Interval.md) for more information |

#### Returns

[`Interval`](Interval.md)

[Interval](Interval.md) corresponding to the string representation

#### Defined in

[src/Interval.ts:99](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L99)

___

### withInclusion

▸ `Static` `Private` `Readonly` **withInclusion**(`lowerBoundIncluded`, `upperBoundIncluded`): (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBoundIncluded` | `boolean` |
| `upperBoundIncluded` | `boolean` |

#### Returns

`fn`

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

##### Returns

[`Interval`](Interval.md)

#### Defined in

[src/Interval.ts:344](https://github.com/NickGaertner/NumberSet/blob/17b6f0d/src/Interval.ts#L344)
