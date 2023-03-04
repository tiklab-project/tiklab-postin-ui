import React, {useEffect, useState} from "react";
import {Divider, Select} from "antd";
import {inject, observer} from "mobx-react";
import {Option} from "antd/es/mentions";
import ApiStatusModal from "./ApiStatusModal";
import {CaretDownOutlined} from "@ant-design/icons";

/**
 * 状态下拉选择框
 */
const ApiStatusSelect = (props) =>{
    const {apxMethodStatusStore,selectStatus,status} = props;
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
            style={{width:80,height:32}}
            value={status}
            onChange={(e)=>selectStatus(e)}
            onFocus={clickSelect}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto"}}>{item}</div>

                    <Divider style={{ margin: '8px 0' }} />
                    <ApiStatusModal />
                </>
            )}
            showArrow={showValidateStatus === "apiStatus"}
            suffixIcon={showValidateStatus === "apiStatus"?<CaretDownOutlined />:null}
            onMouseEnter={()=>{setShowValidateStatus("apiStatus")}}
            onMouseLeave={()=>{setShowValidateStatus("")}}
        >
            {
                showStatus([...statusList,...customList])
            }
        </Select>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatusSelect));