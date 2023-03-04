import React from "react";
import MonacoEditor  from "react-monaco-editor"

/**
 * React monaco文本编辑器
 */
const ReactMonacoEditor = (props) =>{
    const {value,editorChange,language,readOnly,width,height} = props

    const options = {
        selectOnLineNumbers: true,
        minimap: { enabled: false }, // 小地图
        automaticLayout: true, // 自动布局,
        autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        codeLens: true,
        wordWrap: 'on', // 启用自动换行
        colorDecorators: true,
        contextmenu: false,
        readOnly: readOnly, //是否只读
        formatOnPaste: true,
        folding: true, // 是否启用代码折叠
        overviewRulerBorder: false, // 滚动条的边框
        scrollBeyondLastLine: true,
        theme: 'vs', // 主题
        fontSize: 13, // 字体
        tabSize: 4, // tab缩进长度
    };

    const editorDidMount = (editor, monaco) => {
        console.log('Editor did mount', editor);
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true, // 启用 JSON Schema 校验
            // schemas: [{
            //     uri: 'mySchema', // 指定 JSON Schema 的唯一标识符
            //     fileMatch: ['*'], // 指定文件匹配规则，表示所有文件都需要使用此 JSON Schema
            //     schema, // 指定 JSON Schema
            // }],
        });


        editor.getAction('editor.action.formatDocument').run();
        editor.focus();
    };


    const handleEditorBlur = (editor, event) => {
        // 获取 Monaco 编辑器中的值
        const value = editor.getValue();

        // 在这里处理获取到的值
        console.log(value);

        editorChange(value)
    }


    return(
        <MonacoEditor
            width={width}
            height={height}
            language={language}
            theme="vs"
            onBlur={handleEditorBlur}
            value={value}
            options={options}
            onChange={editorChange}
            editorDidMount={editorDidMount}
        />
    )
}

export default ReactMonacoEditor;