import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

/**
 * 快捷测试
 * 请求头 store
 */
export  class HeaderQuickTestStore {
    @observable headerQuickTestList = [];

    /**
     * 获取请求头列表
     */
    @action
    getRequestHeaderTestList= (data) => {
        this.headerQuickTestList= tableCommonStore.getList(data)
    }

    /**
     * 删除请求头
     */
    @action
    deleteList = (id) => {
        this.headerQuickTestList=tableCommonStore.deleteList(id,this.headerQuickTestList)
    }

    /**
     * 保存请求头
     */
    @action
    saveList = (list) => {
        this.headerQuickTestList = [...list]
    }

    /**
     * 添加请求头
     */
    @action
    addNewList = (list) => {
        this.headerQuickTestList = [...list];
    }

}

export const HEADER_QUICKTEST_STORE = 'headerQuickTestStore';