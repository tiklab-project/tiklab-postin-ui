import { observable, action } from "mobx";

export  class PreParamTestStore {
    @observable preParamTestInfo ;

    @action
    getPreInfo = (value)=>{

        this.preParamTestInfo = value;
    }

    @action
    setPreInfo = async ()=>{
        return this.preParamTestInfo;
    }

}

export const PRE_PARAM_TEST_STORE = 'preParamTestStore';