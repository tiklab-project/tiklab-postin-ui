/*
 * @Description: 添加与编辑空间组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:22:18
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Radio} from 'antd';

const {TextArea} = Input

const WorkspaceEdit = (props) => {
    const { workspaceStore, workspaceId,findList,selectItem } = props;
    const {
        createWorkspace,
     } = workspaceStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [visibility, setVisibility] = useState(1);

    /**
     * 弹框展示
     */
    const showModal = async () =>    setVisible(true);

    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        values.visibility=visibility

        createWorkspace(values).then(()=>  findList({},selectItem) );

        props.history.push("/workspacePage");

        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.btn === 'btn'
                ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
        }
        <Modal
            destroyOnClose={true}
            title={props.name}
            open={visible}
            onCancel={onCancel}
            onOk={onFinish}
            okText="提交"
            cancelText="取消"
            centered
            width={600}
        >
            <div className={"ws-edit-box"}>
                <Form
                    className='ws-edit-modal-form'
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="空间名称"
                        rules={[{ required: true, message: '添加目录名称!' }]}
                        name="workspaceName"
                    >
                        <Input  placeholder="空间名称"/>
                    </Form.Item>
                    <Form.Item
                        label="可见范围"
                        name="visibility"
                    >
                        <div className={"ws-edit-visibility"}>
                            <div className={`ws-edit-visibility-item ${visibility===0?"ws-edit-visibility-action":null}`} onClick={()=>setVisibility(0)}>
                                <div style={{"display":"flex","alignItems":"center"}}>
                                    <svg style={{width:20,height:20}} aria-hidden="true">
                                        <use xlinkHref= {`#icon-suoding`} />
                                    </svg>
                                    <span>公共</span>
                                </div>
                                <div className={"ws-edit-visibility-item-desc"}>公共项目，全部成员可见</div>
                            </div>

                            <div className={`ws-edit-visibility-item  ${visibility===1?"ws-edit-visibility-action":null}`}  onClick={()=>setVisibility(1)}>
                                <div style={{"display":"flex","alignItems":"center"}} >
                                    <svg style={{width:20,height:20}} aria-hidden="true">
                                        <use xlinkHref= {`#icon-jiesuo`} />
                                    </svg>
                                    <span>私密</span>
                                </div>
                                <div className={"ws-edit-visibility-item-desc"}>私密项目，只有项目成员可见</div>
                            </div>

                        </div>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <TextArea  rows={4}  placeholder="空间的描述"/>
                    </Form.Item>
                </Form>


            </div>

        </Modal>
        </>
    );
};

export default inject('workspaceStore')(observer(WorkspaceEdit));
