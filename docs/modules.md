[numberset](README.md) / Exports

# numberset

A small library to perform set operations on number sets
that can be represented by a finite amount of intervals.

## Table of contents

### Classes

- [Interval](classes/Interval.md)
- [NumberSet](classes/NumberSet.md)
- [ParseError](classes/ParseError.md)

### Type Aliases

- [NumberTransform](modules.md#numbertransform)

### Functions

- [Empty](modules.md#empty)
- [Inf](modules.md#inf)
- [Negative](modules.md#negative)
- [NegativeWithNegInf](modules.md#negativewithneginf)
- [NonNegative](modules.md#nonnegative)
- [NonNegativeWithInf](modules.md#nonnegativewithinf)
- [NonPositive](modules.md#nonpositive)
- [NonPositiveWithNegInf](modules.md#nonpositivewithneginf)
- [Positive](modules.md#positive)
- [PositiveWithInf](modules.md#positivewithinf)
- [Real](modules.md#real)
- [RealWithInf](modules.md#realwithinf)

## Type Aliases

### NumberTransform

Ƭ **NumberTransform**: (`x`: `number`) => `number`

#### Type declaration

▸ (`x`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

##### Returns

`number`

#### Defined in

[src/Interval.ts:3](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/Interval.ts#L3)

## Functions

### Empty

▸ **Empty**(`numberTransform?`): [`Interval`](classes/Interval.md)

(0,0)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:6](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L6)

___

### Inf

▸ **Inf**(`numberTransform?`): [`Interval`](classes/Interval.md)

[Infinity,Infinity]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:11](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L11)

___

### Negative

▸ **Negative**(`numberTransform?`): [`Interval`](classes/Interval.md)

(-Infinity, 0)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:59](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L59)

___

### NegativeWithNegInf

▸ **NegativeWithNegInf**(`numberTransform?`): [`Interval`](classes/Interval.md)

[-Infinity, 0)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:64](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L64)

___

### NonNegative

▸ **NonNegative**(`numberTransform?`): [`Interval`](classes/Interval.md)

[0,Infinity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:28](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L28)

___

### NonNegativeWithInf

▸ **NonNegativeWithInf**(`numberTransform?`): [`Interval`](classes/Interval.md)

[0,Infinity]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:33](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L33)

___

### NonPositive

▸ **NonPositive**(`numberTransform?`): [`Interval`](classes/Interval.md)

(-Infinity, 0]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:49](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L49)

___

### NonPositiveWithNegInf

▸ **NonPositiveWithNegInf**(`numberTransform?`): [`Interval`](classes/Interval.md)

[-Infinity, 0]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:54](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L54)

___

### Positive

▸ **Positive**(`numberTransform?`): [`Interval`](classes/Interval.md)

(0,Infinity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:38](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L38)

___

### PositiveWithInf

▸ **PositiveWithInf**(`numberTransform?`): [`Interval`](classes/Interval.md)

(0,Infinity]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:43](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L43)

___

### Real

▸ **Real**(`numberTransform?`): [`Interval`](classes/Interval.md)

(-Infinity, Infinity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:17](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L17)

___

### RealWithInf

▸ **RealWithInf**(`numberTransform?`): [`Interval`](classes/Interval.md)

[-Infinity, Infinity]

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberTransform?` | [`NumberTransform`](modules.md#numbertransform) |

#### Returns

[`Interval`](classes/Interval.md)

#### Defined in

[src/PredefinedIntervals.ts:22](https://github.com/NickGaertner/NumberSet/blob/06f1153/src/PredefinedIntervals.ts#L22)
