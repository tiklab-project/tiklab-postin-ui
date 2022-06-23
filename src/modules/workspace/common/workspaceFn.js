import {globalTabListInit} from "../../common/globalSharing";

// 点击空间，初始化的一些数据，并跳往空间详情
export const toWorkspaceDetail = (workspaceId,userId,workspaceRecent) => {
    //点击api按钮时初始化api中tab页信息
    const apiTabInfo = {
        activeKey:0,
        tabList:[
            {
                name:"初始页",
                id:workspaceId,
                type:"list",
            }
        ]
    }
    sessionStorage.setItem("apiTabListInfo",JSON.stringify(apiTabInfo))

    //最近空间
    let params = {
        workspace: {id:workspaceId},
        userId:userId
    }

    workspaceRecent(params)

    globalTabListInit(workspaceId)

    localStorage.setItem("LEFT_MENU_SELECT","api");

    localStorage.setItem('workspaceId',workspaceId);
}
