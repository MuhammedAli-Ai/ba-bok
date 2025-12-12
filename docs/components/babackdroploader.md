---
sidebar_position: 4
---

# 🎭 BABackdropLoader Component

## Description

The `BABackdropLoader` component provides a **full-screen, modal-like overlay** used to block user interaction and indicate a global loading state for an application or a page. It renders a centered loader (`<BALoader />`) over a semi-transparent white background, ensuring a clear visual cue to the user.

## 📦 Installation / Import

Ensure the component file is accessible, and import it as follows:

```javascript
import BABackdropLoader from '@site/src/components/BABackdropLoader';
```

## 🛠️ Usage

The component is controlled by a single prop: `loading`. When `loading` is `true` (the default), the backdrop is visible. When `loading` is `false`, the component returns `null` and is hidden from the DOM.

### Example

Use state to control the visibility of the loader:

```javascript
import React, { useState } from 'react';
import BABackdropLoader from '@site/src/components/BABackdropLoader';

function MyPage() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate an async operation
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Stop loading after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h1>Welcome to the Page</h1>
            <p>Content goes here...</p>
            <BABackdropLoader loading={isLoading} />
        </div>
    );
}

export default MyPage;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `loading` | boolean | `true` | Controls the visibility of the backdrop and loader. Set to `false` to hide the component. |

## 🔗 Dependencies

This component relies on two internal components, which must be imported from their respective paths (`./BABox` and `./BALoader`):

* **BABox**: Used as the container for the full-screen backdrop.
* **BALoader**: The actual loading indicator displayed at the center of the backdrop.

## 🎨 Styling & Structure

The backdrop effect is achieved through specific CSS properties applied to the wrapping `<BABox>` component:

* **position: "fixed"**: Ensures the component is fixed relative to the viewport, regardless of scrolling.
* **width: "100vw" and height: "100vh"**: Makes the backdrop cover the entire viewport (100% of viewport width and height).
* **zIndex: 9999**: Ensures the backdrop is displayed on top of almost all other page content.
* **background: "rgba(255,255,255,0.6)"**: Creates the semi-transparent white overlay effect.
* **display: "flex", alignItems: "center", justifyContent: "center"**: Centers the `<BALoader />` component both horizontally and vertically within the full-screen container.
