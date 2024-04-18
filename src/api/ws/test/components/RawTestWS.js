import React, {useEffect, useState} from "react";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";
import wsStore from "../../ws/store/WSStore";
import {observer} from "mobx-react";

const RawTestWS = (props) =>{
    const {type} = props;

    const {messageData,setMessage} = wsStore

    const editChange = (value) =>{
        setMessage(value)
    }

    return(
        <div className={"ws-raw-box"}>
            <ReactMonacoEditor
                editorChange={editChange}
                value={messageData}
                language={type}
                height={"200px"}
                width={"100%"}
            />
        </div>
    )
}

export default observer(RawTestWS);