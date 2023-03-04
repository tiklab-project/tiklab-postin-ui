import { observable, action } from "mobx";

/**
 * 快捷测试
 * 后置 store
 */
export  class AfterScriptQuickTestStore {
    @observable afterQuickTestInfo ;

    /**
     * 获取新的参数
     */
    @action
    getAfterInfo = (value)=>{
        this.afterQuickTestInfo = {...this.afterQuickTestInfo,...value};
    }

    /**
     * 设置参数
     */
    @action
    setAfterInfo = async ()=>{
        return this.afterQuickTestInfo
    }

}

export const AFTERSCRIPT_QUICKTEST_STORE = 'afterScriptQuickTestStore';