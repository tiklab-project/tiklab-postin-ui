
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";

/**
 * 快捷测试
 * 后置
 */
const AfterQuickTest = (props) => {
    const {tabQuickTestStore}  = props;
    const {updateAfterScript,setAfterScript} = tabQuickTestStore;

    const [form] = Form.useForm();

    useEffect(()=>{
        setAfterScript().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res.scriptex,
            })
        })
    },[])

    return (
        <ScriptCommon
            updateFn={updateAfterScript}
            form={form}
        />
    )
}

export default inject('tabQuickTestStore')(observer(AfterQuickTest));