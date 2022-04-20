/**
 * @description：
 * @date: 2021-07-23 10:37
 */
import React from "react";
import {Table} from "antd";

const headerName = {
    title: '标签',
    dataIndex: 'headerName',
    width: '18%',
    align:'center'
}

const paramName = {
    title: '标签',
    dataIndex: 'paramName',
    width: '18%',
    align:'center',
}

const formjsonParamName ={
    title: '参数名称',
    dataIndex: 'paramName',
    width: '18%',
    align:'center',
}

const jsonres =  {
    title: '参数名称',
    dataIndex: 'propertyName',
    width: '18%',
    align:'center',
}

const required = {
    title: '必须',
    dataIndex: 'required',
    width: '8%',
    align:'center',
    render:(text,record) =>  (
        record.required === 1 ? '是' : '否'
    )
}

const dataType = {
    title: '数据类型',
    width: '10%',
    dataIndex: 'dataType',
    align:'center',
}

const desc = {
    title: '说明',
    width: '18%',
    dataIndex: 'desc',
    align:'center',
}

const eg = {
    title: '示例',
    width: '20%',
    dataIndex: 'eg',
    align:'center',
}

const headerParam = [headerName,required,desc,eg]

const queryParam = [paramName,dataType,required,desc,eg]

const formParam = [formjsonParamName,dataType,required,desc,eg]

const jsonParam = [formjsonParamName,dataType,required,desc,eg]

const headerResponse =  [headerName,required,desc,eg]

const jsonResponse = [jsonres,dataType,required,desc,eg]


const ExTable = (props) => {
    const {columns,dataSoure} = props;
    return (
        <Table
            pagination={false}
            dataSource={dataSoure}
            columns={columns}
            rowKey = {record => record.id}
        />
    )
}

export {
    headerParam,
    queryParam,
    formParam,
    jsonParam,
    headerResponse,
    jsonResponse,
    ExTable
}
