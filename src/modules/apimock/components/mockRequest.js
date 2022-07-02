import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Tabs, Radio } from 'antd';
import MockRequestHeader from './mockRequestHeader';
import MockQueryParam from './mockQueryParam';
import MockFormParam from './mockFormParamRequest';
import JsonParamMock from './mockJsonParam';
import './mockRequest.scss';

const { TabPane } = Tabs;


// 输出参数 请求头部与请求参数的切换
const MockRequest = (props) => {
    const { requestBodyMockStore } =props;
    const { 
        findRequestBodyMock, 
        createRequestBodyMock, 
        updateRequestBodyMock,
        requestBodyMockInfo
    } = requestBodyMockStore; 

    const [radioValue, setRadioValue] = useState()
    const mockId = localStorage.getItem('mockId');

    useEffect(()=>{
        findRequestBodyMock(mockId).then((res) => {
            if(res){
                setRadioValue(res)
            }else{
                createRequestBodyMock({bodyType :'formdata'});
            }
        })
    },[requestBodyMockInfo])

    const onChange = e => {
        setRadioValue(e);
        updateRequestBodyMock({bodyType : e})
    };

    const changeFormat = (radioValue) => {

        switch(radioValue) {
            case 'formdata':
                return <MockFormParam />
            case 'json':
                return <JsonParamMock />
        } 
    }
     
    return(
        <Fragment>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="请求头部" key="1">
                    <MockRequestHeader />
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <MockQueryParam />
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group 
                            name="radiogroup" 
                            onChange={(e)=>onChange(e.target.value)}
                            defaultValue={radioValue}
                        >
                            <Radio value={'formdata'}>formData </Radio>
                            <Radio value={'json'}>json</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        { 
                            changeFormat(radioValue)
                        } 
                    </div>  
                </TabPane>
            </Tabs>
        </Fragment>
    )
    
}

export default inject('requestBodyMockStore')(observer(MockRequest));
