
import React, {useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../common/tableCommon/components/rawParamCommon";
import {Form} from "antd";

const RawQuickTest = (props) => {
    const { rawQuickTestStore, bodyType }  = props;
    const {getRawInfo,setRawInfo,rawQuickTestInfo} = rawQuickTestStore;
    const instanceId = localStorage.getItem("instanceId")

    const [form] = Form.useForm();

    useEffect(()=>{
        setRawInfo().then(res=>{
            if(!res) return

            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[instanceId])

    return (
        <RawParamCommon
            form={form}
            dataSource={rawQuickTestInfo}
            type={rawQuickTestInfo?.type}
            updateFn={getRawInfo}
            use={"quick"}
        />
    )
}


export default inject('rawQuickTestStore')(observer(RawQuickTest));