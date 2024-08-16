import React, {useEffect, useState} from "react";
import {Divider, Select, Space} from "antd";
import {inject, observer} from "mobx-react";
import {Option} from "antd/es/mentions";
import {CaretDownOutlined, DownOutlined} from "@ant-design/icons";
import apxMethodStatusStore from "../store/ApxMethodStatusStore";
import "./apiStatus.scss"
/**
 * 状态下拉选择框
 */
const ApiStatusSelect = (props) =>{
    const {selectStatus,status} = props;
    const {findApiStatusList} = apxMethodStatusStore;

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const [statusList, setStatusList] = useState([]);
    const [customList, setCustomList] = useState([]);
    let workspaceId = localStorage.getItem("workspaceId");

    useEffect(()=>{
        findSystemList();
    },[])

    useEffect(()=>{
        findCustomList()
    },[])

    /**
     * 查找自定义的状态
     */
    const findCustomList = () =>{
        let param = {type:"custom",workspaceId:workspaceId}
        findApiStatusList(param).then(res=>{
            setCustomList(res)
        });
    }

    /**
     * 查找系统设置的状态
     */
    const findSystemList = () =>{
        findApiStatusList({type:"system"}).then(res=>{
            setStatusList(res)
        });
    }

    /**
     *  渲染下拉框
     */
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
            style={{height:32}}
            value={status}
            onChange={(e)=>selectStatus(e)}
            onFocus={clickSelect}
            // dropdownRender={item=>(
            //     <>
            //         <div style={{"overflow":"auto"}}>{item}</div>
            //
            //         <Divider style={{ margin: '8px 0' }} />
            //         <ApiStatusModal />
            //     </>
            // )}
            onMouseEnter={()=>{setShowValidateStatus("apiStatus")}}
            onMouseLeave={()=>{setShowValidateStatus("")}}
        >
            {
                showStatus([...statusList,...customList])
            }
        </Select>
    )
}

export default observer(ApiStatusSelect);