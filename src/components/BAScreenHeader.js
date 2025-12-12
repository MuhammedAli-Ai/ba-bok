import React from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons";
import BABox from "./BABox";
import BAIconButton from "./BAIconButton";
import BAPera from "./BAPera";
import { goBack } from "./config/helpers";

export default function BAScreenHeader(props) {
    const { title, headerOptions, disableBack, extraTitle } = props;

    return (
        <BABox className="py-2 border-bottom border-b-2 border-[#1B4394] flex justify-between items-center" style={{ borderBottom: '2px solid #1B4394', paddingBottom: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BABox className="flex items-center md:pb-0" style={{ display: 'flex', alignItems: 'center' }}>
                {!disableBack && <BAIconButton onClick={goBack} icon={<ArrowLeftOutlined />} />}
                <BAPera className="md:text-3xl text-xl ms-2" sx={{ marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>{title} {extraTitle}</BAPera>
            </BABox>
            <BABox className="flex justify-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {headerOptions?.map((option, index) => {
                    return option.isHide ? null : <BABox key={index} className="md:ml-2 ml-1" style={{ marginLeft: '0.5rem' }}>{option.displayField()}</BABox>
                })}
            </BABox>
        </BABox>
    );
}
