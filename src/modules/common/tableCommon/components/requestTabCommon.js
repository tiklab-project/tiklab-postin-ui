import React, {useEffect, useState} from "react";
import { Tabs, Radio } from 'antd';

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
            case 'none':
                return <div>none</div>
            case 'formdata':
                return <>{props.formDataComponent}</>
            case 'formUrlencoded':
                return <>{props.formUrlencodedComponent}</>
            case 'json':
                return <>{props.jsonComponent}</>
            case 'raw':
                return <>{props.rawComponent}</>
            // case 'binary':
            //     return <TestBinaryParam bodyType={bodyTypeInfo} />
        }
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
                            <Radio value={'none'}>none</Radio>
                            <Radio value={'formdata'}>form-data </Radio>
                            <Radio value={'formUrlencoded'}>x-www-form-urlencoded</Radio>
                            <Radio value='json'>json</Radio>
                            <Radio value='raw'>raw</Radio>
                            {/*<Radio value='binary'>binary</Radio>*/}
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
