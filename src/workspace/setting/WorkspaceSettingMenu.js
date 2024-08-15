import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import {inject, observer} from "mobx-react";
import {ProjectNav} from "thoughtware-privilege-ui"
/**
 * 空间设置页中的左侧导航
 */
const WorkspaceSettingMenu = (props) =>{
    const { workspaceStore} = props;
    const {settingItemSelected} = workspaceStore;
    const routes = props.route.routes;


    const [selected, setSelected] = useState(settingItemSelected?settingItemSelected:"/workspace/setting/info");

    const workspaceId = localStorage.getItem("workspaceId")

    /**
     * 点击左侧菜单，设置路由地址
     * @param {*} id
     */
    const selectKeyFun = (id)=>{
        setSelected(id)
        props.history.push(id);
    }

    const items=[
        {
            title: '空间信息',
            id: '/workspace/setting/info',
            // icon: 'icon-setting',
        },{
            title: '环境',
            id: '/workspace/setting/env',
            // icon: 'icon-modular',
        },{
            title: '成员',
            id: '/workspace/setting/role',
            // icon: 'icon-modular',
        },{
            title: '权限',
            id: '/workspace/setting/privilege',
            // icon: 'icon-modular',
        },
    ]


    /**
     *左侧导航循环渲染
     */
    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.id} style={{  margin:"0 auto"}} >
                    <div className={`ws-menu-li ${Item.id === selected ? "ws-menu-li-action" : null}`}
                         key={Item.id}
                         onClick={()=>selectKeyFun(Item.id)}
                    >
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
                            padding: "10px 25px",
                            fontSize: "16px",
                            borderBottom: "1px solid #e4e4e4",
                            fontWeight: "bold",
                        }}
                        >设置</li>
                        {
                            renderList(items)
                        }
                    </ul>

                </div>

                <div className={"workspace-setting-right padding-left-right padding-top-bottom"}>
                    {
                        renderRoutes(routes)
                    }
                </div>
            </div>
        </ProjectNav>
    )
}


export default inject("workspaceStore")(observer(WorkspaceSettingMenu));