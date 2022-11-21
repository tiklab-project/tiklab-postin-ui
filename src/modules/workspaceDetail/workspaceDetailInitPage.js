import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Form, Input} from "antd";
import DynamicWidget from "../home/dynamicWidget";

const WorkspaceDetailInitPage = (props) =>{
    const {workspaceStore} = props;
    const {findWorkspace,updateWorkspace,findWorkspaceTotal} = workspaceStore;

    const workspaceId =  localStorage.getItem("workspaceId");

    const [workspaceData, setWorkspaceData] = useState();
    const [total, setTotal] = useState();

    const [form] = Form.useForm();

    useEffect(()=>{
        findWorkspace(workspaceId).then(res=>{
            setWorkspaceData(res)
            form.setFieldsValue({
                workspaceName: res.workspaceName,
                desc:res.desc
            })
        })
    },[workspaceId])

    useEffect(()=>{
        findWorkspaceTotal(workspaceId).then(res=>{
            setTotal(res)
        })
    },[workspaceId])




    return(
        <div className={"content-margin"}>
        <div className={"content-margin-box ws-init-content"}>
            <div className={"content-margin-box-header"}>
                <div className={"wd-header-name"}>{workspaceData?.workspaceName}</div>
            </div>
            <div className={"wd-total"}>
                <div className={"wd-title"}> 概要</div>
                <div className={"wd-total-box"}>
                    <div className={"wd-total-item"}>
                        <div className={"wd-total-item-title"}>{total?.apiTotal}</div>
                        <div className={"wd-total-item-name"}>API总数</div>
                    </div>
                    <div className={"wd-total-item"}>
                        <div className={"wd-total-item-title"}>{total?.categoryTotal}</div>
                        <div className={"wd-total-item-name"}>分组数</div>
                    </div>
                    <div className={"wd-total-item"}>
                        <div className={"wd-total-item-title"}>{total?.caseTotal}</div>
                        <div className={"wd-total-item-name"}>用例数</div>
                    </div>
                    <div className={"wd-total-item"}>
                        <div className={"wd-total-item-title"}>{total?.modelTotal}</div>
                        <div className={"wd-total-item-name"}>数据模型数</div>
                    </div>
                    <div className={"wd-total-item"}>
                        <div className={"wd-total-item-title"}>{total?.memberTotal}</div>
                        <div className={"wd-total-item-name"}>成员</div>
                    </div>
                </div>

            </div>
            <div >
                <div>
                    <div className={"wd-title"}>动态详情</div>
                    {/*<div>更多</div>*/}
                </div>
                <div className={"white-bg-box"}>
                    <DynamicWidget screen={{"workspaceId": workspaceId}}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(WorkspaceDetailInitPage));