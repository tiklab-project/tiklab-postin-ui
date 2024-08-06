import React, {useCallback, useEffect, useState} from 'react';
import './workspace.scss';
import {Col,Row, Input} from "antd";
import {inject, observer} from "mobx-react";
import WorkspaceList from "./WorkspaceList";
import {SearchOutlined} from "@ant-design/icons";
import WorkspaceRecentHome from "./WorkspaceRecentHome";
import IconBtn from "../../../common/iconBtn/IconBtn";
import workspaceFollowStore from "../store/WorkspaceFollowStore";
import MenuSelectCommon from "../../../common/menuSelect/MenuSelectCommon";
import {getUser} from "thoughtware-core-ui";
import {debounce} from "../../../common/commonUtilsFn/CommonUtilsFn";
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
            <Row style={{height:"100%"}}>
                <Col
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 18, offset: 3 }}
                    xll={{ span: 16, offset: 4 }}
                >
                <div className='ws-layout'>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span style={{fontWeight:"bold",fontSize:"16px"}}>空间</span>

                            <IconBtn
                                className="important-btn"
                                onClick={toWorkspaceEdit}
                                name={"添加空间"}
                                type="primary"
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
                                    prefix={<SearchOutlined style={{fontSize:"16px"}}/>}
                                    placeholder={`搜索空间`}
                                    onPressEnter={onSearch}
                                    className={'search-input'}
                                    onChange={debounce(onSearch,500)}
                                    allowClear
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
                </Col>
            </Row>
        </div>
    )
}

export default inject("workspaceStore")(observer(Workspace));
