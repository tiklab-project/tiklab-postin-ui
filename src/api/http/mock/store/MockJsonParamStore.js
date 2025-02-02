import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


/**
 * mock
 * json store
 */
class MockJsonParamStore {

    @observable mockJsonParamList = [];
    @observable mockJsonParamInfo ;
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action 
    setList = (values) => {
        this.mockJsonParamList = [...values]
    }

    /**
     * 查询json列表
     */
    @action
    findJsonParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'exp', orderType:'asc'}],
        }
        const newRow =[{ id: 'InitNewRowId'}];
        const res = await Axios.post("/jsonParamMock/findJsonParamMockList",params);
        if(res.code === 0) {
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length;
            if(res.data.length === 0){
                this.mockJsonParamList=newRow;
            }else {
                this.mockJsonParamList = [...res.data,...newRow]
            }
           return res.data;
        }
    }

    /**
     * 通过id查询单个json
     */
    @action
    findJsonParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await Axios.post("/jsonParamMock/findJsonParamMockList",param);
        if( res.code === 0){
            this.mockJsonParamInfo = res.data;
            return res
        }
    }

    /**
     * 创建json
     */
    @action
    createJsonParamMock = async (values) => {
        values.mock ={id: this.mockId};
        const res = await Axios.post("/jsonParamMock/createJsonParamMock",values);
        if( res.code === 0){
            this.findJsonParamMockList(this.mockId);
        }
    }

    /**
     * 更新json
     */
    @action
	updateJsonParamMock = async (values) => {
        const res = await Axios.post("/jsonParamMock/updateJsonParamMock",values);
        if( res.code === 0){
            return this.findJsonParamMockList(this.mockId);
        }
    }

    /**
     * 删除json
     */
    @action
	deleteJsonParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await Axios.post("/jsonParamMock/deleteJsonParamMock",param);
        if( res.code === 0){
            this.findJsonParamMockList(this.mockId);
        }
    }
    
}

let mockJsonParamStore = new MockJsonParamStore()
export default mockJsonParamStore;