import React from 'react';
import {Button, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui"

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const WorkspaceInit = (props) => {
    const {workspaceStore} = props;
    const {createWorkspace} = workspaceStore;
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then((values)=>{
            values.user= {id:getUser().userId};
            createWorkspace(values).then(id=>{
                //点击api按钮时初始化api中tab页信息
                const apiTabInfo = {
                    activeKey:0,
                    tabList:[
                        {
                            name:"初始页",
                            id:id,
                            type:"list",
                        }
                    ]
                }
                sessionStorage.setItem("apiTabListInfo",JSON.stringify(apiTabInfo))

                localStorage.setItem('workspaceId',id);
                props.history.push("/workspace")
            });
        })
    };

    return(
        <div className={'workspace-init-page'} >
            <div className={'ws-init-box'}>
                <div className={'ws-init-contant'}>
                    <div>
                        <h1>请创建项目</h1>
                    </div>
                    <div>
                        <Form
                            {...layout}
                            className='ws-edit-modal-form'
                            layout="vertical"
                            initialValues={{ remember: true }}
                            form={form}
                            onFinish={onFinish}
                            preserve={false}
                        >
                            <Form.Item
                                label="项目名称"
                                rules={[{ required: true, message: '请输入项目名称' }]}
                                name="workspaceName"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="描述" name="desc">
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    创建项目
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default inject('workspaceStore')(observer(WorkspaceInit));