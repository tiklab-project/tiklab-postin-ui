import { observable,  action } from "mobx";
import {
    createResponseHeaderMock,
    updateResponseHeaderMock,
    findResponseHeaderMockList,
    deleteResponseHeaderMock
} from '../api/mockResponseHeader';

export class MockResponseHeaderStore {

    @observable mockResponseHeaderList = [];
    @observable mockId = '';
    @observable dataLength;

    @action
    setList = (values) => {
        this.mockResponseHeaderList = [...values]
    }

    @action
    findResponseHeaderMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'headerName',orderType:'asc' }],
        }
        const newRow =[{ id: 'mockResponseHeaderInitRow'}];
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

    @action
    createResponseHeaderMock = async (values) => {
        values.mock = {id: this.mockId}
        const res = await createResponseHeaderMock(values)
        if( res.code === 0){
            this.findResponseHeaderMockList(this.mockId);
        }
    }

    @action
	updateResponseHeaderMock =async (values) => {
		const res = await updateResponseHeaderMock(values)
        if( res.code === 0){
            return this.findResponseHeaderMockList(this.mockId);
        }
    }

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