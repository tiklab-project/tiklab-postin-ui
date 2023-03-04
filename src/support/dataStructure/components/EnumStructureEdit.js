import React from "react";
import {Button, Form, Input, Modal, Radio, Select, Tooltip} from "antd";
import {dataTypeDictionary} from "../../../common/dictionary/dictionary";
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/IconCommon";
const {TextArea} = Input
const {Option} = Select;

/**
 * 枚举结构 添加编辑
 */
const EnumStructureEdit = (props) =>{
    const {enumParamDSStore,dataItemId,dataStructureId} = props;
    const {
        createEnumParamDS,
        updateEnumParamDS,
        findEnumParamDS,
        findEnumParamDSList
    } = enumParamDSStore;

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);


    /**
     * 弹框展示
     */
    const showModal = async () => {

        if(props.type==="edit"){
            let res = await findEnumParamDS(dataItemId);
            form.setFieldsValue({
                paramName:res.paramName,
                dataType:res.dataType,
                required:res.required,
                description:res.description
            })
        }

        setVisible(true);
    }


    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields()
        values.dataStructure={id:dataStructureId}
        if(props.type==="add"){
            await createEnumParamDS(values)
        }else {
            values.id=dataItemId
            await updateEnumParamDS(values)
        }

        await findEnumParamDSList(dataStructureId);
        setVisible(false)
    }

    /**
     * 取消
     */

    const onCancel = () => { setVisible(false) };


    /**
     * 渲染按钮的样式
     */
    const showView = () =>{
        if(props.btn==="btn"&&props.type==="add"){
           return <IconBtn
                   className="important-btn"
                   onClick={showModal}
                   name={"添加"}
                />
        }

        if(props.type==="edit"){
           return (
               <IconCommon
                   icon={"bianji11"}
                   className={"icon-s edit-icon"}
                   onClick={showModal}
               />
           )
        }
    }

    return(
        <>
            { showView() }
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
                    form={form}
                    preserve={false}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="名称"
                        rules={[{ required: true }]}
                        name="paramName"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        rules={[{ required: true}]}
                        name="dataType"
                    >
                          <Select >
                              {
                                  dataTypeDictionary.map(item=>{
                                      return <Option key={item} value={item}>{item}</Option>
                                  })
                              }
                          </Select>
                    </Form.Item>
                    <Form.Item
                        label="必须"
                        rules={[{ required: true}]}
                        name="required"
                    >
                        <Radio.Group >
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="说明"  name="description" >
                        <TextArea  rows={4}  placeholder="说明"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EnumStructureEdit;