import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import RequestHeader from "./requestHeader";
import QueryParam from './queryParam';
import FormParam from './formParam';
import FormUrlencoded from "./formUrlencoded";
import JsonParam  from "./jsonParam";
import RawParam from './rawParam';
import PreParam from './preParam';
import BackParam from './afterParam';
import { Tabs, Radio } from 'antd';
import BinaryParam from "./binaryParam";

const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const Request = (props) => {
    const { requestBodyStore } = props;
    const {
        findRequestBody,
        createRequestBody,
        updateRequestBody,
        requestbodyType
    } = requestBodyStore;

    const [radioValue, setRadioValue] = useState('formdata')

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findRequestBody(apxMethodId).then((res) => {
            if(res){
                setRadioValue(res)
            }else{
                createRequestBody({bodyType :'formdata'});
            }
        })
    },[requestbodyType])

    //radio变化，更新radio的值
    const onChange = e => {
        setRadioValue(e);
        updateRequestBody({bodyType: e});
    };

    //根据radio值，渲染相应的请求体
    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case 'none':
                return <div>none</div>
            case 'formdata':
                return <FormParam  />
            case 'formUrlencoded':
                return <FormUrlencoded />
            case 'json':
                return <JsonParam />
            case 'raw':
                return <RawParam />
            // case 'binary':
            //     return <BinaryParam />
        }
    }

    //获取输入参数的tabskey，用于默认key
    const defaultActiveKey = () => {
        let tabkey = sessionStorage.getItem('apiReqTabs')
        if(tabkey){
            return tabkey
        }else {
            return '1'
        }
    }

    return(
        <Fragment>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                // type="card"
                className="tabs"
                onChange = {(e)=>sessionStorage.setItem('apiReqTabs',e)}
            >
                <TabPane tab="请求头部" key="1" >
                    <RequestHeader   />
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <QueryParam  />
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group
                            name="radiogroup"
                            onChange={(e)=>onChange(e.target.value)}
                            value={radioValue}
                        >
                            <Radio value={'none'}>none</Radio>
                            <Radio value={'formdata'}>form-data </Radio>
                            <Radio value={'formUrlencoded'}>x-www-form-urlencoded</Radio>
                            <Radio value={'json'}>json</Radio>
                            <Radio value={'raw'}>raw</Radio>
                            {/*<Radio value={'binary'}>binary</Radio>*/}
                        </Radio.Group>
                    </div>
                    <div>
                        {
                            changeFormat(radioValue)
                        }
                    </div>
                </TabPane>
                <TabPane tab="前置脚本" key="4">
                    <PreParam />
                </TabPane>
                <TabPane tab="后置脚本" key="5">
                    <BackParam  />
                </TabPane>
            </Tabs>
        </Fragment>
    )

}

export default inject('requestBodyStore')(observer(Request));
