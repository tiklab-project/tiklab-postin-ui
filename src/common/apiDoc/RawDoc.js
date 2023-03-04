import React from "react";
import {UnControlled as ReactCodeMirror} from "react-codemirror2";
import {Space, Tag} from "antd";

/**
 * 文档中raw
 */
const RawDoc = (props) =>{
    const {dataSource} = props;


    const precessData = (data) =>{
        let isJson ;
        try {
            isJson=JSON.parse(data)
        }catch {
            isJson=data
        }
        switch (typeof isJson) {
            case "object":
                return JSON.stringify(isJson,null,4)
            case "string":
                return data
        }
    }


    return(
        <>
            {
                dataSource&&dataSource.raw
                    ? <div className={"share-request-item"}>
                        <Space><div>Body参数</div><Tag>{dataSource.type}</Tag></Space>
                        <div className={"share-right-table"} style={{border:"1px solid var(--pi-border-color)"}}>
                                <ReactCodeMirror
                                    value={precessData(dataSource.raw)}
                                    options={{
                                        mode:dataSource.type,
                                        theme: 'idea',
                                        lineWiseCopyCut: true,
                                        autofocus: false, //自动获取焦点
                                        styleActiveLine: true, //光标代码高亮
                                        lineNumbers: true, //显示行号
                                        smartIndent: true, //自动缩进
                                        lineWrapping: true,
                                        foldGutter: true,
                                        matchBrackets: true,

                                        readOnly:true,
                                        indentUnit:4,
                                        // fullScreen: true,//全屏
                                        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
                                    }}
                                    // 设置尺寸
                                    editorDidMount={(editor) => {
                                        // debugger
                                        editor.setSize('auto', 'auto');
                                    }}
                                    onBeforeChange={(editor, data, value) => {}}
                                />
                        </div>
                    </div>
                :null
            }

        </>
    )
}
export default RawDoc;