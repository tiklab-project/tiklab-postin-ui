import { observable, action } from "mobx";

export  class RawQuickTestStore {
    @observable rawQuickTestInfo ;

    @action
    getRawInfo = (info)=>{
        if(info&&Object.keys(info).length>0){
            this.rawQuickTestInfo = {...this.rawQuickTestInfo,...info};
        }
    }

    @action
    setRawInfo = async ()=>{
        return this.rawQuickTestInfo;
    }

}

export const RAW_QUICKTEST_STORE = 'rawQuickTestStore';