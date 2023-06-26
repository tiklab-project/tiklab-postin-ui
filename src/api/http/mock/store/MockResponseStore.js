import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

/**
 * mock
 * 响应公共 store
 * 包含httpcode 响应体类型
 */
class ResponseMockStore {

    @observable mockResponseInfo = [];
    @observable mockId = '';

    /**
     * 通过id查询单个响应
     */
    @action
    findResponseMock = async (id) => {
        this.mockId = id;
        const param = new FormData();
        param.append('id', id)
        const res = await Axios.post("/responseMock/findResponseMock",param);
        if( res.code === 0){
            this.mockResponseInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建响应
     */
    @action
    createResponseMock = async (values) => {
        values.mockId = this.mockId;
        values.id =  this.mockId;
        await Axios.post("/responseMock/createResponseMock",values)
    }

    /**
     * 更新响应
     */
    @action
	updateResponseMock = async (values) => {
        values.mockId = this.mockId;
        values.id =  this.mockId;
		await Axios.post("/responseMock/updateResponseMock",values)
    }
    
    
}

let responseMockStore =  new ResponseMockStore()
export default responseMockStore;

