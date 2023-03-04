import { observable,  action } from "mobx";
import { 
    findRequestMock, 
    createRequestMock,
    updateRequestMock
} from '../api/requestMockApi';

/**
 * mock
 * 请求 store
 */
export class RequestMockStore {
    @observable mockId;

    /**
     * 通过id查询单个请求
     */
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

    /**
     * 创建请求
     */
    @action
    createRequestMock = async (values) => {
        values.mockId =  this.mockId
        values.id =  this.mockId;

        await createRequestMock(values);
    }

    /**
     * 更新请求
     */
    @action
	updateRequestMock = async (values) => {
        values.mockId =  this.mockId;
        values.id= this.mockId;

        await updateRequestMock(values)
    }
    
}

export const REQUEST_MOCK_STORE = 'requestMockStore';