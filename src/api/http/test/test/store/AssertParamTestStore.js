import { observable,  action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

class AssertParamTestStore {
    @observable assertParamTestList = [];


    @action
    getAssertTestList= (data) => {
        this.assertParamTestList= tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.assertParamTestList=tableCommonStore.deleteList(id,this.assertParamTestList)
    }

    @action
    saveList = (list) => {
        this.assertParamTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.assertParamTestList = [...list];
    }
    
}

let assertParamTestStore = new AssertParamTestStore();
export default assertParamTestStore;