
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import ScriptCommon from "../../../../../common/tableCommon/components/ScriptCommon";
import {Form} from "antd";

/**
 * 测试页
 * 后置脚本
 */
const TestAfterParam = (props) => {
    const {afterParamTestStore}  = props;
    const {getAfterInfo,setAfterInfo} = afterParamTestStore;

    const [form] = Form.useForm();
    useEffect(()=>{
        setAfterInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                scriptex: res.scriptex,

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

export default inject('afterParamTestStore')(observer(TestAfterParam));
