import { observable, action } from "mobx";
import {TableCommonStore} from "../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class RequestHeaderTestStore {
    @observable requestHeaderTestList = [];

    @action
    getRequestHeaderTestList= (data) => {
       this.requestHeaderTestList= tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.requestHeaderTestList=tableCommonStore.deleteList(id,this.requestHeaderTestList)
    }

    @action
    saveList = (list) => {
        this.requestHeaderTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.requestHeaderTestList = [...list];
    }

}

export const REQUESTHEADER_TEST_STORE = 'requestHeaderTestStore';