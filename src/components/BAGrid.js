"use client";

import React from 'react';
import { theme } from 'antd';
import BABox from './BABox';
import BALoader from './BALoader';
import BAPera from './BAPera';

export default function BAGrid({
    datasourse = [],
    cols = [],
    loading = false,
    onRowClick,
    className = "",
    // Unused or future props mentioned in prompt
    onChange,
    displayField,
    allowMultiple,
    allowSearch,
    colSearchObj,
    handleSearch
}) {
    const { token } = theme.useToken();
    const primaryColor = token?.colorPrimary || '#1677ff';

    return (
        <BABox className={`rounded-lg bg-white shadow-sm overflow-hidden ${className}`}>
            <BABox className="relative" style={{ height: 'calc(100vh - 16rem)', minHeight: '400px', overflowY: 'auto' }}>

                {/* Loading Data Overlay */}
                {loading && (
                    <BABox
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm"
                        style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}
                    >
                        <BALoader />
                        <BAPera className="mt-2 text-gray-500 font-medium">Loading...</BAPera>
                    </BABox>
                )}

                {!loading && datasourse.length === 0 ? (
                    <BABox className="flex h-full items-center justify-center">
                        <BAPera className="text-gray-400 text-lg">No Data Found</BAPera>
                    </BABox>
                ) : (
                    <table className="w-full border-collapse text-sm text-left" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead className="sticky top-0 z-10" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                            <tr style={{ backgroundColor: primaryColor }}>
                                {cols.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="p-3 font-semibold text-white whitespace-nowrap"
                                        style={{ padding: '0.75rem', color: 'white', whiteSpace: 'nowrap' }}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datasourse.map((row, rowIndex) => {
                                // Zebra striping logic
                                const isEven = rowIndex % 2 === 0;
                                const defaultBg = isEven ? '#edf0f4' : 'white';

                                // Dynamic row color override
                                let rowBg = defaultBg;
                                if (row.rowColor) {
                                    rowBg = typeof row.rowColor === 'function' ? row.rowColor() : row.rowColor;
                                }

                                return (
                                    <tr
                                        key={rowIndex}
                                        onClick={() => onRowClick && onRowClick(rowIndex, row)}
                                        className={`transition-colors ${onRowClick ? 'cursor-pointer hover:brightness-95' : ''}`}
                                        style={{ backgroundColor: rowBg, transition: 'background-color 0.2s', ...(onRowClick ? { cursor: 'pointer' } : {}) }}
                                    >
                                        {cols.map((col, colIndex) => (
                                            <td key={colIndex} className={`p-3 border-b border-gray-100 ${col.className || ''}`} style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                                                {col.displayField ? (
                                                    col.displayField(row, rowIndex)
                                                ) : (
                                                    <BAPera className="truncate">
                                                        {row[col.key]}
                                                        {col.HeaderField && col.HeaderField}
                                                    </BAPera>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </BABox>
        </BABox>
    );
}
