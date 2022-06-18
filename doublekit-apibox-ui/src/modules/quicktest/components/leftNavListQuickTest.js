import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";
import { Empty, Input} from "antd";
import {TextMethodType} from "../../common/methodType";
import {getUser} from "doublekit-core-ui";

const LeftNavListQuickTest =(props)=>{
    const {instanceStore,quickTestStore} = props;
    const {findInstanceList,instanceList,deleteAllInstance} = instanceStore;
    const {setResponseShow} = quickTestStore;

    const userId = getUser().userId;

    useEffect(()=>{
        let params={
            "httpCaseId":"quickTestInstanceId",
            "userId":userId,
        }
        findInstanceList(params)
    },[])


    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    const onClick=(item)=>{
        localStorage.setItem("instanceId",item.id)

        quickTestTabProcess(item,quickTestTabListInfo);

        setResponseShow();

        props.history.push("/workspace/quickTest/detail/api")
    }

    const showListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    className={"qt-left-list-li"}
                    key={item.id}
                    onClick={()=>onClick(item)}
                >
                    <div>
                        <TextMethodType type={item.requestInstance?.methodType} />
                        <span className={"qt-left-list-li-status"}>{item.statusCode}</span>
                        <span>{item.time}ms</span>
                    </div>
                    {item.requestInstance?.url}
                </li>
            )
        })
    }


    const deleteAllInstanceFn = ()=>{
        deleteAllInstance(userId)
    }


    return(
        <>
            <div className={"qt-left-header"}>
                <div className={"qt-left-heaer-clear"} onClick={deleteAllInstanceFn} >清空</div>
            </div>
            {
                instanceList&&instanceList.length>0
                    ? <ul className={"qt-left-list"}>
                        {
                            showListView(instanceList)
                        }
                    </ul>
                    :<div className={"qt-left-empty"}>
                        <Empty
                            description={ <span> 暂无测试历史</span>}
                        />
                    </div>
            }
        </>

    )

}

export default inject("instanceStore","quickTestStore")(observer(LeftNavListQuickTest));