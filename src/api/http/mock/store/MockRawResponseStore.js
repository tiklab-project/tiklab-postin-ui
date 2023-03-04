import { observable,  action } from "mobx";
import { 
    findRawResponseMock, 
    createRawResponseMock,
    updateRawResponseMock
} from '../api/mockRawResponseApi';

/**
 * mock
 * 响应中raw store
 */
export class MockRawResponseStore {

    @observable mockRawResponseInfo ;
    @observable mockId = '';

    /**
     * 通过id查询单个响应中raw
     */
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

    /**
     * 创建响应中raw
     */
    @action
    createRawResponseMock = async (values) => {
        values.mock = {id: this.mockId,}
        values.id =  this.mockId;
        return await createRawResponseMock(values);
    }

    /**
     * 更新响应中raw
     */
    @action
	updateRawResponseMock = async (values) => {
        values.mock = {id: this.mockId,}
        values.id =  this.mockId;
		return await updateRawResponseMock(values)
    }
    

    
}

export const MOCK_RAWRESPONSE_STORE = 'mockRawResponseStore';