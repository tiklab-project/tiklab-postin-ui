import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Tabs } from 'antd';
import ResponseBodyInstance from "./responseBodyInstance";
import ResponseHeaderInstance from "./responseHeaderInstance";
import RequestBodyInstance from "./requestBodyInstance";
import RequestHeaderInstance from "./requestHeaderInstance";
import AssertInstance from "./assertInstance";
import {TextMethodType} from "../../../common/methodType";
const { TabPane } = Tabs;

const InstanceDetail = (props) => {
    const { instanceStore, instanceId } = props;
    const { findInstance } = instanceStore;

    const [visible, setVisible] = useState(false);

    const [requestInstance,setRequestInstance]=useState({})
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState();
    const [testTime, setTestTime] = useState();

    //展示测试结果详情
    const showModal = () => {
        findInstance(instanceId).then((res)=>{
            setStatusCode(res.statusCode);
            setResult(res.result)
            setRequestInstance(res.requestInstance);
            setTestTime(res.createTime)
        })

        setVisible(true);
    }

    const detail = [
        {
            title:"请求地址:",
            value:requestInstance?.url,
            key:"url"
        },{
            title:"请求方式:",
            value:requestInstance?.methodType,
            key:"methodType"
        },{
            title:"状态码:",
            value:statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:result=== 1 ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:testTime,
            key:"testTime"
        },
    ]

    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <span className={"history-detail-item-box-title"}>{item.title}</span>
                    {
                        item.key==="methodType"
                            ? <TextMethodType type={requestInstance?.methodType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }


                </div>
            )
        })
    }


    const handleCancel = () => {setVisible(false)};

    return(
        <>
            <div onClick={showModal}  className={"instance-list-item"}>{  props.item }</div>
            <Modal
                title='查看测试详情'
                destroyOnClose={true}
                visible={visible}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >
                {
                    showDetail(detail)
                }

                <Tabs defaultActiveKey="1"  >
                    <TabPane tab="响应体" key="1">
                        <div className={"history-res-height"}>
                            <ResponseBodyInstance />
                        </div>

                    </TabPane>
                    <TabPane tab="响应头" key="2">
                        <div className={"history-res-height"}>
                            <ResponseHeaderInstance />
                        </div>
                    </TabPane>
                    <TabPane tab="请求内容" key="4">
                        <div className={"history-res-height"}>
                        <RequestBodyInstance />
                        </div>
                    </TabPane>
                    <TabPane tab="请求头" key="3">
                        <div className={"history-res-height"}>
                        <RequestHeaderInstance />
                        </div>
                    </TabPane>
                    <TabPane tab="断言" key="5">
                        <div className={"history-res-height"}>
                        <AssertInstance />
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    )
}

export default inject('instanceStore')(observer(InstanceDetail));
