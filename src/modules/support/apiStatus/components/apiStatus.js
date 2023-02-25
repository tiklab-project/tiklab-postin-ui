import React, { useEffect, useState} from 'react';
import { observer, inject } from "mobx-react";
import {Space, Popconfirm} from 'antd';
import BreadcrumbEx from "../../../common/breadcrumbEx";
import {ExTable} from "../../../common/editTable";
import ExSelect from "../../../common/exSelect";
import "./apiStatus.scss"

const ApiStatus = (props) => {
    const { apxMethodStatusStore } = props;
    const {
        findApiStatusList,
        apiStatusList,
        deleteApiStatus,
        createApiStatus,
        updateApiStatus,
        setList,
        dataLength,
        addNewList
    } = apxMethodStatusStore;

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width:"40%",
            editable: true,
        },
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
            width:"40%",
            render: (text, record)=>(
                <ExSelect
                    dictionary={["system","custom"]}
                    defaultValue={record.type}
                    handleSave={handleSave}
                    rowData={record}
                    dataIndex={'type'}
                />
            )
        },
        {
            title: "操作",
            key: "action",
            width:"20%",
            render: (text, record) => (operation(record,dataSource)),
        },
    ]

    const [dataSource,setDataSource] = useState([]);

    useEffect(()=> {
        findApiStatusList().then(res=>setDataSource(res));
    },[dataLength])

    // 表格里的操作
    const operation = (record,data) => {
        if(record.id === 'apiStatusInitRow'){
            return <a onClick={() =>onCreated(record)} >保存</a>
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteApiStatus(record.id)}
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
                                : <a onClick={() => upData(record)}>更新</a>
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
            createApiStatus(values);
        }
    }

    //更新
    const upData = (value) => {
        updateApiStatus(value).then(res => setDataSource(res))
    }

    // 单元格保存数据
    const handleSave = (row) => {
        const newData = apiStatusList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };



    const addNewRow = () =>{
        let arr = apiStatusList.filter(item=> item.id==="apiStatusInitRow")

        if(arr&&arr.length===1){
            return
        }
        const newData = {id: "apiStatusInitRow"};
        const  dataSource = [...apiStatusList, newData]
        addNewList(dataSource)

    }


    return(
        <div className={"page-center"}>
            <BreadcrumbEx list={[ "空间设置", "状态管理"]}/>
            <ExTable
                columns={columns}
                dataSource={apiStatusList}
                handleSave={handleSave}
            />
            <div className={"api-status-add-box"} onClick={addNewRow}>
                <div >  新 增  </div>
            </div>
        </div>
    )
}

export default inject('apxMethodStatusStore')(observer(ApiStatus));
