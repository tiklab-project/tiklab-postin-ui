import { observable,  action } from "mobx";
import {bodyTypeJsonDictionary as bodyTypeJsonDic} from "../../common/dictionary/dictionary";


/**
 * 快捷测试
 * 请求体 store
 */
export class RequestBodyQuickTestStore {
    @observable bodyType="none";
    @observable mediaType

    /**
     *  获取bodyType
     */
    @action
    getBodyType = (value) => {
        this.bodyType = value;
    }

    /**
     *  更新bodyType
     */
    @action
    updateBodyType = (data) => {
         this.bodyType  = data.bodyType
    }

    /**
     * 根据不同的mediaType设置相应的类型
     */
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