import {action, observable} from "mobx";
import {uuid} from "../../../common/utils/createId";
import {testFunctionCommon} from "../../../api/common/TestFunctionCommon";

class WsQuickTestStore {
    @observable message
    @observable headerList = [{id:uuid()}]
    @observable queryList = [{id:uuid()}]
    @observable newRow =[{id:uuid()}]

    @action
    setMessage = (message) =>{
        this.message=message
    }

    @action
    setHeaderList = (headerList) =>{
        this.headerList=[...headerList,...this.newRow]
    }

    @action
    setQueryList = (queryList) =>{
        this.queryList=[...queryList,...this.newRow]
    }

    @action
    setUrl = (url,queryList) =>{
        let queryObj = testFunctionCommon.transData(queryList)
        if(queryObj&&Object.keys(queryObj).length>0){
            let query = Object.keys(queryObj).map(key => key + '=' + queryObj[key]).join('&');
            return url +"?"+ query
        }else {
            return url
        }
    }


}

const wsQuickTestStore = new WsQuickTestStore();
export default wsQuickTestStore;