---
sidebar_position: 2
---

# BAInput

A versatile input component supporting text, password, numeric, masked, and OTP formats with built-in validation options.

## Installation

```bash
npm install basuite
```

## Usage

```jsx
import { BAInput } from "basuite";

<>
  <BAInput 
    label="Email" 
    placeholder="Enter your email" 
    validationType="email" 
  />
  <BAInput 
    label="Password" 
    inputType="passwordinput" 
    placeholder="Enter password" 
  />
  <BAInput 
    label="Contact Number" 
    inputType="maskinput" 
    mask="(###) ###-####" 
  />
  <BAInput 
    label="Amount" 
    inputType="numericinput" 
    prefix="$" 
    decimalScale={2} 
  />
  <BAInput 
    label="OTP" 
    inputType="otpinput" 
    length={6} 
    otpMark="*" 
  />
</>
```

## Input Types

### Email Input
Input with email validation.

```jsx
<BAInput 
  label="Email" 
  placeholder="Enter your email" 
  validationType="email" 
/>
```

### Password Input
Secure password input with toggle visibility.

```jsx
<BAInput 
  label="Password" 
  inputType="passwordinput" 
  placeholder="Enter password" 
/>
```

### Masked Input
Input with custom formatting mask.

```jsx
<BAInput 
  label="Contact Number" 
  inputType="maskinput" 
  mask="(###) ###-####" 
/>
```

### Numeric Input
Input for numeric values with prefix/suffix support.

```jsx
<BAInput 
  label="Amount" 
  inputType="numericinput" 
  prefix="$" 
  decimalScale={2} 
/>
```

### OTP Input
One-time password input with custom length.

```jsx
<BAInput 
  label="OTP" 
  inputType="otpinput" 
  length={6} 
  otpMark="*" 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label text |
| `placeholder` | `string` | - | Placeholder text |
| `inputType` | `'text' \| 'passwordinput' \| 'maskinput' \| 'numericinput' \| 'otpinput'` | `'text'` | Type of input |
| `validationType` | `'email' \| 'phone' \| 'url'` | - | Built-in validation type |
| `mask` | `string` | - | Mask pattern for masked input |
| `prefix` | `string` | - | Prefix for numeric input |
| `suffix` | `string` | - | Suffix for numeric input |
| `decimalScale` | `number` | - | Number of decimal places |
| `length` | `number` | `6` | OTP input length |
| `otpMark` | `string` | `'*'` | Character to display in OTP input |
| `onChange` | `(value: string) => void` | - | Change event handler |
| `disabled` | `boolean` | `false` | Disable the input |
