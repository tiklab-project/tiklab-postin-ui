
import {observable,action} from "mobx";
import {
    findShare,
    createShare,
    deleteShare,
    updateShare,
    findShareTree
} from '../api/shareApi';


/**
 * 接口文档 store
 */
export class ShareStore {
    @observable shareList = [];
    @observable totalRecord ;

    /**
     * 查询接口文档列表
     */
    @action
    findShareTree = async (params) => {

        let  res = await findShareTree(params)
        if(res.code === 0) {
            this.shareList = res.data;

            return  res.data
        }
    }

    /**
     * 通过id查询单个接口文档
     */
    @action
    findShare = async (id) => {
        const param = new FormData();
        param.append('id', id);


        let res = await findShare(param)
        if(res.code === 0){
            return res;
        }
    }

    /**
     * 创建接口文档
     */
    @action
    createShare = async (values) =>  await createShare(values)

    /**
     * 更新接口文档
     */
    @action
    updateShare = async (values) =>  await updateShare(values)

    /**
     * 删除接口文档
     */
    @action
    deleteShare = async (id) => {
        const param = new FormData();
        param.append('id', id)
        await deleteShare(param)
    }



}

export const SHARE_STORE = 'shareStore';
