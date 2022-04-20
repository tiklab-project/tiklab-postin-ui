import { observable,  action  } from "mobx";
import {
    createMock,
    updateMock,
    deleteMock,
    findMock,
    findMockPage
} from '../api/mockApi';

export class MockStore {
    @observable mockList = [];
    @observable apxMethodId='';
    @observable mockInfo=[];
    @observable mockId = '';
    @observable totalRecord = ''

    @action
    findMockPage = (id,value)=>{
        this.apxMethodId = id;
        const params ={
            ...value,
            httpId:id
        }
        const that = this;
        return new Promise(function(resolve, reject){
            findMockPage(params).then(res => {
                if( res.code === 0){
                    that.mockList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord;
                    resolve(res.data)
                }
            })
        })
    }

    @action
    createMock = (values) => {
        values.http ={
            id:this.apxMethodId
        }
        createMock(values).then((res) => {
            if( res.code === 0){
                this.findMockPage(this.apxMethodId)
            }
        })
    }

    @action
    updateMock = (values) => {
        values.http ={
            id:this.apxMethodId
        }
        const that = this;
        return new Promise((resolve,reject)=> {
            updateMock(values).then((res) => {
                if( res.code === 0){
                    that.findMockPage(that.apxMethodId)
                    resolve(res)
                }
            })
        })
    }

    @action
    deleteMock = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteMock(param)
        if( res.code === 0){
            this.findMockPage(this.apxMethodId)
        }
    }

    @action
    findMock = (id) => {
        this.mockId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findMock(param).then((res) => {
                if( res.code === 0){
                   that.mockInfo = res.data;
                }
                resolve(that.mockInfo)
            })
        })
    }

}

export const MOCKSTORE = 'mockStore';
