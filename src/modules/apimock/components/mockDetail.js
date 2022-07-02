
import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select} from 'antd';
import { MockRequest, MockResponse } from '../index';
import { observer, inject } from 'mobx-react';
import MockEdit from './mockEdit';

const { Option } = Select;

const MockDetail = (props) =>{
    const { mockStore, responseMockStore } = props;
    const { findMock, deleteMock } = mockStore;
    const { findResponseMock, createResponseMock, updateResponseMock } = responseMockStore;

    const [form] = Form.useForm();

    const [editOk, setEdit] = useState(false);

    const mockId =  localStorage.getItem('mockId') ;

    useEffect(()=>{
        findMock(mockId).then((res)=> {
            form.setFieldsValue({
                name: res.name,
                desc:res.desc
            })
        })
    },[editOk])

    useEffect(()=>{
        findResponseMock(mockId).then((res)=>{
            if(res){
                form.setFieldsValue({
                    httpCode: res.httpCode
                })
            }else{
                createResponseMock({httpCode : 200 });
            }
        })
    },[])



    const onChange = (value) => {
        updateResponseMock({httpCode : value})
    }

    const backToList = () => {
        props.history.push({pathname:'/workspace/apis/detail/interface/mock',state:{tabKey:'3'}})
    }

    const deleteMockFn = () =>{
        deleteMock(mockId).then(()=>{
            props.history.push("/workspace/apis/detail/interface/mock")
        })
    }

    return(
        <>
        <div className='mock-baseInfo'>
            <div className="title ex-title">基本信息</div>
            <div>
                <Button className="important-btn" onClick={()=> backToList()}>返回列表</Button>
                <MockEdit setEdit={setEdit} btn="btn" type="编辑" {...props }  id={mockId} />
                <Button danger onClick={deleteMockFn}>删除</Button>
            </div>
        </div>
        <Form
            className="mock-baseInfo-form form-info"
            form={form}
        >
            <Form.Item
                label="mock名称"
                name="name"
            >
                <Input disabled bordered={false} />
            </Form.Item>
            <Form.Item
                label="mock描述"
                name="desc"
            >
                <Input disabled bordered={false} />
            </Form.Item>
        </Form>
        <div className='title ex-title'>期望输入参数 </div>
        <MockRequest {...props} />
        <div className='title ex-title'>预期输出结果</div>
        <Form
            form={form}
        >
            <Form.Item
                label="Http code"
                name="httpCode"
            >
                <Select
                    style={{ 'width': 200 }}
                    onChange={(value)=>onChange(value)}
                >
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                    <Option value="400">400</Option>
                    <Option value="500">500</Option>
                </Select>
            </Form.Item>
        </Form>
        <MockResponse  {...props}/>
        </>
    )


}

export default inject('mockStore', 'responseMockStore')(observer(MockDetail));
