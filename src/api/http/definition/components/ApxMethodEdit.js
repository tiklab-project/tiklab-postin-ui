/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import {observer} from 'mobx-react';
import {Modal, Form, Input, Select, Cascader} from 'antd';
import {methodDictionary} from "../../../../common/dictionary/dictionary";
import {TextMethodType} from "../../../../common/MethodType";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import IconCommon from "../../../../common/IconCommon";
import categoryStore from "../../../../category/store/CategoryStore";
import apxMethodStore from "../store/ApxMethodStore";
import apiStore from "../../../api/store/APIStore";
import {useHistory} from "react-router";

const {Option} = Select;
const {TextArea} = Input;

/**
 * 接口
 * http
 * 新增 编辑 弹框
 */
const ApxMethodEdit = (props) => {
    const {
        setEdit,
        httpId,
        categoryItemId
    } =props;
    const {findApxMethod,updateApxMethod,createApxMethod} = apxMethodStore;
    const { findNodeTree,categoryList } = categoryStore;
    const {findApiPage} = apiStore;

    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory()

    const apiId = localStorage.getItem('apiId');
    const categoryId = localStorage.getItem("categoryId");
    const workspaceId = localStorage.getItem('workspaceId');
    const [cascaderCategoryId, setCascaderCategoryId] = useState(categoryItemId);

    /**
     * 展示弹框
     */
    const showModal = async () => {
        await findNodeTree({workspaceId:workspaceId});

        if(props.type === "edit"){
            showApxMethodInfo();
        }

        setVisible(true);
    };

    /**
     * 展示接口信息
     */
    const showApxMethodInfo = () => {
        findApxMethod(httpId?httpId:apiId).then((res)=>{
            form.setFieldsValue({
                name: res.node.name,
                path: res.path,
                methodType: res.node.methodType,
                desc: res.desc,
            })
        })
    }

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
        delete values.category

        if(props.type === 'add'){
            values.apix={
                path:values.path,
                desc:values.desc,
                categoryId:cascaderCategoryId?cascaderCategoryId:categoryId,
            }
            values.node={
                name:values.name,
                workspace: {id:workspaceId},
                methodType:values.methodType,
                parentId:cascaderCategoryId?cascaderCategoryId:categoryId,
            }

            delete values.methodType
            createApxMethod(values).then((id)=>{
                let param = {
                    pageParam: {
                        pageSize: 20,
                        currentPage:1
                    },
                    categoryId:categoryId,
                }
                findApiPage(param);
                findNodeTree({workspaceId:workspaceId});

                localStorage.setItem('apiId',id);
                history.push("/workspace/apis/http/edit");
            })
        }else{
            values.id=httpId;
            values.apix={
                id:httpId,
                path:values.path,
                node:{
                    id:httpId,
                    name:values.name,
                }
            }
            updateApxMethod(values).then(()=>{
                let param = {
                    pageParam: {
                        pageSize: 20,
                        currentPage:1
                    },
                    categoryId:categoryId,
                }
                findApiPage(param);
                findNodeTree({workspaceId:workspaceId});

                setEdit?setEdit(true):null
            });
        }
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

    /**
     * 设置目录
     */
    function changeCategory(value) {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }

    /**
     * 不同地方，展示不同按钮的效果
     */
    const showClickView = ()=>{
        if(props.type==="edit"){
           return (
               <IconCommon
                   icon={"bianji11"}
                   className={"icon-s edit-icon"}
                   onClick={showModal}
               />
           )
        }

        if(props.isBtn==="btn"){
            return <IconBtn
                className="important-btn"
                onClick={showModal}
                name={"添加接口"}
                type="primary"
            />
        }

        if(props.icon){
            return <div onClick={showModal}> {props.icon}</div>
        }

        if(props.tab){
            return <div  className={"init-tab-item"} onClick={showModal}>
                <div className={"init-tab-item-icon"}>
                    <IconCommon
                        icon={`APIwangguan`}
                        style={{margin:"0 10px 0 0"}}
                        className={"icon-x"}
                    />
                </div>
                <div className={"init-tab-item-title"}>新建接口</div>
            </div>
        }

        return <a onClick={showModal}> {props.name}</a>
    }

    return(
        <Fragment>
            {showClickView()}
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
                    {
                        props.tab && <Form.Item
                            label="分组"
                            name="category"
                            rules={[{ required: true, message: '请选择分组' }]}
                        >
                            <Cascader
                                fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                options={categoryList}
                                onChange={changeCategory}
                                changeOnSelect
                                expandTrigger={"hover"}
                            />
                        </Form.Item>
                    }

                    <Form.Item
                        label="接口名称"
                        name="name"
                        rules={[{ required: true, message: '请输入接口名称' }]}
                    >
                        <Input placeholder="请输入接口名称"/>
                    </Form.Item>
                    <Form.Item
                        label="请求方式"
                        name="methodType"
                        rules={[{ required: true, message: '请选择请求方式' }]}
                    >
                        <Select>
                            {
                                showMethod(methodDictionary)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="接口路径"
                        name="path"
                        rules={[
                            {
                                required: true,
                                message: '接口路径格式不正确！',
                                pattern: /^\/.*/
                            },
                        ]}
                    >
                        <Input placeholder="请输入接口路径"/>
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

export default observer(ApxMethodEdit);
