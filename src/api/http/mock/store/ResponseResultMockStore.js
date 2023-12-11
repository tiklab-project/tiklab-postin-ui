import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * 响应结果 store
 */
class ResponseResultMockStore {

    @observable responseResult = '';
    @observable mockId = '';
    @observable mockResponseResultId = '';

    /**
     * 通过id查询单个响应结果
     */
    @action
    findResponseResultMock = async (id) => {
        this.mockId = id;
        this.mockResponseResultId = id;
        
        const param = new FormData();
        param.append('id', id)
        
        const res = await Axios.post("/responseResultMock/findResponseResultMock",param);
        if (res.code===0){
            this.responseResult = res.data;
            return res.data;
        }
      
    }

    /**
     * 创建响应结果
     */
    @action
    createResponseResultMock = async (values) => {
        values.mock = {id: this.mockId}
        values.id =  this.mockResponseResultId;

        return await Axios.post("/responseResultMock/createResponseResultMock",values)
    }

    /**
     * 更新响应结果
     */
    @action
	updateResponseResultMock = async (values) => {
        values.mock = { id: this.mockId }
        values.id = this.mockResponseResultId;

        return await Axios.post("/responseResultMock/updateResponseResultMock",values)
    }
    
    
}

let responseResultMockStore = new ResponseResultMockStore()
export default responseResultMockStore;