
import React, { useRef} from 'react';
import { Form } from 'antd';
import CodeMirror from "../../CodeMirror";

/**
 * 前置后置 脚本公共组件
 */
const ScriptCommon = (props) => {
    const {form,updateFn}  = props;

    //获取当前文本数据
    const ediTextRef = useRef(null);


    /**
     *  失去焦点，获取更改raw中类型执行
     */
    const blurFn = ()=>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        // let param = {scriptex:text }
        // console.log(param)
        //本地获取值
        updateFn(text)
    }


    return (
        <div className={"api-script-box"}>
            <div className={"api-script-pre-header"}> </div>
            <Form form={form} >
                <Form.Item  name='scriptex'>
                    <CodeMirror
                        mediaType={"application/javascript"}
                        blurFn={blurFn}
                        ediTextRef={ediTextRef}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export default ScriptCommon;