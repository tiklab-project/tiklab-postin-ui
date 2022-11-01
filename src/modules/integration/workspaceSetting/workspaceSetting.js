import React, {useEffect, useState} from "react";
import {Button, Collapse, Form, Input} from "antd";
import EdiText from "react-editext";
import {inject, observer} from "mobx-react";
import WorkspaceEdit from "../../workspace/components/workspaceEdit";
import DetailHeader from "../../common/detailHeader";

const { Panel } = Collapse;
const {TextArea} = Input;


const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 1 },
};

const WorkspaceSetting = (props) =>{
    const {workspaceStore} = props;
    const {updateWorkspace,findWorkspace,deleteWorkspace} = workspaceStore;

    let workspaceId = localStorage.getItem("workspaceId");
    const [form] = Form.useForm();

    useEffect(()=>{
        findWorkspace(workspaceId).then(res=>{
            form.setFieldsValue({
                workspaceName: res.workspaceName,
                desc:res.desc
            })
        })
    },[workspaceId])

    const onFinish = (values) =>{
        let param = {
            id:workspaceId,
            ...values,
        }
        updateWorkspace(param);
    }

    const deleteFn = (workspaceId) =>{
        deleteWorkspace(workspaceId).then(()=>{
            props.history.push("/workspacePage")
        })
    }


    return(
        <div className={"ws-setting-flex"}>
            <div className={"ws-setting-box"}>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width: 90
                        }}>
                            <svg style={{width:20,height:20}} aria-hidden="true" >
                                <use xlinkHref= {`#icon-setting`} />
                            </svg>
                            <span>空间设置</span>
                        </div>
                    }
                />
                <Collapse  >
                    <Panel header="编辑空间" key="1">
                        <div style={{width:800}}>
                            <Form
                                className='ws-edit-modal-form'
                                form={form}
                                preserve={false}
                                layout={"vertical"}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="应用名称"
                                    rules={[{ required: true, message: '添加目录名称!' }]}
                                    name="workspaceName"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="描述"
                                    name="desc"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item {...formItemLayout}>
                                    <Button type="primary" htmlType="submit">  保存 </Button>
                                </Form.Item>
                            </Form>


                        </div>

                    </Panel>
                    <Panel header="删除空间" key="2">
                        <div style={{color:"#ff6767","margin":"0 0 10px 0"}}>删除存储库后，将无法找回</div>
                        <Button type="primary" danger onClick={()=>deleteFn(workspaceId)}>删除空间</Button>
                    </Panel>
                </Collapse>
            </div>

        </div>

    )
}

export default inject("workspaceStore")(observer(WorkspaceSetting));