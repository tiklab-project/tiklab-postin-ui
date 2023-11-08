import React, {useState} from "react";
import {Cascader, Form, Input, Modal} from "antd";
import {inject, observer} from "mobx-react";
import categoryStore from "../../../category/store/CategoryStore";
import quickTestStore from "../store/QuickTestStore";
import tabQuickTestStore from "../../store/TabQuickTestStore";

const SaveToApi = (props) =>{
    const { findCategoryList,categoryList } = categoryStore;
    const { baseInfo,headerList,queryList,requestBodyType,formList,formUrlList,rawInfo,preScript,afterScript } = tabQuickTestStore
    const { saveToApi } = quickTestStore


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const workspaceId = localStorage.getItem('workspaceId');
    const [cascaderCategoryId, setCascaderCategoryId] = useState();

    const showModal = async () => {
        await findCategoryList(workspaceId);

        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let values = await form.getFieldsValue()

        //保存为接口的数据
        let saveToApiData = {
            httpApi:{
                path:baseInfo.path,
                methodType:baseInfo.methodType,
                apix:{
                    name:values.name,
                    workspaceId:workspaceId,
                    category: {id:cascaderCategoryId},
                }
            },
            headerList:headerList.slice(0,-1),
            queryList:queryList.slice(0,-1),
            request:{
                bodyType:requestBodyType,
                preScript:preScript.scriptex,
                afterScript:afterScript.scriptex
            },
            formList:formList.slice(0,-1),
            formUrlList:formUrlList.slice(0,-1),
            raw:rawInfo
        }
debugger
        saveToApi(saveToApiData)

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    /**
     * 设置目录
     */
    function changeCategory(value) {
        //获取最后数组最后一位值
        const list = value.slice(-1);
        setCascaderCategoryId(list[0])
    }


    return(
        <>
            <div onClick={showModal}>保存为接口</div>
            <Modal
                destroyOnClose={true}
                title='保存为接口'
                visible={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="提交"
                cancelText="取消"
            >
                <Form
                    preserve={false}
                    className='testCase-edit-form'
                    form={form}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="用例名称"
                        name="name"
                        rules={[{
                            required: true,
                            message: '添加用例名称!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
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
                </Form>
            </Modal>
        </>
    )
}

export default observer(SaveToApi);