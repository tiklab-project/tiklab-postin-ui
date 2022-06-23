import { observable, action } from "mobx";
import {TableCommonStore} from "../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class QueryParamTestStore {
    @observable queryParamTestList = [];

    @action
    getQueryParamTestList= (data) => {
        this.queryParamTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.queryParamTestList =tableCommonStore.deleteList(id,this.queryParamTestList)
    }

    @action
    saveList = (list) => {
        this.queryParamTestList = [...list];
    }

    @action
    addNewList = (list) => {
        this.queryParamTestList =[...list];
    }

}

export const QUERYPARAM_TEST_STORE = 'queryParamTestStore';