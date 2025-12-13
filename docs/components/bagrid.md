---
sidebar_position: 12
---

# BAGrid Component

## Description

The `BAGrid` component is a flexible, read-only data grid designed for displaying large datasets in a standardized, performant table format. It handles various states (loading, no data) and provides extensive customization for column rendering, dynamic styling, and row interactivity. The grid is optimized for full-page views, featuring a fixed height and scrollable content area.

## 📦 Installation / Import

```javascript
import BAGrid from "@site/src/components/BAGrid";
// Requires internal components like BABox, BALoader, BAPera.
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />`, `<BALoader />`, `<BAPera />`.
*   **External Libraries**: `antd`'s `theme.useToken` for styling.

## 🛠️ Usage

The component primarily requires a data source array and a column definition array.

### Example

```javascript
import React from 'react';
import BAGrid from '@site/src/components/BAGrid';

function CustomerList() {
    const customers = [
        { id: 1, name: 'Alice Smith', status: 'Active', balance: 1500 },
        { id: 2, name: 'Bob Johnson', status: 'Inactive', balance: 0, rowColor: () => '#ffdddd' } // Custom row color
    ];

    const customerCols = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Customer Name' },
        { 
            key: 'balance', 
            label: 'Current Balance', 
            displayField: (row) => <strong>${row.balance.toFixed(2)}</strong> // Custom formatting
        },
        { key: 'status', label: 'Status' },
    ];

    const handleRowClick = (index, row) => {
        alert(`Clicked on customer: ${row.name}`);
    };

    return (
        <BAGrid
            datasourse={customers}
            cols={customerCols}
            onRowClick={handleRowClick}
            loading={false}
        />
    );
}
export default CustomerList;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `datasourse` | `any[]` | **Required**. The array of data objects to be displayed as rows. |
| `cols` | `object[]` | **Required**. An array defining the structure, headers, and rendering of each column. |
| `loading` | boolean | If true, displays a `<BALoader />` and applies a blur effect to the table. |
| `onRowClick` | `(index: number, row: any) => void` | Callback function executed when a user clicks anywhere on a data row. |
| `className` | string | Custom CSS classes for the main table container. |
| `onChange` | any | Optional, unused in current read-only implementation. |
| `displayField` | any | Optional, seems redundant or unused in current implementation. |
| `allowMultiple` | boolean | Optional, currently unused but suggests future selection functionality. |
| `allowSearch`, `colSearchObj`, `handleSearch` | boolean / object / function | Optional, indicates support for search functionality (not fully implemented in current code block). |

## 🏗️ Column (cols) Definition Structure

The `cols` prop is an array of objects that defines the column headers and how data is rendered within each cell.

| Key | Type | Description |
| :--- | :--- | :--- |
| `key` | string | The property name in the `datasourse` object used to display the default cell value. |
| `label` | string | **Required**. The header text displayed for the column. |
| `displayField` | `(data, index) => React.ReactNode` | A function used to render complex, formatted, or custom content in the cell. If provided, it overrides the default `row[key]` display. |
| `HeaderField` | any | Renders additional content in the cell after the main content (potentially for things like sort/filter indicators). |
| `className` | string | Custom CSS classes for the cell content. |

## ✨ Key Features & Styling

### Theming and Structure
*   **Header Styling**: The table header background color dynamically uses the application's **Ant Design Primary Color** (`token.token.colorPrimary`), with white text, ensuring visual consistency with the theme.
*   **Scrolling**: The grid is enclosed in a `<BABox>` with a fixed maximum height (`h-[calc(100vh-16rem)]`), enabling vertical scrolling for large datasets.
*   **Row Alternation (Zebra Striping)**: Rows automatically alternate background colors (`#edf0f4` vs white) based on the row index, improving readability.

### Customization
*   **Dynamic Row Color**: The data source object can optionally include a `rowColor` property (which can be a function) to apply a custom background color to a specific row.
*   **Custom Content**: The `displayField` prop within a column definition allows developers to inject any custom React elements (e.g., buttons, status badges, formatted currency) into a cell, providing granular control over rendering.

### State Handling
*   **Loading State**: When `loading` is `true`, the table displays a blurred background effect and shows a `<BALoader />` and "Loading..." text, providing clear feedback to the user.
*   **No Data State**: If the `datasourse` is empty and `loading` is `false`, a "No Data Found" message is displayed, maintaining a clean UI.
