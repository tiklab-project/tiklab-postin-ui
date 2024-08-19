/*
 * @Description: 接口定义 后置脚本
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:42:56
 */

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {Button, Form} from 'antd';
import rawParamStore from "../../../api/store/RawParamStore";
import ReactMonacoEditor from "../../../../common/monacoEditor/MonacoEditor";

const RawParamWS = (props) => {
    const {
        updateRawParam,
        findRawParam,
    } = rawParamStore;


    const [showBtn, setShowBtn] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [editValue, setEditValue] = useState();
    const [form] = Form.useForm();
    const  apiId =localStorage.getItem('apiId');

    useEffect( ()=>{
        findRawParam(apiId).then((res)=>{
            if(res){
                setDataSource(res)
                form.setFieldsValue({raw: res.raw})
            }
        })
    },[apiId])

    /**
     * 提交数据
     * @param {*} values
     */
    const onFinish = async () => {
        if(dataSource){
            let param = {
                ...dataSource,
                raw:editValue
            }
            await updateRawParam(param)
        }

        setShowBtn(false)
        setEditValue(null)
    }

    const editChange = (value) =>{
        setEditValue(value)
        setShowBtn(true)
    }

    return (
        <div className={"raw-box"}>
            <div className={"raw-box-header"}> </div>
            <div >
                <div style={{border:"1px solid var(--pi-border-color)"}}>
                    <ReactMonacoEditor
                        editorChange={editChange}
                        value={dataSource?.raw}
                        language={"text"}
                        height={"200px"}
                        width={"100%"}
                    />
                </div>
                <div className={` ${showBtn?"pi-show":"pi-hide"}`}>
                    <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                    <Button onClick={onFinish} className={"important-btn"} type="primary"> 保存</Button>
                </div>
            </div>
        </div>
    )
}

export default observer(RawParamWS);
