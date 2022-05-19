import React, {useState} from "react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui"

const HeaderMenu = (props) =>{
    const {workspaceStore} = props;
    const {findWorkspaceList,workspaceList} = workspaceStore;

    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [clickIcon, setClickIcon] = useState(false);

    let userId = getUser().userId;
    useState(()=>{
        findWorkspaceList(userId)
    },[userId])

    const menuRouter = [
        {
            to:'/home',
            title:'主页',
            key: 'home'
        },
        {
            to:'/workspace/alllist',
            title:'空间',
            key: 'Workspace'
        },
        {
            to:'/systemManagement/envMana',
            title:'系统管理',
            key: 'systemManagement'
        }
    ]

    // 切换空间
    const switchWorkspace=(id)=>{
        localStorage.setItem('workspaceId',id);

        localStorage.setItem("leftRouter","/workspacepage/detail");

        props.history.push({pathname:'/workspacepage'});

        setClickIcon(false)
    }

    const showWorkspaceListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    onClick={()=>switchWorkspace(item.id)}
                    className={"header-workspace-list-item"}
                >
                    {item.workspaceName}
                </li>
            )
        })
    }

    const menuView = (data) => {
        return data&&data.map(item => {
            if(item.key==="Workspace"){
                return(
                    <div
                        className={"header-workspace-item"}
                        key={item.key}
                    >
                        <div

                            className={currentLink === item.to ? 'portal-header-link-active' : null}
                            onClick={()=>setClickIcon(!clickIcon)}
                        >
                            {item.title}

                            <span >
                                {clickIcon === true ?<DownOutlined />:<UpOutlined />}
                            </span>
                        </div>
                        <div
                            className={`header-workspaceBox ${ clickIcon === true ? "showWorkspace" : "hideWorkspace" }`}
                        >
                            <ul style={{height: 130}}>
                                {showWorkspaceListView(workspaceList)}
                            </ul>
                            <div
                                onClick={()=>changeCurrentLink(item)}
                            >
                                进入所有空间
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div
                        key={item.key}
                        onClick={ () => changeCurrentLink(item)}
                        className={currentLink === item.to ? 'portal-header-link-active' : null}
                    >
                        {item.title}
                    </div>
                )
            }

        })
    }

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
        setClickIcon(false)
    }

    return(
        <>
            {menuView(menuRouter)}
        </>
    )
}
export default inject("workspaceStore")(observer(HeaderMenu));