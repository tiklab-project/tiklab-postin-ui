import React from "react";
import {inject, observer} from "mobx-react";
import FormParamTest from './testFormParam';
import JsonParamTest from "./testJsonParam";
import FormUrlencodedTest from "./FormUrlencodedTest";
import RawParamTest from "./testRawParam";
import {bodyTypeJsonDictionary as bodyTypeJson, mediaTypeDictionary} from "../../../common/dictionary/dictionary";
import RequestNoBody from "../../../common/tableCommon/components/requestNoBody";

const RequestBodyTest = (props)=>{
    const { requestBodyTestStore } = props;

    const { bodyType,mediaType } = requestBodyTestStore;

    const showBodyType = (type) =>{
        let bodyKeyArr = Object.keys(mediaTypeDictionary)

        return bodyKeyArr.map(item=>{
            if(item===type){

                if(type==="raw"){
                    return <div className={"test-body-type-item"} key={item}>type : {mediaType}</div>
                }else {
                    return  <div className={"test-body-type-item"} key={item}>type : {mediaTypeDictionary[item]}</div>
                }
            }
        })
    }


    //渲染对应类型的组件
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
            <div>
                {
                    showItemComponent(bodyType)
                }
            </div>

        </>
    )
}

export default inject('requestBodyTestStore')(observer(RequestBodyTest));
