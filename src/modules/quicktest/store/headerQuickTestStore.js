import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class HeaderQuickTestStore {
    @observable headerQuickTestList = [];

    @action
    getRequestHeaderTestList= (data) => {
        this.headerQuickTestList= tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.headerQuickTestList=tableCommonStore.deleteList(id,this.headerQuickTestList)
    }

    @action
    saveList = (list) => {
        this.headerQuickTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.headerQuickTestList = [...list];
    }

}

export const HEADER_QUICKTEST_STORE = 'headerQuickTestStore';