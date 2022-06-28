import React, {useState} from "react";
import {Radio} from "antd";
import {bodyTypeDictionary, bodyTypeJsonDictionary as bodyTypeJson} from "../../dictionary/dictionary";
import RequestNoBody from "./requestNoBody";

const RequestBodyCom = (props) =>{
    const {radioValue,updateFn,setRadioType} = props;

    const onChange = (type) => {
        updateFn({bodyType: type})
        setRadioType(type)
    }

    //渲染对应类型的组件
    const showItemComponent = (data)=>{
        switch(data) {
            case bodyTypeJson.none:
                return <RequestNoBody/>
            case bodyTypeJson.formdata:
                return props.form
            case bodyTypeJson.formUrlencoded:
                return props.formUrlencoded
            case bodyTypeJson.json:
                return props.json
            case bodyTypeJson.raw:
                return props.raw
            // case 'binary':
            //     return ""
        }
    }


    //渲染body选项
    const showRadioItem = (data)=>{
        let arr = Object.keys(data)

        return arr.map(item=>{
            return <Radio value={item} key={item}>{data[item]}</Radio>
        })
    }

    return(
        <>
            <div className='request-radio'>
                <Radio.Group
                    value={radioValue}
                    onChange = {(e)=>onChange(e.target.value)}
                >
                    {showRadioItem(bodyTypeDictionary)}
                </Radio.Group>
            </div>
            <div>
                {
                    showItemComponent(radioValue)
                }
            </div>

        </>
    )
}

export default RequestBodyCom;