import React from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import SideMenu from "../../common/sideMenu";
import {Radio, Space} from "antd";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const WorkspaceSetting = (props) =>{

    const items=[
        {
            title: '状态管理',
            key: '/workspace/status',
            icon: 'icon-modular',
        },{
            title: '空间成员',
            key: '/workspace/role',
            icon: 'icon-modular',
        },{
            title: '空间权限',
            key: '/workspace/workspacePrivilege',
            icon: 'icon-modular',
        }
    ]

    const selectKeyFun = (key)=>{
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT","setting");

        props.history.push(key);
    }



    const showSetting = (data) =>{
        return data&&data.map(item=>{
            return (
                <li key={item.key} style={{  margin:"0 auto"}} >
                    <div className={`nav-setting-item`}
                         key={item.key}
                         onClick={()=>selectKeyFun(item.key)}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${item.icon}`} />
                        </svg>
                        <span >
                            {item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }


    return(
        // <div className={"workspace-setting-box"}>
        //     <SideMenu
        //         item={items}
        //         selectedKey={"/workspace/workspaceSetting/apistatus"}
        //         {...props}
        //     />
        //
        //     <div className={"workspace-setting-right"}>
        //         {
        //             renderRoutes(routes)
        //         }
        //     </div>
        //
        // </div>
        <div className={"ws-nav-setting"}>
            <div className={`ws-detail-left-nav-item`} >
                <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                    <div className={"ws-detail-left-nav-item-detail"}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-setting`}/>
                        </svg>
                    </div>
                    <div  className={"ws-detail-left-nav-item-detail"}>设置</div>
                </div>
            </div>
            <div className={`nav-setting-box `}>
                <ul className="nav-setting-menu">
                    {
                        showSetting(items)
                    }
                </ul>
            </div>
        </div>
    )
}


export default WorkspaceSetting;