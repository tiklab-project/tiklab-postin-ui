import React, {useState} from 'react';
import { observer, inject } from "mobx-react";
import ExSelect from "../../../common/exSelect";
import {headerParamDictionary} from "../../../common/dictionary/dictionary";
import {uuid} from "../../../../common/utils/createId";
import {ExTable} from "../../../common/tableCommon/components/tableCommon";
import IconCommon from "../../../common/iconCommon";
import {toJS} from "mobx";

// 请求参数的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderTestStore } = props;

    const {
        saveList,
        addNewList,
        deleteList,
        requestHeaderTestList,
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
                        record.id==="InitNewRowId"
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

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [newRowAction, setNewRowAction] = useState(false);
    const [hasInitNewRowId, setHasInitNewRowId] = useState(false);



    // 保存数据
    const handleSave = (row) => {
        let newData = toJS(requestHeaderTestList);
        let index = newData.findIndex((item) => row.id === item.id);

        if(row.id==="InitNewRowId"){
            row.id=uuid()
            setHasInitNewRowId(true)
        }

        newData.splice(index, 1, { ...newData[index], ...row });

        saveList(newData)

       if(hasInitNewRowId){
           newRowKeyDown()
           setHasInitNewRowId(false)
       }

    };


    //当新行按键按下的时候显示后面的操作按钮
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            handleAdd()
        });
    };

    const handleAdd = () => {
        let newData = {id: "InitNewRowId"};
        let dataSource = [...requestHeaderTestList, newData]

        addNewList(dataSource)
    };




    const onSelectChange = (newSelectedRowKeys,list) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('list: ', list);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
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
