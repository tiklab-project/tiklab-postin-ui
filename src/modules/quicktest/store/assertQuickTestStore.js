import { observable,  action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export class AssertQuickTestStore {
    @observable assertQuickTestList = [];


    @action
    getAssertTestList= (data) => {
        this.assertQuickTestList= tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.assertQuickTestList=tableCommonStore.deleteList(id,this.assertQuickTestList)
    }

    @action
    saveList = (list) => {
        this.assertQuickTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.assertQuickTestList = [...list];
    }

}


export const ASSERT_QUICKTEST_STORE = 'assertQuickTestStore';