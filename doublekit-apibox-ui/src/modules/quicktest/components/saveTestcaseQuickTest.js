import React, {useState} from "react";
import {Button, Cascader, Form, Input, Modal} from "antd";
import {saveTestcaseProcess} from "../../common/tableCommon/components/saveTestcaseCommon";

const SaveTestcaseQuickTest = (props) =>{
    const {
        headerList,
        queryList,
        bodyType,
        formDataList,
        formUrlencodedList,
        jsonList,
        rawInfo,
        preInfo,
        afterInfo,
        assertList,
        categoryStore,
        testCaseStore,
        formRef
    } = props;

    const { createTestcaseWithNest,findTestCaseList } = testCaseStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [baseInfo, setBaseInfo] = useState();


    const showModal =  () => {
        //获取测试基本信息， method，baseurl，path
        const formValues=formRef.getFieldsValue()
        setBaseInfo(formValues)


        setVisible(true);
    };

    const onFinish = () => {
        form.validateFields().then((values)=>{
            let needProcessData = {
                headerList:headerList,
                queryList:queryList,
                bodyType:bodyType,
                formDataList:formDataList,
                formUrlencodedList:formUrlencodedList,
                jsonList:jsonList,
                rawInfo:rawInfo,
                preInfo:preInfo,
                afterInfo:afterInfo,
                assertList:assertList
            }

            //处理后的数据
            let processedData = saveTestcaseProcess(needProcessData)

            //所有的数据
            let valueData = {
                'method':{ id: "quickTest"},
                ...values,
                ...processedData,
                ...baseInfo
            }

            //创建用例
            createTestcaseWithNest(valueData).then(res=>{
                findTestCaseList("quickTest")
            });

        })

        setVisible(false);
    }

    const onCancel = () => {setVisible(false)};

    return(
        <>
            <Button className="important-btn" onClick={showModal}>保存用例</Button>
            <Modal
                destroyOnClose={true}
                title='保存用例'
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
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用例名称"
                        name="name"
                        rules={[{ required: true,message: '添加用例名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}

export default SaveTestcaseQuickTest;