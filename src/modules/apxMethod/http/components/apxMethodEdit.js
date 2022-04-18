/*
 * @Description: 接口的添加与编辑
 * @Author: sunxiancheng
 * @update: 2021-05-08 17:45:07
 */

import React, { Fragment, useState } from 'react';
import { observer, inject } from 'mobx-react';
import {Modal, Form, Input, Button, Select, Cascader} from 'antd';
import {methodDictionary} from "../../../common/dictionary/dictionary";


const { Option } = Select;
const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

const ApxMethodEdit = (props) => {
    const {
        apxMethodStore,
        categoryStore,
        apixStore,
        setEdit,
        apixId,
        categoryItemId,
        pagination
    } =props;
    const {setIsAddTab,isAddTab} = apxMethodStore;
    const {createApix,findApix,updateApix,findApixPage} = apixStore;
    const { findCategoryList,categoryList } = categoryStore;

    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    const apxMethodId = localStorage.getItem('apxMethodId');
    const categoryId = localStorage.getItem("categoryId");
    const workspaceId = localStorage.getItem('workspaceId');
    const [cascaderCategoryId, setCascaderCategoryId] = useState("");
    const apiTabListInfo = JSON.parse(sessionStorage.getItem("apiTabListInfo"))

    // 弹框展示
    const showModal = () => {
        findCategoryList(workspaceId);

        if(props.type === "edit"){
            showApxMethodInfo();
        }

        setVisible(true);
    };

    const [status, setStatus] = useState();

    // 展示接口信息
    const showApxMethodInfo = () => {
        findApix(apixId?apixId:apxMethodId).then((res)=>{
            setStatus(res.status?.id)
            form.setFieldsValue({
                abc: res.name,
                requestType: res.requestType,
                path: res.path,
                desc: res.desc,
                // category:res.category.id
            })
            // form.setFieldsValue(res.data)
        })
    }

    // 弹框关闭
    const onCancel = () => {
        setVisible(false);
    };

    // 提交
    const onFinish =   () => {
        form.validateFields().then(values=>{
            values.protocolType="http";
            values.category = {id:cascaderCategoryId?cascaderCategoryId:categoryItemId};

            if(props.type === 'add'){
                createApix(values).then(()=>{
                    findApixPage({category:categoryId,...pagination});
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
                })
            }else{
                values.status={id:status}
                values.id=apixId;
                updateApix(values).then(()=>{
                    findApixPage({category:categoryId,...pagination});
                    findCategoryList(workspaceId)
                    setEdit?setEdit(true):null
                });
            }
            setVisible(false);
        })
    };

    //渲染 http 方法，如post，get
    const showMethod = (data) =>{
        return data&&data.map(item=>{
            return <Option value={item} key={item}>{item}</Option>
        })
    }

    function changeCategory(value) {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }


    return(
        <Fragment>
            {
                props.isBtn === 'btn'
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    :<a onClick={showModal}>{props.name}</a>
            }
            <Modal
                destroyOnClose={true}
                title={props.name === '+' ?"添加接口":props.name}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    {...layout}
                    preserve={false}
                    name="basic"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    form={form}
                >
                    <Form.Item
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
                    <Form.Item
                        label="接口名称"
                        name="abc"
                        rules={[{ required: true, message: 'Please input your interfacename!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="请求方式"
                        name="requestType"
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

export default inject('apxMethodStore','categoryStore',"apixStore")(observer(ApxMethodEdit));
