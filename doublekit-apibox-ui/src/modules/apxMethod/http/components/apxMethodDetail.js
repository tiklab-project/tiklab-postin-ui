/*
 * @Description: 接口详情页
 */

import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import ApxMethodEdit from './apxMethodEdit';
import { Request, Response } from '../../index';
import {Button, Select} from 'antd';
import './apxMethod.scss'
import MethodType from "../../../common/methodType";

const {Option} = Select;

const ApxMethodDetail = (props) => {
    const { apxMethodStore,categoryStore,userSelectStore,apxMethodStatusStore } = props;
    const {findCategoryList} = categoryStore;
    const { findApxMethod,deleteApxMethod,findApxMethodListByApix,updateApxMethod} = apxMethodStore;
    const { findUserSelectPage,userSelectList } = userSelectStore;
    const {findApiStatusList,apiStatusSourceList} = apxMethodStatusStore;

    const [editOk, setEdit] = useState(false);

    const workspaceId = localStorage.getItem('workspaceId');
    const categoryId = localStorage.getItem('categoryId');
    const apxMethodId = localStorage.getItem('apxMethodId');


    const [resData, setResData] = useState({});
    const [name,setName]=useState("");
    const [requestType,setRequestType] =useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [createUser, setCreateUser] = useState("");
    const [updataUser, setUpdataUser] = useState("");
    const [executorId, setExecutorId] = useState("");
    const [category, setCategory] = useState("");
    const [updateTime, setUpdateTime] = useState("");

    useEffect(()=>{
        findApxMethod(apxMethodId).then((res)=>{
            setResData(res)
            setRequestType(res.requestType);
            setPath(res.path);
            setName(res.apix.name);
            setStatus(res.apix.status?.id);
            setDesc(res.apix.desc);
            setCreateUser(res.apix.createUser?.name);
            setUpdataUser(res.apix.updateUser?.name);
            setExecutorId(res.apix.executor?.id)
            setCategory(res.apix.category?.name);
            setUpdateTime(res.apix.updateTime);
        })
    },[editOk,apxMethodId]);

    useEffect(()=>{
        findUserSelectPage(workspaceId)
    },[workspaceId])

    useEffect(()=>{
        findApiStatusList();
    },[])

    // 点击测试按钮，跳到测试页
    const handleTest = () => {
        props.history.push('/workspacepage/apis/detail/interface/test')
    }

    // 删除接口
    const handleDeleteApxMethod = (apxMethodId) => {
        deleteApxMethod(apxMethodId).then(()=>{
            findCategoryList(workspaceId);
            findApxMethodListByApix(categoryId);

        })

        props.history.push({pathname:'/workspacepage/apis/detail/category'})
    }

    //渲染执行者下拉框
    const showExecutor = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.user.id} value={item.user.id}>{item.user.name}</Option>
        })
    }

    //设置执行者
    const selectExecutor = (executor) =>{

        resData.apix.executor ={id:executor};

        updateApxMethod(resData).then(()=>{
            setExecutorId(executor)

        });
    }

    //渲染状态下拉框
    const showStatus = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.id} value={item.id}>{item.name}</Option>
        })
    }

    //设置状态
    const selectStatus = (statusId) =>{

        resData.apix.status ={id:statusId};

        updateApxMethod(resData).then(()=>{
            setStatus(statusId)
        });
    }



    return(
        <Fragment>
            <div className="apidetail-header-btn">
                <div className={"method-name"}>{name}</div>
                 <div className={'apidetail-title-tool'}>
                     <Button className="important-btn" onClick={handleTest}>测试</Button>
                     <ApxMethodEdit setEdit={setEdit} name="编辑" isBtn={'btn'}  type="edit"/>
                     <Button danger onClick={()=>handleDeleteApxMethod(apxMethodId)}>删除</Button>
                 </div>
            </div>
            <div className={"method"}>
                <div className={"method-info info-item"}>
                    <span className={"method-info-item "}><MethodType type={requestType} /></span>
                    <span className={"method-info-item method-info-path"}>{path}</span>
                    <span className={"method-info-item "}>
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
                <div className={"info-item"}><span>描述:</span>{desc}</div>
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
                <div className={"method-people-info"}>
                    <span className={"people-item "}>分组: {category}</span>
                    <span className={"people-item "}>创建人: {createUser}</span>
                    <span className={"people-item "}>更新者: {updataUser}</span>
                    <span className={"people-item "}>更新时间: {updateTime}</span>
                </div>
            </div>
            <div className="title ex-title">输入参数</div>
            <Request  />

            <div className="title ex-title">输出结果</div>
            <Response  />

        </Fragment>
    )
}

export default inject('apxMethodStore','categoryStore',"userSelectStore","apxMethodStatusStore")(observer(ApxMethodDetail));
