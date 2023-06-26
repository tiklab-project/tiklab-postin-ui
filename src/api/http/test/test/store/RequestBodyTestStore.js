import { observable,  action } from "mobx";


class RequestBodyTestStore {
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

let requestBodyTestStore = new RequestBodyTestStore();

export default requestBodyTestStore;