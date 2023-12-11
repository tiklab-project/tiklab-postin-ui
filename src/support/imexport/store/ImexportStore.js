import {action} from "mobx";

import {Axios} from "thoughtware-core-ui";

/**
 * 导入导出 store
 */
class ImexportStore{

    /**
     * 导入
     */
    @action
    importData = (values)=>{
        const params = new FormData();
        params.append("workspaceId",values.workspaceId);
        params.append("file",values.file);

        switch (values.type){
            case "portman":
                this.importPostman(params);
                break;
            case "report":
                this.importReport(params);
                break;
        }
    }

    /**
     * 导入postman
     */
    @action
    importPostman = async (values) =>{
        const params = new FormData();
        params.append("workspaceId",values.workspaceId);
        params.append("file",values.file);
        return await Axios.post("/port/importPostman",params);
    }

    /**
     * 导入上报
     */
    @action
    importReport = async (values) => await Axios.post("/port/importReport",values);

}

let imexportStore = new ImexportStore();
export default imexportStore;
