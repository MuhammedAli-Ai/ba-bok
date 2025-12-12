---
sidebar_position: 7
---

# 📅 BADate Component

## Description

The `BADate` component is a wrapper around the Ant Design `DatePicker`. It standardizes date handling by using `dayjs` for input/output formatting and ensures that the value returned to the parent component's `onChange` handler is consistently a standard **JavaScript `Date` object** (or `null`), making it easier to integrate into forms.

## 📦 Installation / Import

```javascript
import BADate from "@site/src/components/BADate";
// Ensure Ant Design and dayjs are installed and configured in your project.
```

## 🔗 Dependencies

This component relies on external UI and utility libraries:

*   **antd**: Provides the core UI component (DatePicker and Typography).
*   **dayjs**: Used for parsing and formatting date values.
*   **BABox**: An internal wrapper component for layout/styling.

## 🛠️ Usage

The component is controlled and receives data via the `value` and `onChange` props, similar to standard form inputs.

### Example

```javascript
import React, { useState } from 'react';
import BADate from '@site/src/components/BADate';
import dayjs from 'dayjs';

function DateForm() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (dateObject, dateString) => {
        // dateObject will be a standard JavaScript Date object or null
        setSelectedDate(dateObject);
        console.log("Date Object:", dateObject);
        console.log("Formatted String:", dateString);
    };

    return (
        <BADate
            label="Date of Birth"
            required={true}
            value={selectedDate}
            onChange={handleDateChange}
            picker="year" // Allows selecting only the year
            maxDate={dayjs()} // Max date is today
        />
    );
}
export default DateForm;
```

## ⚙️ Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | string | N/A | The title displayed above the date picker. Includes a required asterisk if `required` is true. |
| `onChange` | `(date: Date \| null, dateString: string) => void` | N/A | Callback function fired when the date changes. It receives a JS Date object or null, and the formatted date string. |
| `value` | any | `null` | The current date value. Should be passed as a JS Date object, dayjs object, or an ISO-compatible date string. |
| `required` | boolean | `false` | Marks the field as required (displays an asterisk). |
| `disabled` | boolean | `false` | Disables the date picker input. |
| `picker` | `'week' \| 'month' \| 'quarter' \| 'year' \| undefined` | `undefined` (Day) | Sets the granularity of the selection (e.g., only allow selection of the year). |
| `showTime` | boolean | `false` | If true, enables time selection alongside the date. |
| `minDate` | any | `undefined` | Defines the minimum selectable date (accepts dayjs object). |
| `maxDate` | any | `undefined` | Defines the maximum selectable date (accepts dayjs object). |
| `validate` | boolean | `false` | Currently unused in the component logic. |

## 📐 Date Handling and Format

The component implements specialized logic within the `validatePeriod` function to manage date formats:

*   **Input Format**: The internal `DatePicker` uses `dayjs(value)` to convert the incoming value (which can be a standard date string or object) into the format needed by Ant Design.
*   **Output Format Normalization**: The `validatePeriod` function ensures that any valid date selected is converted to a standard JavaScript Date object using `dayjs(date).toDate()`. If the input is cleared (`!date`), it returns `null`.
*   **Display Format**: The date is displayed to the user in the format `DD-MMM-YYYY` (e.g., 31-Dec-2025).
