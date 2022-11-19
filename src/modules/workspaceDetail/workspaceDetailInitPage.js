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


    const changeWorkspace = async (e) =>{
        let value = await form.validateFields();
        let values = {
            ...workspaceData,
            ...value,

        }
        updateWorkspace(values)
    }

    //头部搜索，防抖
    const debounce = (fn)=> {
        let timer;
        return function (e) {
            e.persist();//不加这个取不到e.target.value 的值
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, 500)
        }
    }

    return(
        <div className={"wd-content-margin"}>
        <div className={"wd-content"}>
            <div className={"wd-content-header"}>
                <Form
                    className='ws-edit-modal-form'
                    initialValues={{ remember: true }}
                    form={form}
                    // onFinish={onFinish}
                    preserve={false}
                >
                    <Form.Item
                        // label="应用名称"
                        rules={[{ required: true, message: '空间名' }]}
                        name="workspaceName"
                    >
                        <Input
                            // onChange={debounce(changeWorkspace)}
                            className={"wd-header-name"}
                            autoComplete="off"

                        />
                    </Form.Item>
                    <Form.Item
                        // label="描述"
                        name="desc"
                    >
                        <Input
                            className={"wd-header-desc"}
                            placeholder="用于描述空间的基本详情"
                            onChange={debounce(changeWorkspace)}
                            autoComplete="off"
                        />
                        {/*<svg className="icon" aria-hidden="true">*/}
                        {/*    <use xlinkHref= {`#icon-bianji`} />*/}
                        {/*</svg>*/}
                    </Form.Item>
                </Form>
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
                    <div className={"wd-title"}>活动详情</div>
                    {/*<div>更多</div>*/}
                </div>
                <div>
                    <DynamicWidget screen={{"workspaceId": workspaceId}}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(WorkspaceDetailInitPage));