import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

/**
 * 快捷测试
 * 请求头 store
 */
export  class HeaderQuickTestStore {
    @observable headerQuickTestList = [{id: 'InitRowId'}];
    @observable newHeaderRow=[{id: 'InitRowId'}];

    /**
     * 获取请求头列表
     */
    @action
    getRequestHeaderTestList= (data) => {

        if(data){
            this.headerQuickTestList=  [...data,...this.newHeaderRow]
        }else {
            this.headerQuickTestList= this.newHeaderRow;
        }
    }



    /**
     * 删除请求头
     */
    @action
    deleteList = (id) =>{
        let newList  = this.headerQuickTestList.filter((item)=> {
            return item.id !== id
        })

        if(newList.length === 0){
            this.headerQuickTestList= this.newHeaderRow;
        }

        this.headerQuickTestList= newList;
    }

    /**
     * 保存请求头
     */
    @action
    saveList = (list) => {
        this.headerQuickTestList = [...list]
    }


}

export const HEADER_QUICKTEST_STORE = 'headerQuickTestStore';