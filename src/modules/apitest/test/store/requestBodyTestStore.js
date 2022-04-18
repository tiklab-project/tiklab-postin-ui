import { observable,  action } from "mobx";


export class RequestBodyTestStore {
    @observable bodyTypeInfo;

    @action
    getBodyType = (value) => {
        this.bodyTypeInfo = value;
    }

    @action
    setBodyType = () => {
        return this.bodyTypeInfo;
    }
}


export const REQUESTBODY_TEST_STORE = 'requestBodyTestStore';