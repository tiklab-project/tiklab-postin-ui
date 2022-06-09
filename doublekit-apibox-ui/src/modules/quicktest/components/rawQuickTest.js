
import React, {useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../common/tableCommon/components/rawParamCommon";
import {Form} from "antd";

const RawQuickTest = (props) => {
    const { rawQuickTestStore, bodyType }  = props;
    const {getRawInfo,setRawInfo} = rawQuickTestStore;
    const instanceId = localStorage.getItem("instanceId")

    const [form] = Form.useForm();

    useEffect(()=>{
        setRawInfo().then(res=>{
            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[instanceId])

    return (
        <RawParamCommon
            getInfo={getRawInfo}
            setInfo={setRawInfo}
            bodyType={bodyType}
            form={form}
        />
    )
}


export default inject('rawQuickTestStore')(observer(RawQuickTest));