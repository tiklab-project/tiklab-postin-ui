import React, { useEffect, useState} from 'react';
import './workspace.scss';
import {Input} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import WorkspaceEdit from "./WorkspaceEdit";
import WorkspaceList from "./WorkspaceList";
import DetailHeader from "../../../common/DetailHeader";
import {SearchOutlined} from "@ant-design/icons";
import WorkspaceRecentHome from "./WorkspaceRecentHome";

/**
 * 空间页
 */
const Workspace = (props) => {
    const {workspaceStore,workspaceFollowStore} = props;
    const {findWorkspaceFollowList} = workspaceFollowStore

    const {findWorkspaceList,findWorkspaceJoinList} = workspaceStore;

    const userId = getUser().userId;
    const [selectItem, setSelectItem] = useState("all");

    //空间筛选列表
    const items = [
        {
            title: '所有空间',
            key: `all`,
        },
        // {
        //     title: `我最近浏览的`,
        //     key: `recent`,
        // },
        {
            title: '我收藏的',
            key: `follow`,
        },
        {
            title: '我创建的',
            key: `create`,
        }
    ];

    /**
     * 渲染筛选项
     */
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`ws-header-menu-item  ${item.key === selectItem ? "ws-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    useEffect(()=>{
        findList()
    },[])

    /**
     * 点击筛选项查找
     */
    const selectKeyFun = (item)=>{
        setSelectItem(item.key)

        findList({},item.key)
    }

    /**
     * 搜索空间
     */
    const onSearch = (e) =>{
        let name = {workspaceName:e.target.value}

        findList(name)
    }

    /**
     * 根据不同的筛选项查找
     */
    const findList = (name,selectIndex)=>{
        let uId = {userId:userId}

        switch (selectIndex?selectIndex:selectItem) {
            case "all":
                let params= {
                    ...uId,
                    ...name
                }
                findWorkspaceJoinList(params)
                break;
            case "create":
                let param = {
                    ...uId,
                    ...name
                }
                findWorkspaceList(param)
                break;
            case "follow":
                findWorkspaceFollowList(uId)
                break;
            // case "recent":
            //     findWorkspaceRecentList(uId)
            //     break;
        }
    }

    return(
        <div style={{"height":"100%",overflow:"auto"}}>
            <div className='ws-layout'>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width: 55
                        }}>
                            <svg className={"icon-m"} aria-hidden="true" >
                                <use xlinkHref= {`#icon-home`} />
                            </svg>
                            <span>空间</span>
                        </div>
                    }
                    right={
                        <WorkspaceEdit
                            name={"添加空间"}
                            btn={"btn"}
                            userId={userId}
                            findList={findList}
                            selectItem={selectItem}
                            {...props}
                        />
                    }
                />

                <div className={"home-box-item-detail"}>
                    <div style={{margin:"10px 0 "}}>最近访问</div>
                    <WorkspaceRecentHome {...props}/>
                </div>

                <div className={"ws-header-menu"}>
                    <div className={"ws-header-menu-left"}>
                        {showMenu(items)}

                    </div>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder={`搜索空间`}
                        onPressEnter={onSearch}
                        className={"ws-header-menu-input"}
                    />
                </div>

                <div className='contant-box'>
                    <WorkspaceList
                        {...props}
                        findList={findList}
                        selectItem={selectItem}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("workspaceStore","workspaceFollowStore","workspaceRecentStore")(observer(Workspace));
