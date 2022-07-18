
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/scriptCommon";
import {Form} from "antd";

const PreQuickTest = (props) => {
    const { preScriptQuickTestStore }  = props;
    const { getPreInfo,setPreInfo } = preScriptQuickTestStore;

    const [form] = Form.useForm();

    let instanceId=localStorage.getItem("instanceId")

    useEffect(()=>{
        setPreInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res.scriptex,

            })
        })
    },[instanceId])

    return (
        <ScriptCommon
            updateFn={getPreInfo}
            form={form}
        />
    )

}

export default  inject('preScriptQuickTestStore')(observer(PreQuickTest));