---
sidebar_position: 24
---

# 📊 BASetupGrid Component

## Description

The `BASetupGrid` component is a high-level, feature-rich data grid designed primarily for **master configuration and CRUD (Create, Read, Update, Delete) screens**. It handles remote data fetching, pagination, sorting (API dependent), inline filtering, row actions (Edit/Delete), and Excel export. It is mobile-responsive, switching between a full table view and a horizontal-scrolling card view.

The component utilizes `forwardRef` and `useImperativeHandle` to allow parent components to trigger a data refresh.

## 📦 Installation / Import

```javascript
import BASetupGrid from "@site/src/components/BASetupGrid";
// Requires peer dependencies
// import * as XLSX from "xlsx";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />`, `<BAButton />`, `<BAPagination />`, `<BAModal />`, `<BALoader />`, `<BAInput />`, `<BASelect />`, `<BABackdropLoader />`, `<BADate />`, `<BAPera />`, `<BAScreenHeader />`, `<BAIconButton />`.
*   **Internal Utilities**: `formattedDate`, `formattedNumber`, `createApiFunction`.
*   **External Libraries**: `Grid`, `message`, `Popconfirm`, `theme` (Ant Design), `XLSX` (SheetJS).
*   **External Icons**: `DeleteOutlined`, `EditOutlined`, `PlusOutlined`, `CloseOutlined`, `CheckOutlined`, `FileExcelOutlined`, `PrinterOutlined`.

## 🛠️ Usage

This component requires API methods (`Get`, `Delete`) and a configuration structure (`cols`) to define the displayed data.

### Example

```javascript
import React from 'react';
import BASetupGrid from '@site/src/components/BASetupGrid';
// import * as api from './config/apimethods';

function UsersGrid() {
    // apiFunctions mock
    const apiMock = {
        Get: async () => ({ data: { rows: [], totalCounts: 0 } }),
        Delete: async () => {}
    };

    const userColumns = [
        { key: 'name', label: 'User Name', className: 'w-1/4' },
        { key: 'email', label: 'Email Address' },
        { key: 'createdAt', label: 'Join Date', type: 'date' },
        { 
            key: 'status', 
            label: 'Active Status', 
            type: 'enum', 
            filterEnums: [{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }] 
        },
    ];

    const handleAddEdit = (record) => {
        if (record) {
            console.log("Editing:", record.id);
        } else {
            console.log("Adding new record");
        }
    };

    return (
        <BASetupGrid
            title="User Management"
            controller="users" // API endpoint: /users
            cols={userColumns}
            onAddEdit={handleAddEdit}
            apiFunctions={apiMock}
            allowPrint={true}
        />
    );
}
export default UsersGrid;
```

## ⚙️ Props

### Required/Core

| Prop | Type | Description |
| :--- | :--- | :--- |
| `title` | string | **Required**. Title displayed on the screen header. |
| `controller` | string | **Required**. The primary API endpoint path (e.g., `'users'`). |
| `cols` | `object[]` | **Required**. Array defining the table columns and their behavior. |
| `apiFunctions` | object | **Required**. Object containing `Get` and `Delete` API wrapper functions. |

### Functionality Control

| Prop | Type | Description |
| :--- | :--- | :--- |
| `onAddEdit` | `(row: object) => void` | Callback triggered when Add or Edit is clicked. |
| `rowPrint` | `(id: any) => void` | Callback function triggered when the print icon is clicked on a row. |
| `disableAdd` | boolean | Hides the "Add New" button. |
| `disableEdit` | boolean | Hides the row 'Edit' button. |
| `disableDelete` | boolean | Hides the row 'Delete' button with Popconfirm. |
| `disableExport` | boolean | Hides the "Export as Excel" button. |
| `allowPrint` | boolean | Shows the row 'Print' icon. |

### Data/API Config

| Prop | Type | Description |
| :--- | :--- | :--- |
| `extraParams` | object | Additional filter parameters sent with every `Get` request. |
| `extraBody` | `React.ReactNode` | Content to render directly above the grid table (e.g., summary data). |
| `searchParams` | object | Additional static search parameters passed to the `Get` API call. |

