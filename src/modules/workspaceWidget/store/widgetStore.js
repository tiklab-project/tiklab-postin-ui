import {action} from "mobx";
import {
    findWorkspaceHomeTotal
} from "../api/widgetApi"


export class WidgetStore{

    @action
    findWorkspaceHomeTotal = async (userId) =>{
        let param = new FormData();
        param.append("userId",userId)

        let res = await findWorkspaceHomeTotal(param)
        if(res.code===0){

            return res.data
        }
    }
}

export const WIDGET_STORE = 'widgetStore';