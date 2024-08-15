import React, { useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Request, Response} from '../index';
import {Form, Spin, Tabs} from 'antd';
import './apxMethod.scss'
import ResponseHeader from "./ResponseHeader";
import categoryStore from "../../../../category/store/CategoryStore";
import apxMethodStore from "../store/ApxMethodStore";
import DetailCommon from "../../../common/detailcommon/DetailCommon";
import {useParams} from "react-router";

const {TabPane} = Tabs;

const {findNodeTree} = categoryStore;
const { findApxMethod,updateApxMethod} = apxMethodStore;

/**
 * 接口编辑页
 */
const ApxMethodEditPage = ({tabKey}) => {

    const [resData, setResData] = useState({});
    const [tabTip, setTabTip] = useState();
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(true);
    const {id} = useParams()
    const apiId = localStorage.getItem('apiId')||id;
    const workspaceId = localStorage.getItem('workspaceId');

    useEffect(async ()=>{
       if(tabKey==="design"){
           findApi()
       }
    },[apiId,tabKey]);

    const findApi =async () =>{
        setLoading(true)
        let apiInfo = await findApxMethod(apiId)
        setResData(apiInfo)

        let apix  = apiInfo.apix
        let node =apiInfo.node
        form.setFieldsValue({
            name:node.name,
            path:apix.path,
            category:apix.categoryId,
            executor:apix.executor?.id,
            desc:apix.desc,
            methodType:node.methodType,
        })


        let tabTipObj = {};

        if(apiInfo.headerList){
            tabTipObj.header = true;
        }

        if(apiInfo.queryList){
            tabTipObj.query = true;
        }

        switch (apiInfo.request.bodyType) {
            case "none":
                tabTipObj.body = false;
                break
            case "formdata":
                if(apiInfo.formList){
                    tabTipObj.body = true;
                }
                break
            case "formUrlencoded":
                if(apiInfo.formList){
                    tabTipObj.body = true;
                }
                break
            case "json":
                if(apiInfo.jsonList){
                    tabTipObj.body = true;
                }
                break
            case "raw":
                if(apiInfo.rawParam){
                    tabTipObj.body = true;
                }
                break
        }
        setTabTip(tabTipObj)
        setLoading(false)
    }

    const updateFn = async (changedValues, allValues) =>{
        console.log(changedValues, allValues)
        let params = {
            id:apiId,
            apix:{
                ...resData.apix,
                categoryId:allValues.category,
                executor:{id:allValues.executor},
                desc:allValues.desc,
                path:allValues.path,
                node:{
                    ...resData.node,
                    name:allValues.name,
                    methodType:allValues.methodType
                },
            },
        }
        await updateApxMethod(params).then(async (res)=>{
            //编辑完重新查询目录树
            await findNodeTree({workspaceId:workspaceId});
            let apiInfo = await findApxMethod(apiId)
            setResData(apiInfo)
        });
    }

    /**
     * 设置状态
     */
    const selectStatus = (statusId) =>{
        let param = {
            id:apiId,
            apix:{
                ...resData?.apix,
                status:{id:statusId}
            }
        }

        updateApxMethod(param).then(async (res)=>{
            //编辑完重新查询目录树
            await findNodeTree({workspaceId:workspaceId});
            let apiInfo = await findApxMethod(apiId)
            setResData(apiInfo)
        });
    }

    return(
        <Spin spinning={loading}>
            <div className="header-title ex-title">基础信息</div>
            <DetailCommon
                updateApi={updateFn}
                form={form}
                apiInfo={resData?.apix}
                updateStatus={selectStatus}
                methodType={true}
            />
            <div className="header-title ex-title">输入参数</div>
            <div className={"white-bg-box"}>
                <Request tabTip={tabTip} />
            </div>

            <div className="header-title ex-title">输出结果</div>
            <Tabs defaultActiveKey={"resResult"}>
                <TabPane tab="返回头" key="resHeader">
                    <div className={"tabPane-item-box"} style={{margin:"10px 0 0 0"}}>
                        <ResponseHeader />
                    </div>
                </TabPane>
                <TabPane tab="返回结果" key="resResult">
                    <div style={{margin:"10px 0 0 0"}} ><Response  /></div>
                </TabPane>
            </Tabs>
        </Spin>

    )
}

export default inject("userSelectStore")(observer(ApxMethodEditPage));
