import React from 'react';
import { Tabs } from 'antd';
import ResponseInfo from "../../../../common/request/ResponseInfo";
import errorImg from "../../../../assets/img/error.png"
import sendImg from "../../../../assets/img/send.png"
import ResponseBodyCommon from "./ResponseBodyCommon";
import {processAssert, processResHeader} from "./TestResponseFnCommon";
import ResHeaderCommon from "./ResHeaderCommon";
import AssertResponseCommon from "./AssertResponseCommon";
import {AssertCommonStore} from "./AssertCommonStore";

const { TabPane } = Tabs;

let assertCommonStore = new AssertCommonStore();

// 输出参数 请求头部与请求参数的切换
const TestResultCommon = (props) =>  {
    const {showResponse,testResponse,afterScript} = props;


    const isErrorTest = (response)=>{

        if(response&&response.error){
            return (
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={errorImg} alt={"errorImg"}/>
                        </div>
                        <span>Error : {response.error}</span>
                    </div>
                </div>
            )
        }

        return (
            <>
                {showResponseBox(response)}
            </>
        )
    }

    const showResponseBox = (response)=>{
        if (!response) return;


        let res = response.res;

        let time = response.time;
        let status = res.status;

        let requestHeaders= res?.config?.headers;
        let requestBody =  res?.config?.data;

        let headers = res.headers;
        let mediaType;
        if(headers&&Object.keys(headers).length>0){
            mediaType  = headers["content-type"] || headers["Content-Type"]
        }else {
            mediaType = "text/plain"
        }

        let body = JSON.stringify(res.data);

        //大小
        let size = body.length;

        //assert
        let assertList=[];
        if(response.assertList&&response.assertList.length>0){
            assertList = processAssert(response.assertList);
            const assertNeedData ={
                "status":status,
                "header":headers,
                "body":JSON.stringify(res.data),
                "assertList":assertList
            }
            //断言list，添加result 字段。用于测试结果中的断言回显
            assertCommonStore.assertCompare(assertNeedData);
        }


        return(
            <Tabs
                defaultActiveKey="1"
                tabBarExtraContent={
                    <ResponseInfo
                        status={status}
                        time={time}
                        size={size}
                    />
                }
            >
                <TabPane tab="响应体" key="1">
                    <ResponseBodyCommon responseBodyData={res.data} mediaType={mediaType}/>
                </TabPane>
                <TabPane tab="响应头" key="2">
                    <ResHeaderCommon headers={processResHeader(JSON.stringify(headers))}/>
                </TabPane>
                <TabPane tab="请求头" key="3">
                    <ResHeaderCommon headers={processResHeader(JSON.stringify((requestHeaders)))}/>
                </TabPane>
                <TabPane tab="断言" key="5">
                    {
                        afterScript
                            ?<div style={{"padding":"10px",background: "#f9f9f9"}}>
                                <div>后置 statusCode: {afterScript}</div>

                            </div>
                            :null
                    }
                    <AssertResponseCommon assertList={assertList} />
                </TabPane>
            </Tabs>
        )
    }


    return(
        <div className={"api-test-res-box"}>
            <div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={sendImg} alt={"sendImg"}/>
                        </div>
                        <span>  点击 发送 按钮发送请求  </span>
                    </div>
                </div>
            </div>
            <div className={`test-response-after  ${showResponse === true? 'test-response-show':'test-response-hide'}`} >
                {isErrorTest(testResponse)}
            </div>
        </div>
    )
}

export default TestResultCommon;