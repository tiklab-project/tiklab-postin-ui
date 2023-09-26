import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Input, Space, Tooltip} from "antd";
import {TextMethodType} from "../../common/MethodType";
import {getUser} from "tiklab-core-ui";
import {SearchOutlined} from "@ant-design/icons";
import {
    getMediaType,
    processFormParamData,
    processFormUrlencodedData,
    processHeaderData,
    processQueryData
} from "./instanceDataProcess";
import {mediaTypeDir} from "../../common/dictionary/dictionary";
import instanceStore from "../../api/http/test/instance/store/InstanceStore";
import quickTestStore from "../store/QuickTestStore";
import tabQuickTestStore from "../store/TabQuickTestStore";
/**
 * 快捷测试
 * 左侧目录
 */
const LeftNavListQuickTest =(props)=>{
    const {findInstanceList,instanceList,deleteAllInstance,deleteInstance,findInstance} = instanceStore;
    const {setResponseShow,setResponseData} = quickTestStore;
    const {tabPaneInfo,setTabPaneInfo} = tabQuickTestStore

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




    /**
     * 点击打开不同的实例
     */
    const onClick= (item)=>{

        let instance = {}
        findInstance(item.id).then(res=>{


            let resData = {
                body:res.responseInstance?.body,
                headers:JSON.parse(res.responseInstance?.headers),
                size:res.size,
                statusCode:res.statusCode,
                time:res.time,
                error:res.error
            }
            setResponseData(resData)

            let request = res.requestInstance;
            let header = processHeaderData(request.headers)
            if(header&&header.length===0){
                header = [{id: 'InitRowId'}]
            }
            let query = processQueryData(request.url)
            if(query&&query.length===0){
                query = [{id: 'InitRowId'}]
            }

            let bodyType = getMediaType(request?.mediaType);
            let bodyData = {
                "bodyType":"none",
                "form":[{id: 'InitRowId'}],
                "formUrl":[{id: 'InitRowId'}],
                "raw":{
                    "type":"application/json",
                    "raw":null
                }
            }
            switch (bodyType){
                case mediaTypeDir.none.title:
                    break;
                case mediaTypeDir.formdata.title:
                    bodyData = {
                        ...bodyData,
                        "bodyType":bodyType,
                        "form":processFormParamData(request.body)
                    }
                    break;
                case mediaTypeDir.formUrlencoded.title:
                    bodyData = {
                        ...bodyData,
                        "bodyType":bodyType,
                        "formUrl":processFormUrlencodedData(request.body)
                    }
                    break;
                case mediaTypeDir.raw.title:
                    let rawInfo = {
                        raw:request?.body,
                        type:request?.mediaType
                    }
                    bodyData = {
                        ...bodyData,
                        "bodyType":bodyType,
                        "raw":rawInfo
                    }
                    break;
                default:
                    break;
            }


            instance = {
                "id":res.id,
                "type":"api",
                "data":{
                    "baseInfo":{
                        "path":request.url,
                        "methodType":request.methodType,
                    },
                    "header":header,
                    "query":query,
                    "body":bodyData,
                    "preScript":{"scriptex":null},
                    "afterScript":{"scriptex":null},
                    "assert":[{id: 'InitRowId'}],
                }
            }

            let { tabList } = tabPaneInfo;
            let activeKey

            //获取当前行对应的下标
            let index = tabList.findIndex((item) => res.id === item.id);
            //替换上一次录入的数据
            if(index===-1){
                tabList = [...tabList, instance];

                activeKey = JSON.stringify(tabList.length - 1);
            }else {
                tabList.splice(index, 1, { ...tabList[index], instance});

                activeKey = JSON.stringify(index);
            }

            let newTabInfo = { activeKey:activeKey, tabList: tabList };

            setTabPaneInfo(newTabInfo)
        })

        setResponseShow(true);
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
                        <div className={"qt-left-list-box-ellipsis"}>
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

export default observer(LeftNavListQuickTest);