import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Table, Space, Popconfirm, Button,message} from 'antd';
import TestCaseEdit from "./testCaseEdit"
import './testCase.scss'
import {sendTestDataProcess} from "../../../common/request/sendTestCommon";
import {toJS} from "mobx";
import TestcaseTableInstance from "../../testInstance/components/testcaseTableInstance";
import axios from "axios";
import HistoryList from "../../testInstance/components/histroyList";

const TestCaseList = (props) => {
    const { testCaseStore,instanceStore , environmentStore} = props;
    const {
        findTestCaseList,
        deleteTestCase,
        testCaseList,
        getResponseInfo,
        getRequestInfo,
        getTime
    } = testCaseStore;
    const { createInstance  } = instanceStore;
    const {testEnvUrl} = environmentStore;
    const column = [
        {
            title: '用例名称',
            dataIndex: 'name',
            key: 'name',
            // align:'center',
            width:"30%",
            render:(text,record)=>(
                <a onClick = {()=>setLocalStorage(record.id)}>{text}</a>
            )
        },
        {
            title: '路径',
            dataIndex:['http','path'],
            // align:'center',
            key: 'method',
            width:"30%",
        },
        {
            title: '最近测试',
            dataIndex:"result",
            // align:'center',
            key: 'result',
            width:"20%",
            render: (text, record )=>(
                <>
                    {
                        showRecentTest(text)
                    }
                </>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            // align:'center',
            width:"15%",
            render: (text, record )=>(
                <Space  size="middle">

                    <TestCaseEdit type="edit" name={"编辑"}  testcaseId={record.id} {...props} />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestCase(record.id).then(()=>findTestCaseList(methodId))}
                        okText='确定'
                        cancelText='取消'
                        placement="topRight"
                    >
                        <svg className="icon-s edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>
                    <HistoryList icon={true} testcaseId={record.id}/>
                </Space>
            )
        },
    ]

    const methodId =  localStorage.getItem('apxMethodId');
    const [selectTestList,setSelectTestList] = useState([]);
    const [caseLength, setCaseLength] = useState();

    useEffect(()=>{
        findTestCaseList(methodId).then(list=>{
            setCaseLength(list.length)
        });
    },[methodId]);

    const showRecentTest = (text) =>{
        switch (text) {
            case 1:
                return "成功"
            case 0:
                return "失败"
            case -1:
                return "未测试"
            default:
                return "未测试"
        }
    }

    const setLocalStorage = (id) => {
        localStorage.setItem('testCaseId',id)
        props.history.push('/workspace/apis/detail/interface/testcasedetail')
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log( 'selectedRows: ', selectedRows);
            setSelectTestList(selectedRows)
        }
    };

    //列表中单次测试
    const singleTest = (item)=>{
        if(!testEnvUrl){
            return  message.warning("请选择环境")
        }

        let testData = {
            "getTime":getTime,
            "getRequestInfo":getRequestInfo,
            "getResponseInfo":getResponseInfo,
            "belongId":item.id,
            "createInstance":createInstance,
            "method":item.methodType,
            "baseUrl":testEnvUrl,
            "path":item.path,
            "headerList":item.requestHeaderCaseList,
            "queryList":item.queryParamCaseList,
            "bodyType":item.requestBodyCase.bodyType,
            "formDataList":item.formParamCaseList,
            "formUrlencoded":item.formUrlencodedCaseList,
            "jsonList":item.jsonParamCaseList,
            "rawParam":item.rawParamCase,
            "assertList":item.assertCaseList,
            "preScript":item.preScriptCase,
            "afterScript":item.afterScriptCase,
        }
        sendTestDataProcess(testData)
    }

    //批量测试
    const batchTest = () =>{
        if(selectTestList.length>0){
            selectTestList.map(item=>{
                console.log(toJS(item))
                singleTest(item)
            })

        }else {
            message.warning("请选择用例")
        }
    }


    return(
        <div className={"content-box-center"}>
            <div >
                <div className='testCase-header'>
                    <span style={{lineHeight:"35px",fontSize:13}}>用例数:({caseLength})</span>
                    <TestCaseEdit  btn='btn' name="+添加用例" {...props}/>
                </div>
                <div className={"pi-list-box"}>
                    <Table
                        columns={column}
                        dataSource={testCaseList}
                        rowKey = {record => record.id}
                        // rowSelection ={{
                        //     ...rowSelection,
                        // }}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )

}

export default inject('testCaseStore',"instanceStore", "environmentStore")(observer(TestCaseList));
