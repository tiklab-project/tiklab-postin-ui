import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * 请求 store
 */
class RequestMockStore {
    @observable mockId;

    /**
     * 通过id查询单个请求
     */
    @action
    findRequestMock = async (id) => {
        this.mockId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/requestMock/findRequestMock",param);
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

        await Axios.post("/requestMock/createRequestMock",values);
    }

    /**
     * 更新请求
     */
    @action
	updateRequestMock = async (values) => {
        values.mockId =  this.mockId;
        values.id= this.mockId;

        await Axios.post("/requestMock/updateRequestMock",values)
    }
    
}

let requestMockStore = new RequestMockStore()

export default requestMockStore