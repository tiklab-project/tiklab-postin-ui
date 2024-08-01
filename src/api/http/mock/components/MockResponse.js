import React, { useState, useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import {Tabs, Radio, Form, Button} from 'antd';
import MockResponseHeader from './MockResponseHeader';
import CodeMirror from "../../../../common/CodeMirror";
import responseMockStore from "../store/MockResponseStore";
import responseResultMockStore from "../store/ResponseResultMockStore";
const { TabPane } = Tabs;

/**
 * mock
 * 响应部分
 */
const MockResponse = (props) => {
    const { 
        findResponseMock, 
        updateResponseMock,
    } = responseMockStore;

    const {
        createResponseResultMock,
        updateResponseResultMock,
        findResponseResultMock,
    } = responseResultMockStore;

    const ediTextRef = useRef(null);
    const rawDataRef = useRef(null);
    const [form] = Form.useForm();
    const [ radioValue, setRadioValue ] = useState();

    const mockId = localStorage.getItem('mockId');
    
    useEffect(()=> {
        findResponseMock(mockId).then((res)=>{
            setRadioValue(res.bodyType)
        })

        findResponseResultMock(mockId).then((res)=>{
            if(!res) return

            rawDataRef.current=res;
            form.setFieldsValue({
                result: res.result,
            })
        })


    },[mockId])

    const onChange = bodyType => {
        setRadioValue(bodyType)
        updateResponseMock( {bodyType : bodyType})
    };

    /**
     * 失去焦点，获取更改raw中类型执行
     */
    const save = () =>{
        //获取EdiText文本数据
        let text = ediTextRef.current.editor.getValue()

        let param = {  result:text }

        if(rawDataRef.current){
            updateResponseResultMock(param)
        }else{
            if(!text) return

            createResponseResultMock(param).then((res)=>{
                if(res.code!==0) return

                findResponseResultMock(mockId).then(res=>{
                    if(!res ) return

                    rawDataRef.current=res
                })
            })
        }

        setShowBtn(false)
    }

    const [showBtn, setShowBtn] = useState(false);

    const focusFn = () =>setShowBtn(true)



    return(
        <>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="返回头部" key="1">
                    <div className={"tabPane-item-box"}><MockResponseHeader /></div>
                </TabPane>

                <TabPane tab="返回结果" key="2">
                    <div className='request-radio'>
                        <Radio.Group
                            buttonStyle="solid"
                            onChange={(e)=>onChange( e.target.value)}  
                            defaultValue={radioValue}
                        >
                            <Radio value={'application/json'}>json </Radio>
                            <Radio value={'text/pain'}>raw</Radio>
                        </Radio.Group>
                    </div>
                    <div className={"raw-box"}>
                        <Form form={form}>
                            <div style={{border:"1px solid #f0f0f0"}}>
                                <Form.Item name='result'>
                                    <CodeMirror
                                        mediaType={radioValue}
                                        ediTextRef={ediTextRef}
                                        focusFn={focusFn}
                                    />
                                </Form.Item>
                            </div>
                        </Form>
                        <div className={`${showBtn?"pi-show":"pi-hide"}`}>
                            <Button onClick={()=>setShowBtn(false)} style={{marginRight:"10px"}}> 取消</Button>
                            <Button onClick={save} className={"important-btn"} type="primary"> 保存</Button>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
    
}

export default observer(MockResponse);
