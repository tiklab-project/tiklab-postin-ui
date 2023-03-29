import { observable, action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

export  class FormUrlencodedTestStore {
    //选择后的项
    @observable formUrlSelectList;
    //表格默认选择的行id
    @observable selectKeys;

    //带过来所有的项
    @observable formUrlencodedTestList = [];
    @observable initRow=[{id:"InitNewRowId"}]

    @action
    getFormUrlencodedTestList= (data) => {
        if(data){
            this.formUrlSelectList = [...data];
            this.selectKeys = data.map(item => item.id);
            this.formUrlencodedTestList = [...data,...this.initRow]
        }else {
            this.formUrlencodedTestList =this.initRow
        }
    }

    @action
    deleteList = (id) =>{
        let newList  = this.formUrlencodedTestList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            return this.initRow;
        }

        this.selectKeys = newList.map(item => item.id);
        this.formUrlencodedTestList=newList;
    }

    @action
    saveList = (list) => {
        this.selectKeys = list.map(item => item.id);
        this.formUrlencodedTestList = [...list]
    }

    @action
    selectList = (list) => {
        this.formUrlSelectList = [...list];
    }
}

export const FORM_URLENCODED_TEST_STORE = 'formUrlencodedTestStore';