import React, {useEffect, useState} from "react";
import {Button, Collapse, Form, Input} from "antd";
import EdiText from "react-editext";
import {inject, observer} from "mobx-react";
import WorkspaceEdit from "../../workspace/components/workspaceEdit";
import DetailHeader from "../../common/detailHeader";
import DeleteWorkspaceModal from "./deleteWorkspaceModal";

const { Panel } = Collapse;
const {TextArea} = Input;


const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 1 },
};

const WorkspaceSetting = (props) =>{
    const {workspaceStore} = props;
    const {updateWorkspace,findWorkspace,deleteWorkspace} = workspaceStore;

    let workspaceId = localStorage.getItem("workspaceId");
    const [form] = Form.useForm();

    const [workspaceDetail, setWorkspaceDetail] = useState();
    const [workspaceName, setWorkspaceName] = useState();
    const [visibility, setVisibility] = useState(1);

    useEffect(()=>{
        findWorkspace(workspaceId).then(res=>{
            setWorkspaceDetail(res)
            setWorkspaceName(res.workspaceName)
            setVisibility(res.visibility)
            form.setFieldsValue({
                workspaceName: res.workspaceName,
                desc:res.desc
            })
        })
    },[workspaceId])

    const onFinish = (values) =>{
        values.visibility=visibility;
        let param = {
            id:workspaceId,
            iconUrl:workspaceDetail?.iconUrl,
            ...values,
        }

        updateWorkspace(param);
    }


    return(
        <div className={"ws-setting-flex"}>
            <div className={"ws-setting-box"}>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width: 90
                        }}>
                            <svg style={{width:20,height:20}} aria-hidden="true" >
                                <use xlinkHref= {`#icon-setting`} />
                            </svg>
                            <span>空间设置</span>
                        </div>
                    }
                />
                <Collapse  defaultActiveKey={['1']} >
                    <Panel header="编辑空间" key="1">
                        <div>
                            <Form
                                className='ws-edit-modal-form'
                                form={form}
                                preserve={false}
                                layout={"vertical"}
                                onFinish={onFinish}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                            >
                                <Form.Item
                                    label="应用名称"
                                    rules={[{ required: true, message: '添加目录名称!' }]}
                                    name="workspaceName"
                                >
                                    <Input style={{height:40}}/>
                                </Form.Item>
                                <Form.Item
                                    label="可见范围"
                                    name="visibility"
                                >
                                    <div className={"ws-setting-edit-visibility"}>
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
                                <Form.Item
                                    label="描述"
                                    name="desc"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item {...formItemLayout}>
                                    <Button type="primary" htmlType="submit" style={{ width: 100,height: 36}}>  保存 </Button>
                                </Form.Item>
                            </Form>


                        </div>

                    </Panel>
                    <Panel header="删除空间" key="2">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                                <div  style={{fontWeight:"bold"}}>删除此空间</div>
                                <div className={"ws-setting-delete"}>删除存储库后，将无法返回。请确定</div>
                            </div>

                            <DeleteWorkspaceModal
                                workspaceStore={workspaceStore}
                                workspaceName={workspaceName}
                                {...props}
                            />
                        </div>

                    </Panel>
                </Collapse>
            </div>

        </div>

    )
}

export default inject("workspaceStore")(observer(WorkspaceSetting));