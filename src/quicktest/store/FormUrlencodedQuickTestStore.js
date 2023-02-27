import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormUrlencodedQuickTestStore {
    @observable formUrlencodedQuickTestList = [];

    @action
    getFormUrlencodedTestList= (data) => {
        this.formUrlencodedQuickTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.formUrlencodedQuickTestList = tableCommonStore.deleteList(id,this.formUrlencodedQuickTestList)
    }

    @action
    addNewList = (list) => {
        this.formUrlencodedQuickTestList = [...list];
    }

    @action
    saveList = (list) => {
        this.formUrlencodedQuickTestList = [...list]
    }
}

export const FORMURLENCODED_QUICKTEST_STORE = 'formUrlencodedQuickTestStore';