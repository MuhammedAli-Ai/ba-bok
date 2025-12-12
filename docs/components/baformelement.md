---
sidebar_position: 7
---

# BAFormElement

A dynamic form builder that renders various input types based on a configurable schema. Supports validation, masking, custom body content, loading states, disabled mode, save button alignment, and full two-way model binding.

## Installation

```bash
npm install basuite
```

## Usage

```jsx
"use client";
import { BAFormElement, formElement } from "basuite";
import { useState } from "react";

export default function MyForm() {
  const [model, setModel] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false,
  });

  const formElements: formElement[] = [
    {
      elementType: "input",
      col: 6,
      key: "firstName",
      label: "First Name",
    },
    {
      elementType: "input",
      col: 6,
      key: "lastName",
      label: "Last Name",
    },
    {
      elementType: "input",
      col: 12,
      key: "email",
      label: "Email",
      inputType: "emailinput",
    },
    {
      elementType: "input",
      col: 12,
      key: "password",
      label: "Password",
      inputType: "passwordinput",
    },
    {
      elementType: "datepicker",
      col: 6,
      key: "dateOfBirth",
      label: "Date of Birth",
    },
    {
      elementType: "radio",
      col: 6,
      key: "gender",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      elementType: "checkbox",
      col: 12,
      key: "agreeToTerms",
      label: "I agree to terms and conditions",
    },
  ];

  return (
    <BAFormElement
      model={model}
      setModel={setModel}
      formElement={formElements}
      saveButtonLabel="Submit"
      saveButtonAlignment="center"
    />
  );
}
```

## Supported Element Types

### Input
Text, email, password, masked, numeric, and OTP inputs.

```jsx
{
  elementType: "input",
  col: 6,
  key: "firstName",
  label: "First Name"
}
```

### Date Picker
Date selection with optional time.

```jsx
{
  elementType: "datepicker",
  col: 6,
  key: "dateOfBirth",
  label: "Date of Birth"
}
```

### Select
Dropdown selection with search support.

```jsx
{
  elementType: "select",
  col: 6,
  key: "country",
  label: "Country",
  showSearch: true,
  options: [
    { label: "USA", value: "us" },
    { label: "UK", value: "uk" }
  ]
}
```

### Radio
Radio button group.

```jsx
{
  elementType: "radio",
  col: 6,
  key: "gender",
  label: "Gender",
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]
}
```

### Checkbox
Single checkbox.

```jsx
{
  elementType: "checkbox",
  col: 12,
  key: "agreeToTerms",
  label: "I agree to terms"
}
```

### Textarea
Multi-line text input.

```jsx
{
  elementType: "textarea",
  col: 12,
  key: "comments",
  label: "Comments"
}
```

### Custom Body
Render custom React components.

```jsx
{
  elementType: "custombody",
  col: 12,
  key: "customSection",
  body: <div>Custom content here</div>
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `object` | - | Form data model |
| `setModel` | `(model: object) => void` | - | Model update function |
| `formElement` | `formElement[]` | - | Form schema configuration |
| `saveButtonLabel` | `string` | `'Save'` | Submit button text |
| `saveButtonAlignment` | `'start' \| 'center' \| 'end'` | `'end'` | Button alignment |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable entire form |
| `onSave` | `() => void` | - | Save button click handler |

## Form Element Schema

Each element in the `formElement` array supports:

| Property | Type | Description |
|----------|------|-------------|
| `elementType` | `string` | Type of form element |
| `key` | `string` | Model property key |
| `label` | `string` | Field label |
| `col` | `number` | Grid column span (1-12) |
| `inputType` | `string` | Input variant (for input elements) |
| `options` | `array` | Options for select/radio |
| `showSearch` | `boolean` | Enable search (for select) |
| `body` | `ReactNode` | Custom content (for custombody) |
