import {action, observable} from "mobx";
import {
    importPostman,
    importReport
} from "../api/imexportApi"

export class ImexportStore{

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

    @action
    importPostman = async (values) =>{
        await importPostman(values);
    }

    @action
    importReport = async (values) =>{
        await importReport(values);
    }
}

export const IM_EX_PORT_STORE = 'imexportStore';
