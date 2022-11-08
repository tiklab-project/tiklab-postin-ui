/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import {Modal, Form, Input, Button, Select, Cascader} from 'antd';
import {methodDictionary} from "../../../common/dictionary/dictionary";
import {TextMethodType} from "../../../common/methodType";

const { Option } = Select;

const ApxMethodEdit = (props) => {
    const {
        apxMethodStore,
        categoryStore,
        setEdit,
        httpId,
        categoryItemId,
        pagination
    } =props;
    const {setIsAddTab,isAddTab,findApxMethod,updateApxMethod,createApxMethod,findApxMethodListByApix} = apxMethodStore;

    const { findCategoryList,categoryList } = categoryStore;

    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    const apxMethodId = localStorage.getItem('apxMethodId');
    const categoryId = localStorage.getItem("categoryId");
    const workspaceId = localStorage.getItem('workspaceId');
    const [cascaderCategoryId, setCascaderCategoryId] = useState(categoryItemId);
    const apiTabListInfo = JSON.parse(sessionStorage.getItem("apiTabListInfo"))

    // 弹框展示
    const showModal = () => {
        findCategoryList(workspaceId);

        if(props.type === "edit"){
            showApxMethodInfo();
        }

        setVisible(true);
    };


    // 展示接口信息
    const showApxMethodInfo = () => {
        findApxMethod(httpId?httpId:apxMethodId).then((res)=>{
            form.setFieldsValue({
                name: res.apix.name,
                methodType: res.methodType,
                path: res.path,
                desc: res.apix.desc,
            })
        })
    }

    // 弹框关闭
    const onCancel = () => {
        setVisible(false);
    };

    // 提交
    const onFinish =  async () => {
        let values =await form.validateFields()
        delete values.category

        if(props.type === 'add'){
            values.apix={
                workspaceId:workspaceId,
                name:values.name,
                methodType:values.methodType,
                path:values.path,
                desc:values.desc,
                status: {id:"developmentid"},
                category:{id:cascaderCategoryId?cascaderCategoryId:categoryId},
                protocolType:"http",
            }

            createApxMethod(values).then((id)=>{
                findApxMethodListByApix(categoryId);
                findCategoryList(workspaceId);
                if(props.name==="+"){
                    let tablist = apiTabListInfo.tabList;
                    let length = apiTabListInfo.tabList.length;
                    tablist.push({
                        id:id,
                        name:values.name,
                        type:"api"
                    })
                    let newApiTabInfo = {
                        workspaceId:workspaceId,
                        activeKey:length++,
                        tabList:[...tablist]
                    }
                    sessionStorage.setItem("apiTabListInfo",JSON.stringify(newApiTabInfo))
                    setIsAddTab(!isAddTab);
                }

                localStorage.setItem('apxMethodId',id);
                props.history.push('/workspace/apis/detail/interface');
            })
        }else{
            values.id=httpId;
            values.apix={
                id:httpId,
                name:values.name
            }
            updateApxMethod(values).then(()=>{
                findApxMethodListByApix(categoryId);
                findCategoryList(workspaceId)
                setEdit?setEdit(true):null
            });
        }
        setVisible(false);

    };

    //渲染 http 方法，如post，get
    const showMethod = (data) =>{
        return data&&data.map(item=>{
            return(
                <Option value={item} key={item}>
                    <TextMethodType type={item}/>
                </Option>
            )
        })
    }

    function changeCategory(value) {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }

    const showClickView = ()=>{
        if(props.type==="edit"){
           return <svg className="icon-s edit-icon" aria-hidden="true" onClick={showModal}>
                    <use xlinkHref= {`#icon-bianji11`} />
                </svg>
        }

        if(props.isBtn==="btn"){
            return <Button className="important-btn" onClick={showModal}>{props.name}</Button>
        }

        if(props.icon){
            return <div onClick={showModal}> {props.icon}</div>
        }

        return <a onClick={showModal}> {props.name}</a>
    }

    return(
        <Fragment>
            {showClickView()}
            <Modal
                destroyOnClose={true}
                title={props.name}
                open={visible}
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
                            rules={[{ required: true, message: 'Please input your category!' }]}
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
                        rules={[{ required: true, message: 'Please input your interfacename!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
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
                    <Form.Item
                        label="接口路径"
                        name="path"
                        rules={[{ required: true, message: 'Please input your url!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default inject('apxMethodStore','categoryStore')(observer(ApxMethodEdit));
