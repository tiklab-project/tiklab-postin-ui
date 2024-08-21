import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import {Dropdown, Space, Tooltip} from "antd";
import {ShowWorkspaceIcon, toWorkspaceDetail} from "../workspace/components/WorkspaceFn";
import {SYSTEM_ROLE_STORE} from 'thoughtware-privilege-ui/es/store'
import workspaceRecentStore from "../workspace/store/WorkspaceRecentStore";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./workspaceDetailStyle.scss"
import "../workspace/components/workspace.scss"
import "../../common/commonStyle.scss"
import "../../api/http/definition/components/apxMethod.scss"
import "../../support/share/components/shareStyle.scss"
import {LeftCircleOutlined} from "@ant-design/icons";
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {workspaceStore,systemRoleStore} = props;
    const {workspaceIcon,findWorkspace,findWorkspaceJoinList } = workspaceStore;
    const {workspaceRecent,findWorkspaceRecentPage}=workspaceRecentStore;

    const menuData = [
        {
            "icon":"home",
            "name":"概况",
            "key":"overview",
            "router":"/workspace/overview"
        },
        {
            "icon":"kuaijieyingyon",
            "name":"接口调试",
            "key":"quickTest",
            "router":"/workspace/quickTest"
        },
        {
            "icon":"jiekou",
            "name":"接口",
            "key":"api",
            "router":"/workspace/apis"
        },
        {
            "icon":"datamodel",
            "name":"数据结构",
            "key":"dataStructure",
            "router":"/workspace/dataStructure"
        }
    ]


    const history = useHistory()
    const [visible, setVisible] = useState(false);
    const workspaceId = localStorage.getItem("workspaceId")
    const [recentList, setRecentList] = useState([]);
    const [workspaceName, setWorkspaceName] = useState();

    useEffect(async ()=>{
        let info = await findWorkspace(workspaceId)
        setWorkspaceName(info.workspaceName)

        systemRoleStore.getInitProjectPermissions(getUser().userId, workspaceId)
    },[workspaceId])

    const openToggleWorkspace = async () =>{
        setVisible(!visible)
        let userId = getUser().userId
        let params = {
            pageParam: {
                pageSize: 5,
                currentPage:1
            },
            userId:userId
        }
        let recentList = await findWorkspaceRecentPage(params)

        // 如果不足 5 个，补充，并去重
        if (recentList.length < 5) {
            let additionalList = await findWorkspaceJoinList({userId:userId})

            // 去重
            additionalList = additionalList.filter(item => !recentList.some(existingItem => existingItem.id === item.id));

            // 将不足的项目添加到最近项目列表
            recentList = recentList.concat(additionalList.slice(0, 5 - recentList.length));
        }
        // 如果超过 5 个，保留最新的 5 个项目
        recentList = recentList.slice(-5);
        setRecentList(recentList)
    }

    /**
     * 展示切换的空间
     */
    const toggleWorkspaceView =(isExpanded)=> (
        <div className={"ws-hover-box"} style={{left:`${isExpanded?"200px":"75px"}`}}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换空间</div>
                <div style={{height:"210px"}}>
                    {
                        recentList&&recentList.map((item,index)=> {
                                if(index>4) return
                                return (
                                    <div
                                        className={`ws-hover-item ${item?.workspace?.id===workspaceId?"ws-toggle-ws-select":""}`}
                                        key={item?.workspace?.id}
                                        onClick={() => toggleWorkspace(item?.workspace?.id)}
                                    >
                                        <Space>
                                            <ShowWorkspaceIcon url={item?.workspace?.iconUrl} className={"workspace-icon icon-bg-border"}  width={30}/>
                                            {item?.workspace?.workspaceName}
                                        </Space>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>

            <a className={"ws-toggle-repository_more"} onClick={()=>history.push("/workspaces")}>查看更多</a>
        </div>
    )

    /**
     * 切换空间
     */
    const toggleWorkspace = (workspaceId)=>{
        toWorkspaceDetail(workspaceId,workspaceRecent)

        props.history.push('/workspace/overview');

        setVisible(false)
    }

    const showToggleRepository = (isExpanded,themeColor)=> (
        <>
            <li className={`menu-box-nav-item-workspace `} >
                <Tooltip placement="right" title={workspaceName}>
                <Dropdown
                        overlay={()=>toggleWorkspaceView(isExpanded)}
                        trigger={['click']}
                        visible={visible}
                        onOpenChange={openToggleWorkspace}
                    >
                    <div style={{padding:`15px  0 15px 20px`}} className={`ws-icon-box ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}`}>
                        <div style={{"cursor":"pointer"}}>
                            <ShowWorkspaceIcon url={workspaceIcon} className={`${isExpanded?"icon-l":"icon-x"} icon-bg-border`}  width={30}/>
                        </div>
                        {
                            isExpanded&& <div className={"text-ellipsis"} style={{maxWidth:"100px"}}>{workspaceName}</div>
                        }

                        <IconCommon
                            style={{
                                cursor:"pointer",
                                width:"12px",
                                height:"12px",
                                marginLeft:"3px"
                            }}
                            icon={"xiala"}
                        />
                        </div>
                    </Dropdown>
                </Tooltip>
            </li>
            <li
                className={`menu-box-nav-item `}
                style={{
                    borderBottom:themeColor==="theme-default"?"1px solid #e3e3e3":"1px solid #f6f7f81a",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push("/index")
                    localStorage.setItem("LEFT_MENU_SELECT","/index");
                }}
            >
                <div className={`
                    menu-box-nav-item-${themeColor}
                  ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}
                `}>
                    <div className={"menu-box-nav-item-detail"}>
                        <LeftCircleOutlined style={{fontSize:"18px",margin:"0 5px 0 8px"}}/>
                    </div>
                    <div  className={"menu-box-nav-item-detail"}>
                        返回主页
                    </div>
                </div>
            </li>
        </>
    )


    return(
        <LeftMenuCommon
            menuData={menuData}
            diffHeader={showToggleRepository}
            workspaceId={workspaceId}
            settingRouter={"/workspace/setting"}
        />
    )
}

export default inject("workspaceStore",SYSTEM_ROLE_STORE)(observer(LeftNav));
