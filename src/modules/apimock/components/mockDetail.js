
import React, { useEffect, useState } from 'react';
import {Form, Button, Input, Select, Breadcrumb} from 'antd';
import { MockRequest, MockResponse } from '../index';
import { observer, inject } from 'mobx-react';
import EdiText from "react-editext";
import IconCommon from "../../common/iconCommon";
import {dir} from "../../common/dictionary/dictionary";
import EnvSelect from "../../sysmgr/environment/components/envSelect";
import IconBtn from "../../common/iconBtn/IconBtn";

const { Option } = Select;

const MockDetail = (props) =>{
    const { mockStore, responseMockStore } = props;
    const { findMock, updateMock } = mockStore;
    const { findResponseMock, updateResponseMock } = responseMockStore;

    const [form] = Form.useForm();

    const [resData, setResData] = useState();

    const mockId =  localStorage.getItem('mockId');
    const apxMethodId =  localStorage.getItem('apxMethodId');

    useEffect(()=>{
        findMock(mockId).then((res)=> {
            setResData(res)
        })
    },[mockId])

    useEffect(()=>{
        findResponseMock(mockId).then((res)=>{
            if(res.httpCode){
                form.setFieldsValue({
                    httpCode: res.httpCode
                })
            }
        })
    },[mockId])



    const onChange = (value) => {
        updateResponseMock({httpCode : value})
    }

    const backToList = () => {
        props.history.push('/workspace/apis/mock')
    }


    //编辑名字
    const editName = (value) => {
        let param = {
            http:{id:apxMethodId},
            id:mockId,
            name:value
        }
        updateMock(param)
    };

    const goToListPage = () =>{
        props.history.push("/workspace/apis/category")
    }

    const goToDocPage = () =>{
        props.history.push("/workspace/apis/document")
    }

    const goToMockPage = () =>{
        props.history.push("/workspace/apis/mock")
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
                <Form form={form}>
                    <Form.Item
                        label="Http code"
                        name="httpCode"
                        // rules={[
                        //     {
                        //         required: true,
                        //         pattern: new RegExp(/^\d{3}$/),
                        //         message: '输入正确http code'
                        //     },
                        // ]}
                    >
                        <Select
                            showSearch
                            style={{ 'width': 200 }}
                            onChange={(value)=>onChange(value)}
                        >
                            {
                                dir.httpCode.map(item=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
                <MockResponse  {...props}/>
            </div>
            </div>
        </div>
    )


}

export default inject('mockStore', 'responseMockStore')(observer(MockDetail));
