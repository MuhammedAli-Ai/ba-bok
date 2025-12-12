---
sidebar_position: 3
---

# BABox

A simple wrapper component for layout and styling, similar to a div but with extended props.

## Installation

```bash
npm install basuite
```

## Usage

```jsx
import { BABox } from "basuite";

<>
  <BABox className="p-4 bg-gray-100 rounded">
    Default Box
  </BABox>
  
  <BABox 
    className="p-4 bg-blue-100 rounded" 
    onClick={() => alert("Clicked!")}
  >
    Clickable Box
  </BABox>
  
  <BABox 
    className="p-4 bg-green-100 rounded" 
    sx={{ border: "1px solid green" }}
  >
    Box with Inline Styles
  </BABox>
</>
```

## Examples

### Default Box
Basic container with custom styling.

```jsx
<BABox className="p-4 bg-gray-100 rounded">
  Default Box
</BABox>
```

### Clickable Box
Box with click event handler.

```jsx
<BABox 
  className="p-4 bg-blue-100 rounded" 
  onClick={() => alert("Clicked!")}
>
  Clickable Box
</BABox>
```

### Box with Inline Styles
Box with sx prop for inline styling.

```jsx
<BABox 
  className="p-4 bg-green-100 rounded" 
  sx={{ border: "1px solid green" }}
>
  Box with Inline Styles
</BABox>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | CSS class names |
| `sx` | `object` | - | Inline styles object |
| `onClick` | `() => void` | - | Click event handler |
| `children` | `ReactNode` | - | Child elements |
| `style` | `CSSProperties` | - | React style object |
