import { observable, action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormParamTestStore {
    @observable formParamTestList = [];
    @observable initRow=[{id:"formDataTestInitRow"}]

    @action
    getFormParamTestList= (data) => {
        if(data){
            this.formParamTestList = [...data,...this.initRow]
        }else {
            this.formParamTestList =this.initRow
        }
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