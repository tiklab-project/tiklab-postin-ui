import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Tabs, Radio } from 'antd';
import MockRequestHeader from './MockRequestHeader';
import MockQueryParam from './MockQueryParam';
import MockFormParam from './MockFormParamRequest';
import JsonParamMock from './MockJsonParam';
import requestMockStore from "../store/RequestMockStore";
const { TabPane } = Tabs;

/**
 * 输出参数 请求头部与请求参数的切换
 */
const MockRequest = (props) => {
    const {mockId} = props
    const { 
        findRequestMock,
        updateRequestMock,
    } = requestMockStore; 

    const [radioType, setRadioType] = useState()
    // const mockId = mockId||localStorage.getItem('mockId');

    useEffect(()=>{
        findRequestMock(mockId).then((res) => {
            setRadioType(res.bodyType)
        })
    },[mockId])

    /**
     * 切换请求体
     * @param bodyType
     */
    const onChange = bodyType => {
        setRadioType(bodyType);
        updateRequestMock({bodyType : bodyType})
    };

    /**
     * 展示请求体对应的组件
     */
    const changeFormat = (radioType) => {

        switch(radioType) {
            case 'form':
                return <div className={"tabPane-item-box"}><MockFormParam mockId={mockId} /></div>
            case 'json':
                return <div className={"tabPane-item-box"}><JsonParamMock mockId={mockId} /></div>
        } 
    }
     
    return(
        <Fragment>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="请求头部" key="1">
                    <div className={"tabPane-item-box"}><MockRequestHeader mockId={mockId} /></div>
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <div className={"tabPane-item-box"}><MockQueryParam mockId={mockId} /></div>
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

export default observer(MockRequest);
