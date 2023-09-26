import React from "react";
import {observer} from "mobx-react";
import FormParamTest from './TestFormParam';
import FormUrlencodedTest from "./FormUrlencodedTest";
import RawParamTest from "./TestRawParam";
import {mediaTypeDir} from "../../../../../common/dictionary/dictionary";
import RequestNoBody from "../../../../../common/tableCommon/components/RequestNoBody";
import requestBodyTestStore from "../store/RequestBodyTestStore";
import JsonParamTest from "./JsonParamTest";
/**
 * 测试页
 * 请求体
 * FormUrlencoded
 */
const RequestBodyTest = (props)=>{

    const { bodyType,mediaType } = requestBodyTestStore;

    /**
     * 展示不同的contentType 类型
     */
    const showBodyType = (type) =>{
        let bodyKeyArr = Object.keys(mediaTypeDir)

        return bodyKeyArr.map(item=>{
            if(item===type){

                if(type==="raw"){
                    return <div className={"test-body-type-item"} key={item}>{mediaType}</div>
                }else {
                    return  <div className={"test-body-type-item"} key={item}>{mediaTypeDir[item].mediaType}</div>
                }
            }
        })
    }


    /**
     *  渲染对应类型的组件
     */
    const showItemComponent = (data)=>{
        switch(data) {
            case mediaTypeDir.none.title:
                return <RequestNoBody/>
            case mediaTypeDir.formdata.title:
                return <FormParamTest />
            case mediaTypeDir.formUrlencoded.title:
                return <FormUrlencodedTest />
            case mediaTypeDir.json.title:
                return <JsonParamTest />
            case mediaTypeDir.raw.title:
                return <RawParamTest />
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

export default observer(RequestBodyTest);
