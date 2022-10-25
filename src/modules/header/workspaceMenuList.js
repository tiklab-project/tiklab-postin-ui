import React, {useEffect} from "react";
import {getUser} from "tiklab-core-ui"
import {inject, observer} from "mobx-react";
import {toWorkspaceDetail} from "../workspace/components/workspaceFn";

//顶部菜单栏，下拉框里的空间列表
const WorkspaceMenuList = (props) =>{
    const {workspaceRecentStore,changeCurrentLink,setClickIcon} = props;
    const {workspaceRecent,findWorkspaceRecentList,recentList}=workspaceRecentStore;

    let userId = getUser().userId;

    useEffect(()=>{
        if(userId){
            findWorkspaceRecentList(userId)
        }
    },[userId])


    const showWorkspaceListView = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    onClick={()=>switchWorkspace(item.workspace?.id)}
                    className={"header-workspace-list-item"}
                >
                    {item.workspace?.workspaceName}
                </li>
            )
        })
    }

    // 去往详情页
    const switchWorkspace=(workspaceId)=>{
        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
        setClickIcon(false)
    }


    return(
        <>
            <ul style={{height: 145,overflow:"auto"}}>
                {
                    showWorkspaceListView(recentList)
                }
            </ul>
            <div
                className={"header-workspace-list-footer"}
                onClick={()=>changeCurrentLink("/workspacePage/create")}
            >
                进入所有空间
            </div>
        </>
    )
}

export default inject("workspaceStore","workspaceRecentStore")(observer(WorkspaceMenuList));