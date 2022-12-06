import React, {useEffect, useRef} from "react";
import * as monaco from "monaco-editor";

const MonacoEditor = (props) =>{
    const {
        language="json",
        setEditorValue
    } = props;


    let monacoEditor;
    const monacoEditorDomRef = useRef(null);


    useEffect(() => {
        init ();
    }, []);

    const init  = () => {
        if(monacoEditorDomRef.current){
            monacoEditor = monaco.editor.create(monacoEditorDomRef.current, {
                value: props.value,
                language: language,
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                folding: true, // 是否启用代码折叠
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
                fontSize: 13, // 字体
                tabSize: 4, // tab缩进长度
                width:"100%",
                height:"400px"
            });

            monacoEditor.getAction("editor.action.formatDocument").run();//自动格式化代码//自动格式化代码

            monacoEditor.setValue( monacoEditor.getValue())
        }


        return () => {
            monacoEditor.dispose()
        }
    }



    // monacoEditor.onDidChangeModelContent(() => {
    //     let newValue = monacoEditor.getValue();
    //     console.log(newValue)
    //     setEditorValue(newValue)
    // });



    return(
        <>
            <div style={{minWidth:860,height:400}} ref={monacoEditorDomRef}/>
        </>
    )
}

export default MonacoEditor