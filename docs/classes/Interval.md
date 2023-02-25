[numberset](../README.md) / [Exports](../modules.md) / Interval

# Class: Interval

A connected set represented by its endpoints [lowerBound](Interval.md#lowerbound) and [upperBound](Interval.md#upperbound)

**`Remarks`**

Supports the most common set operations and can be constructed from a string.<br>
Consider using the aliases [Closed](Interval.md#closed), [BottomClosed](Interval.md#bottomclosed), [TopClosed](Interval.md#topclosed), [Open](Interval.md#open) and [Point](Interval.md#point) instead of the constructor for convenience.
Some common intervals are defined as static members like [Real](Interval.md#real) and [NonNegative](Interval.md#nonnegative).

## Table of contents

### Constructors

- [constructor](Interval.md#constructor)

### Properties

- [lowerBound](Interval.md#lowerbound)
- [lowerBoundIncluded](Interval.md#lowerboundincluded)
- [upperBound](Interval.md#upperbound)
- [upperBoundIncluded](Interval.md#upperboundincluded)
- [Empty](Interval.md#empty)
- [Inf](Interval.md#inf)
- [Negative](Interval.md#negative)
- [NegativeWithNegInf](Interval.md#negativewithneginf)
- [NonNegative](Interval.md#nonnegative)
- [NonNegativeWithInf](Interval.md#nonnegativewithinf)
- [NonPositive](Interval.md#nonpositive)
- [NonPositiveWithNegInf](Interval.md#nonpositivewithneginf)
- [Positive](Interval.md#positive)
- [PositiveWithInf](Interval.md#positivewithinf)
- [Real](Interval.md#real)
- [RealWithInf](Interval.md#realwithinf)

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
- [BottomClosed](Interval.md#bottomclosed)
- [Closed](Interval.md#closed)
- [Open](Interval.md#open)
- [Point](Interval.md#point)
- [TopClosed](Interval.md#topclosed)
- [fromString](Interval.md#fromstring)

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
| › `upperBound` | `number` |
| › `upperBoundIncluded` | `boolean` |

#### Defined in

[src/Interval.ts:29](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L29)

## Properties

### lowerBound

• `Readonly` **lowerBound**: `number`

#### Defined in

[src/Interval.ts:14](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L14)

___

### lowerBoundIncluded

• `Readonly` **lowerBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:16](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L16)

___

### upperBound

• `Readonly` **upperBound**: `number`

#### Defined in

[src/Interval.ts:15](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L15)

___

### upperBoundIncluded

• `Readonly` **upperBoundIncluded**: `boolean`

#### Defined in

[src/Interval.ts:17](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L17)

___

### Empty

▪ `Static` `Readonly` **Empty**: [`Interval`](Interval.md)

(0,0)

#### Defined in

[src/Interval.ts:317](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L317)

___

### Inf

▪ `Static` `Readonly` **Inf**: [`Interval`](Interval.md)

[Infinity,Infinity]

#### Defined in

[src/Interval.ts:385](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L385)

___

### Negative

▪ `Static` `Readonly` **Negative**: [`Interval`](Interval.md)

(-Infinity, 0)

#### Defined in

[src/Interval.ts:424](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L424)

___

### NegativeWithNegInf

▪ `Static` `Readonly` **NegativeWithNegInf**: [`Interval`](Interval.md)

[-Infinity, 0)

#### Defined in

[src/Interval.ts:428](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L428)

___

### NonNegative

▪ `Static` `Readonly` **NonNegative**: [`Interval`](Interval.md)

[0,Infinity)

#### Defined in

[src/Interval.ts:399](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L399)

___

### NonNegativeWithInf

▪ `Static` `Readonly` **NonNegativeWithInf**: [`Interval`](Interval.md)

[0,Infinity]

#### Defined in

[src/Interval.ts:403](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L403)

___

### NonPositive

▪ `Static` `Readonly` **NonPositive**: [`Interval`](Interval.md)

(-Infinity, 0]

#### Defined in

[src/Interval.ts:416](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L416)

___

### NonPositiveWithNegInf

▪ `Static` `Readonly` **NonPositiveWithNegInf**: [`Interval`](Interval.md)

[-Infinity, 0]

#### Defined in

[src/Interval.ts:420](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L420)

___

### Positive

▪ `Static` `Readonly` **Positive**: [`Interval`](Interval.md)

(0,Infinity)

#### Defined in

[src/Interval.ts:407](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L407)

___

### PositiveWithInf

▪ `Static` `Readonly` **PositiveWithInf**: [`Interval`](Interval.md)

(0,Infinity]

#### Defined in

[src/Interval.ts:411](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L411)

___

### Real

▪ `Static` `Readonly` **Real**: [`Interval`](Interval.md)

(-Infinity, Infinity)

#### Defined in

[src/Interval.ts:390](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L390)

___

### RealWithInf

▪ `Static` `Readonly` **RealWithInf**: [`Interval`](Interval.md)

[-Infinity, Infinity]

#### Defined in

[src/Interval.ts:394](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L394)

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

[src/Interval.ts:156](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L156)

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

[src/Interval.ts:141](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L141)

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

[src/Interval.ts:238](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L238)

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

[src/Interval.ts:218](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L218)

___

### isEmpty

▸ **isEmpty**(): `boolean`

#### Returns

`boolean`

True if this interval equals an empty set

#### Defined in

[src/Interval.ts:128](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L128)

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

[src/Interval.ts:309](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L309)

___

### toSet

▸ **toSet**(): [`NumberSet`](NumberSet.md)

#### Returns

[`NumberSet`](NumberSet.md)

NumberSet equivalent to this interval

#### Defined in

[src/Interval.ts:120](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L120)

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

[src/Interval.ts:56](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L56)

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

[src/Interval.ts:169](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L169)

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

[src/Interval.ts:285](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L285)

___

### BottomClosed

▸ `Static` `Readonly` **BottomClosed**(`lowerBound`, `upperBound`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |

#### Returns

[`Interval`](Interval.md)

[lowerBound,upperBound)

#### Defined in

[src/Interval.ts:355](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L355)

___

### Closed

▸ `Static` `Readonly` **Closed**(`lowerBound`, `upperBound`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |

#### Returns

[`Interval`](Interval.md)

[lowerBound,upperBound]

#### Defined in

[src/Interval.ts:329](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L329)

___

### Open

▸ `Static` `Readonly` **Open**(`lowerBound`, `upperBound`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |

#### Returns

[`Interval`](Interval.md)

(lowerBound,upperBound)

#### Defined in

[src/Interval.ts:342](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L342)

___

### Point

▸ `Static` `Readonly` **Point**(`x`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

[`Interval`](Interval.md)

[x,x]

#### Defined in

[src/Interval.ts:380](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L380)

___

### TopClosed

▸ `Static` `Readonly` **TopClosed**(`lowerBound`, `upperBound`): [`Interval`](Interval.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lowerBound` | `number` |
| `upperBound` | `number` |

#### Returns

[`Interval`](Interval.md)

(lowerBound,upperBound]

#### Defined in

[src/Interval.ts:368](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L368)

___

### fromString

▸ `Static` **fromString**(`s`): [`Interval`](Interval.md)

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

#### Returns

[`Interval`](Interval.md)

Interval corresponding to the string representation

#### Defined in

[src/Interval.ts:80](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L80)
