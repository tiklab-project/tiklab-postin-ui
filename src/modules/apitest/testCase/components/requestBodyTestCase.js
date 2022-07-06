import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FormParamTestCase from "./formParamTestCase";
import JsonParamTestCase from "./jsonParamTestCase";
import FormUrlencodedTestCase from "./formUrlencodedTestCase";
import RawParamTestCase from "./rawParamTestCase";
import {bodyTypeJsonDictionary as bodyTypeJson, mediaTypeDictionary} from "../../../common/dictionary/dictionary";
import RequestNoBody from "../../../common/tableCommon/components/requestNoBody";

const RequestBodyTestCase = (props)=>{
    const { requestBodyTestCaseStore } =props;
    const {
        findRequestBodyTestCase,
        requestBodyTestCaseInfo
    } = requestBodyTestCaseStore;

    const [bodyType, setBodyType] = useState();

    const testCaseId = localStorage.getItem('testCaseId');
    useEffect(()=>{
        findRequestBodyTestCase(testCaseId).then((res) => {
            setBodyType(res.bodyType)
        })
    },[requestBodyTestCaseInfo])


    const showBodyType = (type) =>{
        let bodyKeyArr = Object.keys(mediaTypeDictionary)

        return bodyKeyArr.map(item=>{
            if(item===type){
                return  <div className={"test-body-type-item"}>type : {mediaTypeDictionary[item]}</div>
            }
        })
    }


    //渲染对应类型的组件
    const showItemComponent = (data)=>{
        switch(data) {
            case bodyTypeJson.none:
                return <RequestNoBody/>
            case bodyTypeJson.formdata:
                return <FormParamTestCase />
            case bodyTypeJson.formUrlencoded:
                return <FormUrlencodedTestCase />
            case bodyTypeJson.json:
                return <JsonParamTestCase />
            case bodyTypeJson.raw:
                return <RawParamTestCase />
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

export default inject('requestBodyTestCaseStore')(observer(RequestBodyTestCase));
