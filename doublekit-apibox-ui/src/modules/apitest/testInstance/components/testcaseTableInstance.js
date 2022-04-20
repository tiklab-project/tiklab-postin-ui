
import React, {useEffect, useState} from "react";
import InstanceDetail from "./instanceDetail";
import {inject, observer} from "mobx-react";

const TestcaseTableInstance = (props) =>{
    const {testcaseId,instanceStore} = props;
    const {findInstanceList} = instanceStore;
    const [instanceId, setInstanceId] = useState("");
    const [result, setResult] = useState("");

    // useEffect(()=>{
        findInstanceList(testcaseId).then(res=>{
            if(res.length>0){
                setInstanceId(res[0]?.id);
                setResult(res[0]?.result===1?"成功":"失败")
            }else {
                setResult("暂无测试")
            }
        })
    // },[testcaseId])

    return(
        <>
            {
                result==="暂无测试"
                    ?<span>暂无测试</span>
                    :<InstanceDetail instanceId={instanceId} name={result}/>
            }


        </>

    )

}

export default inject("instanceStore")(observer(TestcaseTableInstance));