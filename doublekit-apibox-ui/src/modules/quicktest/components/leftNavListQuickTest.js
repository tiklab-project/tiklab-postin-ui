import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";
import {Empty} from "antd";

const LeftNavListQuickTest =(props)=>{
    const {instanceStore,quickTestStore} = props;
    const {findInstanceList,instanceList} = instanceStore;
    const {setResponseShow} = quickTestStore;

    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(()=>{
        findInstanceList("quickTestInstanceId",workspaceId)
    },[])


    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    const onClick=(item)=>{
        localStorage.setItem("instanceId",item.id)

        quickTestTabProcess(item,quickTestTabListInfo);

        setResponseShow();

        props.history.push("/workspacepage/quickTest/detail/api")
    }

    const showListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    className={"qt-left-list-li"}
                    key={item.id}
                    onClick={()=>onClick(item)}
                >
                    {item.requestInstance?.url}
                </li>
            )
        })
    }


    return(
        <>
            {
                instanceList&&instanceList.length>0
                    ? <ul className={"qt-left-list"}>
                        {
                            showListView(instanceList)
                        }
                    </ul>
                    :<div className={"qt-left-empty"}>
                        <Empty
                            description={
                                <span>
                                    send a request
                                </span>
                            }
                        />
                    </div>
            }
        </>

    )

}

export default inject("instanceStore","quickTestStore")(observer(LeftNavListQuickTest));