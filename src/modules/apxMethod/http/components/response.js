import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import ResponseHeader from "./responseHeader";
import JsonResponse  from "./jsonResponse";
import RawResponse from './rawResponse';
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

// 输出参数 返回头部与返回结果的切换
const Response = (props) =>{
    const { apiResponseStore } = props;
    const { 
        findApiResponse,
        updateApiResponse,
        bodyType
    } = apiResponseStore;

    const [ radioType, setRadioType ] = useState()

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=> {
        findApiResponse(apxMethodId).then((res)=>{
            setRadioType(res.bodyType)
        })
    },[bodyType])
    
    // radio切换，更新为当前radio的值
    const onChange = e => {
        setRadioType(e);
        updateApiResponse({bodyType : e});
    };

    //根据radio值，渲染相应的请求体
    const changeFormat = (radioType) => {
        switch(radioType) {
            case 'json':
                return <div className={"tabPane-item-box"}><JsonResponse /></div>
            case 'raw':
                return <RawResponse />
        }
    }

    return(
        <Fragment>
            <Tabs defaultActiveKey="1" >

                <TabPane tab="返回结果" key="1">
                <div className='request-radio'>
                        <Radio.Group 
                            name="radiogroup" 
                            onChange={(e)=>onChange(e.target.value)}
                            value={radioType}
                        >
                            <Radio value={'json'}>json </Radio>
                            <Radio value={'raw'}>raw</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        {
                            changeFormat(radioType)
                        } 
                    </div>  
                </TabPane>
                <TabPane tab="返回头部" key="2">
                    <div className={"tabPane-item-box"}><ResponseHeader /></div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
    
}

export default inject("apiResponseStore")(observer(Response));
