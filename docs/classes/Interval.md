[numberset](../README.md) / [Exports](../modules.md) / Interval

# Class: Interval

A connected set represented by its endpoints [lowerBound](Interval.md#lowerbound) and [upperBound](Interval.md#upperbound)

**`Remarks`**

Supports the most common set operations and can be constructed from a string.<br>
Consider using the aliases [Closed](Interval.md#closed), [BottomClosed](Interval.md#bottomclosed),
[TopClosed](Interval.md#topclosed), [Open](Interval.md#open) and [Point](Interval.md#point) instead
of the constructor for convenience.

TODO Some common intervals are defined as static members like [Real](../modules.md#real) and [NonNegative](../modules.md#nonnegative).

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

[src/Interval.ts:35](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L35)

## Properties

### lowerBound

• `Readonly` **lowerBound**: `number`

#### Defined in

[src/Interval.ts:19](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L19)

___

### lowerBoundIncluded

• `Readonly` **lowerBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:21](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L21)

___

### numberTransform

• `Readonly` **numberTransform**: [`NumberTransform`](../modules.md#numbertransform)

#### Defined in

[src/Interval.ts:23](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L23)

___

### upperBound

• `Readonly` **upperBound**: `number`

#### Defined in

[src/Interval.ts:20](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L20)

___

### upperBoundIncluded

• `Readonly` **upperBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:22](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L22)

___

### BottomClosed

▪ `Static` `Readonly` **BottomClosed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

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

[src/Interval.ts:362](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L362)

___

### Closed

▪ `Static` `Readonly` **Closed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

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

[src/Interval.ts:348](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L348)

___

### Open

▪ `Static` `Readonly` **Open**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

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

[src/Interval.ts:355](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L355)

___

### TopClosed

▪ `Static` `Readonly` **TopClosed**: (`lowerBound`: `number`, `upperBound`: `number`, `numberTransform?`: [`NumberTransform`](../modules.md#numbertransform)) => [`Interval`](Interval.md)

#### Type declaration

▸ (`lowerBound`, `upperBound`, `numberTransform?`): [`Interval`](Interval.md)

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

[src/Interval.ts:369](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L369)

## Methods

### contains

▸ **contains**(`x`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | Number to search for |

#### Returns

`boolean`

True if x is included in this interval

#### Defined in

[src/Interval.ts:166](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L166)

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | Interval to compare to |

#### Returns

`boolean`

True if the intervals represent the same set

#### Defined in

[src/Interval.ts:151](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L151)

___

### intersection

▸ **intersection**(`other`): [`Interval`](Interval.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | Interval to intersect with |

#### Returns

[`Interval`](Interval.md)

The overlap of both intervals, e.g. a new interval containing all elements included in `both` of the source intervals

#### Defined in

[src/Interval.ts:249](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L249)

___

### intersects

▸ **intersects**(`other`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | Interval to check for overlap |

#### Returns

`boolean`

True if the intervals overlap, e.g. their intersection is not the empty set

#### Defined in

[src/Interval.ts:229](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L229)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

True if this interval equals an empty set

#### Defined in

[src/Interval.ts:138](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L138)

___

### symDiff

▸ **symDiff**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Interval`](Interval.md) |

#### Returns

[`NumberSet`](NumberSet.md)

The symmetric difference of both intervals, e.g. a new interval containing all elements included in exactly one of the intervals

#### Defined in

[src/Interval.ts:323](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L323)

___

### toSet

▸ **toSet**(): [`NumberSet`](NumberSet.md)

#### Returns

[`NumberSet`](NumberSet.md)

NumberSet equivalent to this interval

#### Defined in

[src/Interval.ts:130](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L130)

___

### toString

▸ **toString**(): `string`

Transforms the interval to its string representation using square brackets for included and parentheses for excluded endpoints

**`Example`**

``` ts
console.log(Interval.BottomClosed(0,1)) // "[0,1)"
```

#### Returns

`string`

This interval's string representation

#### Defined in

[src/Interval.ts:65](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L65)

___

### union

▸ **union**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | Interval to merge with |

#### Returns

[`NumberSet`](NumberSet.md)

The union of both intervals, e.g. a new interval containing all elements included in `either` of the source intervals

#### Defined in

[src/Interval.ts:179](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L179)

___

### without

▸ **without**(`other`): [`NumberSet`](NumberSet.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Interval`](Interval.md) | Interval to subtract |

#### Returns

[`NumberSet`](NumberSet.md)

The difference of both intervals, e.g. a new interval containing all elements included in `this` and not in other

#### Defined in

[src/Interval.ts:297](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L297)

___

### Point

▸ `Static` `Readonly` **Point**(`x`, `numberTransform?`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) |

#### Returns

[`Interval`](Interval.md)

[x,x]

#### Defined in

[src/Interval.ts:375](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L375)

___

### fromString

▸ `Static` **fromString**(`s`, `numberTransform?`): [`Interval`](Interval.md)

Constructs an interval from its string representation

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
| `s` | `string` | String representation of the interval |
| `numberTransform?` | [`NumberTransform`](../modules.md#numbertransform) | - |

#### Returns

[`Interval`](Interval.md)

Interval corresponding to the string representation

#### Defined in

[src/Interval.ts:89](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L89)

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

[src/Interval.ts:328](https://github.com/NickGaertner/NumberSet/blob/9a647bb/src/Interval.ts#L328)
