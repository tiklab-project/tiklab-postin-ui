import React, {useEffect, useState} from "react";
import {Divider, Select} from "antd";
import {inject, observer} from "mobx-react";
import {Option} from "antd/es/mentions";
import ApiStatusModal from "./apiStatusModal";

const ApiStatusSelect = (props) =>{
    const {apxMethodStatusStore,selectStatus,status} = props;
    const {findApiStatusList} = apxMethodStatusStore;


    const [statusList, setStatusList] = useState([]);
    const [customList, setCustomList] = useState([]);
    let workspaceId = localStorage.getItem("workspaceId");

    useEffect(()=>{
        findSystemList();
    },[])

    useEffect(()=>{
        findCustomList()
    },[])

    const findCustomList = () =>{
        let param = {type:"custom",workspaceId:workspaceId}
        findApiStatusList(param).then(res=>{
            setCustomList(res)
        });
    }

    const findSystemList = () =>{
        findApiStatusList({type:"system"}).then(res=>{
            setStatusList(res)
        });
    }

    //渲染下拉框
    const showStatus = (data)=>{
        return data&&data.map(item=>{
            return (
                <Option key={item.id} value={item.id}>
                    <span className={"status-option-bg"} style={{"background":`${item.color}`}}> </span>
                    <span>{item.name}</span>
                </Option>
            )
        })
    }

    const clickSelect = ()=>{
        findSystemList();
        findCustomList();
    }

    return(
        <Select
            style={{width:80,height:40}}
            value={status}
            showArrow={false}
            onChange={(e)=>selectStatus(e)}
            onFocus={clickSelect}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto"}}>{item}</div>

                    <Divider style={{ margin: '8px 0' }} />
                    <ApiStatusModal />
                </>
            )}
        >
            {
                showStatus([...statusList,...customList])
            }
        </Select>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatusSelect));