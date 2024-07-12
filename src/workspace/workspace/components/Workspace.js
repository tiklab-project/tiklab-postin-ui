import React, {useCallback, useEffect, useState} from 'react';
import './workspace.scss';
import {Input} from "antd";
import {inject, observer} from "mobx-react";
import WorkspaceList from "./WorkspaceList";
import {SearchOutlined} from "@ant-design/icons";
import WorkspaceRecentHome from "./WorkspaceRecentHome";
import IconBtn from "../../../common/iconBtn/IconBtn";
import workspaceFollowStore from "../store/WorkspaceFollowStore";
import MenuSelectCommon from "../../../common/menuSelect/MenuSelectCommon";
/**
 * 空间页
 */
const Workspace = (props) => {
    const {workspaceStore} = props;
    const {findWorkspaceFollowList} = workspaceFollowStore

    const {findWorkspaceList,findWorkspaceJoinList} = workspaceStore;

    const [workspaceList, setWorkspaceList] = useState([]);
    const [selectTab, setSelectTab] = useState("all");


    useEffect(()=>{
        findList()
    },[])

    /**
     * 搜索空间
     */
    const onSearch = (e) =>{
        let name = {workspaceName:e.target.value}

        findList(name,"all")
    }

    /**
     * 根据不同的筛选项查找
     */
    const findList = useCallback((name,selectIndex)=>{
        switch (selectIndex||"all") {
            case "all":
                findWorkspaceJoinList(name).then(list=>{
                    setWorkspaceList(list)
                })
                setSelectTab("all");
                break;
            case "create":
                findWorkspaceList(name).then(list=>{
                    setWorkspaceList(list)
                })
                setSelectTab("create");
                break;
            case "follow":
                findWorkspaceFollowList().then(list=>{
                    setWorkspaceList(list)
                })
                setSelectTab("follow");
                break;
        }
    },[])

    const toWorkspaceEdit = () =>{
        props.history.push("/workspaces-edit")
    }


    //空间筛选列表
    const items = [
        {
            title: '所有空间',
            key: `all`,
        },
        {
            title: '我收藏的',
            key: `follow`,
        },
        {
            title: '我创建的',
            key: `create`,
        }
    ];

    const selectMenu = (item) =>{
        findList({},item.key)
        setSelectTab(item.key)
    }


    return(
        <div style={{"height":"100%",overflow:"auto"}}>
            <div className='ws-layout'>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 0 0 10px"
                    }}
                >
                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        width: 55
                    }}>
                        <svg className={"icon-m"} aria-hidden="true" >
                            <use xlinkHref= {`#icon-home`} />
                        </svg>
                        <span style={{fontWeight:"bold"}}>空间</span>
                    </div>

                    <IconBtn
                        className="important-btn"
                        onClick={toWorkspaceEdit}
                        name={"添加空间"}
                    />
                </div>

                <div className={"home-box-item-detail"}>
                    <div style={{margin:"10px 0 "}}>最近访问</div>
                    <WorkspaceRecentHome {...props}/>
                </div>
                <MenuSelectCommon
                    items={items}
                    selectItem={selectTab}
                    right={
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder={`搜索空间`}
                            onPressEnter={onSearch}
                            className={"ws-header-menu-input"}
                        />
                    }
                    selectKeyFun={selectMenu}
                />
                <div className='contant-box' style={{margin:"10px 0 0 0"}}>
                    <WorkspaceList
                        {...props}
                        workspaceList={workspaceList}
                        findList={findList}
                        selectItem={selectTab}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Workspace));
