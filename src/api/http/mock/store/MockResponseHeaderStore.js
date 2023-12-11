import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * 响应头 store
 */
class MockResponseHeaderStore {

    @observable mockResponseHeaderList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action
    setList = (values) => {
        this.mockResponseHeaderList = [...values]
    }

    /**
     * 查询响应头列表
     */
    @action
    findResponseHeaderMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'headerName',orderType:'asc' }],
        }
        const newRow =[{ id: 'InitNewResHeadRowId'}];
        const res = await Axios.post("/responseHeaderMock/findResponseHeaderMockList",params);
        if( res.code === 0){
            this.dataLength = res.data.length
            if(  this.dataLength=== 0){
                this.mockResponseHeaderList=newRow;
            }else {
                this.mockResponseHeaderList = [...res.data,...newRow]
            }
            return res.data;
        }
    }

    /**
     * 创建响应头
     */
    @action
    createResponseHeaderMock = async (values) => await Axios.post("/responseHeaderMock/createResponseHeaderMock",values)


    /**
     * 更新响应头
     */
    @action
	updateResponseHeaderMock =async (values) => await Axios.post("/responseHeaderMock/updateResponseHeaderMock",values)


    /**
     * 删除响应头
     */
    @action
    deleteResponseHeaderMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        await Axios.post("/responseHeaderMock/deleteResponseHeaderMock",param)
    }
    
}

let mockResponseHeaderStore = new MockResponseHeaderStore()
export default mockResponseHeaderStore;