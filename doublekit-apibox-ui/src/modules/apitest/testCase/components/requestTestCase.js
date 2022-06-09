import React, { Fragment, useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import RequestHeaderTestCase from "./requestHeaderTestCase";
import QueryParamTestCase from "./queryParamTestCase";
import FromParamTestCase from "./formParamTestCase";
import JsonParamTestCase from "./jsonParamTestCase";
import RawParamTestCase from "./rawParamTestCase";
import PreParamTestCase from "./preParamTestCase";
import BackParamTestCase from "./afterParamTestCase";
import AssertParamTestCase from "./assertParamTestCase";
import { Tabs, Radio } from 'antd';
import FormUrlencodedTestCase from "./formUrlencodedTestCase";
import BinaryParamTestCase from "./binaryParamTestCase";
import RequestNoBody from "../../../common/tableCommon/components/requestNoBody";
import {bodyTypeDictionary, bodyTypeJsonDictionary as bodyTypeJson} from "../../../common/dictionary/dictionary";

const { TabPane } = Tabs;

const TestCaseRequest = (props) => {
    const { requestBodyTestCaseStore } =props;
    const { 
        findRequestBodyTestCase, 
        createRequestBodyTestCase, 
        updateRequestBodyTestCase,
        requestBodyTestCaseInfo 
    } = requestBodyTestCaseStore; 

    const [radioValue, setRadioValue] = useState()

    const testCaseId = localStorage.getItem('testCaseId');
    useEffect(()=>{
        findRequestBodyTestCase(testCaseId).then((res) => {
            if(res === null){
                let initRadioValue ={bodyType :'none'};
                res = Object.assign(initRadioValue);
                createRequestBodyTestCase(res);
            }else{
                setRadioValue(res.bodyType)
            }
        })
    },[requestBodyTestCaseInfo])

    const onChange = e => {
        let changeRadioValue = {bodyType : e.target.value}
        updateRequestBodyTestCase(changeRadioValue)
        setRadioValue( e.target.value)
    };

    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case bodyTypeJson.none:
                return <RequestNoBody />
            case bodyTypeJson.formdata:
                return <FromParamTestCase />
            case bodyTypeJson.formUrlencoded:
                return <FormUrlencodedTestCase />
            case bodyTypeJson.json:
                return <JsonParamTestCase />
            case bodyTypeJson.raw:
                return <RawParamTestCase />
            // case 'binary':
            //     return <BinaryParamTestCase />

        }  
    }

    const showRadioItem = (data)=>{
        return data&& data.map(item=>{
            return <Radio value={item.value} key={item.value}>{item.name}</Radio>
        })
    }

    return(
        <Fragment>
            <Tabs defaultActiveKey="1"  >
                <TabPane tab="请求头部" key="1" >
                    <RequestHeaderTestCase />
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <QueryParamTestCase />
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group
                            name="radiogroup"
                            onChange={(e)=>onChange(e)}
                            defaultValue={radioValue}
                        >
                            {showRadioItem(bodyTypeDictionary)}
                        </Radio.Group>
                    </div>
                    <div>
                        { 
                            changeFormat(radioValue)
                        } 
                    </div>      
                </TabPane>
                <TabPane tab="前置脚本" key="4">
                    <PreParamTestCase />
                </TabPane>
                <TabPane tab="后置脚本" key="5">
                    <BackParamTestCase />
                </TabPane>
                <TabPane tab="断言" key="6">
                    <AssertParamTestCase/>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}

export default inject('requestBodyTestCaseStore')(observer(TestCaseRequest));
