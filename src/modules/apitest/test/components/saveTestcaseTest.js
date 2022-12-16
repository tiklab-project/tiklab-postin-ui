import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Modal, Button, Input,message } from 'antd';
import {saveTestcaseProcess} from "../../../common/tableCommon/components/saveTestcaseCommon";

const SaveTestcase = (props) => {
    const {
        testCaseStore,
        requestHeaderTestStore,
        queryParamTestStore,
        requestBodyTestStore,
        formParamTestStore,
        formUrlencodedTestStore,
        jsonParamTestStore,
        rawParamTestStore,
        preParamTestStore,
        afterParamTestStore,
        assertParamTestStore,
    } = props;


    const { requestHeaderTestList } = requestHeaderTestStore;
    const { queryParamTestList } = queryParamTestStore;
    const { bodyTypeInfo } = requestBodyTestStore;
    const { formParamTestList } = formParamTestStore;
    const { formUrlencodedTestList} = formUrlencodedTestStore;
    const { jsonParamTestList } = jsonParamTestStore;
    const { rawParamTestInfo } = rawParamTestStore;
    const { preParamTestInfo } = preParamTestStore;
    const { afterParamTestInfo } = afterParamTestStore;
    const { assertParamTestList } = assertParamTestStore;

    const { createTestcaseWithNest } = testCaseStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const apxMethodId = localStorage.getItem('apxMethodId');


    const showModal = () => {
        setVisible(true);
    };


    const onFinish = () => {
        form.validateFields().then((values)=>{

            let needProcessData = {
                headerList:requestHeaderTestList,
                queryList:queryParamTestList,
                bodyType:bodyTypeInfo,
                formDataList:formParamTestList,
                formUrlencodedList:formUrlencodedTestList,
                jsonList:jsonParamTestList,
                rawInfo:rawParamTestInfo,
                preInfo:preParamTestInfo,
                afterInfo:afterParamTestInfo,
                assertList:assertParamTestList
            }

            //处理后的数据
            let processedData = saveTestcaseProcess(needProcessData)

            //所有的数据
            let valueData = {
                'http':{ id:apxMethodId },
                ...values,
                ...processedData
            }

            createTestcaseWithNest(valueData).then(res=>{
                if(res.code===0){
                    message.success("添加成功")
                }
            });
        })

        setVisible(false);
    };


    const onCancel = () => {setVisible(false)};

    return(
        <>
        <Button className="important-btn" onClick={showModal}>保存用例</Button>
        <Modal
            destroyOnClose={true}
            title='+保存用例'
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
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
            </Form>
        </Modal>
        </>
    )
}

export default inject( 'assertParamTestStore')(observer(SaveTestcase));
