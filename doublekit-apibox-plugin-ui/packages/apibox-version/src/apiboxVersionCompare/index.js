/**
 * @description：
 * @date: 2021-07-23 11:45
 */
import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Breadcrumb, Form, Input, Select} from 'antd';
import {DownOutlined, RightOutlined} from '@ant-design/icons';
import apxMethodStore from "./methodStore";
import {observer} from "mobx-react";

const {Option}= Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const CompareVersion = (props) => {
    const {compareVersion,findVersionPage,versionList}=apxMethodStore;

    const [infoTog,setInfoTog] = useState(true);
    const [requestTog,setRequestTog] = useState(true);
    const [responseTog,setResponseTog] = useState(true);

    const [hname,setHname]=useState('')
    const [cname,setCname]=useState('')

    const [hrequestType,setHrequestType]=useState('')
    const [crequestType,setCrequestType]=useState('')

    const [hpath,setHpath] = useState('');
    const [cpath,setCpath] = useState('')

    const [hdesc,setHdesc] = useState('');
    const [cdesc,setCdesc] = useState('');

    const [cRequest,setCrequest] = useState([])
    const [oRequest,setOrequest] = useState([])
    const [cResponse,setCresponse] = useState([])
    const [oResponse,setOresponse] = useState([])
    const [form] = Form.useForm();

    const apxMethodId = localStorage.getItem('apxMethodId');
    const [oldMethodId,setOldMethodId] = useState(localStorage.getItem('oldMethodId'));
    useEffect(()=>{
        compareVersion(apxMethodId,oldMethodId).then((res)=>{
            let cV = res.currentVersion;
            let oV = res.oldVersion;
            setHname(oV.methodEx.name)
            setHrequestType(oV.methodEx.requestType)
            setHpath(oV.methodEx.path)
            setHdesc(oV.methodEx.desc)
            setCname(cV.methodEx.name)
            setCrequestType(cV.methodEx.requestType)
            setCpath(cV.methodEx.path)
            setCdesc(cV.methodEx.desc)
            setCrequest(cV.versionRequest);
            setOrequest(oV.versionRequest);
            setCresponse(cV.versionRespon)
            setOresponse(oV.versionRespon)
            form.setFieldsValue({
                histroyname: oV.methodEx.name,
                histroyrequestType:oV.methodEx.requestType,
                histroypath: oV.methodEx.path,
                histroydesc: oV.methodEx.desc,
                name: cV.methodEx.name,
                requestType:cV.methodEx.requestType,
                path: cV.methodEx.path,
                desc: cV.methodEx.desc,
            })
        })
    },[oldMethodId])

    const versionId = apxMethodId
    useEffect(()=>{
        findVersionPage(versionId)
    },[versionId])

    //历史版本的基础信息
    const hisBaseInfo=[
        {
            key:'histroyname',
            title:'接口名称',
            name:'histroyname',
            current:cname,
            history:hname
        },
        {
            key:'histroyrequestType',
            title:'请求方式',
            name:'histroyrequestType',
            history:hrequestType,
            current:crequestType,
        },
        {
            key:'histroypath',
            title:'接口路径',
            name:'histroypath',
            history:hpath,
            current:cpath
        },{
            key:'histroydesc',
            title:'接口描述',
            name:'histroydesc',
            history:hdesc,
            current:cdesc
        },
    ]

    //当前版本的基础信息
    const curBaseInfo=[
        {
            key:'name',
            title:'接口名称',
            name:'name',
            current:cname,
            history:hname
        },
        {
            key:'requestType',
            title:'请求方式',
            name:'requestType',
            history:hrequestType,
            current:crequestType,
        },
        {
            key:'path',
            title:'接口路径',
            name:'path',
            history:hpath,
            current:cpath
        },{
            key:'desc',
            title:'接口描述',
            name:'desc',
            history:hdesc,
            current:cdesc
        },
    ]

    //展示基础信息
    const showView = (data) => {
        return data.map(item =>{
            return (
                <Form.Item
                    key={item.key}
                    {...layout}
                    className={`${compareFn(item.history,item.current)}`}
                    label={item.title}
                    name={item.name}
                >
                    <Input  disabled bordered={false}/>
                </Form.Item>
            )
        })
    }

    //请求头
    const showHeader = (data) => {
        return data && data.map((item,index) => {
            return (
                <div key={index}>
                    <div style={{margin:'15px'}}>
                        <div className={'header-item'}>
                            <div>标签:</div>
                            <div>{item['headerName']}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>必须:</div>
                            <div>{item['required']==='1'? '是':'否'}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>说明:</div>
                            <div>{item['desc']}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>示例:</div>
                            <div>{item['eg']}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    //查询参数
    const showQuery = (data) =>{
        return data && data.map((item,index) => {
            return (
                <div key={index}>
                    <div style={{margin:'15px'}}>
                        <div className={'header-item'}>
                            <div>标签:</div>
                            <div>{item['paramName']}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>数据类型:</div>
                            <div>{item['dataType']}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>必须:</div>
                            <div>{item['required']==='1'? '是':'否'}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>说明:</div>
                            <div>{item['desc']}</div>
                        </div>
                        <div className={'header-item'}>
                            <div>示例:</div>
                            <div>{item['eg']}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    //请求体
    const showBody = (data) => {
        if(data && data.length!==0){
            const bodyType = data.requestBodyExList[0].bodyType;
            const jsonList = data.jsonParamList;
            const formList = data.formParamList;
            const rawParam = data.rawParamList
            if(bodyType === 'json'){
                // return jsonList.map((item,index) => {
                //     return (
                //         <div key={index}>
                //             <div style={{margin:'15px'}}>
                //                 <div className={'header-item'}>
                //                     <div>标签:</div>
                //                     <div>{item['paramName']}</div>
                //                 </div>
                //                 <div className={'header-item'}>
                //                     <div>数据类型:</div>
                //                     <div>{item['dataType']}</div>
                //                 </div>
                //                 <div className={'header-item'}>
                //                     <div>必须:</div>
                //                     <div>{item['required']==='1'? '是':'否'}</div>
                //                 </div>
                //                 <div className={'header-item'}>
                //                     <div>说明:</div>
                //                     <div>{item['desc']}</div>
                //                 </div>
                //                 <div className={'header-item'}>
                //                     <div>示例:</div>
                //                     <div>{item['eg']}</div>
                //                 </div>
                //             </div>
                //         </div>
                //     )
                // }
            } else if (bodyType === 'form') {
                return formList&&formList.map((item,index) => {
                    return (
                        <div key={index}>
                            <div style={{margin:'15px'}}>
                                <div className={'header-item'}>
                                    <div>参数名称:</div>
                                    <div>{item['paramName']}</div>
                                </div>
                                <div className={'header-item'}>
                                    <div>数据类型:</div>
                                    <div>{item['dataType']}</div>
                                </div>
                                <div className={'header-item'}>
                                    <div>必须:</div>
                                    <div>{item['required']==='1'? '是':'否'}</div>
                                </div>
                                <div className={'header-item'}>
                                    <div>说明:</div>
                                    <div>{item['desc']}</div>
                                </div>
                                <div className={'header-item'}>
                                    <div>示例:</div>
                                    <div>{item['eg']}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            } else if(bodyType === 'raw'){
                return rawParam&&rawParam.map((item,index) => {
                    return (
                        <div key={index}>
                            <div style={{margin:'15px'}}>
                                <div className={'header-item'}>
                                    <div>{item['raw']}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }
    }

    //前置脚本
    const showPre = (data) => {
        if(data && data.length!==0){
            const preParam = data.preScriptList
            return preParam&&preParam.map((item,index) => {
                return (
                    <div key={index}>
                        <div style={{margin:'15px'}}>
                            <div className={'header-item'}>
                                <div>{item['scriptex']}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    //后置脚本
    const showAfter = (data) => {
        if(data && data.length!==0){
            const afterParam = data.afterScriptList
            return afterParam&&afterParam.map((item,index) => {
                return (
                    <div key={index}>
                        <div style={{margin:'15px'}}>
                            <div className={'header-item'}>
                                <div>{item['scriptex']}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    //返回头
    const showResHeader = (value) => {
        if(value && value.length!==0){
            const data = value.responseHeaderList
            return data && data.map((item,index) => {
                return (
                    <div key={index}>
                        <div style={{margin:'15px'}}>
                            <div className={'header-item'}>
                                <div>标签:</div>
                                <div>{item['headerName']}</div>
                            </div>
                            <div className={'header-item'}>
                                <div>必须:</div>
                                <div>{item['required']==='1'? '是':'否'}</div>
                            </div>
                            <div className={'header-item'}>
                                <div>说明:</div>
                                <div>{item['desc']}</div>
                            </div>
                            <div className={'header-item'}>
                                <div>示例:</div>
                                <div>{item['eg']}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    //返回结果
    const showResResult = (value) => {
        if(value && value.length!==0){
            const resultType = value.responseResultList[0].resultType;
            const jsonResList = value.jsonResponseList;
            const rawParam = value.rawResponseList
            if(resultType === 'json'){

            } else {
                return rawParam&&rawParam.map((item,index) => {
                    return (
                        <div key={index}>
                            <div style={{margin:'15px'}}>
                                <div className={'header-item'}>
                                    <div>{item['raw']}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }
    }

    //对比数据
    const compareFn = (hisVersion,curVersion) => {
        if(hisVersion){
            if(hisVersion===curVersion){
                return ''
            }else if(hisVersion!==curVersion && curVersion!==''){
                return 'edit-info';
            }else if(!curVersion){
                return 'delete-info'
            }
        }else {
            if(hisVersion===curVersion){
                return ''
            }else if(hisVersion!==curVersion){
                return 'add-info';
            }
        }
    }

    //跳到版本管理
    const toVersion = () => {
        props.history.push({pathname:'/workspacepage/version'})
    }

    //是否展开或者关闭
    const togOpenorClose = (isvalue)=>{
        if(isvalue){
            return <DownOutlined  style={{fontSize: "12px"}}/>
        }else {
            return <RightOutlined style={{fontSize: "12px"}}/>
        }
    }

    //展示数据
    const showUI = (oldFn,curFn) => {
        return(
            <div className='modeule-layout'>
                <div className='combaseinfo'>
                    {oldFn}
                </div>
                <div className='combaseinfo'>
                    {curFn}
                </div>
            </div>
        )
    }

    //选择框change事件
    const handleChange = (e) => {
        console.log(e)
        localStorage.setItem('detailMethod',e)
        setOldMethodId(e)
    }

    //选择框下拉列表
    const showSelect = (data) => {
        return  data&&data.map(item=>{
            return(
                <Option key={item.id} value={item.id}>{item.versionCode}</Option>
            )
        })
    }


    return(
        <Row justify="center" className="ws-row">
            <Col span={18} className="ws-col">
                <div className='breadcrumb-contant'>
                    <div className='breadcrumb'>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item onClick={toVersion} className='bread-cursor'>版本管理</Breadcrumb.Item>
                            <Breadcrumb.Item>版本对比</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div >
                        <Button className="important-btn" onClick={toVersion}>返回</Button>
                    </div>
                </div>
                <div className='comp-vertitle'>
                    <div>
                        <div>历史版本:</div>
                        <Select
                            defaultValue={oldMethodId}
                            onChange={handleChange}
                            style={{ width: 150 }}
                        >
                            {showSelect(versionList)}
                        </Select>
                    </div>
                    <div>当前版本</div>
                </div>

                <div className='comp-module' onClick={()=>setInfoTog(!infoTog)}>
                    <div className='comp-title'>基础信息</div>
                    {
                        togOpenorClose(infoTog)
                    }
                </div>
                <div className={`${infoTog ? 'showInfo' : 'hideInfo'}`}>
                    <div className='modeule-layout'>
                        <div className='combaseinfo'>
                            <Form className="apx-form form-info" form={form}>
                                {showView(hisBaseInfo)}
                            </Form>
                        </div>
                        <div className='combaseinfo'>
                            <Form className="apx-form form-info" form={form}>
                                {showView(curBaseInfo)}
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='comp-module' onClick={()=>setRequestTog(!requestTog)}>
                    <div className='comp-title' >请求参数</div>
                    {
                        togOpenorClose(requestTog)
                    }
                </div>
                <div className={` ${requestTog ? 'showInfo' : 'hideInfo'}`}>
                    <div className='com-content'>
                        <div className='ver-title'>请求头</div>

                        {showUI(showHeader(oRequest.requestHeaderList),showHeader(cRequest.requestHeaderList))}
                        <div className='ver-title'>查询参数</div>
                        {showUI(showQuery(oRequest.queryParamList),showQuery(cRequest.queryParamList))}
                        <div className='ver-title'>请求体</div>
                        {showUI(showBody(oRequest),showBody(cRequest))}
                        <div className='ver-title'>前置脚本</div>
                        {showUI(showPre(oRequest),showPre(cRequest))}
                        <div className='ver-title'>后置脚本</div>
                        {showUI(showAfter(oRequest),showAfter(cRequest))}
                    </div>
                </div>
                <div className='comp-module' onClick={()=>setResponseTog(!responseTog)}>
                    <div className='comp-title' >返回参数</div>
                    {
                        togOpenorClose(responseTog)
                    }
                </div>
                <div className={` ${responseTog ? 'showInfo' : 'hideInfo'}`}>
                    <div className='com-content'>
                        <div className='ver-title'>返回头</div>
                        {showUI(showResHeader(oResponse),showResHeader(cResponse))}
                        <div className='ver-title'>返回结果</div>
                        {showUI(showResResult(oResponse),showResResult(cResponse))}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default observer(CompareVersion);
