import { observable, action } from "mobx";

class RequestHeaderTestStore {
    //选择后的项
    @observable requestHeaderList;
    //表格默认选择的行id
    @observable selectKeys;

    //带过来所有的项
    @observable requestHeaderTestList = [];
    @observable newHeaderRow=[{id: 'InitNewRowId'}];

    @action
    getRequestHeaderTestList= (data) => {
        if(data){
            this.requestHeaderList =[...data]
            this.selectKeys = data.map(item => item.id);
            this.requestHeaderTestList= [...data,...this.newHeaderRow]
        }else {
            this.requestHeaderTestList = this.newHeaderRow;
        }
    }

    @action
    deleteList = (id) =>{
        let newList  = this.requestHeaderTestList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            return this.newHeaderRow;
        }

        this.selectKeys = newList.map(item => item.id);
        this.requestHeaderTestList=newList;
    }


    @action
    saveList = (list) => {
        this.selectKeys = list.map(item => item.id);
        this.requestHeaderTestList = [...list];
    }

    @action
    selectHeaderList = (list) => {
        this.requestHeaderList = [...list];
    }



}

let requestHeaderTestStore = new RequestHeaderTestStore();
export default requestHeaderTestStore;