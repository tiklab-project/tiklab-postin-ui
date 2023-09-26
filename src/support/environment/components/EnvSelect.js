import React, {useEffect, useState} from "react";
import {Divider, Select, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import EvnMana from "./Environment";
import environmentStore from "../store/environmentStore";
const { Option } = Select;

/**
 * 环境选择
 */
const EnvSelect = (props) =>{

    const { findEnvironmentList, envSourceList,getTestEnvUrl,testEnvUrl } = environmentStore;

    let workspaceId=localStorage.getItem("workspaceId")

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
                    <Tooltip placement="leftTop" title={item.url}> {item.name} </Tooltip>
                </Option>
            )
        })
    }

    const onDropdownVisibleChange = async ()=>{
        await findEnvironmentList({workspaceId:workspaceId})
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
                    <EvnMana />
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

export default observer(EnvSelect);