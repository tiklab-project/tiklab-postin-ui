
import {observable,action} from "mobx";
import {
    findShare,
    createShare,
    deleteShare,
    updateShare,
    findShareTree
} from '../api/shareApi';


export class ShareStore {
    @observable shareList = [];
    @observable totalRecord ;

    @action
    findShareTree = async (params) => {

        let  res = await findShareTree(params)
        if(res.code === 0) {
            this.shareList = res.data;

            return  res.data
        }
    }




    @action
    findShare = async (id) => {
        const param = new FormData();
        param.append('id', id);


        let res = await findShare(param)
        if(res.code === 0){
            return res;
        }
    }

    @action
    createShare = async (values) =>  await createShare(values)

    @action
    updateShare = async (values) =>  await updateShare(values)

    @action
    deleteShare = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await deleteShare(param)
    }



}

export const SHARE_STORE = 'shareStore';
