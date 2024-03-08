import React from 'react';
import {Select, Table} from 'antd';
import {assertCompare} from "../../../../common/dictionary/dictionary";
const {Option} = Select;

const AssertResponseCommon = (props) =>{
    const {assertList} = props;

    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            // align:'center',
            render:(text,record) =>  ( setSelectValue(record.source) ) 
        },
        {
            title: '属性',
            dataIndex: 'propertyName',
            width: '25%',
            // align:'center',
        },
        {
            title: '比较符',
            width: '15%',
            dataIndex: 'comparator',
            // align:'center',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.comparator}
                    allowClear
                    bordered={false}
                    style={{'width':"100%"}}
                    disabled={true}
                    suffixIcon={null}
                >
                    <Option value={assertCompare.EQUAL}> = </Option>
                    <Option value={assertCompare.GREATER_THAN}> &gt; </Option>
                    <Option value={assertCompare.LESS_THAN}> &lt; </Option>
                    <Option value={assertCompare.GREATER_THAN_EQUAL}> &gt;= </Option>
                    <Option value={assertCompare.LESS_THAN_EQUAL}> &lt;= </Option>
                </Select>
            )
        },
        {
            title: '值',
            width: '25%',
            dataIndex: 'value',
            // align:'center',
            
        },
        {
            title: '结果',
            width: '20%',
            dataIndex: 'result',
            // align:'center',
            render:(text,record) =>  ( setResult(record.result)) 
        }
    ]   

    const setSelectValue = (value) => {
        switch(value){
            case 1:
                return '状态码';
            case 2:
                return '响应头';
            case 3:
                return '响应体';           
        }
    }

    const setResult = (value) => {
        if(value === 1){
            return '成功'
        }else{
            return '失败'
        }
    }
   
    return (
        <Table
            pagination={false}
            dataSource={assertList}
            columns={columns}
            rowKey = {record => record.id}
        />
    ); 
}


export default AssertResponseCommon;
