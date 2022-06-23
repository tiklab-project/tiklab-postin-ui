import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormDataQuickTestStore {
    @observable formQuickTestList = [];

    @action
    getFormParamTestList= (data) => {
        debugger
        this.formQuickTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.formQuickTestList = tableCommonStore.deleteList(id,this.formQuickTestList)
    }

    @action
    saveList = (list) => {
        this.formQuickTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.formQuickTestList = [...list];
    }

}

export const FORMDATA_QUICKTEST_STORE = 'formDataQuickTestStore';