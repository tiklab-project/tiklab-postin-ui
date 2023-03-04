
import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../../../../common/tableCommon/components/RawParamCommon";
import {Form} from "antd";

/**
 * 测试页
 * 请求体中raw
 */
const RawParamTest = (props) => {
    const { rawParamTestStore, bodyType }  = props;
    const {getRawInfo,setRawInfo,rawParamTestInfo} = rawParamTestStore;

    const [form] = Form.useForm();

    useEffect(()=>{
        setRawInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[bodyType])

    return (
        <RawParamCommon
            form={form}
            dataSource={rawParamTestInfo}
            type={rawParamTestInfo?.type}
            updateFn={getRawInfo}
            use={"test"} //测试页 中使用，用于判断
        />
    )
}

export default inject('rawParamTestStore')(observer(RawParamTest));
