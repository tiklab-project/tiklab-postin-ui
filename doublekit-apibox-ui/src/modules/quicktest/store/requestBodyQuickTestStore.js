import { observable,  action } from "mobx";


export class RequestBodyQuickTestStore {
    @observable bodyType="formdata";

    @action
    getBodyType = (value) => {
        this.bodyType = value;
    }

    @action
    setBodyType = async () => {
        return this.bodyType;
    }
}


export const REQUESTBODY_QUICKTEST_STORE = 'requestBodyQuickTestStore';