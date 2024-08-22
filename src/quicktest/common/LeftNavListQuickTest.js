import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Empty, Input, Tooltip, Tree} from "antd";
import {TextMethodType} from "../../common/MethodType";
import {getUser} from "thoughtware-core-ui";
import {DownOutlined, FolderOpenOutlined, FolderOutlined, SearchOutlined} from "@ant-design/icons";
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

const { TreeNode } = Tree;


/**
 * 快捷测试
 * 左侧目录
 */
const LeftNavListQuickTest =(props)=>{
    const {instanceStore,setLoading,loading} = props;
    const {findInstanceList,instanceList,deleteAllInstance,deleteInstance,findInstance} = instanceStore;
    const {setResponseShow} = quickTestStore;
    const {tabPaneInfo,setTabPaneInfo,setTapLoading} = tabQuickTestStore

    const userId = getUser().userId;
    const workspaceId = localStorage.getItem("workspaceId")
    const [expandedKeys, setExpandedKeys] = useState([]);

    useEffect(()=>{
        findList()
    },[])

    let findList = async (url)=>{
        setLoading(true)
        let params={
            "workspaceId":workspaceId,
            "userId":userId,
            "url":url
        }

        await findInstanceList(params)
        setLoading(false)
    }


    /**
     * 点击打开不同的实例
     */
    const onClick= (item)=>{
        setTapLoading(true)
        findInstance(item.id).then(res=>{
            setTapLoading(false)
            setResponseShow(true);

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
     * 清空所有实例
     */
    const deleteAllInstanceFn = ()=>{
        deleteAllInstance(workspaceId).then(()=>findList())
    }

    const onSearch = (e)=>{
        let value = e.target.value
        findList(value)
    }

    const generateTreeNodes = (data) => {
        return Object.keys(data).map(date => ({
            title: date,
            key: date,
            children: data[date].map(instance => ({
                ...instance,
            }))
        }));
    };

    const renderTreeNodes = (list) => {
        const data = generateTreeNodes(list);

        return data && data.map(date => (
            <TreeNode
                key={date.key}
                title={date.title}
                icon={({ expanded }) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />)}
                dataRef={date}
                selectable={true}
            >
                {date.children.map(item => (
                    <TreeNode
                        key={item.id}
                        title={
                            <div
                                className={"qt-left-list-li"}
                                key={item.id}
                            >
                                <div className={"qt-left-list-box"} onClick={()=>onClick(item)}>
                                    <div className={"qt-left-list-box-ellipsis"}>
                                        <TextMethodType type={item.requestInstance?.methodType} />
                                        <div className={"text-ellipsis"}>{item.requestInstance?.url}</div>
                                    </div>
                                </div>
                                <svg className="qt-left-list-icon" aria-hidden="true" onClick={()=> deleteInstance(item.id).then(()=> findList())}>
                                    <use xlinkHref= {`#icon-shanchu1`} />
                                </svg>
                            </div>
                        }
                        dataRef={item}
                    />
                ))}
            </TreeNode>
        ));
    };

    const onSelect = (selectedKeys, { node }) => {
        if (expandedKeys.includes(node.key)) {
            setExpandedKeys(expandedKeys.filter(key => key !== node.key));
        } else {
            setExpandedKeys([...expandedKeys, node.key]);
        }
    };


    return(
        <>
            <div className={"qt-left-header"}  style={{minWidth: "280px"}}>
                <div style={{fontSize:"16px",fontWeight:"bold"}}>接口调试</div>
                <div className={"qt-left-heaer-clear"}>
                    <Tooltip placement="right" title={"清空"}>
                        <svg className="icon" aria-hidden="true" onClick={deleteAllInstanceFn}>
                            <use xlinkHref="#icon-qingkong" />
                        </svg>
                    </Tooltip>
                </div>
            </div>

            <div className={"qt-left-search"}>
                <Input
                    prefix={<SearchOutlined style={{fontSize:"16px"}} />}
                    placeholder={"搜索"}
                    onChange={debounce(onSearch,500)}
                    onPressEnter={onSearch}
                    allowClear
                />
            </div>

            <div className={"qt-left-list"}>
                {
                    instanceList&&Object.keys(instanceList).length>0
                        ? <Tree
                            switcherIcon={<DownOutlined />}
                            showIcon
                            expandedKeys={expandedKeys}
                            onExpand={setExpandedKeys}
                            onSelect={onSelect}
                        >
                            {renderTreeNodes(instanceList)}
                        </Tree>
                        :<div className={"qt-left-empty"}>
                            {
                                !loading
                                    ? <Empty description={ <span> 暂无测试历史</span>}/>
                                    : <div />
                            }

                        </div>
                }
            </div>



        </>

    )

}

export default inject("instanceStore")(observer(LeftNavListQuickTest));