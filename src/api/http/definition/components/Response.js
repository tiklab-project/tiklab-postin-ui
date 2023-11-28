import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Divider, Select, Space, Tabs} from 'antd';
import ResponseResult from "./ResponseResult";
import ResponseTabEdit from "./ResponseTabEdit";
import noneImg from "../../../../assets/img/none.png";
import apiResponseStore from "../store/ApiResponseStore";
import EvnMana from "../../../../support/environment/components/Environment";
const { TabPane } = Tabs;
const { Option } = Select;

/**
 * 定义
 * http
 * 输出参数 返回头部与返回结果的切换
 */
const Response = (props) =>{
    const {
        findApiResponseList,
        apiResponseList,
        deleteApiResponse
    } = apiResponseStore;


    const apiId = localStorage.getItem('apiId');
    const [activeKey, setActiveKey] = useState();


    useEffect( ()=> {
        findList()
    },[])

    const findList = async() =>{
        let list = await findApiResponseList({httpId:apiId})
        setActiveKey(list[0].id)
    }

    const select=(value)=>{
        setActiveKey(value)
    }

    const deleteResult = (id) =>{
        return(
            <a
                onClick={async () => {
                    await deleteApiResponse(id)
                    await findList()
                }}
            >
                删除
            </a>
        )
    }

    const selectResult=(
        <Select
            style={{width:"150px",margin:"0 10px 0 0"}}
            onSelect={select}
            value={activeKey}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                    <Divider style={{ margin: '3px 0' }} />
                    <ResponseTabEdit
                        apiId={apiId}
                       setActiveKey={setActiveKey}
                   />
                </>
            )}
        >
            {
                apiResponseList && apiResponseList.map(item=>{
                    return<Option key={item.id}>{item.name+"("+item.httpCode+")"}</Option>
                })
            }
        </Select>
    )

    return(
        <div className={'api-result-box'}>
            <ResponseResult
                selectResult={selectResult}
                httpId={apiId}
                resultId={activeKey}
                deleteResult={deleteResult}
            />
        </div>
    )
}

export default observer(Response);
