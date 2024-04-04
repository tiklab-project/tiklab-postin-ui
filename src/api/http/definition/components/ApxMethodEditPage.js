import React, { useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Request, Response} from '../index';
import { Form, Popconfirm, Tabs} from 'antd';
import './apxMethod.scss'
import {RemoteComponent,useHasPointPlugin, useSelector} from 'thoughtware-plugin-core-ui'
import IconBtn from "../../../../common/iconBtn/IconBtn";
import ResponseHeader from "./ResponseHeader";
import {getVersionInfo} from "thoughtware-core-ui";
import categoryStore from "../../../../category/store/CategoryStore";
import apxMethodStore from "../store/ApxMethodStore";
import DetailCommon from "../../../common/detailcommon/DetailCommon";

const {TabPane} = Tabs;

/**
 * 接口编辑页
 */
const ApxMethodEditPage = (props) => {
    const { pluginsStore} = props;
    const {findNodeTree} = categoryStore;
    const { findApxMethod,updateApxMethod} = apxMethodStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem('apiId');

    const [resData, setResData] = useState({});
    const [tabTip, setTabTip] = useState();
    const [form] = Form.useForm()

    const pluginStore = useSelector(store => store.pluginStore)

    useEffect(async ()=>{
        let apiInfo = await findApxMethod(apiId)
        setResData(apiInfo)

        let apix  = apiInfo.apix
        let node =apiInfo.node
        form.setFieldsValue({
            name:node.name,
            path:apix.path,
            category:apix.category?.id,
            executor:apix.executor?.id,
            desc:apix.desc,
            methodType:apiInfo.methodType,
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


    },[apiId]);



    const updateFn = async (changedValues, allValues) =>{
        let params = {
            id:apiId,
            apix:{
                ...resData.apix,
                categoryId:allValues.category,
                executor:{id:allValues.executor},
                desc:allValues.desc,
                node:{
                    ...resData.node,
                    name:allValues.name,
                    path:allValues.path,
                },
            },

            methodType:allValues.methodType,

        }
        await updateApxMethod(params).then(async (res)=>{
            //编辑完重新查询目录树
            await findNodeTree({workspaceId:workspaceId});
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
        });
    }



    //判断是否有版本插件，返回的是true或false
    let hasVersionPlugin = useHasPointPlugin('version');

    let version = getVersionInfo()


    /**
     * 展示插件
     *
     *  {
        "release": 1:ce, 2:ee,3:saas
        "expired": true //过期 true，没过期false
        }
     */
    const showPluginView = () =>{
        //如果版本不为ce，没有过期，并且有插件就显示
        if(version.release!==1&&version.expired===false&&hasVersionPlugin){
            return <RemoteComponent
                    point='version'
                    pluginStore={pluginStore}
                    extraProps={{ history: props.history}}
                />
        }else {
            return <Popconfirm
                    title="想要升级增强功能？"
                    onConfirm={()=>props.history.push("/setting/plugin")}
                    okText='确定'
                    cancelText='取消'
                    placement="bottomRight"
                >
                    <IconBtn
                        className="pi-icon-btn-grey"
                        name={"版本"}
                    />
                </Popconfirm>
        }
    }



    return(
        <>
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

        </>

    )
}

export default inject("userSelectStore")(observer(ApxMethodEditPage));
