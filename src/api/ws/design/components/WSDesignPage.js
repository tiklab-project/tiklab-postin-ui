import React, { useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import DetailCommon from "../../../common/detailcommon/DetailCommon";
import wsStore from "../../ws/store/WSStore";
import {Form} from "antd"
import apiStore from "../../../api/store/APIStore";
import RequestWS from "./RequestWS";

/**
 * 接口编辑页
 */
const WSDesignPage = (props) => {
    const {findWSApi} = wsStore
    const {updateApi,findApi} = apiStore

    const apiId = localStorage.getItem('apiId');
    const [apiInfo, setAPIInfo] = useState();
    const [form] = Form.useForm()

    useEffect(async ()=>{
        let info =  await findApi(apiId)
        setAPIInfo(info)
        form.setFieldsValue({
            name:info.name,
            path:info.path,
            category:info.category?.id,
            executor:info.executor?.id,
            desc:info.desc,
        })
    },[apiId]);

    const updateFn = async (changedValues, allValues) =>{
        let params = {
            ...apiInfo,
            name:allValues.name,
            path:allValues.path,
            category:{id:allValues.category},
            executor:{id:allValues.executor},
            desc:allValues.desc
        }
        await updateApi(params)
    }

    const updateStatus = async (status)=>{
        let params = {
            ...apiInfo,
            status: {id:status},
        }
        await updateApi(params)
    }

 
    return(
        <div className={"content-margin"} style={{height:"100%",padding:"0"}}>
            <div className="content-margin-box">
                <div className="header-title ex-title">基础信息</div>
                <DetailCommon
                    updateApi={updateFn}
                    form={form}
                    apiInfo={apiInfo}
                    updateStatus={updateStatus}
                />
                <div className="header-title ex-title">请求信息</div>
                <RequestWS />
            </div>
        </div>
    )
}

export default inject("userSelectStore")(observer(WSDesignPage));
