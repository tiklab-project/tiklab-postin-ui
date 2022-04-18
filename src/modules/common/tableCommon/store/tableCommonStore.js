import { observable, action } from "mobx";


export class TableCommonStore{
    @observable newHeaderRow=[{id: 'InitRowId'}];

    @action
    getList = (data)=>{
        if(data){
            return  [...data,...this.newHeaderRow]
        }else {
            return this.newHeaderRow;
        }
    }

    @action
    deleteList = (id,processList) =>{
        let newList  = processList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            return this.newHeaderRow;
        }

        return newList;
    }


}