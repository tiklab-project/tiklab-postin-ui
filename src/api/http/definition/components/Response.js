import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {Divider, Select, Space} from 'antd';
import ResponseResult from "./ResponseResult";
import ResponseTabEdit from "./ResponseTabEdit";
import apiResponseStore from "../store/ApiResponseStore";
import IconCommon from "../../../../common/IconCommon";
const { Option } = Select;

/**
 * 定义
 * http
 * 输出参数 返回头部与返回结果的切换
 */
const Response = (props) =>{
    const {
        findApiResponseList,
        findApiResponse,
        apiResponseList,
        deleteApiResponse
    } = apiResponseStore;


    const apiId = localStorage.getItem('apiId');
    const [activeKey, setActiveKey] = useState();
    const selectRef = React.createRef();
    const [length, setLength] = useState(0);
    const [curSelectInfo, setCurSelectInfo] = useState();

    useEffect( async ()=> {
        await findList()
    },[])

    const findList = async() =>{
        let list = await findApiResponseList({httpId:apiId})
        setLength(list.length)
        setActiveKey(list[0].id)
        let dataInfo =  await findApiResponse(list[0].id)
        setCurSelectInfo(dataInfo)
    }

    const select= async (value)=>{
        setActiveKey(value)

        let dataInfo =  await findApiResponse(value)
        setCurSelectInfo(dataInfo)
    }

    const setDropdownVisible = (visible) => {
        // 调用 setPopupVisible 方法手动控制下拉框的显示/隐藏
        selectRef.current.blur();
    };


    const selectResult=(
        <Select
            style={{width:"300px",margin:"0 10px 0 0",background:"#f8f8f8"}}
            onSelect={select}
            value={activeKey}
            bordered={false}
            // showArrow={false}
            ref={selectRef}
            optionLabelProp="label"
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>
                        {item}
                    </div>

                    <Divider style={{ margin: '3px 0' }} />
                    <ResponseTabEdit
                        apiId={apiId}
                        setActiveKey={setActiveKey}
                        selectRef={selectRef}
                        setDropdownVisible={ setDropdownVisible}
                    />
                </>
            )}
        >
            {
                apiResponseList && apiResponseList.map(item=>{
                    return<Option key={item.id}
                        label={<span>{item.name + "(" + item.httpCode + ")"}</span>}
                    >
                        <div style={{display:"flex","justifyContent":"space-between"}}>
                            <span>{item.name+"("+item.httpCode+")"}</span>
                            <Space>
                                <ResponseTabEdit
                                    apiId={apiId}
                                    setActiveKey={activeKey}
                                    apiResponseId={item.id}
                                    type={"edit"}
                                    setDropdownVisible={setDropdownVisible}
                                />

                                {
                                    length>1
                                    ?<IconCommon
                                            icon={"shanchu3"}
                                            className="icon-s edit-icon"
                                            onClick={async (e) => {
                                                await deleteApiResponse(item.id)
                                                await findList()
                                                setDropdownVisible(false)
                                            }}
                                        />
                                     :null
                                }
                            </Space>
                        </div>
                    </Option>
                })
            }
        </Select>
    )

    return(
        <div className={'api-result-box'}>
            <ResponseResult
                selectResult={selectResult}
                curSelectInfo={curSelectInfo}
            />
        </div>
    )
}

export default observer(Response);
