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
import LeftNavCommon from "../../common/leftMenu/LeftNavCommon";
import {LeftCircleOutlined} from "@ant-design/icons";

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
            "router":"/workspace/quick/test"
        },
        {
            "icon":"jiekou",
            "name":"接口",
            "key":"api",
            "router":"/workspace/apis"
        },
        {
            "icon":"ico-",
            "name":"数据结构",
            "key":"dataStructure",
            "router":"/workspace/dataStructure"
        },
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

    /**
     * 点击左侧导航事件
     */
    const clickAddRouter = (data) =>{

        addQuickTestTabInfo(data.router);

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT",data.router);

        if(data.key==="overview"){
            history.push(`/workspace/overview/${workspaceId}`)
        }else {
            history.push(data.router)
        }
    }

    /**
     * 点击快捷测试初始化的tap
     */
    const addQuickTestTabInfo = (router) =>{
        if(router==="/workspace/quick"){
            localStorage.setItem("instanceId","-1")
        }
    }


    const showToggleRepository = ()=> (
        <>
            <li className={`ws-detail-left-nav-item-workspace `} >
                <Tooltip placement="right" title={workspaceName}>
                <Dropdown
                        overlay={toggleWorkspaceView}
                        trigger={['click']}
                        visible={visible}
                        onOpenChange={openToggleWorkspace}
                    >
                        <div className={"ws-icon-box"}>
                            <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                                 <ShowWorkspaceIcon url={workspaceIcon} className={"workspace-icon icon-bg-border"}  width={30}/>
                            </span>
                            <IconCommon
                                style={{"cursor":"pointer"}}
                                className={"icon-s"}
                                icon={"xiala"}
                            />
                        </div>
                    </Dropdown>
                </Tooltip>
            </li>
            <li
                className={`ws-detail-left-nav-item `}
                style={{
                    borderBottom: "1px solid #e4e4e4",
                    margin: "0 0 10px 0"
                }}
                onClick={()=> {
                    history.push("/home")
                    localStorage.setItem("LEFT_MENU_SELECT","/home");
                }}
            >
                <div className={`ws-detail-left-nav-item-box`}>
                    <div className={"ws-detail-left-nav-item-detail"}>
                        <LeftCircleOutlined style={{fontSize:"16px"}}/>
                    </div>
                    <div  className={"ws-detail-left-nav-item-detail"}>
                        返回主页
                    </div>
                </div>
            </li>
        </>
    )


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
    const toggleWorkspaceView = (
        <div className={"ws-hover-box"}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换空间</div>
                <div style={{height:"210px"}}>
                    {
                        recentList&&recentList.map((item,index)=> {
                                if(index>4) return
                                return (
                                    <div
                                        className={`ws-hover-item ${item.id===workspaceId?"ws-toggle-ws-select":""}`}
                                        key={item.id}
                                        onClick={() => toggleWorkspace(item.id)}
                                    >
                                        <Space>
                                            <ShowWorkspaceIcon url={item.iconUrl} className={"workspace-icon icon-bg-border"}  width={30}/>
                                            {item.workspaceName}
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

        props.history.push('/workspace/overview/'+workspaceId);

        setVisible(false)
    }



    /**
     * 点击设置
     */
    const clickSetting = ()=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT","setting");

        props.history.push("/workspace/setting");
    }

    return(
        <LeftNavCommon
            menuData={menuData}
            clickAddRouter={clickAddRouter}
            clickSetting={clickSetting}
            diffHeader={showToggleRepository}
        />
    )
}

export default inject("workspaceStore",SYSTEM_ROLE_STORE)(observer(LeftNav));
