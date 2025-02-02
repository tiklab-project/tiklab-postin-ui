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
import {toJS} from "mobx";

const { TabPane } = Tabs;

let assertCommonStore = new AssertCommonStore();

// 输出参数 请求头部与请求参数的切换
const TestResultCommon = (props) =>  {
    const {showResponse,testResponse,afterScript} = props;


    const showTestResponse = (response)=>{

        if(response&&response.errorMessage){
            return (
                <div className="test-response-error">
                    <div>
                        <div  className={"test-response-before-img-box"}>
                            <img  className={"test-response-before-img"} src={errorImg} alt={"errorImg"}/>
                        </div>
                        <span>{response.errorMessage}</span>
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
        const {time,statusCode,headers,size,body} = response;

        // console.log(toJS(response))


        let mediaType = "text/plain";
        if(headers&&Object.keys(headers).length>0){
            mediaType  = headers["Content-Type"] || headers["content-type"]
        }

        //assert
        let assertList=[];
        if(response.assertList&&response.assertList.length>0){
            assertList = processAssert(response.assertList);
            const assertNeedData ={
                "status":statusCode,
                "header":headers,
                "body":JSON.stringify(body),
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
                        status={statusCode}
                        time={time}
                        size={size}
                    />
                }
            >
                <TabPane tab="响应体" key="1">
                    {
                        body&&<ResponseBodyCommon responseBodyData={body} mediaType={mediaType}/>
                    }

                </TabPane>
                <TabPane tab="响应头" key="2">
                    <ResHeaderCommon headers={processResHeader(headers&&JSON.stringify(headers))}/>
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
                {showTestResponse(testResponse)}
            </div>
        </div>
    )
}

export default TestResultCommon;