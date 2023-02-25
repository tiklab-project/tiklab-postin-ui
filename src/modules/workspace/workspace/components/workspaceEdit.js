/*
 * @Description: 添加与编辑空间组件
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:22:18
 */
import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import {Form, Modal, Button, Input, Radio, Row, Col, Select} from 'antd';
import IconCommon from "../../../common/iconCommon";
import {Axios, getUser} from "tiklab-core-ui";
import {Profile} from "tiklab-eam-ui";
import IconBtn from "../../../common/iconBtn/IconBtn";

const {TextArea} = Input
const {Option} = Select;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24},
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

const WorkspaceEdit = (props) => {
    const { workspaceStore, workspaceId,findList,selectItem } = props;
    const {
        createWorkspace,
     } = workspaceStore;

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [visibility, setVisibility] = useState(1);
    const [memberList, setMemberList] = useState([]);
    const [memberSelectList, setMemberSelectList] = useState([]);

    /**
     * 弹框展示
     */
    const showModal = async () => {

        let param ={ }

        let res = await Axios.post('/user/user/findUserList',param);
        if(res.code===0){

            setMemberList(res.data)
        }

        setVisible(true);
    }

    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        values.visibility=visibility
        values.memberList = memberSelectList;
        values.iconUrl=iconRandom();

        createWorkspace(values).then(()=>  findList({},selectItem) );

        props.history.push("/workspacePage");

        setVisible(false);
    };

    //随机获取一张图片
    const iconRandom = () =>{
        let arr = [
            "/images/pi1.png",
            "/images/pi2.png",
            "/images/pi3.png",
            "/images/pi4.png",
            "/images/pi5.png",
        ]

        let index = Math.floor(Math.random()*arr.length)

        return arr[index]
    }


    //成员下拉框选项
    const showOption = (list) =>{
        return  list&&list.map((item) => <Option key={item.id} value={item.id}>
            <div className={"ws-edit-box-select"}>
                <Profile userInfo={item}/>
                {item.name}
            </div>
        </Option>
        )
    }

    //成员选择
    const selectChange = (memberId) =>{
        setMemberSelectList(memberId)
    }

    //关闭
    const onCancel = () => { setVisible(false) };

    return (
        <>
        {
            props.btn === 'btn'
                ? <IconBtn
                    className="important-btn"
                    onClick={showModal}
                    name={"添加空间"}
                />
                : <a style={{'cursor':'pointer'}} onClick={showModal}>{props.name}</a>
        }
        <Modal
            destroyOnClose={true}
            title={"添加"}
            visible={visible}
            onCancel={onCancel}
            onOk={onFinish}
            // okText="提交"
            // cancelText="取消"
            footer={false}
            mask={false}
            width={"100vw"}
            className="ws-edit-modal"
        >
            <Row>
                <Col
                    lg={{ span: "18", offset: "3" }}
                    xl={{ span: "14", offset: "5" }}
                    xxl={{ span: "10", offset: "7" }}
                    style={{ height: "100%" }}
                >
                    <div className={"ws-edit-box"}>
                        <div className={"ws-edit-box-header"}>
                            <div className={"ws-edit-box-header-title"}>添加空间</div>
                            <div>
                                <IconCommon
                                    icon={"shanchu2"}
                                    style={{"cursor": "pointer"}}
                                    className={"icon-s"}
                                    onClick={onCancel}
                                />
                            </div>
                        </div>

                        <Form
                            className='ws-edit-modal-form'
                            form={form}
                            preserve={false}
                            layout={"vertical"}
                            {...layout}
                        >
                            <div className={"ws-edit-form-input"}>
                                <Form.Item
                                    label="空间名称"
                                    rules={[{ required: true, message: '添加目录名称!' }]}
                                    name="workspaceName"
                                >
                                    <Input  placeholder="空间名称"/>
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="可见范围"
                                name="visibility"
                            >
                                <div className={"ws-edit-visibility"}>
                                    <div className={`ws-edit-visibility-item ${visibility===0?"ws-edit-visibility-action":null}`} onClick={()=>setVisibility(0)}>
                                        <div style={{"display":"flex","alignItems":"center"}}>
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-suoding`} />
                                            </svg>
                                            <span>公共</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>公共项目，全部成员可见</div>
                                    </div>

                                    <div className={`ws-edit-visibility-item  ${visibility===1?"ws-edit-visibility-action":null}`}  onClick={()=>setVisibility(1)}>
                                        <div style={{"display":"flex","alignItems":"center"}} >
                                            <svg style={{width:20,height:20}} aria-hidden="true">
                                                <use xlinkHref= {`#icon-jiesuo`} />
                                            </svg>
                                            <span>私密</span>
                                        </div>
                                        <div className={"ws-edit-visibility-item-desc"}>私密项目，只有项目成员可见</div>
                                    </div>
                                </div>
                            </Form.Item>
                            {
                                visibility===1
                                ? <div className={"ws-edit-form-input"}>
                                        <Form.Item  label="成员选取" {...tailLayout} >
                                            <Select
                                                mode="multiple"
                                                style={{   width: '100%'}}
                                                showArrow
                                                onChange={selectChange}
                                                placeholder={"成员选取"}
                                            >
                                                {showOption(memberList)}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    :null
                            }

                            <Form.Item
                                label="描述"
                                name="desc"
                            >
                                <TextArea  rows={4}  placeholder="空间的描述"/>
                            </Form.Item>
                        </Form>
                        <div className={"ws-edit-box-footer"}>
                            <Button  onClick={onCancel} style={{margin:"0 10px 0 0"}} className={"ws-edit-box-footer-btn"}> 取消 </Button>
                            <Button type="primary" onClick={onFinish}  className={"ws-edit-box-footer-btn important-btn"}> 提交 </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Modal>
        </>
    );
};

export default inject('workspaceStore')(observer(WorkspaceEdit));
