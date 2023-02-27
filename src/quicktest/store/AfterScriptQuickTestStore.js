import { observable, action } from "mobx";

export  class AfterScriptQuickTestStore {
    @observable afterQuickTestInfo ;

    @action
    getAfterInfo = (value)=>{
        this.afterQuickTestInfo = {...this.afterQuickTestInfo,...value};
    }

    @action
    setAfterInfo = async ()=>{
        return this.afterQuickTestInfo
    }

}

export const AFTERSCRIPT_QUICKTEST_STORE = 'afterScriptQuickTestStore';