
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Input, Row, Col, Select,Modal} from 'antd';
import {Axios} from "thoughtware-core-ui";
import {toWorkspaceDetail} from "./WorkspaceFn";
import workspaceRecentStore from "../store/WorkspaceRecentStore";
import {useHistory} from "react-router";

const {TextArea} = Input
const {Option} = Select;

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24},
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

/**
 * 空间添加页面
 */
const WorkspaceAddModal = (props) => {
    const {workspaceStore} = props;
    const {createWorkspace,visible,setNewCreateWorkspaceModal} = workspaceStore;
    const {workspaceRecent}=workspaceRecentStore;

    const [form] = Form.useForm();

    const history = useHistory()
    const [visibility, setVisibility] = useState(1);
    const [memberList, setMemberList] = useState([]);
    const [memberSelectList, setMemberSelectList] = useState([]);

    useEffect( async () => {

        let param ={ }

        let res = await Axios.post('/user/user/findUserList',param);
        if(res.code===0){

            setMemberList(res.data)
        }

    },[])

    /**
     * 提交
     */
    const onFinish = async () => {
        let values = await form.validateFields();
        values.visibility=visibility
        values.userList = memberSelectList;
        values.iconUrl=iconRandom();

        //创建空间成功跳到空间详情
        createWorkspace(values).then((res)=> {
            setNewCreateWorkspaceModal(false);

            toWorkspaceDetail(res.data,workspaceRecent)

            localStorage.setItem("LEFT_MENU_SELECT","/workspace/quick/test")
            history.push('/workspace/quick/test');
        });
    };

    /**
     * 随机获取一张图片
     */
    const iconRandom = () =>{
        let arr = [
            "images/pi1.png",
            "images/pi2.png",
            "images/pi3.png",
            "images/pi4.png",
            "images/pi5.png",
        ]

        let index = Math.floor(Math.random()*arr.length)

        return arr[index]
    }


    /**
     * 成员下拉框选项
     */
    const showOption = (list) =>{
        return  list&&list.map((item) => {
            return<Option key={item.id} value={item.id}>
                <div className={"ws-edit-box-select"}>
                    {item.nickname}
                </div>
            </Option>
        })
    }

    /**
     * 成员选择，设置默认权限
     */
    const selectChange = (memberList) =>{
        if(memberList&&memberList.length>0){
            let newList=memberList.map(item=>({
                userId:item,
                roleType:0
            }))
            setMemberSelectList(newList)
        }

    }


   /**
    * 关闭
    */
    const onCancel = () => {
       setNewCreateWorkspaceModal(false);
    };

    return (
        <Modal
            title="添加空间"
            open={visible}
            onOk={onFinish}
            onCancel={onCancel}
            width={600}
            okText="确定"
            cancelText="取消"
        >
            <div className="ws-edit-modal">
                <Row>
                    <Col span={24}>
                        <div className={"ws-edit-box"}>
                            <Form
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
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default inject('workspaceStore')(observer(WorkspaceAddModal));
