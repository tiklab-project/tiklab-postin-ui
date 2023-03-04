import React from "react";
import EdiText from "react-editext";

/**
 * 单个字段可编辑文本
 */
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
            viewProps={{ className: 'edit-api-title' }}
            editButtonClassName="ediText-edit"
            saveButtonClassName="ediText-btn"
            cancelButtonClassName="ediText-btn"
            editButtonContent={
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-bianji1`} />
                </svg>
            }
            saveButtonContent={
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-btn_confirm`} />
                </svg>
            }
            cancelButtonContent={
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-shanchu2`} />
                </svg>
            }
            // hideIcons
        />
    )
}

export default EdiTextToggle