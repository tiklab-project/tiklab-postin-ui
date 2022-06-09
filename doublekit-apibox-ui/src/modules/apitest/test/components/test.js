import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Form, Input, Select, Button, Divider} from 'antd';
import { TestRequest, TestResponse } from '../index';
import SaveTestCase from './saveTestcaseTest'
import './test.scss';
import {sendTestDataProcess} from "../../common/sendTestCommon";
import {methodDictionary} from "../../../common/dictionary/dictionary";

const { Option } = Select;

// 接口测试组件
const ApxMethodTest = (props) => {
    const {
        apxMethodStore,
        requestHeaderTestStore,
        queryParamTestStore,
        requestBodyTestStore,
        formParamTestStore,
        formUrlencodedTestStore,
        jsonParamTestStore,
        rawParamTestStore,
        preParamTestStore,
        afterParamTestStore,
        assertParamTestStore,
        testStore,
        environmentStore,
    } = props;

    const {findApxMethod} = apxMethodStore;

    const { getRequestInfo, getResponseInfo, getTime } = testStore;
    const { findEnvironmentList, envSourceList } = environmentStore;
    const { requestHeaderTestList,getRequestHeaderTestList } = requestHeaderTestStore;
    const { queryParamTestList,getQueryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo,getBodyType } = requestBodyTestStore;
    const { formParamTestList,getFormParamTestList } = formParamTestStore;
    const { formUrlencodedTestList,getFormUrlencodedTestList } = formUrlencodedTestStore;
    const { jsonParamTestList,getJsonParamTestList } = jsonParamTestStore;
    const { rawParamTestInfo,getRawInfo } = rawParamTestStore;
    const { preParamTestInfo,getPreInfo } = preParamTestStore;
    const { afterParamTestInfo,getAfterInfo } = afterParamTestStore;
    const { assertParamTestList } = assertParamTestStore;


    const [ form ] = Form.useForm();

    const [showResponse,setShowResponse]= useState(false);
    const methodId = localStorage.getItem('apxMethodId');


    useEffect(()=>{
        findEnvironmentList()
    },[])

    useEffect(()=>{
        findApxMethod(methodId).then(res=>{
            debugger
            form.setFieldsValue({
                requestType: res.requestType,
                path: res.path,
            })

            getRequestHeaderTestList(res.requestHeaderList);
            getQueryParamTestList(res.queryParamList);
            getBodyType(res.requestBody.bodyType);

            switch (res.requestBody.bodyType){
                case "formdata":
                    getFormParamTestList(res.formParamList);
                    break;
                case "formUrlencoded":
                    getFormUrlencodedTestList(res.formUrlencodedList);
                    break;
                case "json":
                    getJsonParamTestList(res.formParamList);
                    break;
                case "raw":
                    getRawInfo(res.rawParam)
                    break;
                case "binary":
                    //问题
                    break;
                default:
                    break;
            }

            getPreInfo(res.preScript);
            getAfterInfo(res.afterScript);
        })
    },[methodId])

    // 点击测试
    const onFinish = (values)=> {
        const allSendData = {
            "getTime":getTime,
            "getRequestInfo":getRequestInfo,
            "getResponseInfo":getResponseInfo,
            "method":values.requestType,
            "baseUrl":values.serverUrl,
            "path":values.path,
            "headerList":requestHeaderTestList,
            "queryList":queryParamTestList,
            "bodyType":bodyTypeInfo,
            "formDataList":formParamTestList,
            "formUrlencoded":formUrlencodedTestList,
            "jsonList":jsonParamTestList,
            "rawParam":rawParamTestInfo,
            "assertList":assertParamTestList,
            "preScript":preParamTestInfo,
            "afterScript":afterParamTestInfo,
        }

        sendTestDataProcess(allSendData)

        setShowResponse(true)
    }

    //请求类型下拉选择框
    const prefixSelector = (
        <Form.Item name="requestType" noStyle>
          <Select style={{width: 100,}}>
              {
                  methodDictionary.map(item=>{
                      return (
                          <Option value={item}  key={item}>{item}</Option>
                      )
                  })
              }
          </Select>
        </Form.Item>
    );

    // 选择测试环境 input框呈现相应的地址
    const onSelectChange = (value) => {
        form.setFieldsValue({
            serverUrl:value
        })
    }

    return(
        <Fragment>
            <div className='test-environment'>
                <Select
                    className="test-environment-select"
                    onSelect={(value)=> onSelectChange(value)}
                    dropdownRender={item=>(
                        <>
                            <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                            <Divider style={{ margin: '8px 0' }} />
                            <span
                                onClick={()=>props.history.push("/systemManagement/envMana")}
                                style={{"color":"#00adff","cursor":"pointer","margin":"0 0 0 20px"}}
                            >
                                环境设置
                            </span>
                        </>
                    )}
                >
                    {
                        envSourceList.map((item)=> {
                            return <Option key={item.id} value={item.url}>{item.name}</Option>
                        })
                    }
                </Select>
            </div>
            <div className={"test-base"}>
                <Form
                    onFinish={onFinish}
                    form = {form}
                    className="test-header"
                >
                    <div className={"test-url"}>
                        <Form.Item
                            className='formItem'
                            name="serverUrl"
                        >
                            <Input  addonBefore={prefixSelector}/>
                        </Form.Item>
                        <Form.Item
                            className='formItem'
                            name="path"
                            rules={[{required: true,message: '接口的path'}]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </div>
                    <div className={"test-base-item"}>
                        <Form.Item className='test-button'>
                            <Button className="important-btn" htmlType="submit">
                                测试
                            </Button>
                        </Form.Item>
                    </div>
                    <div className={"test-base-item"}>
                        <SaveTestCase  {...props}/>
                    </div>
                </Form>
            </div>
            {/*<div className='title ex-title'>输入参数</div>*/}
            <div>
                <TestRequest {...props}/>
            </div>
            <div className='title ex-title'>
                测试结果
            </div>
            <TestResponse showResponse={showResponse}/>
        </Fragment>
    )
}


export default inject(
    'requestHeaderTestStore',
    'queryParamTestStore',
    'requestBodyStore',
    'requestBodyTestStore',
    'formParamTestStore',
    'formUrlencodedTestStore',
    'jsonParamTestStore',
    'rawParamTestStore',
    "preParamTestStore",
    "afterParamTestStore",
    'assertParamTestStore',
    'testStore',
    'testCaseStore',
    'environmentStore',
    "apxMethodStore"
 )(observer(ApxMethodTest));


