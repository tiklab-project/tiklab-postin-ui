import React, {useEffect, useState} from 'react';
import EnumParamDS from './EnumStructure';
import JsonParamDS from "./JsonStructure";
import {inject, observer} from "mobx-react";
import DetailHeader from "../../../common/DetailHeader";
import IconCommon from "../../../common/IconCommon";
import {Breadcrumb} from "antd";
import dataStructureStore from "../store/DataStructureStore";
/**
 * 结构页详情
 */
const StructureDetail = (props) => {
    const {findDataStructure} = dataStructureStore


    const [data, setData] = useState();
    let  dataStructureId = localStorage.getItem("dataStructureId")

    useEffect(async ()=>{

        let res = await findDataStructure( dataStructureId);

        setData(res)

    },[])


    /**
     * 根据dataType切换
     */
    const changeType = (data) => {
        switch(data) {
            case 'enum':
                return <EnumParamDS dataStructureId={props.dataStructureId} />
            case 'json':
                return <JsonParamDS dataStructureId={props.dataStructureId} />
            default:
                return <EnumParamDS dataStructureId={props.dataStructureId} />
        }
    }

    /**
     * 去往结构列表页
     */
    const backToList =() =>{
        props.history.push("/workspace/dataStructure")
    }

    return(
        <div className={"structure-content"}>
            <div className={"structure-content-box"}>
                <Breadcrumb className={"breadcrumb-box"} style={{margin:"0 0 10px 0"}}>
                    <Breadcrumb.Item onClick={backToList} className={"first-item"}>数据结构</Breadcrumb.Item>
                    <Breadcrumb.Item>{data?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className={"structure-content-box-main"}>
                    <div className={"structure-content-box-main-detail"}>
                        <div>名称： {data?.name}</div>
                        <div>类型： {data?.dataType}</div>
                    </div>

                    {
                        changeType(data?.dataType)
                    }

                </div>


            </div>


        </div>
    )
}


export default observer(StructureDetail);
