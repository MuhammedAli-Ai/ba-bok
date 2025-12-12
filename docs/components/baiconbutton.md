---
sidebar_position: 13
---

# 🔘 BAIconButton Component

## Description

The `BAIconButton` is a lightweight wrapper around the Ant Design `<Button>` component, specialized for creating clean, circular action buttons that display only an icon. It simplifies usage by setting sensible defaults for appearance and exposes all standard Ant Design button functionality (loading, disabled, type).

## 📦 Installation / Import

```javascript
import BAIconButton from "@site/src/components/BAIconButton";
```

## 🔗 Dependencies

*   **antd**: Provides the core UI component, `<Button />`.

## 🛠️ Usage

The component requires the `icon` prop to be a valid React Node (typically an Ant Design Icon component).

### Example

```javascript
import React from 'react';
import BAIconButton from '@site/src/components/BAIconButton';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

function ActionToolbar() {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <BAIconButton
                icon={<EditOutlined />}
                onClick={() => console.log('Edit clicked')}
                className="custom-margin"
            />
            <BAIconButton
                icon={<SaveOutlined />}
                type="dashed" // Override default type
                shape="round" // Override default shape
                disabled={true}
            />
        </div>
    );
}
export default ActionToolbar;
```

## ⚙️ Props

Most props are passed directly to the underlying Ant Design `<Button>` component.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `any` (React.ReactNode) | N/A | **Required**. The icon component to display inside the button (e.g., `<PlusOutlined />`). |
| `onClick` | `() => void` | `undefined` | Callback function executed when the button is clicked. |
| `type` | `'link' \| 'text' \| 'primary' \| 'default' \| 'dashed' \| undefined` | `"primary"` | Defines the button style and color scheme. |
| `shape` | `'circle' \| 'round' \| 'default' \| undefined` | `"circle"` | Defines the shape of the button. |
| `loading` | boolean | `false` | Displays a loading spinner and disables click events. |
| `disabled` | boolean | `false` | Disables the button and changes its appearance. |
| `danger` | boolean | `false` | Sets the button style to an alert/danger theme (typically red). |
| `className` | string | `undefined` | Custom CSS classes for styling. |

## 🎨 Default Configuration

The component sets two key defaults to ensure a consistent, minimal icon button style out-of-the-box:

*   **type**: `"primary"` (Gives the button the theme's primary color).
*   **shape**: `"circle"` (Renders the button as a perfectly round circle).

These defaults can be easily overridden by passing different values through the props.
