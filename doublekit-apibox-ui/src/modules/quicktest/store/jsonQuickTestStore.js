import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore()

export  class JsonQuickTestStore {
    @observable jsonQuickTestList = [];

    @action
    getJsonParamTestList= (data) => {
        this.jsonQuickTestList = tableCommonStore.getList(data)
    }

    @action
    deleteList = (id) => {
        this.jsonQuickTestList = tableCommonStore.deleteList(id,this.jsonQuickTestList)
    }

    @action
    saveList = (list) => {
        this.jsonQuickTestList = [...list]
    }

    @action
    addNewList = (list) => {
        this.jsonQuickTestList = [...list];
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

        this.jsonQuickTestList = loop( this.jsonQuickTestList,newChild);
    }
}

export const JSON_QUICKTEST_STORE = 'jsonQuickTestStore';