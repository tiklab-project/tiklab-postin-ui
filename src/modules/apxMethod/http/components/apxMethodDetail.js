import React, {Fragment, useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Request, Response} from '../../index';
import {Button, Form, Input, Popconfirm, Select, Space, Tabs} from 'antd';
import './apxMethod.scss'
import MethodType from "../../../common/methodType";
import {RemoteUmdComponent} from 'tiklab-plugin-ui'
import {useHasPointPlugin, useSelector} from "tiklab-plugin-ui/es/_utils"
import ApiStatusModal from "../../../sysmgr/apiStatus/components/apiStatusSelect";
import IconCommon from "../../../common/iconCommon";
import {methodDictionary} from "../../../common/dictionary/dictionary";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {messageFn} from "../../../common/messageCommon/messageCommon";
import {CaretDownOutlined} from "@ant-design/icons";
import ResponseHeader from "./responseHeader";
import ApiDocDrawer from "./apiDocDrawer"
import ProtocolType from "../../../common/protocolType";
import {getVersionInfo} from "tiklab-core-ui";

const {Option} = Select;
const {TextArea} = Input
const {TabPane} = Tabs;

const ApxMethodDetail = (props) => {
    const { apxMethodStore,categoryStore,userSelectStore,apxMethodStatusStore ,pluginsStore} = props;
    const {findCategoryList} = categoryStore;
    const { findApxMethod,deleteApxMethod,findApxMethodListByApix,updateApxMethod} = apxMethodStore;
    const { findUserSelectPage,userSelectList } = userSelectStore;
    const {findApiStatusList,apiStatusSourceList} = apxMethodStatusStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const categoryId = localStorage.getItem('categoryId');
    const apxMethodId = localStorage.getItem('apxMethodId');

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const [name, setName] = useState();
    const [path, setPath] = useState();
    const [descValue, setDescValue] = useState();
    const [resData, setResData] = useState({});
    const [httpId, setHttpId] = useState();
    const [methodType,setMethodType] =useState();
    const [status, setStatus] = useState();
    const [executorId, setExecutorId] = useState();
    const pluginStore = useSelector(store => store.pluginStore)

    useEffect(async ()=>{
        let res = await findApxMethod(apxMethodId)
        setHttpId(res.id)
        setResData(res)
        setName(res.apix?.name)
        setPath(res.path)
        setDescValue(res.apix?.desc)
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
            return <Option key={item.user.id} value={item.user.id}>{item.user.nickname}</Option>
        })
    }

    //设置执行者
    const selectExecutor = (executor) =>{
        if(!executor) return

        let param = {
            id:httpId,
            apix:{
                ...resData?.apix,
                executor:{id:executor}
            }
        }

        updateApxMethod(param).then((res)=>{
            setExecutorId(executor)

            if(res.code===0){
                messageFn("success")
            }else {
                messageFn("error")
            }
        });
    }

    //设置状态
    const selectStatus = (statusId) =>{
        let param = {
            id:httpId,
            apix:{
                ...resData?.apix,
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

    //编辑名称
    const editName = async () => {

        if(name!==resData.apix?.name) {
            let param = {
                ...resData?.apix,
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
                    ...resData?.apix,
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

    //编辑请求类型
    const selectMethodType = (methodType) =>{
        let param = {
            id:httpId,
            apix:{
                ...resData?.apix,
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


    const [showMore, setShowMore] = useState(false);
    const [showDesc, setShowDesc] = useState(false);


    //编辑详情
    const onDescSave = () =>{
        let param = {
            id:httpId,
            apix:{
                ...resData?.apix,
                desc:descValue
            }
        }

        updateApxMethod(param).then((res)=>{
            if(res.code===0){
                messageFn("success")
            }else {
                messageFn("error")
            }
        })

        setShowDesc(false)
    }


    //判断是否有版本插件，返回的是true或false
    const hasVersionPlugin = useHasPointPlugin('version');

    let version = getVersionInfo()
    //{
    //     "release": 1:ce, 2:ee,3:saas
    //     "expired": true //过期 true，没过期false
    // }
    //展示插件
    const showPluginView = () =>{
        //如果版本不为ce，没有过期，并且有插件就显示
        if(version.release!==1&&version.expired===false&&hasVersionPlugin){
            return <RemoteUmdComponent
                    point='version'
                    pluginStore={pluginStore}
                    extraProps={{ history: props.history}}
                />
        }else {
            return <Popconfirm
                    title="想要升级增强功能？"
                    onConfirm={upgrade}
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

    //想要升级跳转到插件市场
    const upgrade=()=>{
        props.history.push("/systemManagement/plugin")
    }

    return(
        <Fragment>
            <div className={"white-bg-box"} style={{marginTop:0}}>
                <div className="api-detail-base-box">
                    <div className={"api-base-info-box"}>
                        <div style={{margin:"0 10px 0 0"}}>
                            <ProtocolType type={resData?.apix?.protocolType}/>
                        </div>
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
                        <ApiDocDrawer  apxMethodId={apxMethodId} />

                        <IconBtn
                            className="important-btn"
                            // icon={"fasong-copy"}
                            onClick={handleTest}
                            name={"测试"}
                        />
                        {
                            showPluginView()
                        }


                        {/*<IconBtn*/}
                        {/*    className="pi-icon-btn-grey"*/}
                        {/*    icon={"shanchu"}*/}
                        {/*    onClick={()=>handleDeleteApxMethod(apxMethodId)}*/}
                        {/*    name={"删除"}*/}
                        {/*/>*/}
                    </Space>

                </div>
                <div className={"api-detail-base-box"}>
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
                <div className={"method"}>
                    <div  style={{display:"flex","justifyContent":"space-between","alignItems":"center"}}>
                        <div className={"method-people-info"}>
                            <span className={"people-item "}>分组: {resData?.apix?.category?.name}</span>
                            <span className={"people-item api-detail-base-box"}>
                                负责人: <Select
                                        style={{width:75,height:32}}
                                        value={executorId?executorId:null}
                                        onChange={(e)=>selectExecutor(e)}
                                        placeholder={"未设置"}
                                        showArrow={showValidateStatus === "executor"}
                                        suffixIcon={showValidateStatus === "executor"?<CaretDownOutlined />:null}
                                        onMouseEnter={()=>{setShowValidateStatus("executor")}}
                                        onMouseLeave={()=>{setShowValidateStatus("")}}
                                    >
                                            {showExecutor(userSelectList)}
                                    </Select>
                            </span>
                            <span className={"people-item "}>更新人: {resData?.apix?.updateUser?.name}</span>
                            <span className={"people-item "}>更新时间: {resData?.apix?.updateTime}</span>
                            <div
                                className={"people-item"}
                                style={{display:"flex","alignItems":"center"}}
                                onClick={()=>{setShowMore(!showMore)}}
                            >
                                更多:
                                {showMore ?
                                    <IconCommon
                                        icon={"zhankai"}
                                        style={{margin: "0 0 0 5px", "cursor": "pointer"}}
                                        className={"icon-s "}
                                        // onClick={backToList}
                                    />
                                    :<IconCommon
                                        icon={"jiantou-shang2"}
                                        style={{margin: "0 0 0 5px", "cursor": "pointer"}}
                                        className={"icon-s "}
                                        // onClick={backToList}
                                    />
                                }
                            </div>
                        </div>

                    </div>


                    <div className={`api-base-info-desc ${showMore?"pi-show":"pi-hide"}`}>
                        <div style={{margin:"0 0 10px 0 "}}>描述:</div>
                        {
                            showDesc
                                ?
                                <div className={`api-base-info-desc-text `}>
                                    <TextArea
                                        defaultValue={descValue}
                                        value={descValue}
                                        autoSize={{ minRows: 4, maxRows: 10 }}
                                        onBlur={(e)=>setDescValue(e.target.value)}
                                        onChange={(e)=>setDescValue(e.target.value)}
                                    />
                                    <div style={{ padding:" 5px 0"}}>
                                        <Button onClick={()=>setShowDesc(false)} style={{marginRight:"10px"}}>取消</Button>
                                        <Button className={"important-btn"} onClick={onDescSave}>保存</Button>
                                    </div>

                                </div>

                                :<div className={`api-base-info-desc-text api-base-info-desc-text-show`} onClick={()=>setShowDesc(true)}>
                                    {descValue?descValue:"暂无描述"}
                                </div>
                        }
                    </div>

                </div>
            </div>

            <div className="header-title ex-title">输入参数</div>
            <div className={"white-bg-box"}>
                <Request  />
            </div>

            <div className="header-title ex-title">输出结果</div>
            <Tabs defaultActiveKey={"resResult"}>
                <TabPane tab="返回头" key="resHeader">
                    <div className={"tabPane-item-box"} style={{margin:"10px 0 0 0"}}><ResponseHeader /></div>
                </TabPane>
                <TabPane tab="返回结果" key="resResult">
                    <div style={{margin:"10px 0 0 0"}} ><Response  /></div>
                </TabPane>

            </Tabs>

        </Fragment>
    )
}

export default inject(
    'apxMethodStore',
    'categoryStore',
    "userSelectStore",
    "apxMethodStatusStore"
)(observer(ApxMethodDetail));
