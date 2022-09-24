import { observable,  action } from "mobx";
import { 
    findRequestMock, 
    createRequestMock,
    updateRequestMock
} from '../api/requestMockApi';

export class RequestMockStore {
    @observable mockId;

    @action
    findRequestMock = async (id) => {
        this.mockId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findRequestMock(param);
        if( res.code === 0){
            return  res.data
        }
    }

    @action
    createRequestMock = async (values) => {
        values.mockId =  this.mockId
        values.id =  this.mockId;

        await createRequestMock(values);
    }

    @action
	updateRequestMock = async (values) => {
        values.mockId =  this.mockId;
        values.id= this.mockId;

        await updateRequestMock(values)
    }
    
}

export const REQUEST_MOCK_STORE = 'requestMockStore';