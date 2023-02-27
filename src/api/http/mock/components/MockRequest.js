import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Tabs, Radio } from 'antd';
import MockRequestHeader from './MockRequestHeader';
import MockQueryParam from './MockQueryParam';
import MockFormParam from './MockFormParamRequest';
import JsonParamMock from './MockJsonParam';


const { TabPane } = Tabs;


// 输出参数 请求头部与请求参数的切换
const MockRequest = (props) => {
    const { requestMockStore } =props;
    const { 
        findRequestMock, 
        createRequestMock, 
        updateRequestMock,
    } = requestMockStore; 

    const [radioType, setRadioType] = useState()
    const mockId = localStorage.getItem('mockId');

    useEffect(()=>{
        findRequestMock(mockId).then((res) => {
            setRadioType(res.bodyType)
        })
    },[mockId])

    const onChange = bodyType => {
        setRadioType(bodyType);
        updateRequestMock({bodyType : bodyType})
    };

    const changeFormat = (radioType) => {

        switch(radioType) {
            case 'form':
                return <div className={"tabPane-item-box"}><MockFormParam /></div>
            case 'json':
                return <div className={"tabPane-item-box"}><JsonParamMock /></div>
        } 
    }
     
    return(
        <Fragment>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="请求头部" key="1">
                    <div className={"tabPane-item-box"}><MockRequestHeader /></div>
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <div className={"tabPane-item-box"}><MockQueryParam /></div>
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group 
                            name="radiogroup" 
                            onChange={(e)=>onChange(e.target.value)}
                            defaultValue={radioType}
                        >
                            <Radio value={'form'}>formData </Radio>
                            <Radio value={'json'}>json</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        { 
                            changeFormat(radioType)
                        } 
                    </div>  
                </TabPane>
            </Tabs>
        </Fragment>
    )
    
}

export default inject('requestMockStore')(observer(MockRequest));
