import { observable, action } from "mobx";

export  class AfterParamTestStore {
    @observable afterParamTestInfo ;

    @action
    getAfterInfo = (value)=>{
        this.afterParamTestInfo = {...this.afterParamTestInfo,...value};
    }

    @action
    setAfterInfo = async ()=>{
        return this.afterParamTestInfo
    }

}

export const AFTER_PARAM_TEST_STORE = 'afterParamTestStore';