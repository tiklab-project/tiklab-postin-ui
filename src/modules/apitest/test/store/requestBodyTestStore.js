import { observable,  action } from "mobx";


export class RequestBodyTestStore {
    @observable bodyTypeInfo;
    @observable bodyType;

    @action
    getBodyType = (type) => {
        this.bodyTypeInfo = type;
        this.bodyType = type;
    }

    @action
    setBodyType = () => {
        return this.bodyTypeInfo;
    }

    @action
    updateBodyType = (data) => {
        this.bodyType  = data.bodyType
    }

}


export const REQUESTBODY_TEST_STORE = 'requestBodyTestStore';