import {observable, action} from "mobx";
import {
    findApix,
    createApix,
    updateApix,
    deleteApix,
    findApixPage
} from "../api/apixApi";
import {ApxMethodStore} from "../../http/store/apxMethodStore";

const httpStore = new ApxMethodStore()

export class ApixStore{
    @observable apixList = [];

    @action
    findApixPage = async (values) =>{
        this.params = {
            orderParams:[{name:'name', orderType:'asc'}],
            ...values
        }

        const res = await findApixPage(this.params)
        if(res.code === 0 ) {
            this.apixList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res.data.dataList;
        }
    }

    @action
    findApix = async (id) =>{
        const param = new FormData();
        param.append('id', id);

        const res = await findApix(param);
        if( res.code === 0 ){
            return res.data;
        }
    }

    @action
    createApix = async (values) =>{

        //先创建httpApi 返回id。
        const httpId =await httpStore.createApxMethod()

        let apix = { id:httpId,  apix:{id:httpId} }
        //再更新httpApi,把apixId带上
        await httpStore.updateApxMethod(apix)

        //把apixId设为和httpApiId相同的id
        values.id=httpId;
        values.status={id:"publishid"}
        await createApix(values);
    }

    @action
    updateApix = async (values) =>{
        const res = await updateApix(values);
        if( res.code === 0 ){
            return res.data;
        }
    }


    @action
    deleteApix = async (value) =>{
        const param = new FormData();
        param.append("id",value.id);

        if(value.protocolType === "http"){
            await httpStore.deleteApxMethod(value.id)
        }

        await deleteApix(param);
    }




}

export const APIX_STORE = "apixStore"

