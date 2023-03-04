import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Form, Input, Modal, Select,Button, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

/**
 * 导入
 */
const Import = (props) => {
    const {imexportStore,workspaceId} = props;
    const {importData} = imexportStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    const [fileList,setFileList] = useState([]);

    const showModal = () => setVisible(true);

    const onFinish =  () => {
        form.validateFields().then(values=>{
            values.workspaceId = workspaceId
            importData(values)
        });
        setFileList([])
        setVisible(false);
    };

    const onCancel = () => { setVisible(false) };

    /**
     * 获取文件
     */
    const normFile = (e) => {
        setFileList(e.fileList)
        return  e.file
    };

    const beforeUpload = ({fileList}) =>  false;

    return(
        <>
            <span onClick={showModal}>导入</span>
            <Modal
                destroyOnClose={true}
                title={'导入'}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
            >
                <Form
                    {...layout}
                    className='ws-edit-modal-form'
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                >
                    <Form.Item
                        label="导入类型"
                        rules={[{ required: true, message: '' }]}
                        name="type"
                    >
                        <Select>
                            <Option value={'postman'}>Postman</Option>
                            <Option value={'report'}>Report</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="导入文件"
                        name="file"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            beforeUpload={beforeUpload} //返回false时就会停止文件的自动上传。
                        >
                            {
                                fileList.length<1
                                    ?<Button icon={<UploadOutlined />}>Click to upload</Button>
                                    :null
                            }
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default inject('imexportStore')(observer(Import));