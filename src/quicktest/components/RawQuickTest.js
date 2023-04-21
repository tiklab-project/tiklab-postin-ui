
import React, {useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../common/tableCommon/components/RawParamCommon";
import {Form} from "antd";

/**
 * 快捷测试
 * 请求体中raw
 */
const RawQuickTest = (props) => {
    const { tabQuickTestStore }  = props;
    const {updateRawInfo,setRawInfo,rawInfo} = tabQuickTestStore;

    const [form] = Form.useForm();

    useEffect(()=>{
        setRawInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[])

    return (
        <RawParamCommon
            form={form}
            dataSource={rawInfo}
            type={rawInfo?.type}
            updateFn={updateRawInfo}
            use={"quick"}
        />
    )
}


export default inject('tabQuickTestStore')(observer(RawQuickTest));