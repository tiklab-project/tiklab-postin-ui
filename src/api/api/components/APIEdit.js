/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import {observer} from 'mobx-react';
import {Modal, Form, Input, Select} from 'antd';
import apiStore from "../store/APIStore";
import IconCommon from "../../../common/IconCommon";
import {methodDictionary} from "../../../common/dictionary/dictionary";
import {TextMethodType} from "../../../common/MethodType";
import apxMethodStore from "../../http/definition/store/ApxMethodStore";
import categoryStore from "../../../category/store/CategoryStore";

const {Option} = Select;
const {TextArea} = Input;

/**
 * 接口
 * 新增 编辑 弹框
 */
const APIEdit = (props) => {
    const {apiId,findPage,icon} = props
    const {updateApxMethod} = apxMethodStore;
    const {findApi,updateApi} = apiStore;
    const {findNodeTree} = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();
    const [apiInfo, setApiInfo] = useState();

    /**
     * 展示弹框
     */
    const showModal = () => {
        findApi(apiId).then((res)=>{
            setApiInfo(res)
            form.setFieldsValue({
                name: res.node.name,
                path: res.path,
                methodType: res.node.methodType,
                desc: res.desc,
            })
        })

        setVisible(true);
    };


    /**
     * 弹框关闭
     */
    const onCancel = () => {
        setVisible(false);
    };

    /**
     * 提交
     */
    const onFinish =  async () => {
        let values =await form.validateFields()
        values.id=apiId;

        if(apiInfo?.protocolType==="http"){
            values.apix={
                id:apiId,
                path:values.path,
                node:{
                    id:apiId,
                    name:values.name,
                }
            }
            await updateApxMethod(values)
        }else {
            values.node={
                id:apiId,
                name:values.name,
            }
            await updateApi(values)
        }

        await findPage();
        await findNodeTree({workspaceId:workspaceId});

        setVisible(false);
    };

    /**
     * 渲染 http 方法，如post，get
     */
    const showMethod = (data) =>{
        return data&&data.map((item,index)=>{
            return <Option value={item} key={index}> <TextMethodType type={item}/></Option>
        })
    }
    
    return(
        <Fragment>
            {
                icon
                    ?<IconCommon
                        icon={"bianji11"}
                        className={"icon-s edit-icon"}
                        onClick={showModal}
                    />
                    :<a onClick={showModal}>编辑</a>
            }

            <Modal
                destroyOnClose={true}
                title={props.type==="edit"?"编辑":"添加"}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    preserve={false}
                    initialValues={{ methodType: "get" }}
                    form={form}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="接口名称"
                        name="name"
                        rules={[{ required: true, message: '输入接口名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {
                        apiInfo?.protocolType==="http"
                            ?<Form.Item
                                label="请求方式"
                                name="methodType"
                                rules={[{ required: true, message: 'Please input your request!' }]}
                            >
                                <Select>
                                    {
                                        showMethod(methodDictionary)
                                    }
                                </Select>
                            </Form.Item>
                            :null
                    }
                    <Form.Item
                        label="接口路径"
                        name="path"
                        rules={[{ required: true, message: '输入接口路径!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <TextArea  rows={4}  placeholder="描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default observer(APIEdit);
