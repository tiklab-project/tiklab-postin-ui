import { observable,  action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();


/**
 * 快捷测试
 * 断言 store
 */
export class AssertQuickTestStore {
    @observable assertQuickTestList = [];

    /**
     * 获取断言列表
     */
    @action
    getAssertTestList= (data) => {
        this.assertQuickTestList= tableCommonStore.getList(data)
    }

    /**
     * 删除断言
     */
    @action
    deleteList = (id) => {
        this.assertQuickTestList=tableCommonStore.deleteList(id,this.assertQuickTestList)
    }

    /**
     * 保存断言
     */
    @action
    saveList = (list) => {
        this.assertQuickTestList = [...list]
    }

    /**
     * 添加断言
     */
    @action
    addNewList = (list) => {
        this.assertQuickTestList = [...list];
    }

}


export const ASSERT_QUICKTEST_STORE = 'assertQuickTestStore';