/*
 * @Description: 接口详情页
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Request, Response } from '../../index';
import {Button, Select, Space} from 'antd';
import './apxMethod.scss'
import MethodType from "../../../common/methodType";
import { RemoteUmdComponent, useSelector} from 'doublekit-plugin-ui'
import EdiText from "react-editext";
import EdiTextToggle from "../../../common/ediTextToggle";

const {Option} = Select;

const ApxMethodDetail = (props) => {
    const { apxMethodStore,categoryStore,userSelectStore,apxMethodStatusStore ,pluginsStore} = props;
    const {findCategoryList} = categoryStore;
    const { findApxMethod,deleteApxMethod,findApxMethodListByApix,updateApxMethod} = apxMethodStore;
    const { findUserSelectPage,userSelectList } = userSelectStore;
    const {findApiStatusList,apiStatusSourceList} = apxMethodStatusStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const categoryId = localStorage.getItem('categoryId');
    const apxMethodId = localStorage.getItem('apxMethodId');


    const [resData, setResData] = useState({});
    const [httpId, setHttpId] = useState();
    const [methodType,setMethodType] =useState("");
    const [status, setStatus] = useState("");
    const [executorId, setExecutorId] = useState("");

    const pluginStore = useSelector(store => store.pluginStore)

    useEffect(()=>{
        findApxMethod(apxMethodId).then((res)=>{
            setHttpId(res.id)
            setResData(res)
            setMethodType(res.methodType);
            setStatus(res.apix.status?.id);
            setExecutorId(res.apix.executor?.id)
        })
    },[apxMethodId]);

    useEffect(()=>{
        findUserSelectPage(workspaceId)
    },[workspaceId])

    useEffect(()=>{
        findApiStatusList();
    },[])

    // 点击测试按钮，跳到测试页
    const handleTest = () => {
        props.history.push('/workspace/apis/detail/interface/test')
    }

    // 删除接口
    const handleDeleteApxMethod = (apxMethodId) => {
        deleteApxMethod(apxMethodId).then(()=>{
            findCategoryList(workspaceId);
            findApxMethodListByApix(categoryId);

        })

        props.history.push({pathname:'/workspace/apis/detail/category'})
    }

    //渲染执行者下拉框
    const showExecutor = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.user.id} value={item.user.id}>{item.user.name}</Option>
        })
    }

    //渲染状态下拉框
    const showStatus = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.id} value={item.id}>{item.name}</Option>
        })
    }

    //设置执行者
    const selectExecutor = (executor) =>{
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                executor:{id:executor}
            }
        }

        updateApxMethod(param).then(()=>{
            setExecutorId(executor)
        });
    }

    //设置状态
    const selectStatus = (statusId) =>{
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                status:{id:statusId}
            }
        }

        updateApxMethod(param).then(()=>{
            setStatus(statusId)
        });
    }

    //编辑名称
    const editName = (value) => {
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                name:value,
            }
        }
        updateApxMethod(param)
    };

    //编辑路径
    const editPath = (value) => {
        let param = {
            id:httpId,
            path:value,
            apix:{
                id:httpId,
            }
        }
        updateApxMethod(param)
    };

    //编辑详情
    const editDesc = (value) => {
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                desc:value
            }
        }
        updateApxMethod(param)
    };


    return(
        <Fragment>
            <div className="apidetail-header-btn">
                <EdiTextToggle
                    value={resData?.apix?.name}
                    tabIndex={1}
                    save={editName}
                />
                 <Space >
                     <Button className="important-btn" onClick={handleTest}>测试</Button>
                     <RemoteUmdComponent
                         point='version'
                         pluginStore={pluginStore}
                         extraProps={{ history: props.history}}
                     />
                     <Button danger onClick={()=>handleDeleteApxMethod(apxMethodId)}>删除</Button>
                 </Space>

            </div>
            <div className={"method"}>
                <div className={"method-info info-item"}>
                    <span className={"method-info-item "}><MethodType type={methodType} /></span>
                    <EdiText
                        value={resData?.path}
                        tabIndex={2}
                        onSave={editPath}
                        startEditingOnFocus
                        submitOnUnfocus
                        showButtonsOnHover
                        viewProps={{ className: 'edit-api-title' }}
                        editButtonClassName="ediText-edit"
                        saveButtonClassName="ediText-save"
                        cancelButtonClassName="ediText-cancel"
                        editButtonContent={
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-bianji1`} />
                            </svg>
                        }
                        hideIcons
                    />

                </div>
                <div className={"info-item"}>
                    <span>描述:</span>
                    <EdiText
                        value={resData?.apix?.desc}
                        tabIndex={3}
                        onSave={editDesc}
                        type={"textarea"}
                        startEditingOnFocus
                        submitOnUnfocus
                        showButtonsOnHover
                        viewProps={{ className: 'edit-api-title' }}
                        editButtonClassName="ediText-edit"
                        saveButtonClassName="ediText-save"
                        cancelButtonClassName="ediText-cancel"
                        editButtonContent={
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-bianji1`} />
                            </svg>
                        }
                        hideIcons
                    />
                </div>
                <Space>
                    <div className={"info-item"}>
                    <span className={"method-info-item "}>状态 ：
                         <Select
                             style={{width:100}}
                             value={status}
                             onChange={(e)=>selectStatus(e)}
                         >
                             {
                                 showStatus(apiStatusSourceList)
                             }
                        </Select>
                    </span>
                    </div>
                    <div className={"info-item"}>
                    <span className={"people-item "}>执行者:
                        <Select
                            style={{width:100}}
                            value={executorId}
                            onChange={(e)=>selectExecutor(e)}
                        >
                            {showExecutor(userSelectList)}
                        </Select>
                    </span>
                    </div>
                </Space>

                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {resData?.apix?.category?.name}</span>
                    <span className={"people-item "}>创建人: {resData?.apix?.createUser?.name}</span>
                    <span className={"people-item "}>更新者: {resData?.apix?.updataUser?.name}</span>
                    <span className={"people-item "}>创建时间: {resData?.apix?.createTime}</span>
                    <span className={"people-item "}>更新时间: {resData?.apix?.updateTime}</span>
                </div>
            </div>
            <div className="title ex-title">输入参数</div>
            <Request  />

            <div className="title ex-title">输出结果</div>
            <Response  />

        </Fragment>
    )
}

export default inject(
    'apxMethodStore',
    'categoryStore',
    "userSelectStore",
    "apxMethodStatusStore"
)(observer(ApxMethodDetail));
