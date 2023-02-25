import { observable,  action } from "mobx";


export class RequestBodyTestStore {
    @observable bodyTypeInfo;
    @observable bodyType;
    @observable mediaType;

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

    @action
    getMediaType = (type) =>{
        this.mediaType = type;
    }

}


export const REQUESTBODY_TEST_STORE = 'requestBodyTestStore';