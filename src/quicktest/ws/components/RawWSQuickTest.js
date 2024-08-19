import React from "react";
import ReactMonacoEditor from "../../../common/monacoEditor/MonacoEditor";
import tabQuickTestStore from "../../store/TabQuickTestStore";


const RawWSQuickTest = (props) =>{
    const {updateRawInfo,rawInfo} = tabQuickTestStore;

    const editChange = (value) =>{
        let param = {
            raw:value,
            type:"text"
        }
        updateRawInfo(param)
    }

    return(
        <div style={{
            border:"1px solid var(--pi-border-color)",
            margin:"5px 0 0 0"
        }}>
            <ReactMonacoEditor
                editorChange={editChange}
                language={"raw"}
                height={"200px"}
                width={"100%"}
                value={rawInfo.raw}
            />
        </div>
    )
}

export default RawWSQuickTest;