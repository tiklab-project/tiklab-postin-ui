import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FormParamTestCase from "./FormParamTestCase";
import JsonParamTestCase from "./JsonParamTestCase";
import FormUrlencodedTestCase from "./FormUrlencodedTestCase";
import RawParamTestCase from "./RawParamTestCase";
import {bodyTypeJsonDictionary as bodyTypeJson, mediaTypeDictionary} from "../../../../../common/dictionary/dictionary";
import RequestNoBody from "../../../../../common/tableCommon/components/RequestNoBody";

const RequestBodyTestCase = (props)=>{
    const { requestCaseStore } =props;
    const {
        findRequestCase,
        bodyTypeCase,
        mediaType
    } = requestCaseStore;

    const [bodyType, setBodyType] = useState();

    const testCaseId = localStorage.getItem('testCaseId');
    useEffect(()=>{
        findRequestCase(testCaseId).then((res) => {
            setBodyType(res.bodyType)
        })
    },[bodyTypeCase])


    //展示请求体类型
    const showBodyType = (type) =>{
        let bodyKeyArr = Object.keys(mediaTypeDictionary)

        return bodyKeyArr.map(item=>{
            if(item===type){
                if(type==="raw"){
                    return  <div className={"test-body-type-item"}>type : {mediaType}</div>
                }else {
                    return  <div className={"test-body-type-item"}>type : {mediaTypeDictionary[item]}</div>
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

export default inject('requestCaseStore')(observer(RequestBodyTestCase));
