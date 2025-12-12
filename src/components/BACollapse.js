import React, { useState } from "react";
import BABox from "./BABox";
import BAPera from "./BAPera";
import {
    RightOutlined,
    DownOutlined
} from "@ant-design/icons";

export default function BACollapse(props) {
    const { label, children, icon, expand, labelClick } = props;
    const [open, setOpen] = useState(expand);
    const handleOpen = () => {
        setOpen(!open);
        if (labelClick) {
            labelClick();
        }
    };
    return (
        <BABox className="mb-2 border " style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '4px' }}>
            <BAPera
                onClick={handleOpen}
                className={`p-2 text-drawer font-semibold text-lg border-b hover:bg-[rgba(0,0,0,.1)] border-b-[drawer] cursor-pointer flex justify-between items-center`}
                style={{
                    padding: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: open ? '1px solid rgba(0,0,0,0.1)' : 'none',
                    backgroundColor: 'rgba(255,255,255,0.5)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {icon && <span className="me-3 inline-block" style={{ marginRight: '0.75rem', display: 'inline-block' }}>{icon}</span>}
                    {label}
                </div>
                <span style={{ fontSize: "0.8rem" }}>{open ? <DownOutlined /> : <RightOutlined />}</span>
            </BAPera>
            {open && <BABox className="p-2" style={{ padding: '0.75rem' }}>
                {children}
            </BABox>}
        </BABox>
    );
}
