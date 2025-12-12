---
sidebar_position: 29
---

# 🎨 MasterContainer Component

## Description

The `MasterContainer` component acts as the root wrapper for an application using Ant Design. 

**Key Functions:**
1.  **Global Theming (Dark Mode)**: It utilizes Ant Design's `ConfigProvider` to apply a consistent **Dark Theme** (`theme.darkAlgorithm`) across all child components. It allows the primary color to be customized via props, defaulting to a darker vivid blue (`#2563eb`).
2.  **Ant Design Utility Hooks**: It wraps the application content in the Ant Design `App` component, which enables access to static methods and context-based utilities like global message notifications (`message`), modal dialogs (`modal`), and notification alerts (`notification`) via the `App.useApp()` hook.

This component also includes logic to expose global functions (`displayError`, `showLoader`, `appTheme`) for convenient access across the application.

## 📦 Installation / Import

```javascript
import MasterContainer from "@site/src/components/MasterContainer";
```

## 🔗 Dependencies

*   **External Libraries**: `App`, `ConfigProvider`, `theme` (Ant Design).
*   **Patch**: `@ant-design/v5-patch-for-react-19` (Required for React 19 compatibility).

## 🛠️ Usage

This component should typically wrap the entire application in the main layout file (`layout.tsx` or equivalent) to ensure all components inherit the defined theme and context.

### Example (Root Layout)

```javascript
// Example in a root layout file (e.g., layout.js)

import React from 'react';
import MasterContainer from '@site/src/components/MasterContainer';
// import Header from './components/Header';
// import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire body content with MasterContainer */}
        <MasterContainer colorPrimary="#2563eb"> {/* Setting a custom blue color */}
          <div className="app-layout">
            {/* <Header /> */}
            <main>{children}</main>
            {/* <Footer /> */}
          </div>
        </MasterContainer>
      </body>
    </html>
  );
}
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `colorPrimary` | string | `'#2563eb'` (Blue 600) | A CSS color string (e.g., `'#2563eb'`). This color is applied as the primary theme color to various Ant Design components and the global token. |
| `children` | any | N/A | The content (the rest of the application) that will be rendered inside the themed context. |

## 🎨 Global Theming Details

The `MasterContainer` explicitly sets theme properties for several Ant Design components using the `colorPrimary` prop and applies the **Dark Algorithm**.

*   **Algorithm**: `theme.darkAlgorithm`
*   **Global Token**: `colorPrimary: '#2563eb'`
*   **Component Overrides**:
    *   **Button, Pagination**: `colorPrimary`, `borderRadius: 4`.
    *   **Input, Select, DatePicker**: `colorPrimary`, `borderRadius: 4`, `colorBgContainer: 'rgba(11, 16, 26, 0.6)'` (Dark Transparent).
    *   **Checkbox**: `borderRadius: 4`.
    *   **Modal**: `contentBg`, `headerBg` (Deep Dark `#0b101a`).
