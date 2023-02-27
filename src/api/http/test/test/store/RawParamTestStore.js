import { observable, action } from "mobx";

export  class RawParamTestStore {
    @observable rawParamTestInfo ;

    @action
    getRawInfo = (value)=>{
        this.rawParamTestInfo = {...this.rawParamTestInfo,...value};
    }

    @action
    setRawInfo = async ()=>{
        return this.rawParamTestInfo;
    }

}

export const RAWPARAM_TEST_STORE = 'rawParamTestStore';