import React, {useEffect, useState} from "react";
import {Divider, Select, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import EvnMana from "./Environment";
import environmentStore from "../store/environmentStore";
import {useHistory} from "react-router";
const { Option } = Select;

/**
 * 环境选择
 */
const EnvSelect = (props) =>{
    const {workspaceStore} = props
    const {settingMenuSelected} = workspaceStore;

    const { findEnvironmentList, envSourceList,getTestEnvUrl,testEnvUrl } = environmentStore;

    let workspaceId=localStorage.getItem("workspaceId")
    const history = useHistory()

    /**
     * 选择测试环境 input框呈现相应的地址
     */
    const onSelectChange = (value) => {
        getTestEnvUrl(value)
    }

    /**
     * 渲染环境选项
     */
    const showOption = (data)=>{

        return data&&data.map(item=>{
            return (
                <Option key={item.id} value={item.url}>
                    <Tooltip
                        placement="leftTop"
                        title={item.url}
                    >
                        <div style={{width:"100%"}}>{item.name}</div>
                    </Tooltip>
                </Option>
            )
        })
    }

    const onDropdownVisibleChange = async ()=>{
        await findEnvironmentList({workspaceId:workspaceId})
    }

    const toEnv = () =>{
        history.push("/workspace/setting/env")
        settingMenuSelected("/workspace/setting/env")
    }

    return(
        <Select
            bordered={false}
            className={"ws-select-box"}
            placeholder={"未设置环境"}
            onSelect={(value)=> onSelectChange(value)}
            defaultValue={testEnvUrl}
            onDropdownVisibleChange={onDropdownVisibleChange}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                    <Divider style={{ margin: '8px 0' }} />
                    {/*<EvnMana />*/}
                    <a style={{margin: "0 10px"}} onClick={toEnv}>前往环境</a>
                </>
            )}
        >
            <Option value={null}>无</Option>
            {
                showOption(envSourceList)
            }
        </Select>
    )
}

export default inject("workspaceStore")(observer(EnvSelect));