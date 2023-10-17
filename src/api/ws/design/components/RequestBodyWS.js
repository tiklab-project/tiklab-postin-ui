import React, {useEffect, useState} from "react";
import {Radio} from "antd";
import JsonParam from "../../../api/components/JsonParam";
import RawParamWS from "./RawParamWS";
import {observer} from "mobx-react";
import apiRequestStore from "../../../api/store/ApiRequestStore";

/**
 *请求体中的 类型 设置，不同类型展示不同组件
 */
const RequestBodyWS = (props) =>{
    const {findApiRequest,updateApiRequest} = apiRequestStore

    const [radioType, setRadioType] = useState("raw");
    const  apiId =localStorage.getItem('apiId');

    useEffect(async ()=>{
        findApiRequest(apiId).then(res=>{
            setRadioType(res.bodyType)
        })
    },[apiId])

    const onChange =async (type) => {
        setRadioType(type);
        await updateApiRequest({bodyType:type})
    }

    /**
     *  渲染对应类型的组件
     */
    const showItemComponent = (data)=>{
        switch(data) {
            case "raw":
                return <RawParamWS />
            case "json":
                return <JsonParam />

        }
    }


    return(
        <>
            <div className='request-radio'>
                <Radio.Group
                    value={radioType}
                    onChange = {(e)=>onChange(e.target.value)}
                >
                    <Radio value={"raw"} >raw</Radio>
                    <Radio value={"json"} >json</Radio>
                    {/*<Radio value={"json"} >json</Radio>*/}
                </Radio.Group>
            </div>
            <div className={"tabPane-item-box"}>
                {
                    showItemComponent(radioType)
                }
            </div>

        </>
    )
}

export default observer(RequestBodyWS);