
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../../../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";
import afterParamTestStore from "../store/AfterParamTestStore";
/**
 * 测试页
 * 后置脚本
 */
const TestAfterParam = (props) => {
    const {getAfterInfo,setAfterInfo} = afterParamTestStore;

    const [form] = Form.useForm();
    useEffect(()=>{
        setAfterInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res,

            })
        })
    },[])

    return (
        <ScriptCommon
            updateFn={getAfterInfo}
            form={form}
        />
    )
}

export default observer(TestAfterParam);
