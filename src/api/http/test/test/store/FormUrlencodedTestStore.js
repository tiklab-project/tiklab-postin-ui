import { observable, action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormUrlencodedTestStore {
    @observable formUrlencodedTestList = [];

    @action
    getFormUrlencodedTestList= (data) => {
        this.formUrlencodedTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.formUrlencodedTestList = tableCommonStore.deleteList(id,this.formUrlencodedTestList)
    }

    @action
    addNewList = (list) => {
        this.formUrlencodedTestList = [...list];
    }

    @action
    saveList = (list) => {
        this.formUrlencodedTestList = [...list]
    }
}

export const FORM_URLENCODED_TEST_STORE = 'formUrlencodedTestStore';