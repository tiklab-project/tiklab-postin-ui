import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";

const LeftNavListQuickTest =(props)=>{
    const {instanceStore} = props;
    const {findInstanceList,instanceList} = instanceStore;

    useEffect(()=>{
        findInstanceList("quickTestInstanceId")
    },[])


    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    const onClick=(item)=>{
        localStorage.setItem("instanceId",item.id)

        quickTestTabProcess(item,quickTestTabListInfo)

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
                    {item.createTime}
                </li>
            )
        })
    }


    return(
        <ul className={"qt-left-list"}>
            {
                showListView(instanceList)
            }
        </ul>
    )

}

export default inject("instanceStore")(observer(LeftNavListQuickTest));