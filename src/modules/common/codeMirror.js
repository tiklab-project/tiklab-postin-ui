import React from "react";
import {UnControlled as ReactCodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import "codemirror/theme/idea.css"
// 高亮行功能
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/selection-pointer';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/xml-hint';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/textile/textile';
import 'codemirror/mode/xml/xml';

// import 'codemirror/addon/display/fullscreen.css';
// import 'codemirror/addon/display/fullscreen.js';

const CodeMirror = (props) => {
    const { value,mediaType,blurFn,ediTextRef} = props;


    console.log(mediaType)

    const onBlur = ()=>{
        if(!blurFn) return
        blurFn()
    }

    return (
        <div>
            <ReactCodeMirror
                ref={ediTextRef}
                value={value}
                options={{
                    mode:mediaType,
                    theme: 'idea',
                    lineWiseCopyCut: true,
                    // autofocus: {autofocus}, //自动获取焦点
                    styleActiveLine: true, //光标代码高亮
                    lineNumbers: true, //显示行号
                    smartIndent: true, //自动缩进
                    lineWrapping: true,
                    foldGutter: true,
                    matchBrackets: true,
                    // readOnly:{readOnly},
                    indentUnit:4,
                    // fullScreen: true,//全屏
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
                }}
                // 设置尺寸
                // editorDidMount={(editor) => {
                //     editor.setSize('auto', 'auto');
                // }}
                onBeforeChange={(editor, data, value) => {}}

                onBlur={onBlur}
            />
        </div>

    );
};

export default CodeMirror;



