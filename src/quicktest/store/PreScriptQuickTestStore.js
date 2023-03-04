import { observable, action } from "mobx";

/**
 * 快捷测试
 * 前置 store
 */
export  class PreScriptQuickTestStore {
    @observable preQuickTestInfo ;

    /**
     * 获取前置
     */
    @action
    getPreInfo = (value)=>{
        this.preQuickTestInfo = {...this.preQuickTestInfo,...value};
    }

    /**
     * 设置前置
     */
    @action
    setPreInfo = async ()=>{
        return this.preQuickTestInfo;
    }

}

export const PRESCRIPT_QUICKTEST_STORE = 'preScriptQuickTestStore';