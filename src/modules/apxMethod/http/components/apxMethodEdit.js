/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import {observer, inject} from 'mobx-react';
import {Modal, Form, Input, Button, Select, Cascader} from 'antd';
import {methodDictionary} from "../../../common/dictionary/dictionary";
import {TextMethodType} from "../../../common/methodType";
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/iconCommon";

const {Option} = Select;
const {TextArea} = Input;

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
                if(props.tab){
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
                workspaceId:workspaceId,
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
        return data&&data.map((item,index)=>{
            return <Option value={item} key={index}> <TextMethodType type={item}/></Option>
        })
    }

    function changeCategory(value) {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }

    //不同地方，展示不同按钮的效果
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
                        <TextArea  rows={4}  placeholder="描述"/>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default inject('apxMethodStore','categoryStore')(observer(ApxMethodEdit));
