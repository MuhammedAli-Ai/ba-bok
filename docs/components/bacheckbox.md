---
sidebar_position: 4
---

# BACheckbox

A flexible checkbox component with support for single and multiple states.

## Installation

```bash
npm install basuite
```

## Usage

```jsx
import { BACheckbox } from "basuite";

<>
  <BACheckbox label="Default Checkbox" />
  <BACheckbox label="Checked" checked />
  <BACheckbox label="Disabled" disabled />
  <BACheckbox label="Multiple (Indeterminate)" isMultiple />
</>
```

## Checkbox States

### Default Checkbox
Standard checkbox with label.

```jsx
<BACheckbox label="Default Checkbox" />
```

### Checked Checkbox
Pre-checked checkbox.

```jsx
<BACheckbox label="Checked" checked />
```

### Disabled Checkbox
Non-interactive disabled state.

```jsx
<BACheckbox label="Disabled" disabled />
```

### Indeterminate Checkbox
Checkbox with indeterminate state (useful for "select all" scenarios).

```jsx
<BACheckbox label="Multiple (Indeterminate)" isMultiple />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Checkbox label text |
| `checked` | `boolean` | `false` | Controlled checked state |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `isMultiple` | `boolean` | `false` | Show indeterminate state |
| `onChange` | `(checked: boolean) => void` | - | Change event handler |
| `value` | `string` | - | Checkbox value |
| `name` | `string` | - | Input name attribute |
