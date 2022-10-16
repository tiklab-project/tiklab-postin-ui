import React from 'react';
import { Tabs } from 'antd';
import ResponseInfo from "../../common/request/responseInfo";
import errorImg from "../../../assets/img/error.png"
import sendImg from "../../../assets/img/send.png"
import ResponseBodyCommon from "./responseBodyCommon";
import {processAssert, processResHeader} from "./testResponseFnCommon";
import ResHeaderCommon from "./resHeaderCommon";
import AssertResponseCommon from "./assertResponseCommon";
import {AssertCommonStore} from "./assertCommonStore";

const { TabPane } = Tabs;

let assertCommonStore = new AssertCommonStore();

// 输出参数 请求头部与请求参数的切换
const TestResultCommon = (props) =>  {
    const {showResponse,testResponse} = props;


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
        }else {
            return (
                <>
                    {showResponseBox(response)}
                </>
            )
        }

    }

    const showResponseBox = (response)=>{
        if (!response) return;


        let res = response.res;

        let time = response.time;
        let status = res.status;

        let requestHeaders= res?.config?.headers;
        let requestBody =  res?.config?.data;

        let headers = res.headers;
        let mediaType = headers["content-type"].split(";")[0]

        let body = JSON.stringify(res.data);

        //大小
        let size = body.length;

        //assert
        let assertList = processAssert(response.assertList);
        const assertNeedData ={
            "status":status,
            "header":headers,
            "body":body,
            "assertList":assertList
        }
        //断言list，添加result 字段。用于测试结果中的断言回显
        assertCommonStore.assertCompare(assertNeedData);

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
                    <ResponseBodyCommon responseBodyData={body} mediaType={mediaType}/>
                </TabPane>
                <TabPane tab="响应头" key="2">
                    <ResHeaderCommon headers={processResHeader(JSON.stringify(headers))}/>
                </TabPane>
                <TabPane tab="请求头" key="3">
                    <ResHeaderCommon headers={processResHeader(JSON.stringify((requestHeaders)))}/>
                </TabPane>
                {/*<TabPane tab="请求内容" key="4">*/}
                {/*    /!*{props.requestBody}*!/*/}
                {/*</TabPane>*/}
                <TabPane tab="断言" key="5">
                    <AssertResponseCommon assertList={assertList} />
                </TabPane>
            </Tabs>
        )
    }


    return(
        <>
            <div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={sendImg} alt={"sendImg"}/>
                        </div>
                        <span>  点击 测试 按钮发送请求  </span>
                    </div>
                </div>
            </div>
            <div className={`test-response-after  ${showResponse === true? 'test-response-show':'test-response-hide'}`} >
                {isErrorTest(testResponse)}
            </div>
        </>
    )
}

export default TestResultCommon;