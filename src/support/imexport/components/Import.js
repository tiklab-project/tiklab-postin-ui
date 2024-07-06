import React, {useState} from "react";
import {observer} from "mobx-react";
import {Form, Modal, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import Ajv from 'ajv';
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import {postmanJsonSchema20} from './postman-jsonSchema-2.0.js';
import categoryStore from "../../../category/store/CategoryStore";
import imexportStore from "../store/ImexportStore";

const { Dragger } = Upload;
const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};

const ajv = new Ajv();

const validate = ajv.compile(postmanJsonSchema20);

/**
 * 导入postman
 */
const Import = (props) => {
    const {workspaceId} = props;
    const {findCategoryList} = categoryStore;
    const {importPostman} = imexportStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);
    //上传的文件
    const [fileList,setFileList] = useState([]);
    //判断是否效验正确
    const [valid, setValid] = useState(false);

    const showModal = () => setVisible(true);

    const onFinish =  () => {
        form.validateFields().then(values=>{
            values.workspaceId = workspaceId
            importPostman(values).then((res)=>{
                if(res.code===0){
                    findCategoryList(workspaceId);
                    setFileList([]);
                    messageFn("success","导入成功")
                }else{
                    messageFn("error","导入失败")
                }
            })
        });

        setVisible(false);
    };

    const onCancel = () => {
        setVisible(false);
        setFileList([]);
        setValid(false);
    };


    /**
     * 上传前效验
     */
    const beforeUpload = async (file) => {
        try {
            // 读取上传的文件内容
            const text = await file.text();

            // 校验上传的文件内容是否符合JSON Schema
            const isValid = validate(JSON.parse(text));

            if (!isValid) {
                setValid(false)
                messageFn("error",'不符合Postman的文件!');
            }else {
                //效验成功
                setValid(true)
            }

        } catch (error) {
            setValid(false)
            messageFn("error",'校验文件失败');
        }

        return false;
    };

    /**
     * 改变
     */
    const handleChange = ({ file }) => {

        if(file.status==="removed"){
            setValid(false);
            setFileList([]);
        }else {
            if(valid){
                setFileList([file]);
            }else {
                setFileList([]);
            }
        }
    }

    /**
     * 获取文件
     */
    const normFile = (e) => {
        setFileList(e.fileList)
        return  e.file
    }


    return(
        <>
            <span onClick={showModal}>导入Postman</span>
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
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                >
                    <Form.Item
                        // label="导入文件"
                        name="file"
                        getValueFromEvent={normFile}
                    >

                        <Dragger
                            beforeUpload={beforeUpload}
                            fileList={fileList}
                            onChange={handleChange}
                            {...props}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">点击导入  postman 2.0  文件</p>

                        </Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default observer(Import);