import React, {useEffect} from "react";
import {getUser} from "doublekit-core-ui"
import {inject, observer} from "mobx-react";
import {globalTabListInit} from "../common/globalSharing";

//顶部菜单栏，下拉框里的空间列表
const WorkspaceMenuList = (props) =>{
    const {workspaceStore,changeCurrentLink,setClickIcon} = props;
    const {findWorkspaceList,workspaceList} = workspaceStore;


    let userId = getUser().userId;

    useEffect(()=>{
        if(userId){
            findWorkspaceList(userId)
        }
    },[userId])


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

    // 切换空间
    const switchWorkspace=(id)=>{
        localStorage.setItem('workspaceId',id);

        globalTabListInit(id)

        localStorage.setItem("LEFT_MENU_SELECT","api");

        props.history.push({pathname:'/workspacepage'});

        setClickIcon(false)
    }


    return(
        <>
            <ul style={{height: 130,overflow:"auto"}}>
                {
                    showWorkspaceListView(workspaceList)
                }
            </ul>
            <div
                onClick={()=>changeCurrentLink("/workspace/alllist")}
            >
                进入所有空间
            </div>
        </>
    )
}

export default inject("workspaceStore")(observer(WorkspaceMenuList));