import React, {useEffect, useState} from "react";
import {UnControlled as ReactCodeMirror} from "react-codemirror2";
import {Space, Tag} from "antd";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";

/**
 * 文档中raw
 */
const RawDoc = (props) =>{
    const {dataSource} = props;

    /**
     * 根据Type，获取monaco-editor响应的language
     */
    const getLanguageFromMIME = (mime) => {
        if(!mime) return 'plaintext'

        let mimeObj = {
            "html":"html",
            "javascript":"javascript",
            "json":"json",
            "text":"plaintext"
        }

        //如果包含某个key，就会返回对应的key
        const matchingMime = Object.keys(mimeObj).find((key) => mime.includes(key));

        //通过key获取相应的language
        if (matchingMime) {
            return mimeObj[matchingMime];
        } else {
            return 'plaintext';
        }
    }


    return(
        <>
            {
                dataSource&&dataSource.raw
                    ? <div className={"share-request-item"}>
                        <Space><div>Body参数</div><Tag>RAW</Tag></Space>
                        <div className={"share-right-table"} style={{border:"1px solid var(--pi-border-color)",width:"99%"}}>
                            <ReactMonacoEditor
                                value={dataSource.raw}
                                language={getLanguageFromMIME(dataSource.type)}
                                readOnly={true}
                                height={"200px"}
                                width={"100%"}
                            />
                        </div>
                    </div>
                :null
            }

        </>
    )
}
export default RawDoc;