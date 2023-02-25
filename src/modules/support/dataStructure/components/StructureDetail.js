import React, {useEffect, useState} from 'react';
import EnumParamDS from './enumStructure';
import JsonParamDS from "./jsonStructure";
import {inject, observer} from "mobx-react";
import DetailHeader from "../../../common/detailHeader";
import IconCommon from "../../../common/iconCommon";


const StructureDetail = (props) => {
    const {dataStructureStore} = props
    const {findDataStructure} = dataStructureStore


    const [data, setData] = useState();
    let  dataStructureId = localStorage.getItem("dataStructureId")

    useEffect(async ()=>{

        let res = await findDataStructure( dataStructureId);

        setData(res)

    },[])


    //根据dataType切换
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

    const backToList =() =>{
        props.history.push("/workspace/dataStructure")
    }

    return(
        <div className={"structure-content"}>
            <div className={"structure-content-box"}>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width: 90
                        }}>
                            <IconCommon
                                icon={"31fanhui1"}
                                style={{margin:"0 0 0 5px","cursor":"pointer"}}
                                className={"icon-s"}
                                onClick={backToList}
                            />
                            <span> 模型详情</span>
                        </div>
                    }
                    // right={
                    //     <DataStructureEdit
                    //         type={"add"}
                    //         dataStructureId={dataStructureId}
                    //         name={'编辑'}
                    //     />
                    // }
                />
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


export default  inject("dataStructureStore")(observer(StructureDetail));
