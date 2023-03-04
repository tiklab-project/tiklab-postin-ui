
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";

/**
 * 快捷测试
 * 后置
 */
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