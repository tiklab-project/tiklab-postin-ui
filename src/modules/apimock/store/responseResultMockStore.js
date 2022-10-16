import { observable,  action } from "mobx";
import { 
    findResponseResultMock, 
    createResponseResultMock,
    updateResponseResultMock
} from '../api/mockResponseResultApi';

export class ResponseResultMockStore {

    @observable responseResult = '';
    @observable mockId = '';
    @observable mockResponseResultId = '';

    @action
    findResponseResultMock = async (id) => {
        this.mockId = id;
        this.mockResponseResultId = id;
        
        const param = new FormData();
        param.append('id', id)
        
        const res = await findResponseResultMock(param);
        if (res.code===0){
            this.responseResult = res.data;
            return res.data;
        }
      
    }
    
    @action
    createResponseResultMock = async (values) => {
        values.mock = {id: this.mockId}
        values.id =  this.mockResponseResultId;

        return await createResponseResultMock(values)
    }

    @action
	updateResponseResultMock = async (values) => {
        values.mock = { id: this.mockId }
        values.id = this.mockResponseResultId;

        return await updateResponseResultMock(values)
    }
    
    
}

export const MOCK_RESPONSERESULT_STORE = 'responseResultMockStore';