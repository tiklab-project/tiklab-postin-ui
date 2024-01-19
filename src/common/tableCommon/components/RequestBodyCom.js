import React from "react";
import {Radio} from "antd";
import {mediaTypeDir} from "../../dictionary/dictionary";
import RequestNoBody from "./RequestNoBody";

/**
 *请求体中的 类型 设置，不同类型展示不同组件
 */
const RequestBodyCom = (props) =>{
    const {radioValue,updateFn,setRadioType,bodyTypeDictionary} = props;

    const onChange = (type) => {
        updateFn({bodyType: type})
        // setRadioType(type)
    }

    /**
     *  渲染对应类型的组件
     */
    const showItemComponent = (data)=>{
        switch(data) {
            case mediaTypeDir.none.title:
                return <RequestNoBody/>
            case mediaTypeDir.formdata.title:
                return props.form
            case mediaTypeDir.formUrlencoded.title:
                return props.formUrlencoded
            case mediaTypeDir.json.title:
                return props.json
            case mediaTypeDir.raw.title:
                return props.raw
            // case 'binary':
            //     return ""
        }
    }


    /**
     * 渲染body选项
     */
    const showRadioItem = (data)=>{
        let arr = Object.keys(data)

        return arr.map(item=>{
            if(item==="json"&&!props.json) return null

            return <Radio value={item} key={item}>{data[item].radioShow}</Radio>
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
            <div className={"tabPane-item-box"}>
                {
                    showItemComponent(radioValue)
                }
            </div>

        </>
    )
}

export default RequestBodyCom;