
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/scriptCommon";
import {Form} from "antd";

const AfterQuickTest = (props) => {
    const {afterScriptQuickTestStore}  = props;
    const {getAfterInfo,setAfterInfo} = afterScriptQuickTestStore;

    const [form] = Form.useForm();

    let instanceId=localStorage.getItem("instanceId")

    useEffect(()=>{
        setAfterInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res.scriptex,

            })
        })
    },[instanceId])

    return (
        <ScriptCommon
            updateFn={getAfterInfo}
            form={form}
        />
    )
}

export default inject('afterScriptQuickTestStore')(observer(AfterQuickTest));