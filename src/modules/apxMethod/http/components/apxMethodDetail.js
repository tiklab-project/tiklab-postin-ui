/*
 * @Description: 接口详情页
 */

import React, {Fragment, useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Request, Response} from '../../index';
import {Button, Form, Input, Select, Space} from 'antd';
import './apxMethod.scss'
import MethodType, {TextMethodType} from "../../../common/methodType";
import {RemoteUmdComponent} from 'tiklab-plugin-ui'
import {useSelector} from "tiklab-plugin-ui/es/_utils"
import EdiText from "react-editext";
import EdiTextToggle from "../../../common/ediTextToggle";
import ApiStatusModal from "../../../sysmgr/apiStatus/components/apiStatusSelect";
import IconCommon from "../../../common/iconCommon";
import {methodDictionary} from "../../../common/dictionary/dictionary";

const {Option} = Select;
const {TextArea} = Input

const layout = {
    labelCol: {  span: 8, },
    wrapperCol: {  span: 16, },
};

const tailLayout = {
    wrapperCol: {
        offset:1,
        span:23,
    },
};

const ApxMethodDetail = (props) => {
    const { apxMethodStore,categoryStore,userSelectStore,apxMethodStatusStore ,pluginsStore} = props;
    const {findCategoryList} = categoryStore;
    const { findApxMethod,deleteApxMethod,findApxMethodListByApix,updateApxMethod} = apxMethodStore;
    const { findUserSelectPage,userSelectList } = userSelectStore;
    const {findApiStatusList,apiStatusSourceList} = apxMethodStatusStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const categoryId = localStorage.getItem('categoryId');
    const apxMethodId = localStorage.getItem('apxMethodId');


    const [form] = Form.useForm()
    const [resData, setResData] = useState({});
    const [httpId, setHttpId] = useState();
    const [methodType,setMethodType] =useState("");
    const [status, setStatus] = useState("");
    const [executorId, setExecutorId] = useState("");
    const pluginStore = useSelector(store => store.pluginStore)

    useEffect(async ()=>{
        let res = await findApxMethod(apxMethodId)
        // form.setFieldsValue({
        //     name:res.apix.name,
        //     methodType:res.methodType,
        //     status:res.apix.status.id,
        //     path:res.path,
        //     executor:res.apix.executor?.id,
        //     category:res.apix.category?.name,
        //     createUser:res.apix.createUser?.name,
        //     updateUser:res.apix.updateUser?.name,
        //     updateTime:res.apix.updateTime,
        //     createTime:res.apix.createTime,
        // })

        setHttpId(res.id)
        setResData(res)
        setMethodType(res.methodType);
        setStatus(res.apix.status?.id);
        setExecutorId(res.apix.executor?.id)

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

    const selectMethodType = (methodType) =>{
        let param = {
            id:httpId,
            apix:{
                id:httpId,
                methodType:methodType
            },
            methodType:methodType
        }
        updateApxMethod(param)
    }

    //渲染 http 方法，如post，get
    const showMethod = (data) =>{
        return data&&data.map(item=>{
            return(
                <Option value={item} key={item}>
                    <TextMethodType type={item} />
                </Option>
            )
        })
    }

    const [showDesc, setShowDesc] = useState(false);
    const [descValue, setDescValue] = useState();
    //编辑详情
    const onDescSave = () =>{

        let param = {
            id:httpId,
            apix:{
                id:httpId,
                desc:descValue
            }
        }
        updateApxMethod(param).then(()=>{
            setShowDesc(false)

            findApxMethod(apxMethodId).then(res=>{
                setResData(res)
            })
        })
    }

    return(
        <Fragment>

            <div className={"api-base-info-header"} >
                <div className="header-title ex-title" style={{marginTop:0}}>基本信息</div>
                <div style={{margin:"0 10px"}}>/</div>
                <div className={"api-base-info-header-name"}>
                    <EdiTextToggle
                        value={resData?.apix?.name}
                        tabIndex={1}
                        save={editName}
                    />
                </div>

            </div>
            <div className={"white-bg-box"}>
                <div className="apidetail-header-btn">
                    <div className={"api-base-info-url"}>
                        <ApiStatusModal
                            selectStatus={selectStatus}
                            status={status}
                            {...props}
                        />
                        <Select
                            style={{width:70,height:40}}
                            value={methodType}
                            showArrow={false}
                            onChange={(e)=>selectMethodType(e)}
                        >
                            {
                                showMethod(methodDictionary)
                            }
                        </Select>

                        {/*<span className={"method-info-item "}><MethodType type={methodType} /></span>*/}
                        <div className={'api-base-edit-url-box'}>
                            <EdiText
                                value={resData?.path}
                                tabIndex={2}
                                onSave={editPath}
                                startEditingOnFocus
                                submitOnUnfocus
                                showButtonsOnHover
                                viewProps={{ className: 'api-base-edit-url' }}
                                editButtonClassName="ediText-edit"
                                saveButtonClassName="ediText-btn"
                                cancelButtonClassName="ediText-btn"
                                editButtonContent={
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-bianji1`} />
                                    </svg>
                                }
                                saveButtonContent={
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-btn_confirm`} />
                                    </svg>
                                }
                                cancelButtonContent={
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-shanchu2`} />
                                    </svg>
                                }
                            />

                        </div>

                    </div>

                    <Space >
                        <Button className="important-btn" onClick={handleTest} style={{display:"flex",alignItems:"center"}}>
                            <IconCommon
                                icon={"fasong-copy"}
                                className={"icon-s"}
                            />
                            测试
                        </Button>
                        <RemoteUmdComponent
                            point='version'
                            pluginStore={pluginStore}
                            extraProps={{ history: props.history}}
                        />
                        <Button  onClick={()=>handleDeleteApxMethod(apxMethodId)}  style={{display:"flex",alignItems:"center"}}>
                            <IconCommon
                                icon={"shanchu"}
                                className={"icon-s"}
                            />
                            删除
                        </Button>


                    </Space>

                </div>
                <div className={"method"}>
                    <div className={"method-people-info"}>
                     <span className={"people-item "}>执行者:
                         {
                             executorId
                                 ?<Select
                                     style={{width:85}}
                                     value={executorId}
                                     showArrow={false}
                                     onChange={(e)=>selectExecutor(e)}
                                 >
                                     {showExecutor(userSelectList)}
                                 </Select>
                                 :<span>未设置</span>
                         }

                        </span>
                        <span className={"people-item "}>分组: {resData?.apix?.category?.name}</span>
                        <span className={"people-item "}>创建人: {resData?.apix?.createUser?.name}</span>
                        <span className={"people-item "}>更新人: {resData?.apix?.updataUser?.name}</span>
                        <span className={"people-item "}>创建时间: {resData?.apix?.createTime}</span>
                    </div>

                    <div className={"api-base-info-desc"}>
                        <span>描述:</span>
                        <span
                            className={`api-base-info-desc-text ${showDesc?"api-base-info-desc-hide":"api-base-info-desc-show"}`}
                            onClick={()=>setShowDesc(true)}
                        >
                            {resData?.apix?.desc?resData?.apix?.desc:"暂无描述"}
                        </span>
                        <div className={`api-base-info-desc-text ${showDesc?"api-base-info-desc-show":"api-base-info-desc-hide"}`}>
                            <TextArea defaultValue={resData?.apix?.desc}   autoSize={{ minRows: 4, maxRows: 10 }} onBlur={(e)=>setDescValue(e.target.value)}/>
                            <div style={{ padding:" 5px 0"}}>
                                <Button onClick={()=>setShowDesc(false)} style={{marginRight:"10px"}}>取消</Button>
                                <Button className={"important-btn"} onClick={onDescSave}>确定</Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            <div className="header-title ex-title">输入参数</div>
            <div className={"white-bg-box"}>
                <Request  />
            </div>


            <div className="header-title ex-title">输出结果</div>
            <div className={"white-bg-box"}>
                <Response  />
            </div>


        </Fragment>
    )
}

export default inject(
    'apxMethodStore',
    'categoryStore',
    "userSelectStore",
    "apxMethodStatusStore"
)(observer(ApxMethodDetail));
