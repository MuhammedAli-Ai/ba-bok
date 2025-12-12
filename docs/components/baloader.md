---
sidebar_position: 15
---

# ⏳ BALoader Component

## Description

The `BALoader` component is a dedicated utility for displaying a centralized, spinning animation to indicate an ongoing asynchronous operation (like data fetching, processing, or submission). It provides clear visual feedback to the user and is designed to occupy the full height and width of its container.

## 📦 Installation / Import

```javascript
import BALoader from "@site/src/components/BALoader";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />` (Used for container layout).
*   **External Libraries**: `LoadingOutlined` (Ant Design Icon).

## 🛠️ Usage

This component is typically rendered conditionally based on a loading state variable. It should be placed inside a container that defines its height and width (e.g., within a form, table, or modal body).

### Example

```javascript
import React, { useState, useEffect } from 'react';
import BALoader from '@site/src/components/BALoader';
import DataDisplay from './DataDisplay';

function ContentPanel() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setData({ name: "Loaded Data" });
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div style={{ minHeight: '200px', border: '1px solid #ccc' }}>
            {isLoading ? (
                <BALoader /> 
            ) : (
                <DataDisplay data={data} />
            )}
        </div>
    );
}
export default ContentPanel;
```

## ⚙️ Props

The `BALoader` component is a presentation component and accepts no props. It renders a fixed, self-contained loading indicator.

## 🎨 Styling & Structure

*   **Icon**: The component uses the standard `LoadingOutlined` icon from Ant Design.
*   **Sizing**: The icon size is set to `3em` for high visibility.
*   **Centering**: The component is wrapped in a `<BABox>` configured with Tailwind classes (`flex h-full items-center justify-center`). This structure ensures the loading icon is perfectly centered, both horizontally and vertically, within its immediate parent container, provided that container defines its height (`h-full`).