### Customization/Theming

| Prop | Type | Description |
| :--- | :--- | :--- |
| `extraActions` | `object[]` | Array of custom actions/buttons to display in the action column. |
| `conditionalColumns` | `object[]` | Extra columns rendered outside the main `cols` array, often for data derived on the client side. |
| `customButton` | `React.ReactNode[]` | Array of custom buttons/elements to display in the screen header. |
| `modelGetter` | `(row: object) => void` | Function to get the full model object when editing. |
| `extraHeaders` | `object[]` | Additional options to place in the screen header (next to Add/Export buttons). |

### Ref Access

| Prop | Type | Description |
| :--- | :--- | :--- |
| `ref` | `Ref<any>` | Used to expose public methods (`invokeChildFunction`). |

### Unused/Legacy

`apiName`, `exportUrl`, `onView`, `sortColumn`, `sortDirection`, `formElement`, `disablePost`, `disableView`, `exportParams`, `getDataTrigger`, `rec_id`, `getByRequest`, `modelAlias`, `fieldsToDelete`, `convertToNumber`, `disableCompId`, `reqFields`, `isUpdateReq`. (Props defined in the type but not actively used in the component logic).

## 🖼️ cols Configuration (Column Definition)

The `cols` array is the primary driver for table rendering and filtering.

| Key | Type | Description |
| :--- | :--- | :--- |
| `key` | string | **Required**. The key in the data object to display. Also used for filtering. |
| `label` | string | **Required**. The text displayed in the table header. |
| `type` | string | Defines how data is displayed and filtered: `enum`, `date`, `number`, `status` (renders icon). Defaults to text. |
| `className` | string | Custom Tailwind CSS classes for the column data cells. |
| `displayField` | `(row: object) => React.ReactNode` | Custom rendering function for complex column content (overrides default type logic). |
| `filterEnums` | `object[]` | Only for type: `'enum'`. Provides options for the `BASelect` filter dropdown in the header. |
| `hideFilter` | boolean | Only for type: `'date'`. Hides the date picker filter for the column. |
| `HeaderField` | `() => React.ReactNode` | Custom content to render inside the header cell (not used for standard filtering). |

## 🚀 Key Features & API Interaction

### Data Fetching and Refresh
The core data retrieval is handled by the `getData` function, which is called on initial load, on filter changes, and on pagination changes.
*   **API Request**: It uses the `Get` method from `apiFunctions` on the `controller` endpoint.
*   **Query Parameters**: It constructs the query to include:
    *   `pageNo` and `pageSize` (for pagination).
    *   `selector` (a comma-separated list of all column keys, optimizing data transfer).
    *   `filter` (a stringified JSON object containing inline filter values from `gridSearchObj` merged with `extraParams`).
*   **Ref Access**: The component exposes this function via `useImperativeHandle` as `invokeChildFunction()`, allowing a parent component to trigger a data refresh programmatically.

### Inline Filtering
A dedicated row beneath the table header contains input components for filtering.
*   **Text/Number**: Uses `<BAInput />`. Hitting the Enter key triggers `getData`.
*   **Enum**: Uses `<BASelect />` with options from `col.filterEnums`. Changing the value triggers `getData` immediately.
*   **Date**: Uses `<BADate />`. Changing the date triggers `getData` immediately.
*   **Clear Filters**: A `CloseOutlined` icon appears next to the action column if any filters are active, allowing a one-click reset.

### Excel Export (exportToExcel)
The Export button opens a modal offering two choices:
1.  **Current Page**: Exports the data currently loaded into `listData`.
2.  **Export All Data**: Fetches all records from the API using a very large pageSize (1 billion), then exports all of it, ensuring all filters currently in `gridSearchObj` are applied.

Data is formatted using the `XLSX` (SheetJS) library, using the column headers defined in the `cols` prop.

### Mobile Responsiveness
On screens smaller than the Ant Design 'md' breakpoint (`!screens.md`), the traditional horizontal table view is replaced by a vertical, horizontal-scrolling card-based layout, optimizing the display of records on smaller devices.
