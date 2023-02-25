[numberset](../README.md) / [Exports](../modules.md) / IntervalParseError

# Class: IntervalParseError

Thrown when [toString](Interval.md#tostring) is called with malformed input

## Hierarchy

- `Error`

  ↳ **`IntervalParseError`**

## Table of contents

### Constructors

- [constructor](IntervalParseError.md#constructor)

### Properties

- [message](IntervalParseError.md#message)
- [name](IntervalParseError.md#name)
- [stack](IntervalParseError.md#stack)
- [prepareStackTrace](IntervalParseError.md#preparestacktrace)
- [stackTraceLimit](IntervalParseError.md#stacktracelimit)

### Methods

- [captureStackTrace](IntervalParseError.md#capturestacktrace)

## Constructors

### constructor

• **new IntervalParseError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/Interval.ts:473](https://github.com/NickGaertner/NumberSet/blob/7fee70b/src/Interval.ts#L473)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
