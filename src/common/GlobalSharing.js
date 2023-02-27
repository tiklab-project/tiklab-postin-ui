
export const globalTabListInit = (workspaceId) =>{
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
}