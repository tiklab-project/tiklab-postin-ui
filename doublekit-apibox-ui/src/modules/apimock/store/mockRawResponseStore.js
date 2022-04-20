import { observable,  action } from "mobx";
import { 
    findRawResponseMock, 
    createRawResponseMock,
    updateRawResponseMock
} from '../api/mockRawResponseApi';

export class MockRawResponseStore {

    @observable mockRawResponseInfo ;
    @observable mockId = '';

    @action
    findRawResponseMock = async (id) => {
        this.mockId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await findRawResponseMock(param);
        if( res.code === 0){
            return this.mockRawResponseInfo = res.data;
        }
    }

    @action
    createRawResponseMock = async (values) => {
        values.mock = {id: this.mockId,}
        values.id =  this.mockId;
        await createRawResponseMock(values);
    }

    @action
	updateRawResponseMock = async (values) => {
        values.mock = {id: this.mockId,}
        values.id =  this.mockId;
		await updateRawResponseMock(values)
    }
    

    
}

export const MOCK_RAWRESPONSE_STORE = 'mockRawResponseStore';