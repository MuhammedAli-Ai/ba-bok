---
sidebar_position: 6
---

# ⚙️ BAComponentSwitcher Component

## Description

The `BAComponentSwitcher` is a highly flexible, **dynamic form element renderer**. Its primary function is to inspect a given configuration object (`element` of type `formElement`) and render the appropriate UI component (Input, Select, Datepicker, Button, etc.) while managing its state (`model` and `setModel`). This central component simplifies the creation of complex, data-driven forms.

## 📦 Installation / Import

```javascript
import BAComponentSwitcher from "@site/src/components/BAComponentSwitcher";
// Ensure all necessary UI component dependencies are also available in context.
```

## 🧠 Core Logic

The component uses a standard JavaScript switch statement on the `element.elementType` prop to determine which underlying UI component to render. It acts as a middleware, handling prop mapping, change event propagation, and complex logic (like lookups) before passing control to the specific component.

### Form Element Configuration (`formElement` Type)

This component is driven entirely by the `formElement` type, which dictates the type of component to render and supplies all necessary props.

| elementType Value | Component Rendered | Description |
| :--- | :--- | :--- |
| `input` | `<BAInput />` | Standard text, number, or masked input fields. |
| `textarea` | `<BATextarea />` | Multi-line text input. |
| `button` | `<BAButton />` | A clickable action button. |
| `select` | `<BASelect />` | Dropdown selection (single or multiple). |
| `lookup` | `<BASearchLookup />` | Advanced component for searching/selecting records, often linking to external data. |
| `datepicker` | `<BADate />` | Date and/or time input selection. |
| `boolean` | `<BASwitch />` | A toggle switch for boolean values. |
| `checkbox` | `<BACheckbox />` | A single checkbox. |
| `radio` | `<BARadio />` | Radio button group selection. |
| `imageupload` | `<BAImagePicker />` | Component for uploading images. |
| `dragfile` | `<BADragDropFile />` | Component for drag-and-drop file uploads. |
| `heading` | `<BAPera />` (in `<BABox />`) | Renders a styled section heading/title. |
| `text` | `<BAPera />` (in `<BABox />`) | Renders static, bound text (label and model value). |
| `custombody` | `<BABox />` | Renders arbitrary JSX content supplied via the `body` prop. |

## ⚙️ Component Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `model` | any | The state object containing all form data (required for binding values). |
| `setModel` | any | The state setter function used to update the model. |
| `element` | formElement | **Required**. The configuration object defining the component to render and its properties. |
| `disabledForm` | boolean | If true, globally disables all form elements within this component. |
| `rowChangeEv` | function | Callback fired on value change, often used in grid/table contexts, providing event, value, element config, and row index. |
| `rowIndex` | number | Index of the current row (relevant for list/grid contexts). |
| `apiFunctions` | string | String to identify a set of API functions (used primarily by `<BASearchLookup />`). |

## 🔗 Key Utility Functions (Logic Overview)

The component includes several functions to manage complex state mutations, especially for lookup fields:

*   **fillModel**: A simple utility to update a single key in the model state and trigger a re-render.
*   **handleLookupBlur**: **Lookup Clear Logic**. When a lookup input loses focus, this function checks if the entered value doesn't match the current linked value. If so, it clears all related fields (specified by `reqFields`) to prevent stale data.
*   **handleMultiSelect**: **Multi-Select Processing**. Takes selected rows from a multi-select lookup, applies field remapping (`fieldAlias`), filters required fields (`reqFields`), and updates an array key (`arrKey`) in the main model state.
*   **uploadFile**: Simple utility to set the value of a file input field in the model state.

## 🧩 Dependencies

This component imports and utilizes the following external and internal UI components:
`<BAButton />` `<BAInput />` `<BASearchLookup />` `<BASelect />` `<BASwitch />` `<BADate />` `<BABox />` `<BAPera />` `<BAFieldset />` `<BADragDropFile />` `<BATextarea />` `<BAImagePicker />` `<BACheckbox />` `<BARadio />`
