import { observable,  action } from "mobx";


class RequestStore {
    @observable radioValue ="";

    @action
    getRadioValue = (value) => {
        this.radioValue = value; 
    }

}

const requestStore = new RequestStore();
export default requestStore;
