import React, {Fragment, useState, useEffect, useRef} from 'react';
import { observer, inject } from 'mobx-react';
import {Tabs, Radio, Form} from 'antd';
import MockResponseHeader from './mockResponseHeader';
import CodeMirror from "../../common/codeMirror";
const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const MockResponse = (props) => {
    const { responseMockStore,responseResultMockStore } = props;
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

    const blurFn = () =>{
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
    }
   
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
                            <Radio.Button value={'application/json'}>json </Radio.Button>
                            <Radio.Button value={'text/pain'}>raw</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Form form={form}>
                        <Form.Item name='result'>
                            <CodeMirror
                                mediaType={radioValue}
                                blurFn={blurFn}
                                ediTextRef={ediTextRef}
                            />
                        </Form.Item>

                    </Form>

                </TabPane>
            </Tabs>
        </>
    )
    
}

export default inject('responseMockStore',"responseResultMockStore")(observer(MockResponse));
