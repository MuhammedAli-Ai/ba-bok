"use client";

import { Input, message, Typography, Grid } from "antd";
import { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import BAModal from "./BAModal";
import BAGrid from "./BAGrid";
import BAPagination from "./BAPagination";
import BAButton from "./BAButton";
import BABox from "./BABox";
// import createApiFunction from "./config/apimethods"; // Keeping this if needed, but props.apiFunctions is used

const { useBreakpoint } = Grid;

export default function BASearchLookup(props) {
    const screens = useBreakpoint();
    const isMobile = !screens.md; // md = 768px breakpoint

    const {
        label,
        placeholder,
        disabled,
        required,
        className,
        onChange,
        value,
        type,
        controller,
        config,
        displayField,
        onRowClick,
        onBlur,
        allowMultiple,
        onSelectMultiple,
        fillObj,
        onCancel,
        apiFunctions,
    } = props;

    // Safety check for apiFunctions
    const Get = apiFunctions?.Get || (() => Promise.reject({ error: "API Functions not provided" }));
    const { Title } = Typography;

    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [paginationConfig, setPaginationConfig] = useState({
        pageSize: 10,
        page: 1,
        totalRecords: 0,
    });
    const [inpValue, setInpValue] = useState(value);

    const getData = (pgObj, SearchObj) => {
        setLoading(true);

        const updatedSearchObj = Object.fromEntries(
            Object.entries(SearchObj || {}).filter(([_, value]) => value)
        );

        Get(`lookup/${controller}`, null, {
            page: pgObj?.page || paginationConfig.page,
            limit: pgObj?.pageSize || paginationConfig.pageSize,
            selector: config.map((col) => col.key).filter(Boolean).join(","),
            search: updatedSearchObj,
            filter: JSON.stringify({ ...SearchObj })
        })
            .then((res) => {
                if (res?.items) {
                    setListData([...res.items]);
                    setPaginationConfig({ ...paginationConfig, totalRecords: res.meta?.totalItems });
                    setLoading(false);
                } else {
                    message.error(res.message || "An error occurred.");
                    setLoading(false);
                }
            }).catch((err) => {
                setLoading(false);
                // message.error(err.error || "Error fetching data"); // Optional: uncomment if needed
                console.error("Lookup Get Error:", err);
            });
    };

    const handleOpen = () => {
        setOpenModal(true);
        getData();
    };

    const handleCancel = () => {
        onChange(null, null, {});
        setInpValue("");
        if (onCancel) onCancel();
    }

    const onInputChange = (e) => {
        setInpValue(e.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleOpen();
        }
    };
    const onOK = () => setOpenModal(false);

    const pageChange = async (page, pageSize) => {
        // paginationConfig.pageSize = pageSize; // Don't mutate state directly
        // paginationConfig.page = page;
        const newConfig = { ...paginationConfig, page, pageSize };
        setPaginationConfig(newConfig);
        getData({ ...newConfig, page, pageSize });
    };

    const setSelectedRows = () => {
        const selectedRows = listData.filter((el) => el.isSelected);
        if (onSelectMultiple) onSelectMultiple(selectedRows);
        onOK();
    };

    useEffect(() => {
        if (fillObj && value) {
            setInpValue(fillObj[displayField]);
        } else if (!value) {
            setInpValue(""); // Ensure it clears if value is cleared externally
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fillObj, value, displayField]);

    return (
        <>
            <BAModal
                title={label ? label : "Search Lookup"}
                open={openModal}
                handleOK={onOK}
                close={setOpenModal}
                width={isMobile ? "95%" : "70%"}
                content={
                    <>
                        <BAGrid
                            closeModal={onOK}
                            displayField={displayField}
                            onChange={onChange}
                            datasourse={listData}
                            cols={config}
                            loading={loading}
                            onRowClick={(i, data) => {
                                if (!allowMultiple) {
                                    onRowClick && onRowClick(i, data, listData);
                                    onChange(null, data[displayField], data); // Standardize onChange? User prompt showed `onChange(e, value, record)` or similar usage.
                                    // The prompt says "onChange(e, value, record) => void".
                                    // Here we are calling onChange(null, displayValue, dataRecord).
                                    setInpValue(data[displayField]);
                                    onOK();
                                } else {
                                    // For multiple, usually BAGrid handles selection state updates internally or via setDataSource
                                    // This part depends on BAGrid implementation of selection which isn't fully detailed in previous prompt but assumed standard.
                                }
                            }}
                            allowMultiple={allowMultiple}
                            setDataSource={setListData} // Assuming BAGrid updates the listData state for selection
                            allowSearch
                            handleSearch={getData}
                        />
                        <BAPagination
                            pageSize={paginationConfig.pageSize}
                            totalRecords={paginationConfig.totalRecords}
                            onPageChange={pageChange}
                            multiSelect={allowMultiple}
                            onOk={() => (allowMultiple ? setSelectedRows() : {})}
                        />
                    </>
                }
            />
            {type === "button" ? (
                <BAButton label={label} disabled={disabled} onClick={handleOpen} />
            ) : (
                <BABox className={`${className}`}>
                    {label && <Title level={5}>{label}<span className="text-red-500 text-lg ml-1">{required && "*"}</span></Title>}
                    <BABox>
                        <Input
                            value={inpValue}
                            placeholder={placeholder}
                            disabled={disabled}
                            // required={required} // Removed standard required attr to avoid browser validation if using custom
                            suffix={
                                <>
                                    {value ? (
                                        <CloseOutlined
                                            style={{ cursor: disabled ? 'not-allowed' : 'pointer', color: disabled ? '#ccc' : undefined }}
                                            onClick={() => disabled ? {} : handleCancel()}
                                        />
                                    ) : (
                                        <SearchOutlined
                                            style={{ cursor: disabled ? 'not-allowed' : 'pointer', color: disabled ? '#ccc' : undefined }}
                                            onClick={() => disabled ? {} : handleOpen()}
                                        />
                                    )}
                                </>
                            }
                            className={className}
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            onBlur={(e) => {
                                if (value === "" || value === null || value === undefined) {
                                    // If cleared manually? 
                                    // The logic `if (value === "")` in original code suggests checking if the PROP value is empty?
                                    // No, usually it checks input value.
                                    // I'll stick close to original:
                                    // if (value === "") { onChange(e, "", {}); } 
                                }
                                if (onBlur) {
                                    onBlur(e);
                                }
                            }}
                        />
                    </BABox>
                </BABox>
            )}
        </>
    );
}
