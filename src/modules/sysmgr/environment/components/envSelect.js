import React, {useEffect, useState} from "react";
import {Divider, Select, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import EvnMana from "./environment";

const { Option } = Select;

const EnvSelect = (props) =>{
    const { environmentStore} = props;

    const { findEnvironmentList, envSourceList,getTestEnvUrl } = environmentStore;

    // let testEnv=localStorage.getItem("TEST_ENV")

    // const [selectEnv, setSelectEnv] = useState(testEnv);

    useEffect(()=>{
        findEnvironmentList()
    },[])


    // 选择测试环境 input框呈现相应的地址
    const onSelectChange = (value) => {
        // setSelectEnv(value)
        getTestEnvUrl(value)

    }

    const showOption = (data)=>{
        return data&&data.map(item=>{

            return (
                <Option key={item.id} value={item.url}>
                    <Tooltip placement="leftTop" title={item.url}> {item.name} </Tooltip>
                </Option>
            )
        })
    }


    return(
        <Select
            style={{width:200}}
            onSelect={(value)=> onSelectChange(value)}
            // defaultValue={selectEnv}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto","height":"100px"}}>{item}</div>

                    <Divider style={{ margin: '8px 0' }} />
                    <EvnMana />
                </>
            )}
        >
            {
                showOption(envSourceList)
            }
        </Select>
    )
}

export default inject("environmentStore")(observer(EnvSelect));