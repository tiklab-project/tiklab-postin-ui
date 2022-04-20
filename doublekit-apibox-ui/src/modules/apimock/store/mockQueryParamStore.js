import { observable,  action } from "mobx";
import { 
    findQueryParamMockList, 
    createQueryParamMock , 
    findQueryParamMock,
    updateQueryParamMock, 
    deleteQueryParamMock 
} from '../api/mockQueryParamApi'

export class MockQueryParamStore {

    @observable mockQueryParamList = [];
    @observable mockQueryParamInfo;
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;
   
    @action 
    setList = (values) => {
        this.mockQueryParamList = [...values]
    }

    @action
    findQueryParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'paramName',orderType:'asc'}],
        }
        const newRow =[{ id: 'mockQueryParamInitRow'}];
        const res = await findQueryParamMockList(params);
        if(res.code === 0){
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length
            if(res.data.length === 0){
                this.mockQueryParamList=newRow;
            }else {
                this.mockQueryParamList = [... res.data,...newRow]
            }
            return  res.data;
        }
    }

    @action
    findQueryParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await findQueryParamMock(param);
        if( res.code === 0){
            this.mockQueryParamInfo = res.data;
            return res.data;
        }
    }


    @action
    createQueryParamMock = async (values) => {
        values.mock ={id: this.mockId}
        const res = await createQueryParamMock(values)
        if( res.code === 0){
            this.findQueryParamMockList(this.mockId);
        }
    }

    @action
	updateQueryParamMock = async (values) => {
		const res = await updateQueryParamMock(values)
        if( res.code === 0){
            return this.findQueryParamMockList(this.mockId);
        }
    }

    @action
	deleteQueryParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
		const res = await deleteQueryParamMock(param)
        if( res.code === 0){
            this.findQueryParamMockList(this.mockId);
        }
    }

    
}

export const MOCK_QUERYPARAM_STORE = 'mockQueryParamStore';