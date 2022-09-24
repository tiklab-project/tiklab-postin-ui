import { observable,  action } from "mobx";
import { 
    findResponseMock, 
    createResponseMock,
    updateResponseMock
} from '../api/mockResponseApi';

export class ResponseMockStore {

    @observable mockResponseInfo = [];
    @observable mockId = '';

    @action
    findResponseMock = async (id) => {
        this.mockId = id;
        const param = new FormData();
        param.append('id', id)
        const res = await findResponseMock(param);
        if( res.code === 0){
            this.mockResponseInfo = res.data;
            return res.data;
        }
    }
    
    @action
    createResponseMock = async (values) => {
        values.mockId = this.mockId;
        values.id =  this.mockId;
        await createResponseMock(values)
    }

    @action
	updateResponseMock = async (values) => {
        values.mockId = this.mockId;
        values.id =  this.mockId;
		await updateResponseMock(values)
    }
    
    
}

export const MOCK_RESPONSE_STORE = 'responseMockStore';

