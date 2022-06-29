
import React, {useEffect} from 'react';
import { observer, inject } from 'mobx-react';
import RawParamCommon from "../../../common/tableCommon/components/rawParamCommon";
import {Form} from "antd";

const RawParamTest = (props) => {
    const { rawParamTestStore, bodyType }  = props;
    const {getRawInfo,setRawInfo} = rawParamTestStore;
    const [form] = Form.useForm();



    useEffect(()=>{
        setRawInfo().then(res=>{
            form.setFieldsValue({
                raw: res.raw,
                type:res.type
            })
        })
    },[bodyType])

    return (
        <RawParamCommon
            getInfo={getRawInfo}
            setInfo={setRawInfo}
            form={form}
        />
    )
}

export default inject('rawParamTestStore')(observer(RawParamTest));
