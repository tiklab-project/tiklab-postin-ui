import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Checkbox, Popconfirm, Space} from 'antd';
import {headerParamDictionary} from '../../../../common/dictionary/dictionary';
import ExSelect from "../../../../common/ExSelect";
import {ExTable} from '../../../../common/EditTable';
import IconCommon from "../../../../common/IconCommon";

// 请求头的可编辑表格
const RequestHeader = (props) =>{
    const { requestHeaderStore } = props;
    const {
        findRequestHeaderList,
        deleteRequestHeader,
        createRequestHeader,
        updateRequestHeader,
        requestHeaderList,
        setList,
        dataLength,
    } = requestHeaderStore;

    const [dataSource,setDataSource] = useState([]);
    const apxMethodId = localStorage.getItem('apxMethodId');

    useEffect( ()=>{
        findRequestHeaderList(apxMethodId).then(res=>setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'headerName',
            width:  "20%",
            render: (text, record)=>(
                <ExSelect
                    dictionary={headerParamDictionary}
                    defaultValue={record.headerName}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'headerName'}
                    setNewRowAction={setNewRowAction}
                />
            )
        },{
            title: '示例值',
            width:  "20%",
            dataIndex: 'value',
            editable: true,
        },{
            title: '必须',
            dataIndex: 'required',
            width: 50,
            align:"center",
            render:(text,record) =>  (
                <Checkbox
                    defaultChecked={record.required}
                    onChange={(value) => toggleChecked(value, record)}
                />
            )
        },{
            title: '说明',
            // width: '20%',
            dataIndex: 'desc',
            editable: true,
        },{
            title: '操作',
            width:  "20%",
            dataIndex: 'operation',
            fixed: 'right',
            render: (text, record) =>(operation(record,dataSource))
        }
    ]

    // 表格里checked
    const toggleChecked= (e,row)=> {
        let checked;
        if(e.target.checked){
            checked = 1
        }else{
            checked = 0
        }
        const data = {...row, required: checked}
        handleSave(data)
    }

    //取消
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "headerName":null,
            "value":null,
            "required":1,
            "desc":null
        }
        handleSave(data)

        //新行隐藏后面操作按钮
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);


    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'InitNewRowId'){
            return <div className={`${newRowAction?"newRow-action-show":"newRow-action-hidden"}`}>
                <Space>
                    <a onClick={() =>onCreated(record)}> 保存</a>
                    <a onClick={()=>onCancel()}> 取消</a>
                </Space>
            </div>

        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteRequestHeader(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <svg className="icon-s table-edit-icon" aria-hidden="true">
                        <use xlinkHref= {`#icon-shanchu3`} />
                    </svg>
                </Popconfirm>
            </Space>
        }
    }

    //本地编辑的值和返回的值比较，不想同的会显示更新按钮
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                ?<>
                    {
                        item.headerName === record.headerName
                        && item.required === record.required
                        && item.desc === record.desc
                        && item.value === record.value
                            ? null
                            : <IconCommon
                                icon={"btn_confirm"}
                                className={"icon-s table-edit-icon"}
                                onClick={()=>upData(record)}
                            />
                    }
                    </>
                :null
            )
        })
    }

    // 添加
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            createRequestHeader(values)
        }

        setNewRowAction(false)
    }

    //更新
    const upData = (value) => {
        updateRequestHeader(value).then(res => setDataSource(res))
    }

    // 单元格保存数据
    const handleSave = (row) => {
        const newData = requestHeaderList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            newRowKeyDown()
        }
    };

    //当新行按键按下的时候显示后面的操作按钮
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            setNewRowAction(true)
        });
    };


    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>请求头参数</span></div>
            <ExTable
                columns={columns}
                dataSource={requestHeaderList}
                handleSave={handleSave}
            />
        </>

    );
}

export default inject('requestHeaderStore')(observer(RequestHeader));
