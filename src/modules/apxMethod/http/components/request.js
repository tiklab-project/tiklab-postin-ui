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
import RequestNoBody from "../../../common/tableCommon/components/requestNoBody";
import {bodyTypeDictionary, bodyTypeJsonDictionary as bodyTypeJson} from "../../../common/dictionary/dictionary";

const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const Request = (props) => {
    const { requestBodyStore } = props;
    const {
        findRequestBody,
        updateRequestBody,
        requestbodyType
    } = requestBodyStore;

    const [radioValue, setRadioValue] = useState('none')

    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findRequestBody(apxMethodId).then((res) => {
            setRadioValue(res)
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
            case bodyTypeJson.none:
                return <RequestNoBody />
            case bodyTypeJson.formdata:
                return <FormParam  />
            case bodyTypeJson.formUrlencoded:
                return <FormUrlencoded />
            case bodyTypeJson.json:
                return <JsonParam />
            case bodyTypeJson.raw:
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

    const showRadioItem = (data)=>{
        return data&& data.map(item=>{
            return <Radio value={item.value} key={item.value}>{item.name}</Radio>
        })
    }

    return(
        <Fragment>
            <Tabs
                defaultActiveKey={defaultActiveKey}
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
                            {showRadioItem(bodyTypeDictionary)}
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
