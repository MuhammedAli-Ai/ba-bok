---
sidebar_position: 19
---

# BAPera Component

## Description

The `BAPera` component is a minimalist wrapper around the standard HTML paragraph element (`<p>`). Its purpose is to standardize the use of text blocks across the application, offering full flexibility for styling via CSS classes (`className`), inline styles (`sx`), and basic click interaction (`onClick`).

## 📦 Installation / Import

```javascript
import BAPera from "@site/src/components/BAPera";
```

## 🔗 Dependencies

The `BAPera` component has no external dependencies. It is a direct functional component that renders a basic HTML `<p>` tag.

## 🛠️ Usage

Use `BAPera` whenever you need to display text content that requires specific styling or behavior that might differ from standard component labels or headings.

### Example

```javascript
import React from 'react';
import BAPera from '@site/src/components/BAPera';

function StyledText() {
    return (
        <div>
            {/* Example 1: Tailwind classes for styling */}
            <BAPera className="text-lg font-bold text-gray-800 my-4">
                This text is styled using Tailwind CSS classes.
            </BAPera>

            {/* Example 2: Inline styles (sx) for dynamic presentation */}
            <BAPera sx={{ color: 'blue', textDecoration: 'underline' }}>
                This text uses the inline style prop (sx).
            </BAPera>

            {/* Example 3: Clickable text */}
            <BAPera onClick={() => alert('Text clicked!')} className="cursor-pointer hover:text-red-500">
                Clickable paragraph.
            </BAPera>
        </div>
    );
}
export default StyledText;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `children` | `React.ReactNode` | The content (text, other components) to be rendered inside the `<p>` tag. |
| `className` | string | Custom CSS classes (e.g., Tailwind classes) applied directly to the `<p>` element. |
| `sx` | object | Custom inline style object applied directly to the `<p>` element (maps to the HTML `style` attribute). |
| `onClick` | `() => void` | Optional function to execute when the paragraph element is clicked. |

## 📐 Core Functionality

The `BAPera` component is a pure pass-through wrapper:

BAPera -> HTML &lt;p&gt;

All props are applied directly to the underlying `<p>` tag, allowing complete control over text presentation and responsiveness using standard CSS/Tailwind utilities.
