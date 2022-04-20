import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import ResponseHeader from "./responseHeader";
import JsonResponse  from "./jsonResponse";
import RawResponse from './rawResponse';
import { RESPONSERESULT_STORE } from '../store/responseResultStore';
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

// 输出参数 返回头部与返回结果的切换
const Response = (props) =>{
    const { responseResultStore } = props;
    const { 
        findResponseResult, 
        createResponseResult, 
        updateResponseResult,
        responseResultType
    } = responseResultStore;

    const [ radioValue, setRadioValue ] = useState()

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=> {
        findResponseResult(apxMethodId).then((res)=>{
            if(res){
                setRadioValue(res.resultType)
            }else{
                createResponseResult({resultType :'json'});
                setRadioValue("json")
            }
        })
    },[responseResultType])
    
    // radio切换，更新为当前radio的值
    const onChange = e => {
        setRadioValue(e);
        updateResponseResult({resultType : e});
    };

    //根据radio值，渲染相应的请求体
    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case 'json':
                return <JsonResponse />
            case 'raw':
                return <RawResponse />
        }
    }

    return(
        <Fragment>
            <Tabs defaultActiveKey="1" type="card">

                <TabPane tab="返回结果" key="1">
                <div className='request-radio'>
                        <Radio.Group 
                            name="radiogroup" 
                            onChange={(e)=>onChange(e.target.value)}
                            value={radioValue}
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
                <TabPane tab="返回头部" key="2">
                    <ResponseHeader />
                </TabPane>
            </Tabs>
        </Fragment>
    )
    
}

export default inject(RESPONSERESULT_STORE)(observer(Response));
