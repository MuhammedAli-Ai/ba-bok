"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import BAIconButton from "./BAIconButton";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    CloseOutlined,
    CheckOutlined,
    FileExcelOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import BABox from "./BABox";
import BAButton from "./BAButton";
import BAPagination from "./BAPagination";
import BAModal from "./BAModal";
// import { formElement } from "./BAComponentSwitcher"; // Not used directly in JS version usually, or simple object
import { Grid, message, Popconfirm, theme } from "antd";
import BALoader from "./BALoader";
import BAInput from "./BAInput";
import classNames from "clsx"; // Using clsx as it is installed
import BASelect from "./BASelect";
import BABackdropLoader from "./BABackdropLoader";
import BADate from "./BADate";
import * as XLSX from "xlsx";
import BAPera from "./BAPera";
import { formattedDate, formattedNumber } from "./config/helpers";

import BAScreenHeader from "./BAScreenHeader";
// import createApiFunction from "./config/apimethods"; // Not used as prop is key
const { useBreakpoint } = Grid;

const BASetupGrid = forwardRef((props, ref) => {
    const {
        cols,
        controller,
        extraParams = {},
        apiName,
        onAddEdit,
        title,
        disableAdd,
        disableEdit,
        disableDelete,
        extraActions,
        extraHeaders = [],
        conditionalColumns,
        modelGetter,
        customButton,
        extraBody,
        searchParams,
        disableExport,
        allowPrint,
        rowPrint,
        apiFunctions
    } = props;

    // Safety check for apiFunctions
    const Get = apiFunctions?.Get || (() => Promise.reject({ error: "API Functions not provided" }));
    const Delete = apiFunctions?.Delete || (() => Promise.reject({ error: "API Functions not provided" }));

    const { token } = theme.useToken()
    const [listData, setListData] = useState([]);
    const [printLoader, setPrintLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [excelLoader, setExcelLoader] = useState(false);
    const [gridSearchObj, setGridSearchObj] = useState({});
    const [exportModal, setExportModal] = useState(false);
    const [paginationConfig, setPaginationConfig] = useState({
        pageSize: 10,
        page: 1,
        totalRecords: 0,
    });

    const screens = useBreakpoint();
    const isMobile = !screens.md; // md = 768px breakpoint


    const addEditClick = (row) => {
        if (onAddEdit) {
            onAddEdit(row);
        }
    };

    const getExcelData = async () => {
        const updatedSearchObj = Object.fromEntries(
            Object.entries(gridSearchObj).filter(([_, value]) => value !== undefined && value !== null)
        );
        let res = await Get(`${controller}`, null, {
            pageNo: 1,
            pageSize: 1000000000,
            selector: cols.map((col) => col.key).filter(Boolean).join(","),
            filter: JSON.stringify({ ...updatedSearchObj, ...extraParams }),
        })
        if (res?.data?.rows) {
            return res.data.rows;
        }
    }

    const exportToExcel = async (currentPage, summary) => {

        if (currentPage) {
            const worksheetData = [];
            const headers = cols.map((col) => col.key);
            worksheetData.push(headers);

            // Prepare data rows
            listData.forEach((row) => {
                const rowData = cols.map((col) => {
                    const value = row[col.key];
                    // Handle date formatting if necessary
                    if (col.type === "date" && value) {
                        return formattedDate(value); // Adjust date format as needed
                    }
                    return value !== undefined && value !== null ? value : "";
                });
                worksheetData.push(rowData);
            });

            // Create a worksheet from the data
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Create a workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, title);

            // XLSX to Excel
            XLSX.writeFile(workbook, `${title}.xlsx`);
        } else {
            setExcelLoader(true);
            let list = await getExcelData();
            if (!list) {
                message.error("No data available for export.");
                return;
            }
            const worksheetData = [];
            const headers = cols.map((col) => col.key);
            worksheetData.push(headers);

            // Prepare data rows
            list.forEach((row) => {
                const rowData = cols.map((col) => {
                    const value = row[col.key];
                    // Handle date formatting if necessary
                    if (col.type === "date" && value) {
                        return formattedDate(value); // Adjust date format as needed
                    }
                    return value !== undefined && value !== null ? value : "";
                });
                worksheetData.push(rowData);
            });

            // Create a worksheet from the data
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Create a workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, title);

            // XLSX to Excel
            XLSX.writeFile(workbook, `${title}.xlsx`);
            setExcelLoader(false);
        }

        setExportModal(false);
    }




    const getData = (pgObj, SearchObj) => {
        setLoader(true);
        const updatedSearchObj = Object.fromEntries(
            Object.entries(SearchObj ? SearchObj : gridSearchObj).filter(([_, value]) => value !== undefined && value !== null)
        );
        Get(`${controller}`, null, {
            pageNo: pgObj ? pgObj.page : paginationConfig.page,
            pageSize: pgObj ? pgObj.pageSize : paginationConfig.pageSize,
            selector: cols.map((col) => col.key).filter(Boolean).join(","),
            filter: JSON.stringify({ ...updatedSearchObj, ...extraParams }),
            ...searchParams ? { ...searchParams } : {},
        })
            .then((res) => {
                if (res?.data?.rows) {
                    setListData([...res.data.rows]);
                    setPaginationConfig({ ...paginationConfig, totalRecords: res.data?.totalCounts });
                } else if (res?.rows) {
                    // Fallback for some APIs returning rows directly? User code had res.rows check but used res.data.rows.
                    setListData([...res.rows]);
                    setPaginationConfig({ ...paginationConfig, totalRecords: res.totalCounts || res.count || 0 }); // Making generic fallback
                } else {
                    // message.error(res.message || "An error occurred."); // Commented out to avoid noise if API structure differs slightly
                }
                setLoader(false);
            })
            .catch(() => {
                setLoader(false);
                // message.error("Failed to fetch data. Please try again.");
            });
    };

    useImperativeHandle(ref, () => ({
        invokeChildFunction: getData,
    }));

    const deleteRecord = (id) => {
        setPrintLoader(true);
        Delete(`${controller}`, id)
            .then(() => {
                message.success("Record Deleted Successfully");
                getData();
            })
            .catch((err) => {
                message.error(err?.error || "Delete failed");
            }).finally(() => {
                setPrintLoader(false);
            });
    };

    const printRecord = (id) => {
        if (rowPrint) {
            rowPrint(id)
        }
    }


    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (extraParams && Object.keys(extraParams).length > 0) getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extraParams])



    return (
        <>
            <BABackdropLoader loading={printLoader} />
            <BAModal title={"Export Excel"} open={exportModal} close={setExportModal} content={<BABox className="flex justify-center gap-2">
                <BAButton onClick={() => exportToExcel(true)} label="Current Page" />
                <BAButton onClick={() => exportToExcel(false)} label="Export All Data" />
                {apiName && <BAButton onClick={() => exportToExcel(false, true)} label="Export Detailed" />}
            </BABox>} />
            <BABox className="p-2">
                <BAScreenHeader
                    title={title}
                    headerOptions={[
                        ...extraHeaders,
                        ...(customButton?.map((item) => ({
                            displayField: () => item,
                        })) || []),
                        {
                            displayField: () => isMobile ? <BAIconButton
                                type="default"
                                loading={excelLoader}
                                icon={<FileExcelOutlined />}
                                onClick={() => {
                                    setExportModal(true);
                                }}
                            /> : <BAButton
                                loading={excelLoader}
                                icon={<FileExcelOutlined />}
                                label="Export as Excel"
                                onClick={() => {
                                    setExportModal(true);
                                }}
                            />,
                            isHide: disableExport,
                        },
                        {
                            displayField: () => isMobile ? <BAIconButton
                                type="default"
                                icon={<PlusOutlined />}
                                onClick={() => addEditClick()}
                            /> : <BAButton
                                className="bg-secondary"
                                icon={<PlusOutlined />}
                                label="Add New"
                                onClick={() => addEditClick()}
                            />,
                            isHide: disableAdd,
                        },
                    ]}
                />
            </BABox>
            <BABox className="mt-2">
                <BABox className={"h-[calc(100vh-13rem)] overflow-auto"}>
                    {extraBody}
                    {loader ? (
                        <BALoader />
                    ) : (<>
                        <BABox className="hidden md:block">
                            <table className="min-w-full divide-y rounded-lg overflow-hidden divide-gray-200">
                                <thead style={{ backgroundColor: token?.colorPrimary || '#1677ff', color: 'white' }} className="bg-primary">
                                    <tr className="relative">
                                        {extraActions && extraActions.length > 0 && (
                                            <th className="sticky z-10 right-0"></th>
                                        )}
                                        <th className=""></th>
                                        {conditionalColumns && conditionalColumns.length > 0
                                            ? conditionalColumns.map((col, index) => (
                                                <th
                                                    className={`px-6 py-3 text-center text-xs font-medium text-plain border tracking-wider ${col.className ? col.className : ""
                                                        }`}
                                                    key={index}
                                                >
                                                    {col.label}
                                                </th>
                                            ))
                                            : null}
                                        {cols.map((col, index) => (
                                            <th
                                                key={index}
                                                className={classNames(`px-6 py-3 transform text-center text-xs font-medium text-plain tracking-wider relative z-0 ${col.className ? col.className : ""
                                                    }`)}
                                            >
                                                {col.label}
                                                {col.HeaderField ? col.HeaderField() : ""}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 h-full">
                                    <tr>
                                        {extraActions && extraActions.length > 0 && (
                                            <td className="sticky z-10 right-0 "></td>
                                        )}
                                        <td className="">
                                            <BABox className="text-center">
                                                {Object.entries(gridSearchObj).length > 0 && (
                                                    <BAIconButton
                                                        onClick={() => {
                                                            setGridSearchObj({});
                                                            getData(null, {});
                                                        }}
                                                        icon={<CloseOutlined />}
                                                    />
                                                )}
                                            </BABox>
                                        </td>

                                        {/* Filter Row */}
                                        {cols.map((col, index) => (
                                            <td
                                                key={index}
                                                className={classNames(`text-left p-1 text-xs font-medium text-plain tracking-wider ${col.className ? col.className : ""
                                                    }`)}
                                            >
                                                {col.type === "enum" ?
                                                    <BASelect
                                                        onChange={(e) => {
                                                            gridSearchObj[col.key] = e;
                                                            setGridSearchObj({ ...gridSearchObj });
                                                            let obj = { ...gridSearchObj }
                                                            obj[col.key] = e
                                                            getData(null, { ...obj });
                                                        }}
                                                        options={col.filterEnums}
                                                        label=""
                                                        value={gridSearchObj[col.key]}
                                                    /> : col.type === "date" ?
                                                        <>
                                                            {!col.hideFilter && <BADate onChange={(e) => {
                                                                gridSearchObj[col.key] = new Date(e).toLocaleString();
                                                                setGridSearchObj({ ...gridSearchObj });
                                                                let obj = { ...gridSearchObj }
                                                                obj[col.key] = formattedDate(new Date(e))
                                                                getData(null, { ...obj });
                                                            }} label={""} />}
                                                        </>
                                                        : <BAInput
                                                            onKeyDown={(event) => {
                                                                if (event.key === "Enter") {
                                                                    getData();
                                                                }
                                                            }}
                                                            value={gridSearchObj[col.key]}
                                                            onChange={(ev) => {
                                                                gridSearchObj[col.key] = ev.target.value;
                                                                setGridSearchObj({ ...gridSearchObj });
                                                            }}
                                                            label={""}
                                                        />}
                                            </td>
                                        ))}
                                    </tr>
                                    {listData.length > 0 ? (
                                        listData.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={"transition relative"}
                                                // style={{height:'12px'}}
                                                style={{
                                                    backgroundColor: rowIndex % 2 === 1 ? "" : "#edf0f4",
                                                }}
                                            >
                                                {extraActions && extraActions.length > 0 && (
                                                    <td className="sticky z-10 right-0 px-2 border-b">
                                                        {extraActions &&
                                                            extraActions.map(
                                                                (exAction, exIndex) => (
                                                                    <BABox key={exIndex}>
                                                                        {exAction.isHide
                                                                            ? null
                                                                            : exAction.displayField(row, getData)}
                                                                    </BABox>
                                                                )
                                                            )}
                                                    </td>
                                                )}
                                                <td className="px-1 whitespace-nowrap border-b text-sm text-gray-900 sticky right-0 z-10">
                                                    <BABox className="flex items-center">
                                                        {!disableEdit && (
                                                            <EditOutlined onClick={() => {
                                                                addEditClick(row);
                                                                if (modelGetter) modelGetter({ ...row })
                                                            }} className="text-black hover:text-[#DB052C] m-1 text-lg hover:scale-125" />
                                                        )}
                                                        {!disableDelete && (<Popconfirm
                                                            title="Delete the task"
                                                            description="Are you sure to delete this task?"
                                                            onConfirm={() => deleteRecord(row.id)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <DeleteOutlined onClick={() => {
                                                            }} className="text-black hover:text-[#DB052C] m-1 text-lg hover:scale-125" />
                                                        </Popconfirm>
                                                        )}
                                                        {allowPrint && (
                                                            <PrinterOutlined onClick={() => {
                                                                printRecord(row.id);
                                                            }} className="text-black hover:text-[#DB052C] m-1 text-lg hover:scale-125" />
                                                        )}
                                                    </BABox>
                                                </td>
                                                {cols.map((col, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        style={{ lineHeight: "0.8" }}
                                                        className={classNames(
                                                            `p-3 border-b whitespace-nowrap text-xs text-gray-900 relative ${col.className ? col.className : ""}`,
                                                        )}
                                                    >
                                                        {col.displayField ? (
                                                            col.displayField(row)
                                                        ) : col.type === "status" ? (
                                                            row[col.key] ? <CheckOutlined className="text-lg text-[#DB052C]" /> : <CloseOutlined className="text-lg text-[grey]" />
                                                        ) : col.type === "number" ? (
                                                            <BABox className="text-end">{formattedNumber(row[col.key])}</BABox>
                                                        ) : col.type === "date" ? (
                                                            <span className="text-center block" >{formattedDate(row[col.key])}</span>
                                                        ) : (
                                                            row[col.key]
                                                        )}
                                                    </td>
                                                ))}
                                                {conditionalColumns && conditionalColumns.length > 0
                                                    ? conditionalColumns.map((col, index) => (
                                                        <td
                                                            className="px-5 whitespace-nowrap text-sm text-gray-900"
                                                            key={index}
                                                        >
                                                            {col.displayField(row)}
                                                        </td>
                                                    ))
                                                    : null}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={cols.length + (conditionalColumns?.length || 0) + 1} className="text-center py-4">
                                                <BABox className="flex justify-center w-full">
                                                    <BAPera>No Data Found</BAPera>
                                                </BABox>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </BABox>
                        {/* Mobile View */}
                        <BABox className="md:hidden block">
                            <BABox className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory h-full">
                                {listData.length > 0 &&
                                    listData.map((row, rowIndex) => (
                                        <BABox
                                            key={rowIndex}
                                            className="snap-start shrink-0 w-[300px] h-[450px] p-2 box-border overflow-y-auto"
                                        >
                                            <BABox className="border-light rounded-lg shadow h-full w-full box-border overflow-y-auto flex flex-col justify-between">
                                                <BABox className="p-2">
                                                    {cols.map((col, colIndex) => (
                                                        <BABox key={colIndex} className="mb-4">
                                                            <BAPera className="font-semibold text-gray-500">{col.label}</BAPera>
                                                            <BAPera className="text-xl">
                                                                {col.displayField ? (
                                                                    col.displayField(row)
                                                                ) : col.type === "status" ? (
                                                                    row[col.key] ? (
                                                                        <CheckOutlined className="text-lg text-[#DB052C]" />
                                                                    ) : (
                                                                        <CloseOutlined className="text-lg text-[grey]" />
                                                                    )
                                                                ) : col.type === "number" ? (
                                                                    <BABox>
                                                                        {formattedNumber(row[col.key])}
                                                                    </BABox>
                                                                ) : col.type === "link" ? (
                                                                    <span
                                                                        className="textPrimary block font-semibold cursor-pointer"
                                                                        onClick={() => printRecord(row.id)}
                                                                    >
                                                                        {row[col.key]}
                                                                    </span>
                                                                ) : col.type === "date" ? (
                                                                    <span className="block">
                                                                        {formattedDate(row[col.key])}
                                                                    </span>
                                                                ) : (
                                                                    row[col.key] || "--"
                                                                )}
                                                            </BAPera>
                                                        </BABox>
                                                    ))}
                                                </BABox>
                                                <BABox className="bg-gray-100 flex items-center justify-end p-2 rounded-b-lg mt-4">
                                                    {extraActions &&
                                                        extraActions.map(
                                                            (exAction, exIndex) => (
                                                                <BABox key={exIndex}>
                                                                    {exAction.isHide
                                                                        ? null
                                                                        : exAction.displayField(row, getData)}
                                                                </BABox>
                                                            )
                                                        )}
                                                    <BABox className="flex items-center">
                                                        {!disableEdit && (
                                                            <EditOutlined onClick={() => {
                                                                addEditClick(row);
                                                                if (modelGetter) modelGetter({ ...row })
                                                            }} className="text-black hover:text-[#DB052C] m-1 text-lg hover:scale-125" />

                                                        )}
                                                        {!disableDelete && (<Popconfirm
                                                            title="Delete the task"
                                                            description="Are you sure to delete this task?"
                                                            onConfirm={() => deleteRecord(row.id)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <DeleteOutlined onClick={() => {
                                                            }} className="text-black hover:text-[#DB052C] m-1 text-lg hover:scale-125" />
                                                        </Popconfirm>
                                                        )}
                                                    </BABox>
                                                </BABox>
                                            </BABox>
                                        </BABox>
                                    ))}
                            </BABox>

                        </BABox>
                    </>
                    )}
                </BABox>
                <BAPagination
                    totalRecords={paginationConfig.totalRecords}
                    onPageChange={(page, pageSize) => {
                        getData({
                            page: page,
                            pageSize: pageSize,
                        });
                    }}
                />
            </BABox>
        </>
    );
});

export default BASetupGrid;
