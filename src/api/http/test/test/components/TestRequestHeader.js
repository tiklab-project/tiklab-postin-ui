import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import ExSelect from "../../../../../common/ExSelect";
import {headerParamDictionary} from "../../../../../common/dictionary/dictionary";
import {uuid} from "../../../../../common/utils/createId";
import IconCommon from "../../../../../common/IconCommon";
import {ExTable} from "../../../../../common/EditTable";

/**
 * 测试页
 * 请求头
 */
const RequestHeader = (props) =>{
    const { requestHeaderTestStore } = props;

    const {
        saveList,
        deleteList,
        requestHeaderTestList,
        selectHeaderList,
        selectKeys
    } = requestHeaderTestStore;

    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width: '40%',
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                />
            )
        },{
            title: '参数值',
            width: '40%',
            dataIndex: 'value',
            editable: true,
        },{
            title: '操作',
            width: '150',
            fixed: 'right',
            dataIndex: 'operation',
            render: (text, record) =>(
                <>
                    {
                        Object.keys(record).length===1
                            ?null
                            :<IconCommon
                                icon={"shanchu3"}
                                className="icon-s table-edit-icon"
                                onClick={()=>deleteList(record.id)}
                            />
                    }

                </>

            )
        },
    ]


    /**
     * 保存数据
     */
    const handleSave =  (row) => {
        let newData = requestHeaderTestList;
        //获取当前行对应的下标
        let index = newData.findIndex((item) => row.id === item.id);
        //替换上一次录入的数据
        newData.splice(index, 1, { ...newData[index], ...row });

        //如果是最后一行，添加新行
        if(index===newData.length-1){
            let id = uuid();

            newData.push({id:id})
        }

        saveList(newData)
    };


    const onSelectChange = (newSelectedRowKeys,list) => {
        selectHeaderList(list)
    };

    const rowSelection = {
        defaultSelectedRowKeys:selectKeys,
        onChange: onSelectChange,
    };


    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>请求头参数</span></div>
            <ExTable
                columns={columns}
                dataSource={requestHeaderTestList}
                handleSave={handleSave}
                rowSelection={rowSelection}
            />
        </>

    );
}

export default inject('requestHeaderTestStore')(observer(RequestHeader));
