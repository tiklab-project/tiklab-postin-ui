import React, {useEffect, useState} from "react";
import {Button, Col,Row, Collapse, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import DetailHeader from "../../common/DetailHeader";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";
import {DeleteOutlined, EditOutlined, ExportOutlined} from "@ant-design/icons";
import HtmlExport from "./export/HtmlExport";
import ExtensionCommon from "../../common/ExtensionCommon";
import {messageFn} from "../../common/messageCommon/MessageCommon";
const { Panel } = Collapse;
const {TextArea} = Input;

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 1 },
};

/**
 * 空间设置
 */
const WorkspaceSetting = (props) =>{
    const {workspaceStore,ExportPdf} = props;
    const {updateWorkspace,findWorkspace} = workspaceStore;

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

    const onFinish = async (values) =>{
        values.visibility=visibility;
        let param = {
            id:workspaceId,
            iconUrl:workspaceDetail?.iconUrl,
            ...values,
        }
        let data = await updateWorkspace(param);
        if(data&&data.code===0){
            messageFn("success","编辑成功")
        }else {
            messageFn("error","Error：编辑失败")
        }

    }


    return(
        <Row>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className={"ws-setting-flex"}>
                    <DetailHeader
                        left={
                            <div style={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between",
                                width: 90
                            }}>
                                {/*<svg style={{width:20,height:20}} aria-hidden="true" >*/}
                                {/*    <use xlinkHref= {`#icon-setting`} />*/}
                                {/*</svg>*/}
                                <span>空间信息</span>
                            </div>
                        }
                    />
                    <Collapse expandIconPosition={"end"}>
                        <Panel
                            header={<>
                                <div><EditOutlined/> <span style={{padding:"0 5px"}}>编辑空间</span></div>
                                <div className={"collapse-panel-desc"}>空间基本信息修改</div>
                            </>}
                            key="1"
                        >
                            <div>
                                <Form
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
                                        <Input style={{height:40}} placeholder={"请输入名称"}/>
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
                        <Panel
                            header={<>
                                <div><ExportOutlined />  <span style={{padding:"0 5px"}}>导出项目</span></div>
                                <div className={"collapse-panel-desc"}>可通过html/pdf导出项目接口</div>
                            </>}
                            key="2"
                        >
                            <div style={{"display":'flex',"gap":"10px"}}>
                                <HtmlExport />

                                <ExtensionCommon
                                    extension={ExportPdf&&<ExportPdf />}
                                    name={"PDF导出"}
                                    isBtn={true}
                                />
                            </div>
                        </Panel>
                        <Panel
                            header={<>
                                <div><DeleteOutlined />  <span style={{padding:"0 5px"}}>删除空间</span></div>
                                <div className={"collapse-panel-desc"}>删除当前空间，谨慎操作</div>
                        </>}
                               key="3"
                        >
                            <div >
                                <div style={{display:"flex",alignItems:"center",margin:"0 0 10px 0"}}>
                                    <div  style={{fontWeight:"bold"}}>删除此空间</div>
                                    <div className={"ws-setting-delete"}>(删除存储库后,将无法返回,请确定)</div>
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
            </Col>
        </Row>
    )
}

export default inject("workspaceStore")(observer(WorkspaceSetting));