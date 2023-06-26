
import React, {useEffect, useState} from "react";
import InstanceDetail from "./InstanceDetail";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import instanceStore from "../store/InstanceStore";


const TestcaseTableInstance = (props) =>{
    const {testcaseId} = props;
    const {findInstanceList} = instanceStore;
    const [instanceId, setInstanceId] = useState("");
    const [result, setResult] = useState("");

    const userId = getUser().userId;

    let params={
        "httpCaseId":testcaseId,
        "userId":userId,
    }
    useEffect(()=>{
        findInstanceList(params).then(res=>{
            if(res.length>0){
                setInstanceId(res[0]?.id);
                setResult(res[0]?.result===1?"成功":"失败")
            }else {
                setResult("暂无测试")
            }
        })
    },[testcaseId])

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

export default observer(TestcaseTableInstance);