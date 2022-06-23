import React, {useEffect, useState} from "react";
import { Tabs, Radio } from 'antd';
import RequestNoBody from "./requestNoBody";
import {bodyTypeDictionary, bodyTypeJsonDictionary as bodyTypeJson} from "../../dictionary/dictionary";

const { TabPane } = Tabs;


const RequestTabCommon = (props) => {
    const { bodyType,getBodyType } = props;

    const [radioValue, setRadioValue] = useState();

    useEffect(()=>{
        if(bodyType){
            setRadioValue(bodyType)
        }else {
            setRadioValue("formdata")
        }
    },[bodyType])

    const onChange = e => {
        console.log(e)
        setRadioValue(e);
        getBodyType(e)
    };

    //根据radio值，渲染相应的请求体
    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case bodyTypeJson.none:
                return <RequestNoBody/>
            case bodyTypeJson.formdata:
                return <>{props.formDataComponent}</>
            case bodyTypeJson.formUrlencoded:
                return <>{props.formUrlencodedComponent}</>
            case bodyTypeJson.json:
                return <>{props.jsonComponent}</>
            case bodyTypeJson.raw:
                return <>{props.rawComponent}</>
            // case 'binary':
            //     return <TestBinaryParam bodyType={bodyTypeInfo} />
        }
    }

    const showRadioItem = (data)=>{
        return data&& data.map(item=>{
            return <Radio value={item.value} key={item.value}>{item.name}</Radio>
        })
    }

    return(
        <>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="请求头部" key="1">
                    {props.headerComponent}
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    {props.queryComponent}
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group
                            name="radiogroup"
                            value={radioValue}
                            onChange = {(e)=>onChange(e.target.value)}
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
                    {props.preScript}
                </TabPane>
                <TabPane tab="后置脚本" key="5">
                    {props.afterScript}
                </TabPane>
                <TabPane tab="断言" key="6">
                    {props.assert}
                </TabPane>
            </Tabs>
        </>
    )
}

export default RequestTabCommon;
