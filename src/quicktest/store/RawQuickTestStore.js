import { observable, action } from "mobx";

/**
 * 快捷测试
 * raw store
 */
export  class RawQuickTestStore {
    @observable rawQuickTestInfo ;

    /**
     * 获取raw
     */
    @action
    getRawInfo = (info)=>{
        if(info&&Object.keys(info).length>0){
            this.rawQuickTestInfo = {...this.rawQuickTestInfo,...info};
        }
    }

    /**
     * 设置raw
     */
    @action
    setRawInfo = async ()=>{
        return this.rawQuickTestInfo;
    }

}

export const RAW_QUICKTEST_STORE = 'rawQuickTestStore';