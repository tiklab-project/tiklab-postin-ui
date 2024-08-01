import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Input, Space, Tooltip} from "antd";
import {TextMethodType} from "../../common/MethodType";
import {getUser} from "thoughtware-core-ui";
import {SearchOutlined} from "@ant-design/icons";
import {
    getMediaType,
    processFormParamData,
    processFormUrlencodedData,
    processHeaderData,
    processQueryData, processResponse
} from "./instanceDataProcess";
import {mediaTypeDir, rawTypeDictionary} from "../../common/dictionary/dictionary";
import quickTestStore from "../http/store/QuickTestStore";
import tabQuickTestStore from "../store/TabQuickTestStore";
import {debounce} from "../../common/commonUtilsFn/CommonUtilsFn";


/**
 * 快捷测试
 * 左侧目录
 */
const LeftNavListQuickTest =(props)=>{
    const {instanceStore} = props;
    const {findInstanceList,instanceList,deleteAllInstance,deleteInstance,findInstance} = instanceStore;
    const {setResponseShow} = quickTestStore;
    const {tabPaneInfo,setTabPaneInfo} = tabQuickTestStore

    const userId = getUser().userId;
    const workspaceId = localStorage.getItem("workspaceId")
    const [visible, setVisible] = useState(false);

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
        findInstance(item.id).then(res=>{
            let request = res.requestInstance;
            let headerList = processHeaderData(request.headers)
            let queryList = processQueryData(request.url)
            let bodyData = getBodyData(request)

            let responseData = processResponse(res)

            let instance = {
                "id":res.id,
                "type":"api",
                "protocol": "http",
                "data":{
                    "baseInfo":{
                        "path":request.url,
                        "methodType":request.methodType,
                    },
                    "header":headerList,
                    "query":queryList,
                    "body":bodyData,
                    "preScript":{"scriptex":request?.preScript},
                    "afterScript":{"scriptex":request?.afterScript},
                    "assert":[{id: 'InitRowId'}],

                    response:responseData
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

    //获取请求体数据
    const getBodyData = (request) =>{
        let bodyType = getMediaType(request?.mediaType);

        //初始
        let bodyData = {
            "bodyType":"none",
            "form":[{id: 'InitRowId'}],
            "formUrl":[{id: 'InitRowId'}],
            "raw":{
                "type":"application/json",
                "raw":null
            }
        }

        // 获取不同类型的请求体
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
                let rawInfo;
                switch (request?.mediaType){
                    case rawTypeDictionary.text.mediaType:
                    case rawTypeDictionary.javascript.mediaType:
                    case rawTypeDictionary.xml.mediaType:
                    case rawTypeDictionary.html.mediaType:
                        rawInfo = {
                            raw:request?.body,
                            type:request?.mediaType
                        }
                        break;
                    case rawTypeDictionary.json.mediaType:
                        rawInfo = {
                            raw:JSON.parse(request?.body),
                            type:request?.mediaType
                        }
                        break;
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

        return bodyData
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
                            {
                                item.statusCode
                                    ?<span className={"qt-left-list-li-status"} >{item.statusCode}</span>
                                    :null
                            }

                            <span style={{fontSize:13,margin:"0 0 0 10px"}}>{showTime(item.time)||"0ms"}</span>
                            <span style={{fontSize:13,margin:"0 0 0 10px"}}>{showSize(item.size)||"0b"}</span>
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
        deleteAllInstance(workspaceId).then(()=>findList())
    }

    const onSearch = (e)=>{
        let value = e.target.value
        findList(value)
    }

    return(
        <>
            <div className={"qt-left-header"}  style={{minWidth: "280px"}}>
                <Input
                    prefix={<SearchOutlined style={{fontSize:"16px"}} />}
                    placeholder={"搜索"}
                    onChange={debounce(onSearch,500)}
                    onPressEnter={onSearch}
                    allowClear
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

export default inject("instanceStore")(observer(LeftNavListQuickTest));