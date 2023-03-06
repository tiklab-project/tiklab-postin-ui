import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * 枚举结构 store
 */
export class EnumParamDSStore {

    @observable enumParamDSList = [];

    /**
     * 查询枚举结构列表
     */
    @action
    findEnumParamDSList = async (id) => {
        const params = {
            dataStructureId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }

        let res = await Axios.post("/enumParamDS/findEnumParamListDS",params)
        if(res.code === 0) {
            this.enumParamDSList = res.data;

            return  res.data;
        }
    }

    /**
     * 通过id查询单个枚举结构
     */
    @action
    findEnumParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res = await Axios.post("/enumParamDS/findEnumParamDS",param)
        if( res.code === 0){
            return  res.data;
        }
    }

    /**
     * 创建枚举结构
     */
    @action
    createEnumParamDS = async (values) => await Axios.post("/enumParamDS/createEnumParamDS",values)

    /**
     * 更新枚举结构
     */
    @action
    updateEnumParamDS = async (values) => await Axios.post("/enumParamDS/updateEnumParamDS",values)

    /**
     * 删除枚举结构
     */
    @action
    deleteEnumParamDS = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return await Axios.post("/enumParamDS/deleteEnumParamDS",param)
    }
}

export const ENUMPARAMDS_STORE = 'enumParamDSStore';
