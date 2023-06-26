
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试
 * 前置脚本
 */
const PreQuickTest = (props) => {
    const { updatePreScript,setPreScript } = tabQuickTestStore;

    const [form] = Form.useForm();

    useEffect(()=>{
        setPreScript().then(res=>{
            if(!res) return
            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[])

    return (
        <ScriptCommon
            updateFn={updatePreScript}
            form={form}
        />
    )

}

export default observer(PreQuickTest);