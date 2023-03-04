import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

/**
 * 快捷测试
 * 查询参数 store
 */
export  class QueryQuickTestStore {
    @observable queryQuickTestList = [];

    /**
     * 获取查询参数列表
     */
    @action
    getQueryParamTestList= (data) => {
        this.queryQuickTestList = tableCommonStore.getList(data)
    }

    /**
     * 删除查询参数
     */
    @action
    deleteList = (id) => {
        this.queryQuickTestList =tableCommonStore.deleteList(id,this.queryQuickTestList)
    }

    /**
     * 保存查询参数
     */
    @action
    saveList = (list) => {
        this.queryQuickTestList = [...list];
    }

    /**
     * 添加查询参数
     */
    @action
    addNewList = (list) => {
        this.queryQuickTestList =[...list];
    }

}

export const QUERY_QUICKTEST_STORE = 'queryQuickTestStore';