import { observable,  action } from "mobx";
import {findUserSelectPage} from '../api/userSelectApi';

export class UserSelectStore {
    @observable userSelectList = [];
    @observable userSelectId ;
    @observable param;
    @observable totalRecord;

    @action
    findUserSelectPage = async (workspaceId,param) => {
        this.param = param
        const params = {
            domainId:workspaceId,
            ...param
        };
        const res = await findUserSelectPage(params);
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

