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
                let initRadioValue ={bodyType :'formdata'};
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
            case 'none':
                return <div>none</div>
            case 'formdata':
                return <FromParamTestCase />
            case 'formUrlencoded':
                return <FormUrlencodedTestCase />
            case 'json':
                return <JsonParamTestCase />
            case 'raw':
                return <RawParamTestCase />
            // case 'binary':
            //     return <BinaryParamTestCase />

        }  
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
                        <Radio.Group name="radiogroup" onChange={(e)=>onChange(e)}  defaultValue={radioValue}>
                            <Radio value={'none'}>none</Radio>
                            <Radio value={'formdata'}>form-data </Radio>
                            <Radio value={'formUrlencoded'}>x-www-form-urlencoded</Radio>
                            <Radio value={'json'}>json</Radio>
                            <Radio value={'raw'}>raw</Radio>
                            {/*<Radio value={'binary'}>binary</Radio>*/}
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
