import React, {useState} from "react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import WorkspaceMenuList from "./workspaceMenuList";
import {getUser} from "doublekit-core-ui"

const HeaderMenu = (props) =>{
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const [clickIcon, setClickIcon] = useState(false);

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
            to:'/systemManagement',
            title:'系统管理',
            key: 'systemManagement'
        }
    ]

    const changeCurrentLink = item => {
        setCurrentLink(item)
        props.history.push(item)
        setClickIcon(false)
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
                            <span >{clickIcon === true ?<DownOutlined />:<UpOutlined />}</span>
                        </div>
                        <div
                            className={`header-workspaceBox ${ clickIcon === true ? "showWorkspace" : "hideWorkspace" }`}
                        >

                            {
                               getUser()&&getUser().ticket
                                    ?<WorkspaceMenuList
                                        {...props}
                                        changeCurrentLink={changeCurrentLink}
                                        setClickIcon={setClickIcon}
                                    />
                                    :<div>去登录</div>
                            }

                        </div>
                    </div>
                )
            }else{
                return(
                    <div
                        key={item.key}
                        onClick={ () => changeCurrentLink(item.to)}
                        className={currentLink === item.to ? 'portal-header-link-active' : null}
                    >
                        {item.title}
                    </div>
                )
            }

        })
    }


    return(
        <>
            {
                menuView(menuRouter)
            }
        </>
    )
}
export default inject("workspaceStore")(observer(HeaderMenu));