import { observable,  action } from "mobx";
import {bodyTypeJsonDictionary as bodyTypeJsonDic} from "../../common/dictionary/dictionary";


export class RequestBodyQuickTestStore {
    @observable bodyType="none";
    @observable mediaType

    //获取bodyType
    @action
    getBodyType = (value) => {
        this.bodyType = value;
    }

    @action
    updateBodyType = (data) => {
         this.bodyType  = data.bodyType
    }

    @action
    getMediaType = (value) => {
        this.mediaType = value;

        //设置body下的body类型
         switch (value){
             case "none":
                 this.bodyType =bodyTypeJsonDic.none
                 break;
             case "multipart/form-data":
                 this.bodyType = bodyTypeJsonDic.formdata
                 break;
             case "application/x-www-form-urlencoded":
                 this.bodyType = bodyTypeJsonDic.formUrlencoded
                 break;

             //如果是application/json，直接设置成raw中application/json
             case "application/json":
                 this.bodyType = bodyTypeJsonDic.raw
                 break;
             default :
                 this.bodyType = bodyTypeJsonDic.none
                 break;
         }

         return this.bodyType
    }

}


export const REQUESTBODY_QUICKTEST_STORE = 'requestBodyQuickTestStore';