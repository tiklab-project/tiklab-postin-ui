import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import beautify from "js-beautify";
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

/**
 * monaco文本框
 */
const MonacoEditor = (props) =>{
    const { value, editorChange, language, readOnly, width, height } = props;
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    const options = {
        value: value,
        language: language,
        selectOnLineNumbers: true,
        minimap: { enabled: false },
        automaticLayout: true,
        autoClosingBrackets: "always",
        codeLens: true,
        wordWrap: "on",
        colorDecorators: true,
        contextmenu: false,
        readOnly: readOnly,
        formatOnPaste: true,
        formatOnType: true,
        folding: true,
        overviewRulerBorder: false,
        scrollBeyondLastLine: true,
        theme: "vs",
        fontSize: 12,
        tabSize: 4,
    };

    const beautifyCode = async (code) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    beautify(code, {
                        indent_size: 2,
                        space_in_empty_paren: true,
                    })
                );
            }, 0);
        });
    };

    useEffect(() => {
        // 初始化 Monaco Editor
        if (editorRef.current) {
            monacoRef.current = monaco.editor.create(editorRef.current, options);

            // 当编辑器失去焦点时，触发 change 事件
            monacoRef.current.onDidBlurEditorText(() => {
                const currentValue = monacoRef.current.getValue();
                editorChange(currentValue);
            });
        }

        return () => {
            if (monacoRef.current) {
                monacoRef.current.dispose();  // 清理 Monaco Editor 实例
            }
        };
    }, [language]);

    useEffect(() => {
        const formatCode = async () => {
            const beautified = await beautifyCode(value);
            if (monacoRef.current) {
                monacoRef.current.setValue(beautified);
            }
        };
        formatCode();
    }, [value]);

    return (
        <div
            ref={editorRef}
            style={{ width: width || "100%", height: height || "500px" }}
        />
    );
};

export default MonacoEditor