import React from "react";
import EdiText from "react-editext";

const EdiTextToggle = (props)=>{
    let  {value,tabIndex,save} = props


    return(
        <EdiText
            value={value}
            tabIndex={tabIndex}
            onSave={save}
            startEditingOnFocus
            submitOnUnfocus
            showButtonsOnHover
            viewProps={{ className: 'edit-api-name' }}
            editButtonClassName="ediText-edit"
            saveButtonClassName="ediText-save"
            cancelButtonClassName="ediText-cancel"
            editButtonContent={
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-bianji1`} />
                </svg>
            }
            hideIcons
        />
    )
}

export default EdiTextToggle