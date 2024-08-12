import React, {useEffect, useState} from "react";
import MonacoEditor  from "react-monaco-editor"
import beautify from "js-beautify";

/**
 * React monaco文本编辑器
 */
const ReactMonacoEditor = (props) =>{
    const {value,editorChange,language,readOnly,width,height,editorDidMount} = props

    const [editorValue, setEditorValue] = useState(value);

    const options = {
        selectOnLineNumbers: true,
        minimap: { enabled: false },
        automaticLayout: true,
        autoClosingBrackets: 'always',
        codeLens: true,
        wordWrap: 'on',
        colorDecorators: true,
        contextmenu: false,
        readOnly: readOnly,
        formatOnPaste: true,
        formatOnType: true,
        folding: true,
        overviewRulerBorder: false,
        scrollBeyondLastLine: true,
        theme: 'vs',
        fontSize: 12,
        tabSize: 4,
    };

    const beautifyCode = async (code) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(beautify(code, {
                    indent_size: 2,
                    space_in_empty_paren: true,
                }));
            }, 0);
        });
    };

    useEffect(() => {
        const formatCode = async () => {
            const beautified = await beautifyCode(value);
            setEditorValue(beautified);
        };
        formatCode();
    }, [value]);

    const handleEditorBlur = (editor, event) => {
        const currentValue = editor.getValue();
        editorChange(currentValue);
    };

    return (
        <MonacoEditor
            width={width}
            height={height}
            language={language}
            theme="vs"
            onBlur={handleEditorBlur}
            value={editorValue}
            options={options}
            onChange={editorChange}
            editorDidMount={editorDidMount}
        />
    );
}

export default ReactMonacoEditor;