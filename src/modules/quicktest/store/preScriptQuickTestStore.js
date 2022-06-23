import { observable, action } from "mobx";

export  class PreScriptQuickTestStore {
    @observable preQuickTestInfo ;

    @action
    getPreInfo = (value)=>{
        this.preQuickTestInfo = {...this.preQuickTestInfo,...value};
    }

    @action
    setPreInfo = async ()=>{
        return this.preQuickTestInfo;
    }

}

export const PRESCRIPT_QUICKTEST_STORE = 'preScriptQuickTestStore';