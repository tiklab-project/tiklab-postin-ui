import React from "react";
import {inject, observer} from "mobx-react";
import FormParamTest from './TestFormParam';
import JsonParamTest from "./TestJsonParam";
import FormUrlencodedTest from "./FormUrlencodedTest";
import RawParamTest from "./TestRawParam";
import {bodyTypeJsonDictionary as bodyTypeJson, mediaTypeDictionary} from "../../../../../common/dictionary/dictionary";
import RequestNoBody from "../../../../../common/tableCommon/components/RequestNoBody";

/**
 * 测试页
 * 请求体
 * FormUrlencoded
 */
const RequestBodyTest = (props)=>{
    const { requestBodyTestStore } = props;

    const { bodyType,mediaType } = requestBodyTestStore;

    /**
     * 展示不同的contentType 类型
     */
    const showBodyType = (type) =>{
        let bodyKeyArr = Object.keys(mediaTypeDictionary)

        return bodyKeyArr.map(item=>{
            if(item===type){

                if(type==="raw"){
                    return <div className={"test-body-type-item"} key={item}>{mediaType}</div>
                }else {
                    return  <div className={"test-body-type-item"} key={item}>{mediaTypeDictionary[item]}</div>
                }
            }
        })
    }


    /**
     *  渲染对应类型的组件
     */
    const showItemComponent = (data)=>{
        switch(data) {
            case bodyTypeJson.none:
                return <RequestNoBody/>
            case bodyTypeJson.formdata:
                return <FormParamTest />
            case bodyTypeJson.formUrlencoded:
                return <FormUrlencodedTest />
            case bodyTypeJson.json:
                return <JsonParamTest />
            case bodyTypeJson.raw:
                return <RawParamTest />
            // case 'binary':
            //     return ""
        }
    }

    return(
        <>
            <div className={"test-body-type-box"}>
                {
                    showBodyType(bodyType)
                }
            </div>
            <div className={"tabPane-item-box"}>
                {
                    showItemComponent(bodyType)
                }
            </div>

        </>
    )
}

export default inject('requestBodyTestStore')(observer(RequestBodyTest));
