import React, {useState} from "react";
import Modal from "antd/es/modal/Modal";
import {Button, Form} from "antd";
import Input from "antd/es/input/Input";
import {
    createVersion,
    compareVersion,
    findVersionList
} from "../api/versionApi"

const layout = {
    labelCol: { span: 5 },
    wrapperCol: {span: 19},
};

const VersionAdd = (props) =>{

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {setIsModalVisible(true)};
    const handleCancel = () => {setIsModalVisible(false)};

    const [form] = Form.useForm();

    const methodId = localStorage.getItem('apxMethodId');

    const onFinish = async () => {
        let values = await form.validateFields();

        values.apiUid=methodId
        createVersion(values)

        setIsModalVisible(false);
    };

    return(
        <>
            <a type="primary" onClick={showModal}>
                添加版本
            </a>
            <Modal
                title="添加版本"
                visible={isModalVisible}
                destroyOnClose={true}
                onCancel={handleCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
            >
                <Form
                    {...layout}
                    preserve={false}
                    name="basic"
                    // initialValues={{'versionCode': getTime }}
                    form={form}
                >
                    <Form.Item
                        label="添加版本"
                        name="version"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default VersionAdd;