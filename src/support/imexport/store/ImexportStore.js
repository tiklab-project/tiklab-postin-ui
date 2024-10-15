import {action} from "mobx";

import {Axios} from "tiklab-core-ui";

/**
 * 导入导出 store
 */
class ImexportStore{


    /**
     * 导入postman
     */
    @action
    importData = async (values) =>{
        const params = new FormData();
        params.append("workspaceId",values.workspaceId);
        params.append("file",values.file);
        params.append("type",values.type);
        return await Axios.post("/port/importData",params);
    }

    /**
     * 导入上报
     */
    @action
    importReport = async (values) => await Axios.post("/port/importReport",values);

}

let imexportStore = new ImexportStore();
export default imexportStore;
