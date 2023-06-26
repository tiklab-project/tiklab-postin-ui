import { observable, action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

class QueryParamTestStore {
    //选择后的项
    @observable querySelectList;
    //表格默认选择的行id
    @observable selectKeys;

    //带过来所有的项
    @observable queryParamTestList = [];
    @observable newRow=[{id: 'InitNewRowId'}];


    @action
    getQueryParamTestList= (data) => {
        if(data){
            this.querySelectList=[...data]
            this.selectKeys = data.map(item => item.id);
            this.queryParamTestList= [...data,...this.newRow]
        }else {
            this.queryParamTestList = this.newRow;
        }
    }


    @action
    deleteList = (id) => {
        this.queryParamTestList =tableCommonStore.deleteList(id,this.queryParamTestList)
    }

    @action
    deleteList = (id) =>{
        let newList  = this.queryParamTestList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            return this.newRow;
        }

        this.selectKeys = newList.map(item => item.id);
        this.queryParamTestList=newList;
    }


    @action
    saveList = (list) => {
        this.selectKeys = list.map(item => item.id);
        this.queryParamTestList = [...list];
    }

    @action
    selectList = (list) => {
        this.querySelectList = [...list];
    }

}

let queryParamTestStore = new QueryParamTestStore();
export default queryParamTestStore;