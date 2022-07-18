import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const TestResultCommon = (props) =>  {
    const {status,time ,showResponse,error} = props;

    const responseInfo = (
        <div className="test-responseInfo">
            <div>status: {status} </div>
            <div>time: {time}</div>
        </div>
    );

    return(
        <>

            <div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>
                <div className="test-response-before-alert">
                    <span>点击测试按钮发送请求</span>
                </div>
            </div>
            <div className={`test-response-after  ${showResponse === true? 'test-response-show':'test-response-hide'}`} >
                <div style={{"min-height":300}} className={`test-response-after  ${error&&error.showError ? 'test-response-hide':'test-response-show'}`}>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={responseInfo}
                    >
                        <TabPane tab="响应体" key="1">
                            {props.responseBody}
                        </TabPane>
                        <TabPane tab="响应头" key="2">
                            {props.responseHeader}
                        </TabPane>
                        <TabPane tab="请求头" key="3">
                            {props.requestHeader}
                        </TabPane>
                        <TabPane tab="请求内容" key="4">
                            {props.requestBody}
                        </TabPane>
                        <TabPane tab="断言" key="5">
                            {props.assertResult}
                        </TabPane>
                    </Tabs>
                </div>
                <div className={`test-response-before  ${error&&error.showError?'test-response-show':'test-response-hide'}`}>
                    <div className="test-response-before-alert">
                        <span>Error : {error?.errorMessage}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestResultCommon;