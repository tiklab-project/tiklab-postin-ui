import { observable, action } from "mobx";

class RawParamTestStore {
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

let rawParamTestStore = new RawParamTestStore();
export default rawParamTestStore;