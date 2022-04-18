import { observable,  action } from "mobx";
import { 
    findRequestBodyMock, 
    createRequestBodyMock,
    updateRequestBodyMock
} from '../api/requestBodyMockApi';

export class RequestBodyMockStore {

    @observable requestBodyMockInfo = [];
    @observable mockId = '';

    @action
    findRequestBodyMock = async (id) => {
        this.mockId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await findRequestBodyMock(param);
        if( res.code === 0){
            if(res.data !== null){
               return  this.requestBodyMockInfo = res.data?.bodyType;
            }
        }
    }

    @action
    createRequestBodyMock = async (values) => {
        values.mock = {id: this.mockId}
        values.id =  this.mockId;
        const res = await createRequestBodyMock(values);
        if(res.code === 0){
            this.findRequestBodyMock(this.mockId)
        }
    }

    @action
	updateRequestBodyMock = async (values) => {
        values.mock = {id: this.mockId}
        values.id= this.mockId;
        await updateRequestBodyMock(values)
    }
    
}

export const REQUESTBODY_MOCK_STORE = 'requestBodyMockStore';