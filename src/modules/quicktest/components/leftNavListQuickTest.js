import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";
import {Empty, Input, Tooltip} from "antd";
import {TextMethodType} from "../../common/methodType";
import {getUser} from "tiklab-core-ui";

const LeftNavListQuickTest =(props)=>{
    const {instanceStore,quickTestStore} = props;
    const {findInstanceList,instanceList,deleteAllInstance,deleteInstance} = instanceStore;
    const {setResponseShow} = quickTestStore;

    const userId = getUser().userId;

    useEffect(()=>{
        findList()
    },[])

    let findList = ()=>{
        let params={
            "httpCaseId":"quickTestInstanceId",
            "userId":userId,
        }
        findInstanceList(params)
    }


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
                >
                    <div className={"qt-left-list-box"} onClick={()=>onClick(item)}>
                        <div>
                            <TextMethodType type={item.requestInstance?.methodType} />
                            <span className={"qt-left-list-li-status"} >{item.statusCode}</span>
                            <span>{item.time}ms</span>
                        </div>
                        {item.requestInstance?.url}
                    </div>
                    <svg className="qt-left-list-icon" aria-hidden="true" onClick={()=> deleteInstance(item.id).then(()=> findList())}>
                        <use xlinkHref= {`#icon-shanchu1`} />
                    </svg>
                </li>
            )
        })
    }


    const deleteAllInstanceFn = ()=>{
        deleteAllInstance(userId).then(()=>findList())
    }


    return(
        <>
            <div className={"qt-left-header"}>
                <Input
                    placeholder={"搜索"}
                />
                <div className={"qt-left-heaer-clear"}>
                    <Tooltip placement="right" title={"清空"}>
                        <svg className="icon" aria-hidden="true" onClick={deleteAllInstanceFn}>
                            <use xlinkHref="#icon-qingkong" />
                        </svg>
                    </Tooltip>
                </div>
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