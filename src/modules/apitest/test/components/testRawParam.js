
import React, {useEffect, useRef, useState} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../../common/tableCommon/components/rawParamCommon";
import {Form} from "antd";

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
            online={false}
        />
    )
}

export default inject('rawParamTestStore')(observer(RawParamTest));