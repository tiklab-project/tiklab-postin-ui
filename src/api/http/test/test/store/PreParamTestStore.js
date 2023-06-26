import { observable, action } from "mobx";

class PreParamTestStore {
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

let preParamTestStore = new PreParamTestStore()

export default preParamTestStore;