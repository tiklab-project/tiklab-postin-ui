import React, {useEffect, useState} from "react";
import {Form, Row, Col, TreeSelect, Select,Input} from "antd";
import {observer} from "mobx-react";
import {Axios} from "tiklab-core-ui";
import categoryStore from "../../../category/store/CategoryStore";
import "./DetailCommonStyle.scss"
import ApiStatusModal from "../../../support/apiStatus/components/ApiStatusSelect";

const {Option} = Select
const {TextArea} = Input
const tailLayout = {
    labelCol:{span: 4}
};

/**
 * 用于详情
 */
const DetailCommon = (props) =>{
    const {updateApi,form,apiInfo,updateStatus } = props;
    const {findCategoryTreeList} = categoryStore;
    const [userList, setUserList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(async ()=>{
        let list = await findCategoryTreeList(workspaceId);
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
                    <Col span={9}>
                        <Form.Item label={"名称"} name="name">
                            <Input placeholder={"名称"} />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item label={"状态"} name="status" >
                            <ApiStatusModal
                                selectStatus={updateStatus}
                                status={apiInfo?.status?.id}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item label={"路径"} name="path" labelCol={{span: 2}}>
                            <Input placeholder={"无"} />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
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

                    <Col span={9}>
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
                    <Col span={18}>
                        <Form.Item label={"描述"} name="desc" labelCol={{span: 2}}>
                            <TextArea   autoSize={{minRows: 3, maxRows: 5,}}   />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default observer(DetailCommon);