/**
 * 点击空间，初始化的一些数据，并跳往空间详情
 */
import {getUser} from "tiklab-core-ui";


export const toWorkspaceDetail = (workspaceId,workspaceRecent,leftMenuSelect) => {

    //点击进入空间，默认选中接口调试
    const apiTabInfo = {
        activeKey:"0",
        tabList:[
            {
                name:"新标签",
                id:"newTab",
                type:"api",
            }
        ]
    }

    sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(apiTabInfo))

    localStorage.setItem("instanceId","-1")



    //最近空间
    let params = {
        workspace: {id:workspaceId},
        user: {id:getUser().userId}
    }
    workspaceRecent(params)


    localStorage.setItem("LEFT_MENU_SELECT",leftMenuSelect?leftMenuSelect:"quickTest");

    localStorage.setItem('workspaceId',workspaceId);
}
