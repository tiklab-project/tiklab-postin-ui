import { observable, action } from "mobx";

class AfterParamTestStore {
    @observable afterParamTestInfo ;

    @action
    getAfterInfo = (value)=>{
        this.afterParamTestInfo = value;
    }

    @action
    setAfterInfo = async ()=>{
        return this.afterParamTestInfo
    }

}

let afterParamTestStore = new  AfterParamTestStore()

export default afterParamTestStore;