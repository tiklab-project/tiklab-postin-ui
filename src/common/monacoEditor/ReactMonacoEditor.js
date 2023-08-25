import React from "react";
import MonacoEditor  from "react-monaco-editor"
import beautify from "js-beautify";

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
        formatOnType: true,
        folding: true, // 是否启用代码折叠
        overviewRulerBorder: false, // 滚动条的边框
        scrollBeyondLastLine: true,
        theme: 'vs', // 主题
        fontSize: 13, // 字体
        tabSize: 4, // tab缩进长度，
    };

    let beautifyCode = (code) => beautify(code, {
        indent_size: 2,//缩进两个空格
        space_in_empty_paren: true,
    });

    const editorDidMount = (editor, monaco) => {
        // editor.focus();
    };



    const handleEditorBlur = (editor, event) => {
        // 获取 Monaco 编辑器中的值
        const value = editor.getValue();

        editorChange(value)
    }


    return(
        <MonacoEditor
            width={width}
            height={height}
            language={language}
            theme="vs"
            onBlur={handleEditorBlur}
            value={beautifyCode(value)}
            options={options}
            onChange={editorChange}
            editorDidMount={editorDidMount}
        />
    )
}

export default ReactMonacoEditor;