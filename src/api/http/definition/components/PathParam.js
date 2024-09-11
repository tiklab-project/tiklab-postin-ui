import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {Checkbox, Popconfirm, Space} from 'antd';
import pathParamStore from "../store/PathParamStore";
import {ExTable} from "../../../../common/EditTable";
import IconCommon from "../../../../common/IconCommon";
import DataTypeSelect from "../../../../common/DataTypeSelect";

/**
 * 定义
 * http
 * 请求头的可编辑表格
 */
const PathParam = (props) =>{
    const {
        findPathParamList,
        deletePathParam,
        createPathParam,
        updatePathParam,
        pathParamList,
        setList,
        dataLength,
    } = pathParamStore;

    const [dataSource,setDataSource] = useState([]);
    const apiId = localStorage.getItem('apiId');

    useEffect( ()=>{
        findPathParamList({apiId:apiId}).then(res=>setDataSource(res));
    },[dataLength])

    //表头
    let columns= [
        {
            title: '参数名称',
            dataIndex: 'name',
            width:  "20%",
            editable: true,
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
            title: '数据类型',
            width: 120,
            dataIndex: 'dataType',
            render: (text, record)=>(
                <DataTypeSelect
                    defaultValue={record.dataType}
                    handleSave={handleSave}
                    rowData={record}
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

    /**
     * 表格checked
     */
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

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        let data = {
            id:"InitNewRowId",
            "name":null,
            "value":null,
            "required":1,
            "desc":null
        }
        handleSave(data)

        //新行隐藏后面操作按钮
        setNewRowAction(false)
    }

    const [newRowAction, setNewRowAction] = useState(false);

    /**
     * 表格里的操作列展示
     */
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
                    onConfirm={() => deletePathParam(record.id).then(() => {
                        findPathParamList({apiId:apiId}).then(res=>{
                            setDataSource(res)
                        })
                    })}
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

    /**
     * 本地编辑的值和返回的值比较，不想同的会显示更新按钮
     */
    const updateView = (record,data)=>{
        return data&&data.map((item) => {
            return (
                item.id === record.id
                ?<>
                    {
                        item.name === record.name
                        && item.dataType === record.dataType
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

    /**
     * 添加
     */
    const onCreated = (values) => {
        if(Object.keys(values).length === 1){
            return
        }else {
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;

            values.apiId = apiId

            createPathParam(values).then(() => {
                findPathParamList({apiId:apiId}).then(res=>{
                    setDataSource(res)
                })
            })
        }

        setNewRowAction(false)
    }

    /**
     * 更新
     */
    const upData = (value) => {
        updatePathParam(value).then(() => {
            findPathParamList({apiId:apiId}).then(res=>{
                setDataSource(res)
            })
        })
    }

    /**
     * 保存数据
     */
    const handleSave = (row) => {
        const newData = pathParamList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)

        //如果是新行 操作 显示操作按钮
        if(row.id==="InitNewRowId"){
            newRowKeyDown()
        }
    };

    /**
     *  当新行按键按下的时候显示后面的操作按钮
     */
    const newRowKeyDown = () => {
        document.addEventListener('keydown', (e) =>{
            setNewRowAction(true)
        });
    };


    return (
        <>
            <div style={{margin:"8px 0"}}><span  className={"ws-param-title"}>Path参数</span></div>
            <ExTable
                columns={columns}
                dataSource={pathParamList}
                handleSave={handleSave}
            />
        </>

    );
}

export default observer(PathParam);




