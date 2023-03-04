import { observable, action } from "mobx";
import {TableCommonStore} from "../../common/tableCommon/store/tableCommonStore";

const tableCommonStore = new TableCommonStore();

/**
 * 快捷测试
 * formdata store
 */
export  class FormDataQuickTestStore {
    @observable formQuickTestList = [];
    @observable initRow=[{id: "formDataQuickTest"}];

    /**
     * 获取formdata列表
     */
    @action
    getFormParamTestList= (data) => {
        if(data){
            this.formQuickTestList = [...data,...this.initRow]
        }else {
            this.formQuickTestList=this.initRow
        }
    }

    /**
     * 删除formdata
     */
    @action
    deleteList = (id) => {
        this.formQuickTestList = tableCommonStore.deleteList(id,this.formQuickTestList)
    }

    /**
     * 保存formdata
     */
    @action
    saveList = (list) => {
        this.formQuickTestList = [...list]
    }

    /**
     * 添加formdata
     */
    @action
    addNewList = (list) => {
        this.formQuickTestList = [...list];
    }

}

export const FORMDATA_QUICKTEST_STORE = 'formDataQuickTestStore';