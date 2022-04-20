/**
 * @description：
 * @date: 2021-07-23 10:32
 */

import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Form, Input,Collapse,Select } from "antd";
import RequestVersion from "./requestVersion";
import ResponseVersion from "./responseVersion";
import apxMethodStore from "./methodStore";
const { Option } =Select;
const { Panel } = Collapse;

const DetailVersion = (props) => {
    const {toggle}=props
    const {queryVersionDetail,findVersionPage,versionList} = apxMethodStore;

    const [verRequet,setVerRequest] = useState({});
    const [verResponse,setVerResponse] = useState({});

    const [detailMethod,setDetailMethod] =useState(localStorage.getItem('detailMethod'))
    const onVersionId = localStorage.getItem('apxMethodId')

    useEffect(()=>{
        queryVersionDetail(detailMethod).then((res)=>{
            setVerRequest(res.versionRequest);
            setVerResponse(res.versionRespon);
            const baseInfo = res.methodEx;
            form.setFieldsValue({
                name: baseInfo.name,
                requestType:baseInfo.requestType,
                path: baseInfo.path,
                desc: baseInfo.desc,
            })
        })
    },[detailMethod])

    useEffect(()=>{
        findVersionPage(onVersionId)
    },[onVersionId])

    //跳到版本管理
    const toVersion = () => {
        // props.history.push({pathname:'/workspacedetail/versionButton'})
        toggle(false)
    }

    //选择框change事件
    const handleChange = (e) => {
        localStorage.setItem('detailMethod',e)
        setDetailMethod(e)
    }

    //选择框下拉列表
    const showSelect = (data) => {
        return  data&&data.map(item=>{
            return(
                <Option key={item.id} value={item.id}>{item.versionCode}</Option>
            )
        })
    }

    const [form] = Form.useForm();

    return(
        <div className={'version-detail'}>
            <div className='breadcrumb-contant'>
                <div className='breadcrumb'>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item onClick={toVersion} className='bread-cursor'>版本管理</Breadcrumb.Item>
                        <Breadcrumb.Item>版本详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div >
                    <Select
                        defaultValue={detailMethod}
                        onChange={handleChange}
                        style={{ width: 150 }}
                    >
                        {showSelect(versionList)}
                    </Select>
                    <Button className="important-btn" onClick={toVersion}>返回</Button>
                </div>
            </div>
            <Collapse
                defaultActiveKey={['1','2','3']}
                ghost
                expandIconPosition={'right' }
            >
                <Panel header="基本信息" key="1" >
                    <Form className="apx-form form-info" form={form}>
                        <Form.Item label="接口名称" name="name" >
                            <Input  disabled bordered={false}/>
                        </Form.Item>
                        <Form.Item label="请求方式" name="requestType">
                            <Input disabled  bordered={false}/>
                        </Form.Item>
                        <Form.Item label="接口路径" name="path">
                            <Input  disabled  bordered={false}/>
                        </Form.Item>
                        <Form.Item  label="接口描述" name='desc'>
                            <Input disabled  bordered={false}/>
                        </Form.Item>
                    </Form>
                </Panel>
                <Panel header="输入参数" key="2">
                    <RequestVersion verRequest={verRequet} />
                </Panel>
                <Panel header="输出结果" key="3">
                    <ResponseVersion verResponse={verResponse}/>
                </Panel>
            </Collapse>
        </div>
    )
}

export default DetailVersion;
