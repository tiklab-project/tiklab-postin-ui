/**
 * @description：
 * @date: 2021-07-22 11:23
 */
import React,{useState} from 'react';
import { Modal, Form, Input} from 'antd';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

const AddVersion = (props) => {
    const {apxMethodStore}=props;
    const {createVersion}=apxMethodStore;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {setIsModalVisible(true)};

    const handleCancel = () => {setIsModalVisible(false)};

    const [form] = Form.useForm();

    const methodId = localStorage.getItem('apxMethodId')

    const onFinish = () => {
        form.validateFields().then((values)=>{
            const param = {
                'onVersionId': methodId,
                'id': methodId
            }
            const params = Object.assign(values,param)
            createVersion(params)
        })
        setIsModalVisible(false);
    };

    //获取时间戳
    const getTime = new Date().getTime()

    return (
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
                    initialValues={{'versionCode': getTime }}
                    form={form}
                >
                    <Form.Item
                        label="添加版本"
                        name="versionCode"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddVersion
