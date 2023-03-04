import { observable,  action } from "mobx";
import {
    createResponseHeaderMock,
    updateResponseHeaderMock,
    findResponseHeaderMockList,
    deleteResponseHeaderMock
} from '../api/mockResponseHeader';

/**
 * mock
 * 响应头 store
 */
export class MockResponseHeaderStore {

    @observable mockResponseHeaderList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action
    setList = (values) => {
        this.mockResponseHeaderList = [...values]
    }

    /**
     * 查询响应头列表
     */
    @action
    findResponseHeaderMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'headerName',orderType:'asc' }],
        }
        const newRow =[{ id: 'InitNewRowId'}];
        const res = await findResponseHeaderMockList(params);
        if( res.code === 0){
            this.dataLength = res.data.length
            if(  this.dataLength=== 0){
                this.mockResponseHeaderList=newRow;
            }else {
                this.mockResponseHeaderList = [...res.data,...newRow]
            }
            return res.data;
        }
    }

    /**
     * 创建响应头
     */
    @action
    createResponseHeaderMock = async (values) => {
        values.mock = {id: this.mockId}
        const res = await createResponseHeaderMock(values)
        if( res.code === 0){
            this.findResponseHeaderMockList(this.mockId);
        }
    }

    /**
     * 更新响应头
     */
    @action
	updateResponseHeaderMock =async (values) => {
		const res = await updateResponseHeaderMock(values)
        if( res.code === 0){
            return this.findResponseHeaderMockList(this.mockId);
        }
    }

    /**
     * 删除响应头
     */
    @action
    deleteResponseHeaderMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteResponseHeaderMock(param)
        if( res.code === 0){
            this.findResponseHeaderMockList(this.mockId);
        }
    }
    
}

export const MOCK_RESPONSEHEADER_STORE = 'mockResponseHeaderStore';