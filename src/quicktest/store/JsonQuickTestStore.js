import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore()

/**
 * 快捷测试
 * json store
 */
export  class JsonQuickTestStore {
    @observable jsonQuickTestList = [];

    /**
     * 获取json列表
     */
    @action
    getJsonParamTestList= (data) => {
        this.jsonQuickTestList = tableCommonStore.getList(data)
    }

    /**
     * 删除json
     */
    @action
    deleteList = (id) => {
        this.jsonQuickTestList = tableCommonStore.deleteList(id,this.jsonQuickTestList)
    }

    /**
     * 保存json
     */
    @action
    saveList = (list) => {
        this.jsonQuickTestList = [...list]
    }

    /**
     * 添加json
     */
    @action
    addNewList = (list) => {
        this.jsonQuickTestList = [...list];
    }

    /**
     * 设置子集
     */
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