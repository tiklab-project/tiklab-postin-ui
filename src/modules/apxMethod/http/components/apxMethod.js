/*
 * @Description: 接口详情，测试，mock 的切换
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-08 17:44:07
 */

import React, {Fragment, useEffect, useState,} from 'react';
import { renderRoutes } from "react-router-config";
import {Input, Layout, Menu, Select, Space} from 'antd';
import {ApiOutlined, CaretDownOutlined, RetweetOutlined, SnippetsOutlined} from '@ant-design/icons';
import MenuCommon from "../../../common/menu/menuCommon";
import {methodDictionary} from "../../../common/dictionary/dictionary";
import IconCommon from "../../../common/iconCommon";
import {inject, observer} from "mobx-react";
import {messageFn} from "../../../common/messageCommon/messageCommon";
import MethodType from "../../../common/methodType";
import DocDrawer from "./apiDocDrawer";
import IconBtn from "../../../common/iconBtn/IconBtn";
import ApiStatusModal from "../../../sysmgr/apiStatus/components/apiStatusSelect";
const {Option} = Select;

const ApxMethod = (props) =>  {
    const {apxMethodStore,categoryStore} = props;
    const {findCategoryList} = categoryStore;
    const {findApxMethod,updateApxMethod,deleteApxMethod,findApxMethodListByApix} =apxMethodStore;
    const router = props.route.routes;

    const items = [
        {
            title: '接口',
            key: '/workspace/apis/detail/interface',
            // icon: <ApiOutlined />,
        },
        {
            title: '测试用例',
            key: '/workspace/apis/detail/interface/testcase',
            // icon: <RetweetOutlined />,
        },{
            title: 'Mock',
            key: '/workspace/apis/detail/interface/mock',
            // icon: <SnippetsOutlined />,
        }
    ];

    const workspaceId = localStorage.getItem('workspaceId');
    const categoryId = localStorage.getItem('categoryId');
    const apxMethodId = localStorage.getItem('apxMethodId');

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const [httpId, setHttpId] = useState();
    const [methodType,setMethodType] =useState();
    const [resData, setResData] = useState({});
    const [name, setName] = useState();
    const [path, setPath] = useState();
    const [status, setStatus] = useState();

    useEffect(async ()=>{
        let res = await findApxMethod(apxMethodId)
        setHttpId(res.id)
        setResData(res)
        setName(res.apix?.name)
        setPath(res.path)
        setMethodType(res.methodType);
        setStatus(res.apix.status?.id);
    },[apxMethodId]);



    //编辑名称
    const editName = async () => {

        if(name!==resData.apix?.name) {
            let param = {
                id:httpId,
                apix:{
                    id:httpId,
                    name:name,
                }
            }

            let res = await updateApxMethod(param)
            if(res.code===0){
                findApxMethod(apxMethodId).then(res=>setResData(res))

                messageFn("success")
            }else {
                messageFn("error")
            }
        }

        setShowValidateStatus(null)
    };

    //编辑路径
    const editPath = () => {
        if(path!==resData.path){
            let param = {
                id:httpId,
                path:path,
                apix:{
                    id:httpId,
                }
            }

            updateApxMethod(param).then(res=>{
                if(res.code===0){
                    findApxMethod(apxMethodId).then(res=>setResData(res))

                    messageFn("success")
                }else {
                    messageFn("error")
                }
            })
        }

        setShowValidateStatus(null)
    };


    //设置状态
    const selectStatus = (statusId) =>{
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                status:{id:statusId}
            }
        }

        updateApxMethod(param).then((res)=>{
            setStatus(statusId)

            if(res.code===0){
                messageFn("success")
            }else {
                messageFn("error")
            }
        });
    }

    //请求类型
    const selectMethodType = (methodType) =>{
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                methodType:methodType
            },
            methodType:methodType
        }


        updateApxMethod(param).then(res=>{
            setMethodType(methodType)

            if(res.code===0){
                messageFn("success")
            }else {
                messageFn("error")
            }
        })
    }

    //渲染 http 方法，如post，get
    const showMethod = (data) =>{
        return data&&data.map(item=>{
            return(
                <Option value={item} key={item}>
                    <MethodType type={item} />
                </Option>
            )
        })
    }

    // 删除接口
    const handleDeleteApxMethod = (apxMethodId) => {
        deleteApxMethod(apxMethodId).then(()=>{
            findCategoryList(workspaceId);
            findApxMethodListByApix(categoryId);
        })

        props.history.push({pathname:'/workspace/apis/detail/category'})
    }



    return(
        <div className={"api-content-box"}>


            <div className={"content-margin"} >
                <div className="content-margin-box">
                    <div className="api-detail-base-box" style={{"margin": 0}}>
                        <div className={"api-base-info-box"}>
                            <div className={"api-base-info-protocol"}> HTTP</div>
                            <Select
                                style={{width:75,height:32}}
                                value={methodType}
                                onChange={(e)=>selectMethodType(e)}
                                showArrow={showValidateStatus === "methodType"}
                                suffixIcon={showValidateStatus === "methodType"?<CaretDownOutlined />:null}
                                onMouseEnter={()=>{setShowValidateStatus("methodType")}}
                                onMouseLeave={()=>{setShowValidateStatus("")}}
                            >
                                {
                                    showMethod(methodDictionary)
                                }
                            </Select>

                            <div className={"api-base-info-box-name"}>
                                <Input
                                    defaultValue={name}
                                    onPressEnter={editName}
                                    onBlur={editName}
                                    onFocus={()=>setShowValidateStatus("editName")}
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    suffix={
                                        showValidateStatus === "editName"
                                            ? <IconCommon
                                                icon={"icon-1"}
                                                className="icon-s "
                                            />
                                            :null
                                    }
                                />
                            </div>
                        </div>
                        <Space >
                            <DocDrawer
                                apxMethodId={apxMethodId}
                            />
                            <IconBtn
                                className="pi-icon-btn-grey"
                                icon={"shanchu"}
                                onClick={()=>handleDeleteApxMethod(apxMethodId)}
                                name={"删除"}
                            />
                        </Space>
                    </div>

                    <div className="api-detail-base-box">
                        <div className={"api-base-info-two"}>
                            <ApiStatusModal
                                selectStatus={selectStatus}
                                status={status}
                                {...props}
                            />

                            <div className={'api-base-edit-url-box'}>
                                <Input
                                    defaultValue={path}
                                    onPressEnter={editPath}
                                    onBlur={editPath}
                                    onFocus={()=>setShowValidateStatus("editPath")}
                                    value={path}
                                    onChange={(e)=>setPath(e.target.value)}
                                    suffix={
                                        showValidateStatus === "editPath"
                                            ? <IconCommon
                                                icon={"icon-1"}
                                                className="icon-s "
                                            />
                                            :null
                                    }
                                />
                            </div>
                        </div>
                    </div>


                    <div style={{"borderBottom":"1px solid #dddddd",margin:"0 0 20px 0"}}>
                        <div style={{
                            // maxWidth: "1440px",
                            "minWidth":"800px",
                            "margin":"0 auto",
                            // boxShadow: "rgb(0 0 0 / 76%) 0px 5px 5px -8px"
                        }}>
                            <MenuCommon
                                items={items}
                                selectedKey={"/workspace/apis/detail/interface"}
                                {...props}
                            />
                        </div>
                    </div>

                    {
                        renderRoutes(router)
                    }
                </div>

            </div>
        </div>
    )

}

export default inject("apxMethodStore","categoryStore")(observer(ApxMethod));
