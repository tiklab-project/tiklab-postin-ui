import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import ProtocolType from "../../../../common/ProtocolType";
import MethodType from "../../../../common/MethodType";
import TableHeaderDoc from "../../../../common/apiDoc/TableHeaderDoc";
import TableQueryDoc from "../../../../common/apiDoc/TableQueryDoc";
import RequestBodyDoc from "../../../../common/apiDoc/RequestBodyDoc";
import ResponseResultDoc from "../../../../common/apiDoc/ResponseResultDoc";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import {Breadcrumb, Space, Tag} from "antd";
import EnvSelect from "../../../../support/environment/components/EnvSelect";

/**
 * 接口文档页面
 */
const ApiDocumentPage = (props) =>{
    const {apxMethodStore} = props;
    const { findApxMethod } = apxMethodStore;
    const [apiDoc, setApiDoc] = useState();


    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(async ()=>{
        let res = await findApxMethod(apxMethodId);
        setApiDoc(res)
    },[apxMethodId])

    /**
     * 去往编辑页
     */
    const toEditPage = () =>{
        props.history.push("/workspace/apis/edit")
    }

    /**
     * 去往测试页
     */
    const toTestPage = () =>{
        props.history.push("/workspace/apis/test")
    }

    /**
     * 去往mock页
     */
    const toMockPage = () =>{
        props.history.push("/workspace/apis/mock")
    }

    /**
     * 去往列表页
     */
    const goBack = () =>{
        props.history.push("/workspace/apis/category")
    }


    return (
        <div className={"content-margin"} style={{height:"100%"}}>
            <div className="content-margin-box">
                <div className={"pi-box-between"}>
                    <Breadcrumb className={"breadcrumb-box"} style={{margin:"0 0 10px 0"}}>
                        <Breadcrumb.Item onClick={goBack} className={"first-item"}>接口列表</Breadcrumb.Item>
                        <Breadcrumb.Item>接口文档</Breadcrumb.Item>
                    </Breadcrumb>
                    <EnvSelect {...props}/>
                </div>

                <div className={"share-box-right-content-item"}  >
                    <div className={"pi-box-between"}>
                        <div className={"share-box-api-title"}>
                            {apiDoc?.apix?.name}
                            <Tag color={apiDoc?.apix?.status?.color} style={{margin:"0 10px"}}>{apiDoc?.apix?.status?.name}</Tag>
                        </div>

                        <Space>
                            <IconBtn
                                // icon={"bianji11"}
                                className="pi-icon-btn-grey"
                                name={"编辑"}
                                onClick={toEditPage}
                            />
                            <IconBtn
                                // icon={"fasong"}
                                className="pi-icon-btn-grey"
                                name={"测试"}
                                onClick={toTestPage}
                            />
                            <IconBtn
                                // icon={"gongdan"}
                                className="pi-icon-btn-grey"
                                name={"MOCK"}
                                onClick={toMockPage}
                            />
                        </Space>
                    </div>

                    <div className={"share-box-right-content-item-detail"}>
                        <div>
                            <span className={"share-detail-title"}>负责人: {apiDoc?.apix?.executor?.name||"未设置"}</span>
                        </div>
                        <div>
                            <span className={"share-detail-title"}>更新时间: {apiDoc?.apix?.updateTime}</span>
                        </div>
                    </div>
                </div>

                <div className={"share-box-right-content-item"}>
                    <div className={"share-box-right-content-item-detail"}>
                        <ProtocolType type={apiDoc?.apix?.protocolType}/>
                        <MethodType type={apiDoc?.methodType} />
                        <div>{apiDoc?.path}</div>
                    </div>
                    {/*<div className={"share-box-right-content-item-detail"}>*/}
                    {/*    <div className={"share-detail-title"}>状态:</div>*/}
                    {/*    <div style={{color:` ${apiDoc?.apix?.status?.color}`}}>{apiDoc?.apix?.status?.name}</div>*/}
                    {/*</div>*/}
                    <div className={"share-box-right-content-item-detail"}>
                        {
                            apiDoc?.apix?.desc
                                ?
                                <>
                                    <div className={"share-detail-title"}>说明:</div>
                                    <div >{apiDoc?.apix?.desc}</div>
                                </>
                                : null
                        }
                    </div>
                </div>
                <div
                    id="share-request-info"
                    className="header-title ex-title">
                    请求参数
                </div>
                <div className={"share-box-right-content-item"}>
                    {
                        apiDoc?.headerList||apiDoc?.queryList||apiDoc?.request?.bodyType!=="none"
                            ?<>
                                <TableHeaderDoc dataSource={apiDoc?.headerList}/>
                                <TableQueryDoc dataSource={apiDoc?.queryList}/>
                                <RequestBodyDoc data={apiDoc}/>
                            </>
                            :<div>暂无请求信息</div>
                    }

                </div>
                <div  id={"share-response-info"} className="header-title ex-title">响应示例</div>
                <div className={"share-box-right-content-item"}>
                    {
                        apiDoc?.responseHeaderList
                            ? <TableHeaderDoc isResponse={true} dataSource={apiDoc?.responseHeaderList} />
                            :null
                    }
                </div>
                <div className={"share-box-right-content-item"}>
                {
                    apiDoc?.responseResultList
                        ? <ResponseResultDoc dataSource={ apiDoc?.responseResultList} />
                        :<div>暂无响应示例</div>
                }
            </div>
            </div>
        </div>
    );

}

export default inject("apxMethodStore")(observer(ApiDocumentPage));