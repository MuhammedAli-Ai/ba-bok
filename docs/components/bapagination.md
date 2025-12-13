---
sidebar_position: 18
---

# BAPagination Component

## Description

The `BAPagination` component provides a stylized, self-contained footer for handling pagination controls, typically used below a data table or grid. It wraps the Ant Design `<Pagination>` component and centralizes the logic for managing the current page and page size, communicating changes back to the parent component for data fetching.

## 📦 Installation / Import

```javascript
import BAPagination from "@site/src/components/BAPagination";
```

## 🔗 Dependencies

*   **Internal Components**: `<BABox />` (Used for container layout and styling).
*   **External Libraries**: `Pagination` (Ant Design).

## 🛠️ Usage

This component is controlled and requires the total number of records and a handler function (`onPageChange`) to manage data fetching in the parent component.

### Example

```javascript
import React, { useState } from 'react';
import BAPagination from '@site/src/components/BAPagination';

function DataContainer() {
    const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
    const totalDataCount = 150; 

    const fetchNewData = (page, pageSize) => {
        console.log(`Fetching data for Page: ${page}, Size: ${pageSize}`);
        // In a real application, you would make an API call here
        setPageInfo({ page, size: pageSize });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Displaying Data (Page {pageInfo.page})</h2>
            <p>Content goes here...</p>

            <BAPagination
                totalRecords={totalDataCount}
                onPageChange={fetchNewData}
                pageSize={pageInfo.size} // Initial page size
            />
        </div>
    );
}
export default DataContainer;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `totalRecords` | number | N/A | **Required**. The total number of records in the dataset. Used to calculate the total number of pages. |
| `onPageChange` | `(page: number, pageSize: number) => void` | N/A | **Required**. Callback function executed when the page number or page size changes. The parent uses this to re-fetch data. |
| `pageSize` | number | `undefined` | The initial number of records to display per page. If undefined, Ant Design defaults apply (usually 10). |
| `onOk` | any | `undefined` | Optional, unused in current implementation. |
| `multiSelect` | boolean | `false` | Optional, unused in current implementation. |
| `content` | `React.ReactNode` | `undefined` | Optional, unused in current implementation. |

## 🔄 Key Logic and State

### Internal State Management
The component manages the current pagination state internally using `pageConfig` (current page and pageSize). This state ensures the Ant Design `<Pagination>` component remains in sync with user interactions.

### External Communication
The primary function of this component is to inform the parent when the pagination parameters change. This is handled by the `onPageChange` prop, which receives two arguments:

`onPageChange(newPage, newSize)`

When the page size is changed via the internal `pageSizeChange` function, the component automatically resets the current page to 1 before calling `onPageChange`.

### Visual Structure
The component is wrapped in a `<BABox>` with shadow and padding, giving it a distinct footer appearance. It displays the interactive pagination controls on the left and a non-interactive "Total Records" count on the right.
