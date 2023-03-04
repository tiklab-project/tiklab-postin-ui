import { observable,  action } from "mobx";
import { 
    findJsonResponseMock, 
    createJsonResponseMock,
    updateJsonResponseMock
} from '../api/mockJsonResponseApi';

/**
 * mock
 * 响应json store
 */
export class MockJsonResponseStore {
    @observable mockJsonResponseInfo ;
    @observable mockId = '';

    /**
     * 通过id查询单个json
     */
    @action
    findJsonResponseMock = async (id) => {
        this.mockId = id;
        const param = new FormData();
        param.append('id', id);
        const res = await findJsonResponseMock(param);
        if( res.code === 0){
            this.mockJsonResponseInfo = res.data;
            return  res.data;
        }
    }

    /**
     * 创建json
     */
    @action
    createJsonResponseMock = async (values) => {
        values.mock = {id: this.mockId}
        values.id =  this.mockId;
        await createJsonResponseMock(values)
    }

    /**
     * 更新json
     */
    @action
	updateJsonResponseMock = async (values) => {
        values.mock = {id: this.mockId }
        values.id =  this.mockId;
		await updateJsonResponseMock(values)
    }
}

export const MOCK_JSONRESPONSE_STORE = 'mockJsonResponseStore';