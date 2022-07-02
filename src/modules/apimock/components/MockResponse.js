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
    const { responseResultMockStore } = props;
    const { 
        findResponseResultMock, 
        updateResponseResultMock, 
        createResponseResultMock,
        mockResponseResultInfo 
    } = responseResultMockStore;

    const [ radioValue, setRadioValue ] = useState();

    const mockId = localStorage.getItem('mockId')
    useEffect(()=> {
        findResponseResultMock(mockId).then((res)=>{ 
            if(res === null){
                let initRadioValue ={resultType :'json'};
                res = Object.assign(initRadioValue);
                createResponseResultMock(res);
            }else{
                setRadioValue(res.resultType)
            }
        })
    },[mockResponseResultInfo])

    const onChange = e => {
        let changeRadioValue = {resultType : e.target.value}
        updateResponseResultMock(changeRadioValue)
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
                            onChange={(e)=>onChange(e)}  
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

export default inject('responseResultMockStore')(observer(MockResponse));
