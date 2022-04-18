import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class QueryQuickTestStore {
    @observable queryQuickTestList = [];

    @action
    getQueryParamTestList= (data) => {
        this.queryQuickTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.queryQuickTestList =tableCommonStore.deleteList(id,this.queryQuickTestList)
    }

    @action
    saveList = (list) => {
        this.queryQuickTestList = [...list];
    }

    @action
    addNewList = (list) => {
        this.queryQuickTestList =[...list];
    }

}

export const QUERY_QUICKTEST_STORE = 'queryQuickTestStore';