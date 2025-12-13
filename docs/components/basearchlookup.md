---
sidebar_position: 22
---

# BASearchLookup Component

## Description

The `BASearchLookup` component is a complex form field designed for selecting data records from a remote API source. It presents itself either as a search-enabled input field or a button, and upon activation, opens a modal containing a searchable, sortable grid (`BAGrid`) with pagination (`BAPagination`) to allow the user to select one or more records.

## 📦 Installation / Import

```javascript
import BASearchLookup from "@site/src/components/BASearchLookup";
```

## 🔗 Dependencies

*   **Internal Components**: `<BAModal />`, `<BAGrid />`, `<BAPagination />`, `<BAButton />`, `<BABox />`.
*   **Internal Utility**: `createApiFunction` (used for API interaction setup).
*   **External Components**: `Input`, `message`, `Typography`, `Grid` (Ant Design).
*   **External Icons**: `SearchOutlined`, `CloseOutlined` (Ant Design Icons).

## 🛠️ Usage

The component requires the `controller` (API endpoint path) and `apiFunctions` (API wrapper) to fetch the data. The `config` prop defines the columns of the lookup grid.

### Example

```javascript
import React, { useState } from 'react';
import BASearchLookup from '@site/src/components/BASearchLookup';
// import * as api from './config/apimethods'; // Assuming api methods are exported

function ProductSelectionForm() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productId, setProductId] = useState(null);

    const productConfig = [
        { key: 'name', title: 'Product Name', isSearchable: true },
        { key: 'code', title: 'Code' },
        { key: 'price', title: 'Price' },
    ];

    // apiFunctions mock for demonstration
    const apiMock = {
        Get: async (url) => {
            return {
                items: [
                    { id: 1, name: 'Product A', code: 'A100', price: 50 },
                    { id: 2, name: 'Product B', code: 'B200', price: 75 }
                ],
                meta: { totalItems: 2 }
            };
        }
    };

    const handleProductSelect = (e, selectedValue, selectedRecord) => {
        setProductId(selectedRecord?.id); // ID for form submission
        setSelectedProduct(selectedRecord); // Full object for internal use
        console.log("Selected Record:", selectedRecord);
    };

    return (
        <BASearchLookup
            label="Select Product"
            controller="products" 
            config={productConfig}
            displayField="name" // The key to display in the input box
            value={productId}
            onChange={handleProductSelect}
            apiFunctions={apiMock} // Passed instance of API methods
            required={true}
        />
    );
}
export default ProductSelectionForm;
```

## ⚙️ Props

### Core Input

| Prop | Type | Description |
| :--- | :--- | :--- |
| `label` | string | **Required**. Text label displayed above the input/button. |
| `value` | any | The current value/ID of the selected record (used internally to determine close icon vs. search icon). |
| `onChange` | `(e, value, record) => void` | **Required**. Handler called when a single record is selected or cleared. |
| `placeholder` | string | Placeholder text for the input field. |
| `type` | string | If set to `"button"`, renders a `<BAButton />` instead of an input field. |

### API Config

| Prop | Type | Description |
| :--- | :--- | :--- |
| `controller` | string | **Required**. The API route path (e.g., `'users'`, `'products'`) for the lookup data. |
| `config` | `object[]` | **Required**. Array defining the columns of the lookup grid (maps to `BAGrid`'s `cols`). |
| `displayField` | string | The key from the selected data object whose value is displayed in the input field. |
| `apiFunctions` | object | **Required**. Object containing the API methods (must include `Get`). |

### Lookup Control

| Prop | Type | Description |
| :--- | :--- | :--- |
| `allowMultiple` | boolean | Enables multi-row selection in the lookup grid. |
| `onSelectMultiple` | `(records: object[]) => void` | Handler called when multiple selection is finalized. |
| `onRowClick` | `(i, data, list) => void` | Custom handler for single row click action. |

### Display/Behavior

| Prop | Type | Description |
| :--- | :--- | :--- |
| `disabled` | boolean | Disables the input/button and search functionality. |
| `required` | boolean | Displays a required indicator (*) next to the label. |
| `onCancel` | `() => void` | Handler called when the user clears the selection using the `CloseOutlined` icon. |
| `fillObj` | object | Used to pre-fill the input value based on a full record object during initialization (used with `value`). |
| `onBlur` | `(e) => void` | Standard `onBlur` event handler for the input field. |
| `className` | string | Custom CSS classes for the container. |

### Unused/Internal

`apiName`, `multiple`, `isRowSelected`, `isAllSelected`, `data`, `useLookup`, `params`. (Props defined but not actively used or processed in the primary component logic).

## 🔄 Core Interaction Flow

### 1. Input Field Mode (Default)
*   **Search/Open**: Clicking the `SearchOutlined` suffix icon, or pressing the **Enter** key while the input is focused, triggers the lookup modal.
*   **Clear**: If a value is present, a `CloseOutlined` icon appears. Clicking it calls `handleCancel`, which clears the input value (`setInpValue("")`) and calls the parent's `onChange` and `onCancel` handlers, resetting the selected data.

### 2. Button Mode (`type="button"`)
*   Renders a standard `<BAButton />` which, when clicked, immediately opens the modal.

## 💾 Data Fetching (`getData`)

The `getData` function is responsible for fetching data for the lookup grid.
1.  It constructs the API endpoint using a base URL (`lookup/`) and the `controller` prop.
2.  It utilizes the `config` prop to dynamically build the `selector` query parameter, optimizing the request to only fetch columns needed for the grid display.
3.  It handles pagination by merging the current `pageConfig` state with any new page/size parameters passed to it.

## ✅ Output & Selection

### Single Selection (Default)
1.  When a row is clicked, the `onRowClick` handler is executed.
2.  The input box is immediately updated with the value of the `displayField` from the selected record (`setInpValue(data[displayField])`).
3.  The modal is closed (`onOK()`).

### Multiple Selection (`allowMultiple=true`)
1.  Row clicks trigger selection/deselection, but the modal remains open.
2.  The user must click the dedicated **OK** button in the `BAPagination` component's footer.
3.  The `setSelectedRows` function gathers all records marked as selected (`el.isSelected`) and passes them as an array to the `onSelectMultiple` handler before closing the modal.
