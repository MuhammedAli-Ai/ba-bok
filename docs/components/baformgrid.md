---
sidebar_position: 11
---

# BAFormGrid Component

## Description

The `BAFormGrid` component renders a dynamic, fully editable data table (grid). It is designed for scenarios where users need to **input or modify data row-by-row** (e.g., adding line items to an invoice). It leverages the internal `<BAComponentSwitcher>` to render various form elements directly inside the table cells.

## 📦 Installation / Import

```javascript
import BAFormGrid from "@site/src/components/BAFormGrid";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"; 
// plus other internal components like BAComponentSwitcher, BABox, etc.
```

## 🔗 Dependencies

*   **Internal Components**: `<BAComponentSwitcher />`, `<BABox />`, `<BAButton />`, `<BAIconButton />`, `<BALoader />`, `<BAPera />`.
*   **Icons**: `PlusOutlined`, `DeleteOutlined`.

## 🛠️ Usage

This component requires an array of data objects (`datasourse`) and a definition array (`cols`) mapping column headers to data keys and their corresponding form elements.

### Conceptual Example

```javascript
import React, { useState } from 'react';
import BAFormGrid from '@site/src/components/BAFormGrid';
// Assuming formElement is imported or defined
// import { formElement } from "./BAComponentSwitcher"; 

function LineItemEditor() {
    const [lineItems, setLineItems] = useState([
        { id: 1, item: 'Keyboard', quantity: 2, price: 50, amount: 100 }
    ]);

    const itemColumns = [
        { 
            key: 'item', 
            label: 'Product Name', 
            element: { elementType: 'input', id: 'item', label: 'Item' } 
        },
        { 
            key: 'quantity', 
            label: 'Qty', 
            element: { elementType: 'input', id: 'quantity', label: 'Qty', type: 'number' } 
        },
        { 
            key: 'amount', 
            label: 'Total', 
            // Calculated field, not editable via input:
            displayField: (row) => `$${row.price * row.quantity}`
        },
    ];

    return (
        <BAFormGrid
            datasourse={lineItems}
            cols={itemColumns}
            setDatasourse={setLineItems}
            onAddRow={() => ({ id: Date.now(), item: '', quantity: 1, price: 0, amount: 0 })}
        />
    );
}
export default LineItemEditor;
```

## ⚙️ Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `datasourse` | `any[]` | **Required**. The array of data objects to be rendered in the table rows. |
| `cols` | `object[]` | **Required**. An array defining the structure, headers, and form elements for each column. |
| `setDatasourse` | `(data: any[]) => void` | **Required for Editing/Management**. The state setter function to update the parent component's data array. |
| `onAddRow` | `() => object` | Optional handler called before a new row is added. Should return a default object structure for the new row. |
| `onDeleteRow` | `() => void` | Optional handler called after a row is deleted. |
| `loading` | boolean | Displays a `<BALoader />` overlay if true. |
| `action` | `actionType[]` | An array of custom action buttons (icons/handlers) to display in the first column alongside the Delete button. |
| `disableAction` | boolean | If true, hides the entire action column (Delete + custom actions). |
| `disableAdd` | boolean | If true, hides the "Add Row" button/icon. |
| `disableForm` | boolean | If true, disables the Delete icon and all form inputs within the grid, making it read-only. |
| `updatedArr` | `any[]` | State array used to track only the rows that have been modified. |
| `setUpdatedArr` | `(data: any[]) => void` | Setter for the `updatedArr` state. |

## 🏗️ Column (cols) Definition Structure

The `cols` prop is an array of objects that determines the rendering and behavior of each table column.

| Key | Type | Description |
| :--- | :--- | :--- |
| `key` | string | The data key in the `datasourse` object associated with this column. |
| `label` | string | The text displayed in the table header. |
| `element` | `formElement` | The configuration object for the form element (e.g., text input, dropdown) to be rendered using `<BAComponentSwitcher />`. If present, the cell is editable. |
| `displayField` | `(data, index) => React.ReactNode` | A function that, if provided, renders static content in the cell, overriding any `element` definition. Useful for computed or read-only fields. |
| `className` | string | Custom Tailwind CSS classes for the column header and cells. |
| `width` | string \| number | Custom width style for the column (e.g., '150px'). |

## 🔄 Key Interaction Logic

### In-Place Editing
*   **Component Switching**: The data cell content is rendered either via a custom function (`displayField`) or an editable form element via `<BAComponentSwitcher />`.
*   **Data Binding**: Changes made in the `<BAComponentSwitcher />` trigger a callback which immediately updates the specific row within the local `datasourse` via `setDatasourse([...datasourse])`.
*   **Change Tracking (`updatedArr`)**: If `updatedArr` and `setUpdatedArr` are provided, the component intelligently tracks changes. When a row is modified, it is added to or updated within the `updatedArr`, allowing the parent form to easily submit only the modified records.

### Row Management
*   **Adding**: Clicking the **+ icon** in the footer or the "Add Row" button calls the `addRow` function. This function creates a new row object (optionally using the return value of `onAddRow`) and updates the data source.
*   **Deleting**: Clicking the **DeleteOutlined** icon for a row calls `deleteRow`, which splices the row from the `datasourse` array.
