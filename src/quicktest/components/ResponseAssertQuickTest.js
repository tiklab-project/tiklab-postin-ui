import React from 'react';
import { observer, inject } from "mobx-react";
import { Table } from 'antd';

/**
 * 快捷测试
 * 响应中断言
 */
const ResponseAssertQuickTest = (props) =>{
    const { quickTestStore } = props;
    const { assertResponse } = quickTestStore;

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
            render:()=>(<span>=</span>)
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
        <div>
            <Table
                pagination={false}
                dataSource={assertResponse}
                columns={columns}
                rowKey = {record => record.id}
            />
        </div>
    );
}




export default inject('quickTestStore')(observer(ResponseAssertQuickTest));