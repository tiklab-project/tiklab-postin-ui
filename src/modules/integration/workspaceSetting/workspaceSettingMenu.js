import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./workspaceSetting.scss"
import {inject, observer} from "mobx-react";


const WorkspaceSettingMenu = (props) =>{
    const { workspaceStore} = props;
    const {settingItemSelected} = workspaceStore;
    const routes = props.route.routes;


    const [selected, setSelected] = useState(settingItemSelected?settingItemSelected:"/workspace/setting/detail");

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
            title: '成员',
            key: '/workspace/setting/role',
            // icon: 'icon-modular',
        },{
            title: '权限',
            key: '/workspace/setting/privilege',
            // icon: 'icon-modular',
        }
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
        <div className={"workspace-setting-box"}>
            <div className={"ws-side-menu"}>
                <ul className="ws-menu-ul">
                    <li style={{
                        borderBottom:"1px solid #cecece",
                        padding:"10px 20px"
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
    )
}


export default inject("workspaceStore")(observer(WorkspaceSettingMenu));