import React, {useEffect, useState} from "react";
import {Divider, Select} from "antd";
import {inject, observer} from "mobx-react";
import {Option} from "antd/es/mentions";
import ApiStatusModal from "./apiStatusModal";

const ApiStatusSelect = (props) =>{
    const {apxMethodStatusStore,selectStatus,status} = props;
    const {findApiStatusList} = apxMethodStatusStore;


    const [statusList, setStatusList] = useState([]);

    useEffect(()=>{
        findApiStatusList().then(res=>{
            setStatusList(res)
        });
    },[])


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

    return(
        <Select
            style={{width:100}}
            value={status}
            showArrow={false}
            onChange={(e)=>selectStatus(e)}
            dropdownRender={item=>(
                <>
                    <div style={{"overflow":"auto"}}>{item}</div>

                    <Divider style={{ margin: '8px 0' }} />
                    <ApiStatusModal />
                </>
            )}
        >
            {
                showStatus(statusList)
            }
        </Select>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatusSelect));