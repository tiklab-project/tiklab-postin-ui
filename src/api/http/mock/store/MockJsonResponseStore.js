import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * 响应json store
 */
class MockJsonResponseStore {
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
        const res = await Axios.post("/jsonResponseMock/findJsonResponseMock",param);
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
        await Axios.post("/jsonResponseMock/createJsonResponseMock",values)
    }

    /**
     * 更新json
     */
    @action
	updateJsonResponseMock = async (values) => {
        values.mock = {id: this.mockId }
        values.id =  this.mockId;
		await Axios.post("/jsonResponseMock/updateJsonResponseMock",values)
    }
}

let mockJsonResponseStore = new MockJsonResponseStore();
export default mockJsonResponseStore;