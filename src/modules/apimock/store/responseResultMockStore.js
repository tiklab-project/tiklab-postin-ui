import { observable,  action } from "mobx";
import { 
    findResponseResultMock, 
    createResponseResultMock,
    updateResponseResultMock
} from '../api/mockResponseResultApi';

export class ResponseResultMockStore {

    @observable mockResponseResultInfo = '';
    @observable mockId = '';
    @observable mockResponseResultId = '';

    @action
    findResponseResultMock = (id) => {
        this.mockId = id;
        this.mockResponseResultId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findResponseResultMock(param).then((res) => {
                if( res.code === 0){
                    if(res.data !== null){
                        that.mockResponseResultInfo = res.data.resultType;
                    }
                    resolve(res.data)
                }
            })
        })
    }
    
    @action
    createResponseResultMock = (values) => {
        values.mock = {
            id: this.mockId,
        }
        values.id =  this.mockResponseResultId;
        createResponseResultMock(values).then((res) => {
            if( res.code === 0){
                this.findResponseResultMock(this.mockId);
            }
        })
    }

    @action
	updateResponseResultMock = (values) => {
        values.mock = {
            id: this.mockId,
        }
        values.id =  this.mockResponseResultId;
		updateResponseResultMock(values).then((res) => {
            if( res.code === 0){
                this.findResponseResultMock(this.mockId);
            }
        })
    }
    
    
}

export const MOCK_RESPONSERESULT_STORE = 'responseResultMockStore';