import React, {useState} from "react";
import {observer} from "mobx-react";
import {Form, Modal, Upload} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import Ajv from 'ajv';
import {messageFn} from "../../../common/messageCommon/MessageCommon";
import {postmanJsonSchema20} from './postman-jsonSchema-2.0.js';
import categoryStore from "../../../category/store/CategoryStore";
import imexportStore from "../store/ImexportStore";
import "./importStyle.scss"
import IconCommon from "../../../common/IconCommon";
import SwaggerParser from '@apidevtools/swagger-parser';

const { Dragger } = Upload;
const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};

const ajv = new Ajv();
const validatePostman = ajv.compile(postmanJsonSchema20);

const importItem = {
    postman:"postman",
    swagger2:"swagger2",
    openapi:"openapi"
}

/**
 * 导入postman
 */
const Import = (props) => {
    const {workspaceId} = props;
    const {findNodeTree} = categoryStore;
    const {importData} = imexportStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);

    const [selectedItem, setSelectedItem] = useState(importItem.postman);
    //上传的文件
    const [fileList,setFileList] = useState([]);
    //判断是否效验正确
    const [valid, setValid] = useState(false);

    const showModal = () => setVisible(true);

    const onFinish =  () => {
        form.validateFields().then(values=>{
            values.workspaceId = workspaceId
            values.type = selectedItem
            importData(values).then((res)=>{
                if(res.code===0){
                    findNodeTree({workspaceId:workspaceId})
                    setFileList([]);
                    messageFn("success","导入成功")
                }else{
                    messageFn("error","导入失败")
                }
            })


        });

        onCancel();
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
            const jsonData = JSON.parse(text);

            switch (selectedItem) {
                case importItem.postman:
                    // 校验上传的文件内容是否符合JSON Schema
                    const isValid = validatePostman(jsonData);
                    if (!isValid) {
                        setValid(false)
                        messageFn("error",'不符合Postman的文件!');
                    }else {
                        //效验成功
                        setValid(true)
                    }
                    break;
                case importItem.swagger2:
                    try {
                        await SwaggerParser.validate(jsonData);
                        setValid(true);
                    } catch (error) {
                        setValid(false);
                        messageFn("error", '不符合Swagger的文件!');
                    }
                    break;
                case importItem.openapi:
                    try {
                        await SwaggerParser.validate(jsonData);
                        setValid(true);
                    } catch (error) {
                        setValid(false);
                        messageFn("error", '不符合OpenAPI的文件!');
                    }
                    break;
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
                <div className={"import-modal"}>
                    <div>数据类型</div>
                    <ImportItem
                        setSelectedItem={setSelectedItem}
                        selectedItem={selectedItem}
                    />

                    <div>导入json文件</div>
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                        preserve={false}
                    >
                        <Form.Item
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
                                <div>上传文件</div>
                            </Dragger>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    )
}

export default observer(Import);


const ImportItem = (props)=>{
    const {selectedItem,setSelectedItem} = props

    const items = [
        {
            title:"Postman",
            value:importItem.postman,
            icon:"postman"
        },
        {
            title:"Swagger V2",
            value:importItem.swagger2,
            icon:"swagger"
        },
        {
            title:"OpenApi V3",
            value:importItem.openapi,
            icon:"openapi"
        }
    ]

    return(
        <div className={"import-box"}>
            {
                items.map((item)=>{
                    return(
                        <div
                            key={item.value}
                            className={`import-item ${selectedItem===item.value&&"import-item-selected"}`}
                            onClick={()=>setSelectedItem(item.value)}
                        >
                            <IconCommon icon={item.icon} className={"icon-m"}/>
                            <span>{item.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}