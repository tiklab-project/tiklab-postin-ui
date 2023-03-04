import {action, observable} from "mobx";
import {
    importPostman,
    importReport
} from "../api/imexportApi"

/**
 * 导入导出 store
 */
export class ImexportStore{

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
        await importPostman(values);
    }

    /**
     * 导入上报
     */
    @action
    importReport = async (values) =>{
        await importReport(values);
    }
}

export const IM_EX_PORT_STORE = 'imexportStore';
