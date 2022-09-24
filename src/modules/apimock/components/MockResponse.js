import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs, Radio } from 'antd';
import MockResponseHeader from './mockResponseHeader';
import MockJsonResponse from './mockJsonResponse';
import MockRawResponse from './mockRawResponse';
import './mockResponse.scss'
const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const MockResponse = (props) => {
    const { responseMockStore } = props;
    const { 
        findResponseMock, 
        updateResponseMock, 
        createResponseMock,
    } = responseMockStore;

    const [ radioValue, setRadioValue ] = useState();

    const mockId = localStorage.getItem('mockId');
    
    useEffect(()=> {
        findResponseMock(mockId).then((res)=>{
            setRadioValue(res.bodyType)
        })
    },[mockId])

    const onChange = bodyType => {
        setRadioValue(bodyType)
        updateResponseMock( {bodyType : bodyType})
    };

    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case 'json':
                return <MockJsonResponse />
            case 'raw':
                return <MockRawResponse   />
        } 
    }
   
    return(
        <Fragment>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="返回头部" key="1">
                    <MockResponseHeader />
                </TabPane>

                <TabPane tab="返回结果" key="2">
                    <div className='request-radio'>
                        <Radio.Group 
                            name="radiogroup" 
                            onChange={(e)=>onChange( e.target.value)}  
                            defaultValue={radioValue}
                        >
                            <Radio value={'json'}>json </Radio>
                            <Radio value={'raw'}>raw</Radio>
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

export default inject('responseMockStore')(observer(MockResponse));
