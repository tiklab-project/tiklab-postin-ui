import { observable, action } from "mobx";
import {TableCommonStore} from "../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormParamTestStore {
    @observable formParamTestList = [];

    @action
    getFormParamTestList= (data) => {
        this.formParamTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.formParamTestList = tableCommonStore.deleteList(id,this.formParamTestList)
    }

    @action
    saveList = (list) => {
        this.formParamTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.formParamTestList = [...list];
    }

}

export const FORMPARAM_TEST_STORE = 'formParamTestStore';