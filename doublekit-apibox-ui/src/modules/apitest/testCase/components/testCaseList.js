import React, {Fragment, useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import {Table, Space, Popconfirm, Button,message} from 'antd';
import TestCaseEdit from "./testCaseEdit"
import './testCase.scss'
import {sendTestDataProcess} from "../../common/sendTestCommon";
import {toJS} from "mobx";
import TestcaseTableInstance from "../../testInstance/components/testcaseTableInstance";

const TestCaseList = (props) => {
    const { testCaseStore,instanceStore } = props;
    const {
        findTestCasePage,
        deleteTestCase,
        testCaseList,
        getResponseInfo,
        getRequestInfo,
        getTime
    } = testCaseStore;
    const { createInstance  } = instanceStore;

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
            title: '请求路径',
            dataIndex: 'baseUrl',
            // align:'center',
            key: 'baseUrl',
            width:"20%",
        },
        {
            title: '路径',
            dataIndex:'path',
            // align:'center',
            key: 'method',
            width:"20%",
        },
        {
            title: '测试结果',
            dataIndex:"result",
            // align:'center',
            key: 'result',
            width:"15%",
            render: (text, record )=>(
                <>
                    <TestcaseTableInstance testcaseId={record.id}/>
                </>
            )
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align:'center',
            width:"15%",
            render: (text, record )=>(
                <Space  size="middle">
                    <a onClick={()=>singleTest(record)}>测试</a>
                    <div>
                        <TestCaseEdit type="编辑"  testcaseId={record.id} {...props} >编辑</TestCaseEdit>
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteTestCase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete" > 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    const methodId =  localStorage.getItem('apxMethodId');
    const [selectTestList,setSelectTestList] = useState([]);

    useEffect(()=>{
        findTestCasePage(methodId);
    },[methodId]);

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

    //批量测试
    const batchTest = () =>{
        if(selectTestList.length>0){
            selectTestList.map(item=>{
                console.log(toJS(item))
                let testData = {
                    "getTime":getTime,
                    "getRequestInfo":getRequestInfo,
                    "getResponseInfo":getResponseInfo,
                    "belongId":item.id,
                    "createInstance":createInstance,
                    "method":item.method.requestType,
                    "baseUrl":item.baseUrl,
                    "path":item.method.path,
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
            })

        }else {
            message.warning("请选择用例")
        }
    }

    //列表中单次测试
    const singleTest = (item)=>{
        let testData = {
            "getTime":getTime,
            "getRequestInfo":getRequestInfo,
            "getResponseInfo":getResponseInfo,
            "belongId":item.id,
            "createInstance":createInstance,
            "method":item.requestType,
            "baseUrl":item.baseUrl,
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

    return(
        <Fragment>
            <div className='testCase-header'>
                <Button onClick={batchTest}>批量测试</Button>
                <TestCaseEdit  btn='btn' type="添加用例" {...props}>添加用例</TestCaseEdit>
            </div>
            <Table
                columns={column}
                dataSource={testCaseList}
                rowKey = {record => record.id}
                rowSelection ={{
                    ...rowSelection,
                }}
            />
        </Fragment>
    )

}

export default inject('testCaseStore',"instanceStore")(observer(TestCaseList));
