import React from 'react';
import {Button, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import initPage from '../../../assets/img/backgroundimg.jpg'
import {getUser} from "doublekit-core-ui"

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const WorkspaceInitPage = (props) => {
    const {workspaceStore} = props;
    const {createWorkspace} = workspaceStore;
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then((values)=>{
            values.user= {id:getUser().userId};
            createWorkspace(values).then(res=>{
                localStorage.setItem('workspaceId',res.data);
                props.history.push("/workspacepage")
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
                            name="basic"
                            initialValues={{ remember: true }}
                            form={form}
                            onFinish={onFinish}
                            preserve={false}
                            labelCol={{ style: { width: '100%', height: '30px' } }} //label样式
                            labelAlign="left" //label样式
                        >
                            <Form.Item
                                label="项目名称"
                                rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
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

export  default inject('workspaceStore')(observer(WorkspaceInitPage));