import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {Dropdown, Space} from "antd";
import {ShowWorkspaceIcon, toWorkspaceDetail} from "../workspace/components/WorkspaceFn";
import {SYSTEM_ROLE_STORE} from 'tiklab-privilege-ui/es/store'
import workspaceRecentStore from "../workspace/store/WorkspaceRecentStore";
import IconCommon from "../../common/IconCommon";
import {useHistory} from "react-router";
import "./workspaceDetailStyle.scss"
import "../workspace/components/workspace.scss"
import "../../common/commonStyle.scss"

/**
 * 左侧导航展示
 */
const LeftNav = (props) =>{
    const {workspaceStore,systemRoleStore} = props;
    const {workspaceIcon,workspaceList,findWorkspaceJoinList,findWorkspace } = workspaceStore;
    const {workspaceRecent}=workspaceRecentStore;

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
            "router":"/workspace/quickTest/detail/api"
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

    const setting= {
            "icon":"setting",
            "name":"空间设置",
            "key":"workspaceSetting",
            "router":"/workspace/setting"
        }

    const history = useHistory()
    const [visible, setVisible] = useState(false);
    const workspaceId = localStorage.getItem("workspaceId")
    const leftMenuSelect = localStorage.getItem("LEFT_MENU_SELECT")

    useEffect(()=>{
        findWorkspace(workspaceId)
        findWorkspaceJoinList({userId:getUser().userId})

        systemRoleStore.getInitProjectPermissions(getUser().userId, workspaceId)
    },[])

    /**
     * 点击左侧导航事件
     */
    const clickAddRouter = (data) =>{

        addQuickTestTabInfo(data.router);

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT",data.key);

        history.push(data.router)
    }


    /**
     * 点击快捷测试初始化的tap
     */
    const addQuickTestTabInfo = (router) =>{
        if(router==="/workspace/quickTest"){
            localStorage.setItem("instanceId","-1")
        }
    }

    /**
     * 左侧导航
     */
    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.key}
                    className={`ws-left-nav-item `}
                    onClick={()=>clickAddRouter(item)}
                >
                    <div className={`ws-left-nav-item-box ${leftMenuSelect===item.key?"selectlink":null}`}>
                        <div className={"ws-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`} />
                            </svg>
                        </div>
                        <div  className={"ws-left-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    /**
     * 展示切换的空间
     */
    const toggleWorkspaceView = (
        <div className={"ws-hover-box"}>
            <div style={{ padding: "10px"}}>
                <div className={"ws-hover-box-title"}>切换仓库</div>
                <div style={{height:"169px"}}>
                    {
                        workspaceList&&workspaceList.map((item,index)=> {
                                if(index>3) return
                                return <div className={"ws-hover-item"} key={item.id} onClick={() => toggleWorkspace(item.id)}>
                                    <Space>
                                        <img src={item.iconUrl} alt={"icon"} className={"repository-icon"} width={20}/>
                                        {item.workspaceName}
                                    </Space>
                                </div>
                            }
                        )
                    }
                </div>
            </div>


            <a className={"ws-toggle-repository_more"} onClick={()=>history.push("/workspacePage")}>查看更多</a>
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

    return(
        <>
            <ul className={"ws-detail-left-nav"}>
                <div>
                    <li className={`ws-detail-left-nav-item-workspace `} >
                        <Dropdown
                            overlay={toggleWorkspaceView}
                            trigger={['click']}
                            visible={visible}
                            onOpenChange={()=>setVisible(!visible)}
                        >
                            <div className={"ws-icon-box"}>
                            <span style={{"cursor":"pointer",margin:" 0 0 0 16px"}}>
                                 <ShowWorkspaceIcon iconUrl={workspaceIcon} className={"repository-icon"}  width={30}/>
                            </span>
                                <IconCommon
                                    style={{"cursor":"pointer"}}
                                    className={"icon-s"}
                                    icon={"xiala"}
                                />
                            </div>
                        </Dropdown>
                    </li>
                    {
                        showMenuItem(menuData)
                    }
                </div>
                <div>
                    <div className={`ws-detail-left-nav-item`} onClick={()=>clickAddRouter(setting)}>
                        <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                            <div className={"ws-detail-left-nav-item-detail"}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-setting`}/>
                                </svg>
                            </div>
                            <div  className={"ws-detail-left-nav-item-detail"} >  设置 </div>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default inject("workspaceStore",SYSTEM_ROLE_STORE)(observer(LeftNav));
