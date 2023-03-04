import { observable,  action  } from "mobx";
import {
    createMock,
    updateMock,
    deleteMock,
    findMock,
    findMockPage
} from '../api/mockApi';

/**
 * mock store
 */
export class MockStore {
    @observable mockList = [];
    @observable apxMethodId='';
    @observable mockInfo=[];
    @observable totalRecord = ''

    /**
     * 查询mock列表
     */
    @action
    findMockPage = async (id,value)=>{
        const params ={
            ...value,
            httpId:id
        }
        const res = await findMockPage(params);
        if( res.code === 0){
            this.mockList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res.data
        }
    }

    /**
     * 创建mock
     */
    @action
    createMock = async (values) => {
        const res = await createMock(values)
        if( res.code === 0){
            return res
        }
    }

    /**
     * 更新mock
     */
    @action
    updateMock = async (values) => {
        const res = await updateMock(values)
        if( res.code === 0){
            return res
        }
    }

    /**
     * 删除mock
     */
    @action
    deleteMock = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteMock(param)
        if( res.code === 0){
            return res
        }
    }

    /**
     * 通过id查询单个mock
     */
    @action
    findMock = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await findMock(param);
        if( res.code === 0){
            this.mockInfo = res.data;

            return res.data
        }
    }

}

export const MOCKSTORE = 'mockStore';
