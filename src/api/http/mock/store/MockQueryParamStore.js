import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * 查询参数 store
 */
class MockQueryParamStore {

    @observable mockQueryParamList = [];
    @observable mockQueryParamInfo;
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action 
    setList = (values) => {
        this.mockQueryParamList = [...values]
    }

    /**
     * 查询json列表
     */
    @action
    findQueryParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'paramName',orderType:'asc'}],
        }
        const newRow =[{ id: 'InitNewRowId'}];
        const res = await Axios.post("/queryParamMock/findQueryParamMockList",params);
        if(res.code === 0){
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length
            if(res.data.length === 0){
                this.mockQueryParamList=newRow;
            }else {
                this.mockQueryParamList = [... res.data,...newRow]
            }
            return  res.data;
        }
    }

    /**
     * 通过id查询单个json
     */
    @action
    findQueryParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await Axios.post("/queryParamMock/findQueryParamMock",param);
        if( res.code === 0){
            this.mockQueryParamInfo = res.data;
            return res.data;
        }
    }

    /**
     * 创建json
     */
    @action
    createQueryParamMock = async (values) => {
        values.mock ={id: this.mockId}
        const res = await Axios.post("/queryParamMock/createQueryParamMock",values)
        if( res.code === 0){
            this.findQueryParamMockList(this.mockId);
        }
    }

    /**
     * 更新json
     */
    @action
	updateQueryParamMock = async (values) => {
		const res = await Axios.post("/queryParamMock/updateQueryParamMock",values)
        if( res.code === 0){
            return this.findQueryParamMockList(this.mockId);
        }
    }

    /**
     * 删除json
     */
    @action
	deleteQueryParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
		const res = await Axios.post("/queryParamMock/deleteQueryParamMock",param)
        if( res.code === 0){
            this.findQueryParamMockList(this.mockId);
        }
    }

    
}

let mockQueryParamStore = new MockQueryParamStore()
export default mockQueryParamStore;