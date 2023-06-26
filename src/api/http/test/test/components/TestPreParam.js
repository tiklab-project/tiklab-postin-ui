
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../../../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";
import preParamTestStore from "../store/PreParamTestStore";
/**
 * 测试页
 * 前置脚本
 */
const TestPreParam = (props) => {
    const { getPreInfo,setPreInfo } = preParamTestStore;

    const [form] = Form.useForm();

    useEffect(()=>{
        setPreInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res,

            })
        })
    },[])

    return (
        <ScriptCommon
            updateFn={getPreInfo}
            form={form}
        />
    )

}

export default observer(TestPreParam);
