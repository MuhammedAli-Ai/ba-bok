"use client";

import React, { useState } from "react";
import { Pagination } from "antd";
import BABox from "./BABox";
// import BASelect from "./BASelect"; // Commented out as BASelect is not yet implemented or used in JSX

export default function BAPagination(props) {
    const { totalRecords, onPageChange, pageSize } = props;
    const [pageConfig, setPageConfig] = useState({
        current: 1,
        pageSize: pageSize || 10,
    });

    const handlePageChange = (page, pageSize) => {
        if (onPageChange) onPageChange(page, pageSize);
        setPageConfig({ ...pageConfig, current: page, pageSize: pageSize });
    };

    // Function from original code, preserved but unused in JSX currently
    const pageSizeChange = (value) => {
        setPageConfig({ ...pageConfig, pageSize: value });
        handlePageChange(1, value);
    };

    return (
        <>
            <BABox className="p-3 rounded-lg bg-white shadow mt-1 md:mt-2">
                <BABox className="flex justify-between items-center">
                    <Pagination
                        defaultCurrent={1}
                        total={totalRecords}
                        pageSize={pageConfig.pageSize}
                        onChange={handlePageChange}
                    />
                    <BABox className="ms-2">Total Records: {totalRecords}</BABox>
                </BABox>
            </BABox>
        </>
    );
}
