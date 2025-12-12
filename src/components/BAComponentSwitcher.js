
import React from 'react';
import BAButton from './BAButton';
import BABox from './BABox';
import BAPera from './BAPera';
// The following imports are placeholders as the files do not exist yet in this context
// import BAInput from './BAInput';
// import BASearchLookup from './BASearchLookup';
// import BASelect from './BASelect';
// import BASwitch from './BASwitch';
// import BADate from './BADate';
// import BAFieldset from './BAFieldset';
// import BADragDropFile from './BADragDropFile';
// import BATextarea from './BATextarea';
// import BAImagePicker from './BAImagePicker';
// import BACheckbox from './BACheckbox';
// import BARadio from './BARadio';

// Placeholder components to prevent build break until actual components are created
const BAInput = (props) => <div>INPUT PLACEHOLDER</div>;
const BASearchLookup = (props) => <div>LOOKUP PLACEHOLDER</div>;
const BASelect = (props) => <div>SELECT PLACEHOLDER</div>;
const BASwitch = (props) => <div>SWITCH PLACEHOLDER</div>;
const BADate = (props) => <div>DATE PLACEHOLDER</div>;
const BAFieldset = (props) => <div>FIELDSET PLACEHOLDER</div>;
const BADragDropFile = (props) => <div>DRAGFILE PLACEHOLDER</div>;
const BATextarea = (props) => <div>TEXTAREA PLACEHOLDER</div>;
const BAImagePicker = (props) => <div>IMAGE PICKER PLACEHOLDER</div>;
const BACheckbox = (props) => <div>CHECKBOX PLACEHOLDER</div>;
const BARadio = (props) => <div>RADIO PLACEHOLDER</div>;


export default function BAComponentSwitcher({
    model,
    setModel,
    element,
    disabledForm,
    rowChangeEv,
    rowIndex,
    apiFunctions
}) {

    const fillModel = (key, val) => {
        if (!setModel) return;
        setModel({ ...model, [key]: val });
    };

    const handleLookupBlur = (val, currentVal, reqFields) => {
        // checks if entered value doesn't match current linked value
        // clears all related fields to prevent stale data
        if (val !== currentVal) {
            // Logic to clear reqFields in model
            // const newModel = {...model};
            // reqFields.forEach(f => newModel[f] = "");
            // setModel(newModel);
        }
    };

    const handleMultiSelect = (selectedRows, fieldAlias, reqFields, arrKey) => {
        // Takes selected rows from a multi-select lookup
        // applies field remapping (fieldAlias)
        // filters required fields (reqFields)
        // updates an array key (arrKey) in the main model state
    };

    const uploadFile = (file) => {
        // Simple utility to set the value of a file input field in the model state
    };


    switch (element.elementType) {
        case 'input':
            return <BAInput
                value={model?.[element.id]}
                onChange={(e) => fillModel(element.id, e.target.value)}
                {...element}
                disabled={disabledForm || element.disabled}
            />;
        case 'textarea':
            return <BATextarea
                value={model?.[element.id]}
                onChange={(e) => fillModel(element.id, e.target.value)}
                {...element}
                disabled={disabledForm || element.disabled}
            />;
        case 'button':
            return <BAButton {...element}>{element.label}</BAButton>;
        case 'select':
            return <BASelect
                value={model?.[element.id]}
                onChange={(val) => fillModel(element.id, val)}
                {...element}
                disabled={disabledForm || element.disabled}
            />;
        case 'lookup':
            return <BASearchLookup
                value={model?.[element.id]}
                {...element}
                apiFunctions={apiFunctions}
            // handlers would be passed here
            />;
        case 'datepicker':
            return <BADate
                value={model?.[element.id]}
                onChange={(val) => fillModel(element.id, val)}
                {...element}
            />;
        case 'boolean':
            return <BASwitch
                checked={model?.[element.id]}
                onChange={(val) => fillModel(element.id, val)}
                {...element}
            />;
        case 'checkbox':
            return <BACheckbox
                checked={model?.[element.id]}
                onChange={(val) => fillModel(element.id, val)}
                {...element}
            />;
        case 'radio':
            return <BARadio
                value={model?.[element.id]}
                onChange={(val) => fillModel(element.id, val)}
                {...element}
            />;
        case 'imageupload':
            return <BAImagePicker
                value={model?.[element.id]}
                onChange={(file) => uploadFile(file)}
                {...element}
            />;
        case 'dragfile':
            return <BADragDropFile
                onChange={(files) => uploadFile(files)}
                {...element}
            />;
        case 'heading':
            return (
                <BABox className={element.className}>
                    <BAPera className="font-bold text-xl">{element.label}</BAPera>
                </BABox>
            );
        case 'text':
            return (
                <BABox className={element.className}>
                    <BAPera>
                        {element.label}: {model?.[element.id]}
                    </BAPera>
                </BABox>
            );
        case 'custombody':
            return (
                <BABox>
                    {element.body}
                </BABox>
            );
        default:
            return null;
    }
}
