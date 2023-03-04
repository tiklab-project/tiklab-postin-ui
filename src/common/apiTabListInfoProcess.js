/**
 * tab标签处理
 */
export const apiTabListInfoProcess = (data,info,type)=>{
    let newApiTabInfo = tabProcessCommon(data,info,type);

    sessionStorage.setItem("apiTabListInfo",JSON.stringify(newApiTabInfo))
}


const tabProcessCommon = (data,info,type)=>{
    let tablist = info.tabList;
    let newList ={
        id:data.id,
        name:data.name,
        type:type
    }

    tablist.splice(info.activeKey,1,{...tablist[info.activeKey],...newList})

    return {
        activeKey: info.activeKey,
        tabList: tablist
    }
}

export const quickTestTabProcess = (data,info)=>{
    let newApiTabInfo = quickTestTabProcessCommon(data,info,"api");

    sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newApiTabInfo))
}

/**
 * 快捷测试tab标签初始值
 */
const quickTestTabProcessCommon = (data,info,type)=>{
    let tablist = info.tabList;
    let newList ={
        id:data.id,
        name:data.requestInstance?.url,
        type:type
    }

    tablist.splice(info.activeKey,1,{...tablist[info.activeKey],...newList})

    return {
        activeKey: info.activeKey,
        tabList: tablist
    }
}