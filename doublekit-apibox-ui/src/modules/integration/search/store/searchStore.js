import { observable,  action, toJS  } from "mobx";
import { 
    searchForTop,
    searchForCount,
    searchForPage
} from '../api/searchApi';

export class SearchStore {
    @observable searchList = [];
    @observable countList = [];
    @observable keyword = '';
    @observable pageList = [];
    @observable totalRecord = '';
  

    @action
    setKeyword = (value) => {
        this.keyword = value;
    }

    @action
    searchForTop = async (value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        const res = await searchForTop(params)
        if( res.code === 0) {
            debugger
            this.searchList = res.data.responseList;
            return res.data
        }
    }

    @action
    searchForCount = async (value) => {
        const params = new FormData();
        if(value){
            params.append('keyword', value ); 
        }else {
            params.append('keyword', null ); 
        }
        const res = await searchForCount(params);
        if(res.code === 0) {
            this.countList = res.data.responseList;
            return res.data;
        }
    }

    @action
    searchForPage = async (params) => {
        const res = await searchForPage(params);
        if(res.code === 0) {
            this.pageList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res.data;
        }
    }

}

export const SEARCHSTORE = 'searchStore';