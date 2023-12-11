import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * 用户下拉框store
 */
export class UserSelectStore {
    @observable userSelectList = [];
    @observable userSelectId ;
    @observable param;
    @observable totalRecord;

    /**
     * 获取用户列表
     */
    @action
    findUserSelectPage = async (workspaceId,param) => {
        this.param = param
        const params = {
            domainId:workspaceId,
            ...param
        };
        const res = await Axios.post("/dmUser/findDmUserPage",params);
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.userSelectList = res.data.dataList;
            return res.data.dataList;
        }
    }

    @action
    getUserId = (id) => {
        this.userSelectId = id
    }

    @action
    getUserName = (name) => {
        this.userName = name
    }


}

export const USERSELECT_STORE = 'userSelectStore';

