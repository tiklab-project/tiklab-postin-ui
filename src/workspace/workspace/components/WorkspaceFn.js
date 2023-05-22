/**
 * 点击空间，初始化的一些数据，并跳往空间详情
 */
import {getUser} from "tiklab-core-ui";


export const toWorkspaceDetail = (workspaceId,workspaceRecent,leftMenuSelect) => {

    //最近空间
    let params = {
        workspace: {id:workspaceId},
        user: {id:getUser().userId}
    }
    workspaceRecent(params)


    localStorage.setItem("LEFT_MENU_SELECT",leftMenuSelect?leftMenuSelect:"quickTest");

    localStorage.setItem('workspaceId',workspaceId);
}
