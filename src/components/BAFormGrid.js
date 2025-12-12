import React from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BABox from './BABox';
import BAPera from './BAPera';
import BAButton from './BAButton';
import BAIconButton from './BAIconButton';
import BALoader from './BALoader';
import BAComponentSwitcher from './BAComponentSwitcher';

export default function BAFormGrid({
    datasourse = [],
    cols = [],
    setDatasourse,
    onAddRow,
    onDeleteRow,
    loading = false,
    action = [],
    disableAction = false,
    disableAdd = false,
    disableForm = false,
    updatedArr,
    setUpdatedArr
}) {
    if (loading) {
        return <BABox className="flex justify-center p-4"><BALoader /></BABox>;
    }

    const addRow = () => {
        const newRow = onAddRow ? onAddRow() : {};
        // Add a temporary unique ID for React keys if not present
        if (!newRow._tempId) newRow._tempId = Date.now();
        setDatasourse([...datasourse, newRow]);
    };

    const deleteRow = (index) => {
        const newData = [...datasourse];
        newData.splice(index, 1);
        setDatasourse(newData);
        if (onDeleteRow) onDeleteRow();
    };

    const handleRowChange = (e, val, element, index) => {
        // Logic to update datasourse at index
        const newData = [...datasourse];
        newData[index] = { ...newData[index], [element.id]: val };
        setDatasourse(newData);

        // Logic for updatedArr (tracking changes)
        if (setUpdatedArr && updatedArr) {
            const newUpdated = [...updatedArr];
            // Simple logic: add if not exists or update
            const existingIndex = newUpdated.findIndex(item => item._tempId === newData[index]._tempId);
            if (existingIndex > -1) {
                newUpdated[existingIndex] = newData[index];
            } else {
                newUpdated.push(newData[index]);
            }
            setUpdatedArr(newUpdated);
        }
    };

    return (
        <BABox className="w-full overflow-x-auto">
            <table className="w-full border-collapse" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr className="bg-gray-50 border-b" style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9fafb' }}>
                        {!disableAction && <th className="p-2 text-left w-12" style={{ padding: '0.5rem', textAlign: 'left' }}>#</th>}
                        {cols.map((col, idx) => (
                            <th
                                key={idx}
                                className={`p-2 text-left font-semibold ${col.className || ''}`}
                                style={{ padding: '0.5rem', textAlign: 'left', minWidth: col.width }}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datasourse.map((row, rowIndex) => (
                        <tr key={row.id || row._tempId || rowIndex} className="border-b" style={{ borderBottom: '1px solid #eee' }}>
                            {!disableAction && (
                                <td className="p-2 flex gap-1" style={{ padding: '0.5rem' }}>
                                    {!disableForm && (
                                        <BAIconButton
                                            onClick={() => deleteRow(rowIndex)}
                                            className="text-red-500 hover:bg-red-50"
                                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                                            danger // explicit danger type as implied by context
                                            type="text" // cleaner look for grid delete
                                        />
                                    )}
                                    {action.map((ActBtn, i) => (
                                        <div key={i}>{ActBtn}</div> // Placeholder for custom action rendering
                                    ))}
                                </td>
                            )}
                            {cols.map((col, colIndex) => (
                                <td key={colIndex} className="p-2" style={{ padding: '0.5rem' }}>
                                    {col.displayField ? (
                                        col.displayField(row, rowIndex)
                                    ) : col.element ? (
                                        <BAComponentSwitcher
                                            model={row}
                                            // Passing a dummy setModel or wrapper to update specific row
                                            setModel={(newRowState) => {
                                                // BAComponentSwitcher expects setModel to update the whole object
                                                // In grid context, we manually construct the change event or directly update array
                                                // This is a simplification:
                                                const newData = [...datasourse];
                                                newData[rowIndex] = newRowState;
                                                setDatasourse(newData);
                                            }}
                                            element={{ ...col.element, disabled: disableForm }}
                                            disabledForm={disableForm}
                                            rowIndex={rowIndex}
                                        // Custom handling for grid context if BAComponentSwitcher supports input directly
                                        />
                                    ) : (
                                        <BAPera>{row[col.key]}</BAPera>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {!disableAdd && !disableForm && (
                <BABox className="p-2 mt-2" style={{ marginTop: '0.5rem' }}>
                    <BAButton onClick={addRow} className="flex items-center gap-2">
                        <PlusOutlined /> Add Row
                    </BAButton>
                </BABox>
            )}
        </BABox>
    );
}
