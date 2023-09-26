import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import {inject, observer} from "mobx-react";
import {ProjectNav} from "tiklab-privilege-ui"
/**
 * 空间设置页中的左侧导航
 */
const WorkspaceSettingMenu = (props) =>{
    const { workspaceStore} = props;
    const {settingItemSelected} = workspaceStore;
    const routes = props.route.routes;


    const [selected, setSelected] = useState(settingItemSelected?settingItemSelected:"/workspace/setting/detail");

    const workspaceId = localStorage.getItem("workspaceId")

    /**
     * 点击左侧菜单，设置路由地址
     * @param {*} key
     */
    const selectKeyFun = (key)=>{
        setSelected(key)
        props.history.push(key);
    }

    const items=[
        {
            title: '空间信息',
            key: '/workspace/setting/detail',
            // icon: 'icon-setting',
        },{
            title: '环境设置',
            key: '/workspace/setting/env',
            // icon: 'icon-modular',
        },{
            title: '成员',
            key: '/workspace/setting/role',
            // icon: 'icon-modular',
        },{
            title: '权限',
            key: '/workspace/setting/privilege',
            // icon: 'icon-modular',
        },
    ]


    /**
     *左侧导航循环渲染
     */
    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.key} style={{  margin:"0 auto"}} >
                    <div className={`ws-menu-li ${Item.key === selected ? "ws-menu-li-action" : null}`}
                         key={Item.key}
                         onClick={()=>selectKeyFun(Item.key)}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${Item.icon}`} />
                        </svg>
                        <span >
                            {Item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }



    return(
        <ProjectNav
            {...props}
            domainId={workspaceId} // 项目id
            projectRouters={items} // 菜单
            outerPath={`/workspace/setting`} // 项目设置Layout路径
        >
            <div className={"workspace-setting-box"}>
                <div className={"ws-side-menu"}>
                    <ul className="ws-menu-ul">
                        <li style={{
                            padding: "10px 30px",
                            fontSize: "16px"
                        }}
                        >空间设置</li>
                        {
                            renderList(items)
                        }
                    </ul>

                </div>

                <div className={"workspace-setting-right"}>
                    {
                        renderRoutes(routes)
                    }
                </div>
            </div>
        </ProjectNav>
    )
}


export default inject("workspaceStore")(observer(WorkspaceSettingMenu));