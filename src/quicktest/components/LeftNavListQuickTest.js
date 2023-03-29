import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {quickTestTabProcess} from "../../common/apiTabListInfoProcess";
import {Empty, Input, Space, Tooltip} from "antd";
import {TextMethodType} from "../../common/MethodType";
import {getUser} from "tiklab-core-ui";
import {SearchOutlined} from "@ant-design/icons";

/**
 * 快捷测试
 * 左侧目录
 */
const LeftNavListQuickTest =(props)=>{
    const {instanceStore,quickTestStore} = props;
    const {findInstanceList,instanceList,deleteAllInstance,deleteInstance} = instanceStore;
    const {setResponseShow} = quickTestStore;

    const userId = getUser().userId;
    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(()=>{
        findList()
    },[])

    let findList = (url)=>{
        let params={
            "workspaceId":workspaceId,
            "userId":userId,
            "url":url
        }
        findInstanceList(params)
    }


    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    /**
     * 点击打开不同的实例
     */
    const onClick=(item)=>{
        localStorage.setItem("instanceId",item.id)

        quickTestTabProcess(item,quickTestTabListInfo);

        setResponseShow();

        props.history.push("/workspace/quickTest/detail/api")
    }


    /**
     * 耗时渲染
     */
    const showTime = (time) =>{
        if(!time) return

        if(JSON.stringify(time).length>3){
            return<span > {time/1000} ms</span>
        }else {
            return <span >{time} ms</span>
        }
    }

    /**
     * 大小渲染
     */
    const showSize = (size) =>{
        if(!size) return

        if(JSON.stringify(size).length>3){
            return<span >{size/1000} kb</span>
        }else {
            return <span >{size} b</span>
        }
    }

    /**
     * 列表项渲染
     */
    const showListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    className={"qt-left-list-li"}
                    key={item.id}
                >
                    <div className={"qt-left-list-box"} onClick={()=>onClick(item)}>
                        <div>
                            <TextMethodType type={item.requestInstance?.methodType} /><span>{item.requestInstance?.url}</span>
                        </div>

                        <Space>
                            <span className={"qt-left-list-li-status"} >{item.statusCode}</span>
                            <span style={{fontSize:13}}>{showTime(item.time)}</span>
                            <span style={{fontSize:13,margin:"0 0 0 10px"}}>{showSize(item.size)}</span>
                        </Space>

                    </div>
                    <svg className="qt-left-list-icon" aria-hidden="true" onClick={()=> deleteInstance(item.id).then(()=> findList())}>
                        <use xlinkHref= {`#icon-shanchu1`} />
                    </svg>
                </li>
            )
        })
    }


    /**
     * 清空所有实例
     */
    const deleteAllInstanceFn = ()=>{
        deleteAllInstance(userId).then(()=>findList())
    }


    const onSearch = (e)=>{
        findList(e.target.value)
    }

    return(
        <>
            <div className={"qt-left-header"}  style={{minWidth: "280px"}}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder={"搜索"}
                    onPressEnter={onSearch}
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