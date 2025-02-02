import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Tabs } from 'antd';
import ResponseBodyInstance from "./ResponseBodyInstance";
import ResponseHeaderInstance from "./ResponseHeaderInstance";
import RequestBodyInstance from "./RequestBodyInstance";
import RequestHeaderInstance from "./RequestHeaderInstance";
import AssertInstance from "./AssertInstance";
import {TextMethodType} from "../../../../../common/MethodType";

const { TabPane } = Tabs;

const InstanceDetail = (props) => {
    const {  instanceId,instanceStore } = props;
    const { findInstance } = instanceStore;

    const [visible, setVisible] = useState(false);

    const [allData, setAllData] = useState();
    const [requestInstance,setRequestInstance]=useState({})
    const [statusCode, setStatusCode] = useState("");
    const [result, setResult] = useState();
    const [testTime, setTestTime] = useState();

    //展示测试结果详情
    const showModal = async () => {
        let res = await findInstance(instanceId);

        setAllData(res)
        setStatusCode(res.statusCode);
        setResult(res.result)
        setRequestInstance(res.requestInstance);
        setTestTime(res.createTime)

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
                            <ResponseBodyInstance
                                resBody={allData?.responseInstance?.body}
                            />
                        </div>

                    </TabPane>
                    <TabPane tab="响应头" key="2">
                        <div className={"history-res-height"}>
                            <ResponseHeaderInstance
                                resHeader={allData?.responseInstance?.headers}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="请求内容" key="4">
                        <div className={"history-res-height"}>
                            <RequestBodyInstance
                                reqBody={allData?.requestInstance?.body}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="请求头" key="3">
                        <div className={"history-res-height"}>
                            <RequestHeaderInstance
                                reqHeader={allData?.requestInstance?.headers}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="断言" key="5">
                        <div className={"history-res-height"}>
                            <AssertInstance
                                assertList={allData?.assertInstanceList}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    )
}

export default observer(InstanceDetail);
