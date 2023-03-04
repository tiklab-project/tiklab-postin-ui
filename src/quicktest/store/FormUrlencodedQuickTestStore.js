import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

/**
 * 快捷测试
 * formUrl store
 */
export  class FormUrlencodedQuickTestStore {
    @observable formUrlencodedQuickTestList = [];

    /**
     * 获取formUrl列表
     */
    @action
    getFormUrlencodedTestList= (data) => {
        this.formUrlencodedQuickTestList = tableCommonStore.getList(data)
    }

    /**
     * 删除formUrl
     */
    @action
    deleteList = (id) => {
        this.formUrlencodedQuickTestList = tableCommonStore.deleteList(id,this.formUrlencodedQuickTestList)
    }

    /**
     * 保存formUrl
     */
    @action
    addNewList = (list) => {
        this.formUrlencodedQuickTestList = [...list];
    }

    /**
     * 添加formUrl
     */
    @action
    saveList = (list) => {
        this.formUrlencodedQuickTestList = [...list]
    }
}

export const FORMURLENCODED_QUICKTEST_STORE = 'formUrlencodedQuickTestStore';