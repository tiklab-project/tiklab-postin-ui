import { observable, action } from "mobx";
import {TableCommonStore} from "../../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore()

export  class JsonParamTestStore {
    @observable jsonParamTestList = [];

    @action
    getJsonParamTestList= (data) => {
        this.jsonParamTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.jsonParamTestList = tableCommonStore.deleteList(id,this.jsonParamTestList)
    }

    @action
    saveList = (list) => {
        this.jsonParamTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.jsonParamTestList = [...list];
    }

    @action
	setJsonParamListChild = (parentId,childId) => {
        const pid = ({
            id: parentId
        })
        const newChild = {
            id:parentId+childId,
            parent: pid
        }

        const loop = (data,newChild)=>{
             let newdata = data.map((item) => {
                if(item.id && item.id === parentId) {
                    if(!item.children){
                        item.children = [newChild]
                    }else {
                        item.children.push({
                            ...newChild,
                        })
                    }
                }else if(item.children && item.children.length > 0){
                    loop(item.children, newChild)
                }
                return item 
            })
            return newdata;
        }

        this.jsonParamTestList = loop( this.jsonParamTestList,newChild);
    }
}

export const JSONPARAM_TEST_STORE = 'jsonParamTestStore';