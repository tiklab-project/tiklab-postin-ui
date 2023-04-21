import { observable,  action } from "mobx";


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


}


export const REQUESTBODY_QUICKTEST_STORE = 'requestBodyQuickTestStore';