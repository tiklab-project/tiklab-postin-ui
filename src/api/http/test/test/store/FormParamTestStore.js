import { observable, action } from "mobx";
import {TableCommonStore} from "../../../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

class FormParamTestStore {
    //选择后的项
    @observable formSelectList;
    //表格默认选择的行id
    @observable selectKeys;

    //带过来所有的项
    @observable formParamTestList = [];
    @observable initRow=[{id:"InitNewRowId"}]

    @action
    getFormParamTestList= (data) => {
        if(data){
            this.formSelectList=[...data]
            this.selectKeys = data.map(item => item.id);
            this.formParamTestList = [...data,...this.initRow]
        }else {
            this.formParamTestList =this.initRow
        }
    }

    @action
    deleteList = (id) =>{
        let newList  = this.formParamTestList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            return this.initRow;
        }

        this.selectKeys = newList.map(item => item.id);
        this.formParamTestList=newList;
    }


    @action
    saveList = (list) => {
        this.selectKeys = list.map(item => item.id);
        this.formParamTestList = [...list]
    }

    @action
    selectList = (list) => {
        this.formSelectList = [...list];
    }

}

let formParamTestStore = new FormParamTestStore();
export default formParamTestStore;