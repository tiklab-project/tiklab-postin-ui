
import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select} from 'antd';
import { MockRequest, MockResponse } from '../index';
import { observer, inject } from 'mobx-react';
import EdiText from "react-editext";
import IconCommon from "../../common/iconCommon";

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
        props.history.push('/workspace/apis/detail/interface/mock')
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



    return(
        <>
            <div className={"mock-header-box"}>
                <div className={"testcase-header-right"}>

                    <IconCommon
                        icon={"31fanhui1"}
                        style={{margin:"0 0 0 5px"}}
                        className={"icon-s testcase-header-right-back"}
                        onClick={backToList}
                    />
                    <div > MOCK列表 </div>
                    <div style={{margin:" 0 5px"}}>/</div>
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
            </div>
            <div className='header-title ex-title'>期望参数</div>
            <MockRequest {...props} />
            <div className='header-title  ex-title'>返回结果</div>
            <Form
                form={form}
            >
                <Form.Item
                    label="Http code"
                    name="httpCode"
                >
                    <Select
                        style={{ 'width': 200 }}
                        onChange={(value)=>onChange(value)}
                    >
                        <Option value="100">100</Option>
                        <Option value="200">200</Option>
                        <Option value="300">300</Option>
                        <Option value="400">400</Option>
                        <Option value="500">500</Option>
                    </Select>
                </Form.Item>
            </Form>
            <MockResponse  {...props}/>
        </>
    )


}

export default inject('mockStore', 'responseMockStore')(observer(MockDetail));
