
import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Input, Row, Col, Select} from 'antd';
import {Axios} from "tiklab-core-ui";
import {toWorkspaceDetail} from "./WorkspaceFn";
import workspaceRecentStore from "../store/WorkspaceRecentStore";
import "./workspace.scss"

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
const WorkspaceEdit = (props) => {
    const {workspaceStore} = props;
    const {createWorkspace} = workspaceStore;
    const {workspaceRecent}=workspaceRecentStore;

    const [form] = Form.useForm();

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
            toWorkspaceDetail(res.data,workspaceRecent)

            props.history.push('/workspace');
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
        props.history.push("/workspace")
    };

    return (
        <div className="ws-edit-modal">
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
                        </div>

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
                        <div className={"ws-edit-box-footer"}>
                            <Button  onClick={onCancel} style={{margin:"0 10px 0 0"}} className={"ws-edit-box-footer-btn"}> 取消 </Button>
                            <Button type="primary" onClick={onFinish}  className={"ws-edit-box-footer-btn important-btn"}> 提交 </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default inject('workspaceStore')(observer(WorkspaceEdit));
