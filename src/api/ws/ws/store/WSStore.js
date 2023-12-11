import {observable, action} from "mobx";
import {Axios} from "thoughtware-core-ui";
import {uuid} from "../../../../common/utils/createId";
import {testFunctionCommon} from "../../../common/TestFunctionCommon";

/**
 * ws接口store
 */
class WSStore {
    @observable headerSourceList=[];
    @observable querySourceList=[];
    @observable bodyType;
    @observable rawText;
    @observable jsonText;
    @observable initRow = [{id: uuid()}]

    @observable messageData;

    /**
     *  根据接口ID查找接口
     */
    @action
    findWSApi = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await Axios.post("/ws/findWSApi",param);

        const {code,data} =res;
        if( code === 0 ){
            const {headerList,queryList,request,rawParam,jsonParam} = data;

            this.headerSourceList=headerList?[...headerList,...this.initRow]:this.initRow;
            this.querySourceList=queryList?[...queryList,...this.initRow]:this.initRow;
            this.bodyType=request.bodyType;
            this.rawText=rawParam?.raw;
            this.jsonText=jsonParam?.jsonText;

            return data;
        }
    }

    /**
     * 创建接口
     */
    @action
    createWSApi = async (values) => await Axios.post("/ws/createWSApi",values)


    @action
    setHeaderList = (list) =>{
        this.headerSourceList = list;
    }

    @action
    setQueryList = (list) =>{
        this.querySourceList = list;
    }

    @action
    setMessage = (message) =>{
        this.messageData = message;
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


let wsStore = new WSStore();
export default wsStore;