
import React, { useEffect, useState } from 'react';
import {Form, Button, Input, Select, Breadcrumb, InputNumber} from 'antd';
import { MockRequest, MockResponse } from '../index';
import { observer, inject } from 'mobx-react';
import EdiText from "react-editext";
import {dir} from "../../../../common/dictionary/dictionary";
import EnvSelect from "../../../../support/environment/components/EnvSelect";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";
import responseMockStore from "../store/MockResponseStore";
import mockStore from "../store/MockStore";
const { Option } = Select;

/**
 * mock详情页
 */
const MockDetail = (props) =>{
    const { findMock, updateMock } = mockStore;
    const { findResponseMock, updateResponseMock } = responseMockStore;

    const [form] = Form.useForm();

    const [resData, setResData] = useState();

    const mockId =  localStorage.getItem('mockId');
    const apxMethodId =  localStorage.getItem('apxMethodId');
    const [selectValue, setSelectValue] = useState();
    const [delayTime, setDelayTime] = useState();

    useEffect(()=>{
        findMock(mockId).then((res)=> {
            setResData(res);

        })
    },[mockId])

    useEffect(()=>{
        findResponseMock(mockId).then((res)=>{
            if(res.httpCode){
                setSelectValue(res.httpCode)
                setDelayTime(res.time)
            }
        })
    },[mockId])

    /**
     * 编辑名字
     */
    const editName = (value) => {
        let param = {
            http:{id:apxMethodId},
            id:mockId,
            name:value
        }
        updateMock(param)
    };

    /**
     * 去往接口列表页
     */
    const goToListPage = () =>{
        props.history.push("/workspace/apis/category")
    }

    /**
     * 去往接口文档页
     */
    const goToDocPage = () =>{
        props.history.push("/workspace/apis/document")
    }

    /**
     * 去往mock列表页
     */
    const goToMockPage = () =>{
        props.history.push("/workspace/apis/mock")
    }



    const changeSelect = (value) => {
        setSelectValue(value);

        //匹配正确的状态码
        const regex = /^([1-5][0-9][0-9])$/;
        if(regex.test(value)){
            updateResponseMock({httpCode : value})
        }else {
            messageFn("error","请输入1xx, 2xx, 3xx, 4xx, 或 5xx 状态码")
        }
    };

    const searchSelect = (value) => {
        if (value) {
            setSelectValue(value);
        }
    };

    const blurSelect = () => {
        setSelectValue(selectValue);
        changeSelect(selectValue)
    };


    const changeInputNumber = (value) =>{
        setDelayTime(value)

        updateResponseMock({time : value})
    }

    return(
        <div className={"content-margin"} style={{height:" calc(100% - 48px)"}}>
            <div className="content-margin-box">
                <div className={"pi-box-between"}>
                    <Breadcrumb className={"breadcrumb-box"} style={{margin:"0 0 10px 0"}}>
                        <Breadcrumb.Item onClick={goToListPage} className={"first-item"}>接口列表</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={goToDocPage} className={"first-item"}>接口文档</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={goToMockPage} className={"first-item"}>MOCK</Breadcrumb.Item>
                        <Breadcrumb.Item>MOCK详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <EnvSelect {...props}/>
                </div>

                <div className={"mock-header-box"}>
                    <EdiText
                        value={resData?.name}
                        tabIndex={2}
                        onSave={editName}
                        startEditingOnFocus
                        submitOnUnfocus
                        showButtonsOnHover
                        viewProps={{ className: 'edit-api-title' }}
                        editButtonClassName="ediText-edit"
                        saveButtonClassName="ediText-save"
                        cancelButtonClassName="ediText-cancel"
                        editButtonContent={
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-bianji1`} />
                            </svg>
                        }
                        hideIcons
                    />

                    <IconBtn
                        className="pi-icon-btn-grey"
                        name={"退出"}
                        onClick={goToMockPage}
                    />
                </div>
                <div className='header-title ex-title'>期望参数</div>
                <div className={"white-bg-box"}>
                    <MockRequest {...props} />
                </div>

                <div className='header-title  ex-title'>返回结果</div>
                <div className={"white-bg-box mock-resp-code"}>
                <Form form={form} layout={"inline"}>
                    <Form.Item label="响应状态码">
                        <Select
                            allowClear
                            showSearch
                            placeholder="HTTP CODE"
                            onChange={changeSelect}
                            onSearch={searchSelect}
                            onBlur={blurSelect}
                            style={{width: 170}}
                            value={selectValue}
                        >
                            {
                                dir.httpCode.map(item=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="响应延迟时间(/ms)">
                        <InputNumber min={0} max={100000} value={delayTime}  onChange={changeInputNumber} />
                    </Form.Item>
                </Form>
                <MockResponse  {...props}/>
            </div>
            </div>
        </div>
    )


}

export default observer(MockDetail);
