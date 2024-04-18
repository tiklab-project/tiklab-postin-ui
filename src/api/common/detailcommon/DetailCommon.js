import React, {useEffect, useState} from "react";
import {Form, Row, Col, TreeSelect, Select,Input} from "antd";
import {observer} from "mobx-react";
import {Axios} from "thoughtware-core-ui";
import categoryStore from "../../../category/store/CategoryStore";
import "./DetailCommonStyle.scss"
import ApiStatusModal from "../../../support/apiStatus/components/ApiStatusSelect";
import MethodType from "../../../common/MethodType";
import {methodDictionary} from "../../../common/dictionary/dictionary";
import IconCommon from "../../../common/IconCommon";

const {Option} = Select
const {TextArea} = Input
const tailLayout = {
    labelCol:{span: 4}
};

/**
 * 用于详情
 */
const DetailCommon = (props) =>{
    const {updateApi,form,apiInfo,updateStatus,methodType} = props;
    const {findCategoryTree} = categoryStore;
    const [userList, setUserList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [visible, setVisible] = useState(false);

    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(async ()=>{
        let list = await findCategoryTree({workspaceId:workspaceId});
        setCategoryList(list)
    },[])

    useEffect(async ()=>{
        const params = {
            domainId:workspaceId,
        };
        const res = await Axios.post("/dmUser/findDmUserPage",params);
        if(res.code===0){
            setUserList(res.data.dataList)
        }
    },[])

    return(
        <div className={"detail-box"}>
            <Form
                form={form}
                layout="inline"
                onValuesChange={updateApi}
                className={"base-info-form"}
                {...tailLayout}
            >
                <Row gutter={[0,10]}>
                    <Col span={11}>
                        <Form.Item label={"名称"} name="name">
                            <Input placeholder={"名称"} />
                        </Form.Item>
                    </Col>
                    {
                        methodType
                            ?<Col span={10}>
                                <Form.Item label={"类型"} name="methodType" >
                                    <Select>
                                        {
                                            methodDictionary.map(item=>{
                                                return(
                                                    <Option value={item} key={item}>
                                                        <MethodType type={item} />
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            : <Col span={10} />
                    }
                    <Col span={11}>
                        <Form.Item label={"路径"} name="path" >
                            <Input placeholder={"无"} />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label={"状态"} name="status" >
                            <ApiStatusModal
                                selectStatus={updateStatus}
                                status={apiInfo?.status?.id}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label={"分组"} name="category" >
                            <TreeSelect
                                fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                style={{  width: '100%'}}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                placeholder="选择模块"
                                allowClear
                                treeDefaultExpandAll
                                treeData={categoryList}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        <Form.Item label={"负责人"} name="executor">
                            <Select placeholder={"无"}>
                                {
                                    userList&&userList.map(item=>{
                                        return <Option key={item.user.id} value={item.user.id}>{item.user.nickname}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item  labelCol={10}>
                            <IconCommon
                                icon={`${visible?"zhankai":"jiantou-shang2"}`}
                                onClick={()=>setVisible(!visible)}
                                className={"icon-s"}
                                style={{cursor:"pointer"}}
                            />
                        </Form.Item>
                    </Col>
                    {
                        visible
                        ?<Col span={22}>
                            <Form.Item label={"描述"} name="desc" labelCol={{span: 2}}>
                                <TextArea   autoSize={{minRows: 3, maxRows: 5,}}   />
                            </Form.Item>
                        </Col>
                        :null
                    }

                </Row>
            </Form>
        </div>
    )
}

export default observer(DetailCommon);