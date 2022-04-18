import { observable,  action } from "mobx";
import { 
    findFormParamMockList, 
    createFormParamMock,
    updateFormParamMock, 
    deleteFormParamMock 
} from '../api/mockFormParamApi';

export class MockFormParamStore {

    @observable mockFormParamList = [];
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    @action 
    setList = (values) => {
        this.mockFormParamList = [...values]
    }

    @action
    findFormParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[{ id: 'mockFormParamInitRow'}];
        const res = await findFormParamMockList(params);
        if(res.code === 0) {
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length;
            if( res.data.length === 0){
                this.mockFormParamList=newRow;
            }else {
                this.mockFormParamList = [...res.data,...newRow]
            }
            return res.data;
        }
    }

    @action
    createFormParamMock = async (values) => {
        values.mock ={id: this.mockId}
        const res = await createFormParamMock(values);
        if( res.code === 0){
            this.findFormParamMockList(this.mockId);
        }
    }

    @action
	updateFormParamMock = async (values) => {
        const res = await updateFormParamMock(values);
        if( res.code === 0){
            return this.findFormParamMockList(this.mockId);
        }
    }

    @action
	deleteFormParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteFormParamMock(param);
        if( res.code === 0){
            this.findFormParamMockList(this.mockId);
        }
    }
    
}

export const MOCK_FORMPARAM_STORE = 'mockFormParamStore';