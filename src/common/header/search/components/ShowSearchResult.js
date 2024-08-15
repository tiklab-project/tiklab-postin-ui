import React, {useEffect, useState} from "react";
import workspaceRecentStore from "../../../../workspace/workspace/store/WorkspaceRecentStore";
import categoryStore from "../../../../category/store/CategoryStore";
import {observer} from "mobx-react";
import {ShowWorkspaceIcon, toWorkspaceDetail} from "../../../../workspace/workspace/components/WorkspaceFn";
import MethodType, {TextMethodType} from "../../../MethodType";
import {Empty, Space} from "antd";
import {useHistory} from "react-router";
import apiRecentStore from "../../../../home/apiRecent/store/ApiRecentStore";

const ShowSearchResult = (props)=>{
    const {
        workspaceRecentList,apiRecentList,
        isSearch,
        workspaceSearchList,apiSearchList,
        setIsModalOpen
    } = props;
    const {workspaceRecent}=workspaceRecentStore;
    const {apiRecent}=apiRecentStore;

    const history = useHistory()


    /**
     * 点击搜索到空间，跳到对应的空间
     */
    const toWorkspace = (id) =>{
        toWorkspaceDetail(id,workspaceRecent,"/workspace/quickTest")
        history.push('/workspace/quickTest');

        setIsModalOpen(false);

    }

    /**
     * 点击搜索到接口，跳到对应的接口
     */
    const toMethod = async (apiId,workspaceId,type) => {
        //设置最近打开的接口
        let params = {
            workspace:{id:workspaceId},
            apix:{id:apiId},
        }
        await apiRecent(params)

        localStorage.setItem("LEFT_MENU_SELECT","/workspace/quickTest");
        localStorage.setItem('workspaceId',workspaceId);
        localStorage.setItem('apiId',apiId);
        if(type==="http"){
            history.push('/workspace/apis/http/document');
        }else {
            history.push('/workspace/apis/ws/document');
        }

        setIsModalOpen(false);
    }

    const showVisibility = (name,icon) =>{
        return <div style={{"display":"flex","alignItems":"center","gap":"6px",fontSize:"12px",color:"#b0b0b0"}}>
            <svg style={{width:14,height:14}} aria-hidden="true">
                <use xlinkHref= {`#icon-${icon}`} />
            </svg>
            <span>{name}</span>
        </div>
    }


    const showWorkspaceItem = (list)=>{
        return list&&list.map(item=>{

            return (
                <div key={item.id}>
                    <div className="list-item" onClick={()=>toWorkspace(item.id)}>
                        <Space>
                            <ShowWorkspaceIcon url={item.iconUrl} className={"workspace-icon icon-bg-border"}/>
                            <div style={{width:"350px"}} className={"text-ellipsis"}>{item.workspaceName}</div>
                        </Space>
                        {/*<span style={{fontSize: "12px", color: "#b0b0b0"}}>{item.updateTime}</span>*/}
                        {
                            item.visibility===0
                                ? showVisibility("公共","suoding")
                                :showVisibility("私密","jiesuo")
                        }
                    </div>
                </div>
            )
        })
    }


    const showRecentWorkspaceItem = (list)=>{
        return list&&list.map(item=>{
            let workspace =  item?.workspace

            return (
                <div key={workspace.id}>
                    <div className="list-item" onClick={()=>toWorkspace(workspace.id)}>
                        <Space>
                            <ShowWorkspaceIcon url={workspace.iconUrl} className={"workspace-icon icon-bg-border"}/>
                            <div style={{width:"350px"}} className={"text-ellipsis"}>{workspace.workspaceName}</div>
                        </Space>
                        <div className={"right-item text-ellipsis"} >{item.updateTime}</div>
                    </div>
                </div>
            )
        })
    }


    const showApiItem =(list)=>{
        return list&&list.map(item=> {
            return (
                <div key={item.id}>
                    <div className="list-item" onClick={() => toMethod(item.id, item.workspace.id,item.type)}>
                        <Space>
                            <div style={{width:"50px"}}>
                                {
                                    item.type==="ws"
                                        ? <MethodType type={item.type}/>
                                        : <MethodType type={item.methodType}/>
                                }
                            </div>
                            <div style={{width:"350px"}} className={"text-ellipsis"}>{item.name}</div>
                        </Space>
                        <div className={"right-item text-ellipsis"}>{item?.workspace?.workspaceName}</div>
                    </div>
                </div>
            )
        })
    }


    const showRecentApiItem =(list)=>{
        return list&&list.map(item=> {
            let apix = item?.apix

            return (
                <div key={item.id}>
                    <div className="list-item" onClick={() => toMethod(apix?.id, apix?.workspaceId,apix?.protocolType)}>
                        <Space>
                            <div style={{width:"50px"}}>
                                {
                                    apix?.protocolType==="ws"
                                        ? <MethodType type={apix?.protocolType}/>
                                        : <MethodType type={apix?.node?.methodType}/>
                                }
                            </div>
                            <div  style={{width:"350px"}} className={"text-ellipsis"}>{apix?.node?.name}</div>
                        </Space>
                        <div className={"right-item text-ellipsis"}>{item?.workspace?.workspaceName}</div>
                    </div>
                </div>
            )
        })
    }

    return(
        <>
            {
                isSearch
                    ?<>
                        <div className="same-result" >
                            <div className="search-title">空间: </div>
                            <div style={{"minHeight": 50}}>
                                {
                                    workspaceSearchList&&workspaceSearchList.length>0
                                        ? showWorkspaceItem(workspaceSearchList)
                                        : <Empty
                                            imageStyle={{ height: 60 }}
                                            description={<span>暂无空间</span>}
                                        />
                                }
                            </div>

                        </div>
                        <div className="same-result" >
                            <div className="search-title">接口:</div>
                            <div style={{"minHeight": 50}}>
                                {
                                    apiSearchList&&apiSearchList.length>0
                                        ?showApiItem(apiSearchList)
                                        :<Empty
                                            imageStyle={{ height: 60 }}
                                            description={<span>暂无接口</span>}
                                        />
                                }
                            </div>
                        </div>
                     </>
                    :<>
                        <div className="same-result" >
                            <div className="search-title">最近访问空间: </div>
                            <div style={{"minHeight": 50}}>
                                {
                                    workspaceRecentList&&workspaceRecentList.length>0
                                        ?showRecentWorkspaceItem(workspaceRecentList)
                                        :<Empty
                                            imageStyle={{ height: 60 }}
                                            description={<span>暂无空间</span>}
                                        />
                                }
                            </div>

                        </div>
                        <div className="same-result" >
                            <div className="search-title">最近访问接口:</div>
                            <div style={{"minHeight": 50}}>
                                {
                                    apiRecentList&&apiRecentList.length>0
                                        ? showRecentApiItem(apiRecentList)
                                        :<Empty
                                            imageStyle={{ height: 60 }}
                                            description={<span>暂无空间</span>}
                                        />
                                }
                            </div>
                        </div>
                    </>
            }


        </>
    )
}

export default observer(ShowSearchResult);