import { observable,  action } from "mobx";
import { 
    findRequestHeaderMockList, 
    createRequestHeaderMock, 
    findRequestHeaderMock,
    updateRequestHeaderMock, 
    deleteRequestHeaderMock 
} from '../api/mockRequestHeaderApi';

/**
 * mock
 * 请求头 store
 */
export class MockRequestHeaderStore {

    @observable mockRequestHeaderList = [];
    @observable mockRequestHeaderInfo;
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action 
    setList = (values) => {
        this.mockRequestHeaderList = [...values]
    }

    /**
     * 查询请求头列表
     */
    @action
    findRequestHeaderMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'headerName',orderType:'asc' }],
        }
        const newRow =[{ id: 'InitNewRowId'}];
        const res = await findRequestHeaderMockList(params);
        if( res.code === 0){
            this.mockDataSourceList=res.data;
            this.dataLength = res.data.length;
            if(res.data.length=== 0){
                this.mockRequestHeaderList=newRow;
            }else {
                this.mockRequestHeaderList = [...res.data,...newRow]
            }
            return res.data;
        }
    }

    /**
     * 通过id查询单个请求头
     */
    @action
    findRequestHeaderMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await findRequestHeaderMock(param)
        if( res.code === 0){
            this.mockRequestHeaderInfo = res.data;
            return  res.data;
        }
    }

    /**
     * 创建请求头
     */
    @action
    createRequestHeaderMock = async (values) => {
        values.mock ={id: this.mockId }
        const res = await createRequestHeaderMock(values)
        if( res.code === 0){
            this.findRequestHeaderMockList(this.mockId);
        }
    }

    /**
     * 更新请求头
     */
    @action
	updateRequestHeaderMock = async (values) => {
		const res = await updateRequestHeaderMock(values)
        if( res.code === 0){
            return this.findRequestHeaderMockList(this.mockId);
        }
    }

    /**
     * 删除请求头
     */
    @action
	deleteRequestHeaderMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
		const res = await deleteRequestHeaderMock(param)
        if( res.code === 0){
            this.findRequestHeaderMockList(this.mockId);
        }
    }

}

export const MOCK_REQUESTHEADER_STORE = 'mockRequestHeaderStore';