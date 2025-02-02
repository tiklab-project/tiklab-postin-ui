
import React, { useEffect, useState } from 'react';
import {Form, Select, InputNumber, Drawer} from 'antd';
import { MockRequest, MockResponse } from '../index';
import { observer } from 'mobx-react';
import EdiText from "react-editext";
import {dir} from "../../../../common/dictionary/dictionary";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";
import responseMockStore from "../store/MockResponseStore";
import mockStore from "../store/MockStore";
const { Option } = Select;

/**
 * mock详情页
 */
const MockDetail = (props) =>{
    const {name,mockId} = props
    const { findMock, updateMock } = mockStore;
    const { findResponseMock, updateResponseMock } = responseMockStore;

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [resData, setResData] = useState();
    const apiId =  localStorage.getItem('apiId');
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
            http:{id:apiId},
            id:mockId,
            name:value
        }
        updateMock(param)
    };

    const changeSelect = async (value) => {
        setSelectValue(value);

        //匹配正确的状态码
        const regex = /^([1-5][0-9][0-9])$/;
        if(regex.test(value)){
            await updateResponseMock({httpCode : value})
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

    const changeInputNumber = async (value) =>{
        setDelayTime(value)

        await updateResponseMock({time : value})
    }

    const showDrawer = () => {
        localStorage.setItem("mockId",mockId)
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return(
        <>
            <span className={"link-text"} onClick={showDrawer}>
                {name}
            </span>
            <Drawer
                title={"Mock详情"}
                placement="right"
                onClose={onClose}
                open={open}
                width={800}
            >
                <div style={{padding:"0 20px"}}>
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
            </Drawer>
        </>

    )


}

export default observer(MockDetail);
