import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Tabs } from 'antd';
import ResponseBodyInstance from "./responseBodyInstance";
import ResponseHeaderInstance from "./responseHeaderInstance";
import RequestBodyInstance from "./requestBodyInstance";
import RequestHeaderInstance from "./requestHeaderInstance";
import AssertInstance from "./assertInstance";
const { TabPane } = Tabs;

const InstanceDetail = (props) => {
    const { instanceStore, instanceId } = props;
    const { findInstance } = instanceStore;

    const [visible, setVisible] = useState(false);

    const [requestInstance,setRequestInstance]=useState({})
    const [testNo, setTestNo] = useState();
    const [requestType, setRequestType] = useState("");
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState();
    const [testTime, setTestTime] = useState();

    //展示测试结果详情
    const showModal = () => {
        findInstance(instanceId).then((res)=>{
            setTestNo(testNo)
            setRequestType(res.requestType);
            setStatusCode(res.statusCode);
            setResult(res.result)
            setRequestInstance(res.requestInstance);
            setTestTime(res.createTime)
        })

        setVisible(true);
    }


    const handleCancel = () => {setVisible(false)};

    return(
        <>
            <a onClick={showModal}  className={"instance-list-item"}>{props.name}</a>
            <Modal
                title='查看测试详情'
                destroyOnClose={true}
                visible={visible}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                <div>
                    <span>请求地址:  </span>
                    <span>{requestInstance.requestBase}</span>
                </div>
                <div>
                    <span>请求方式:  </span>
                    <span>{requestType}</span>
                </div>
                <div>
                    <span>状态码:  </span>
                    <span>{statusCode}</span>
                </div>
                <div>
                    <span>测试结果:  </span>
                    <span>{result=== 1 ? '成功' : '失败'}</span>
                </div>
                <div>
                    <span>测试时间:  </span>
                    <span>{testTime}</span>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                >
                    <TabPane tab="响应体" key="1">
                        <ResponseBodyInstance />
                    </TabPane>
                    <TabPane tab="响应头" key="2">
                        <ResponseHeaderInstance />
                    </TabPane>
                    <TabPane tab="请求内容" key="4">
                        <RequestBodyInstance />
                    </TabPane>
                    <TabPane tab="请求头" key="3">
                        <RequestHeaderInstance />
                    </TabPane>
                    <TabPane tab="断言" key="5">
                        <AssertInstance />
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    )
}

export default inject('instanceStore')(observer(InstanceDetail));
