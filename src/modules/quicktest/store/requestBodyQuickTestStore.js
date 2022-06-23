import { observable,  action } from "mobx";


export class RequestBodyQuickTestStore {
    @observable bodyType="none";
    @observable mediaType

    @action
    getBodyType = (value) => {
        this.bodyType = value;
    }

    @action
    setBodyType = async () => {
        return this.bodyType;
    }

    @action
    getMediaType = (value) => {
        this.mediaType = value;

         switch (value){
             case "none":
                 this.bodyType = "none"
                 break;
             case "multipart/form-data":
                 this.bodyType = "formdata"
                 break;
             case "application/x-www-form-urlencoded":
                 this.bodyType = "formUrlencoded"
                 break;
             case "application/json":
                 this.bodyType = "raw"
                 break;
             default :
                 this.bodyType = "raw"
                 break;
         }
    }

}


export const REQUESTBODY_QUICKTEST_STORE = 'requestBodyQuickTestStore';