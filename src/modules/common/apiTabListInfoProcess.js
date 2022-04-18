

export const apiTabListInfoProcess = (data,info,type)=>{
    let newApiTabInfo = tabProcessCommon(data,info,type);

    sessionStorage.setItem("apiTabListInfo",JSON.stringify(newApiTabInfo))
}


export const quickTestTabProcess = (data,info)=>{
    let newApiTabInfo = tabProcessCommon(data,info,"api");

    sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newApiTabInfo))
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