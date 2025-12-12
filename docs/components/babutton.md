---
sidebar_position: 1
---

# BAButton

A customizable button component with various styles and sizes.

## Installation

```bash
npm install basuite
```

## Usage

```jsx
import { BAButton } from "basuite";

<>
  <BAButton type="primary" label="Primary" />
  <BAButton type="default" label="Default" />
  <BAButton type="dashed" label="Dashed" />
  <BAButton type="link" label="Link" />
  <BAButton type="text" label="Text" />
</>
```

## Button Types

### Primary Button
The primary action button with solid background.

```jsx
<BAButton type="primary" label="Primary" />
```

### Default Button
Standard button with border.

```jsx
<BAButton type="default" label="Default" />
```

### Dashed Button
Button with dashed border style.

```jsx
<BAButton type="dashed" label="Dashed" />
```

### Link Button
Button styled as a hyperlink.

```jsx
<BAButton type="link" label="Link" />
```

### Text Button
Button with no border or background.

```jsx
<BAButton type="text" label="Text" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'primary' \| 'default' \| 'dashed' \| 'link' \| 'text'` | `'default'` | Button style variant |
| `label` | `string` | - | Button text content |
| `onClick` | `() => void` | - | Click event handler |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
