import { observable,  action } from "mobx";
import { 
    findJsonParamMockList, 
    createJsonParamMock, 
    findJsonParamMock,
    updateJsonParamMock, 
    deleteJsonParamMock 
} from '../api/mockJsonParamApi';

export class MockJsonParamStore {

    @observable mockJsonParamList = [];
    @observable mockJsonParamInfo ;
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    @action 
    setList = (values) => {
        this.mockJsonParamList = [...values]
    }

    @action
    findJsonParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'exp', orderType:'asc'}],
        }
        const newRow =[{ id: 'mockJsonParamInitRow'}];
        const res = await findJsonParamMockList(params);
        if(res.code === 0) {
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length;
            if(res.data.length === 0){
                this.mockJsonParamList=newRow;
            }else {
                this.mockJsonParamList = [...res.data,...newRow]
            }
           return res.data;
        }
    }

    @action
    findJsonParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findJsonParamMock(param);
        if( res.code === 0){
            this.mockJsonParamInfo = res.data;
            return res
        }
    }

    @action
    createJsonParamMock = async (values) => {
        values.mock ={id: this.mockId};
        const res = await createJsonParamMock(values);
        if( res.code === 0){
            this.findJsonParamMockList(this.mockId);
        }
    }

    @action
	updateJsonParamMock = async (values) => {
        const res = await updateJsonParamMock(values);
        if( res.code === 0){
            return this.findJsonParamMockList(this.mockId);
        }
    }

    @action
	deleteJsonParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteJsonParamMock(param);
        if( res.code === 0){
            this.findJsonParamMockList(this.mockId);
        }
    }
    
}

export const MOCK_JSONPARAM_STORE = 'mockJsonParamStore';