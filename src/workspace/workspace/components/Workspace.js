import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './workspace.scss';
import {Input} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import WorkspaceList from "./WorkspaceList";
import DetailHeader from "../../../common/DetailHeader";
import {SearchOutlined} from "@ant-design/icons";
import WorkspaceRecentHome from "./WorkspaceRecentHome";
import IconBtn from "../../../common/iconBtn/IconBtn";
import workspaceFollowStore from "../store/WorkspaceFollowStore";
import MenuSelectCommon from "../../../common/menuSelect/MenuSelectCommon";
import EnvSelect from "../../../support/environment/components/EnvSelect";
/**
 * 空间页
 */
const Workspace = (props) => {
    const {workspaceStore} = props;
    const {findWorkspaceFollowList} = workspaceFollowStore

    const {findWorkspaceList,findWorkspaceJoinList} = workspaceStore;

    const userId = getUser().userId;
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
        let uId = {userId:userId}

        switch (selectIndex||"all") {
            case "all":
                let params= {
                    ...uId,
                    ...name
                }
                findWorkspaceJoinList(params).then(list=>{
                    setWorkspaceList(list)
                })

                setSelectTab("all");
                break;
            case "create":
                let param = {
                    ...uId,
                    ...name
                }
                findWorkspaceList(param).then(list=>{
                    setWorkspaceList(list)
                })

                setSelectTab("create");
                break;
            case "follow":
                findWorkspaceFollowList(uId).then(list=>{
                    setWorkspaceList(list)
                })

                setSelectTab("follow");
                break;
        }
    },[])

    const toWorkspaceEdit = () =>{
        props.history.push("/workspace-edit")
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
        <div style={{"height":"var(--pi-calc-content)",overflow:"auto"}}>
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
                        <span>空间</span>
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
                <div className='contant-box'>
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
