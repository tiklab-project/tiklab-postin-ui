import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

/**
 * mock
 * formdata store
 */
class MockFormParamStore {

    @observable mockFormParamList = [];
    @observable mockDataSourceList = [];
    @observable mockId = '';
    @observable dataLength;

    /**
     * 获取新的list
     */
    @action 
    setList = (values) => {
        this.mockFormParamList = [...values]
    }

    /**
     * 查询formdata列表
     */
    @action
    findFormParamMockList = async (id) => {
        this.mockId = id;
        const params = {
            mockId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[{ id: 'InitNewRowId'}];
        const res = await Axios.post("/formParamMock/findFormParamMockList",params);
        if(res.code === 0) {
            this.mockDataSourceList = res.data;
            this.dataLength = res.data.length;
            if( res.data.length === 0){
                this.mockFormParamList=newRow;
            }else {
                this.mockFormParamList = [...res.data,...newRow]
            }
            return res.data;
        }
    }

    /**
     * 创建formdata
     */
    @action
    createFormParamMock = async (values) => {
        values.mock ={id: this.mockId}
        const res = await Axios.post("/formParamMock/createFormParamMock",values);
        if( res.code === 0){
            this.findFormParamMockList(this.mockId);
        }
    }

    /**
     * 更新formdata
     */
    @action
	updateFormParamMock = async (values) => {
        const res = await Axios.post("/formParamMock/updateFormParamMock",values);
        if( res.code === 0){
            return this.findFormParamMockList(this.mockId);
        }
    }

    /**
     * 删除formdata
     */
    @action
	deleteFormParamMock = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await Axios.post("/formParamMock/deleteFormParamMock",param);
        if( res.code === 0){
            this.findFormParamMockList(this.mockId);
        }
    }
    
}

let mockFormParamStore = new MockFormParamStore();
export default mockFormParamStore;