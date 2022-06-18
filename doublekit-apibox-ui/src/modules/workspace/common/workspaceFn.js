import {globalTabListInit} from "../../common/globalSharing";

// 点击空间，初始化的一些数据，并跳往空间详情
export const toWorkspaceDetail = (workspaceId,userId,workspaceRecent) => {
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
