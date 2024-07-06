import "./envStyle.scss"
import React, {useEffect, useState} from 'react';
import { observer } from "mobx-react";
import { Space, Popconfirm, Modal} from 'antd';
import {ExTable} from "../../../common/EditTable";
import environmentStore from "../store/environmentStore";
import IconCommon from "../../../common/IconCommon";

/**
 * 环境管理
 */
const EvnMana = (props) => {
    const {
        findEnvironmentList,
        environmentList,
        deleteEnvironment,
        createEnvironment,
        updateEnvironment,
        setList,
        dataLength,
        addNewList
    } = environmentStore;

    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            width: '40%',
            editable: true,
        },
        {
            title: "环境地址",
            dataIndex: "url",
            key: "url",
            width: '40%',
            editable: true,
        },
        {
            title: "操作",
            key: "action",
            width: '20%',
            render: (text, record) =>(operation(record,dataSource))
        },
    ]

    const [dataSource,setDataSource] = useState([]);
    const workspaceId = localStorage.getItem("workspaceId")

    useEffect(()=> {
        findList()
    },[dataLength])

    const findList = () =>{
        findEnvironmentList({workspaceId:workspaceId}).then(list=>setDataSource(list));
    }
    /**
     *  表格里的操作
     */
    const operation = (record,data) => {
        if(record.id === 'environmentInitRow'){
            return <IconCommon
                icon={"btn_confirm"}
                className="icon-s table-edit-icon"
                onClick={() => onCreated(record)}
            />
        }else{
            return <Space key={record.id}>
                {
                    updateView(record,data)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => {
                        deleteEnvironment(record.id).then(()=>findList())
                    }}
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
                            && item.url === record.url
                                ? null
                                :  <IconCommon
                                    icon={"btn_confirm"}
                                    className="icon-s table-edit-icon"
                                    onClick={() => upData(record)}
                                />
                        }
                    </>
                    :null
            )
        })
    }

    /**
     * 更新
     */
    const upData = (value) => {
        updateEnvironment(value).then(() => findList())
    }

    /**
     * 添加
     */
    const onCreated =  (values) => {
        if(Object.keys(values).length > 1&&values.name){
            // 创建新行的时候自带一个id，所以删了，后台会自行创建id
            delete values.id;
            values.workspaceId=workspaceId;
            createEnvironment(values).then(()=>{
                findList()
            })
        }
    }

    /**
     * 单元格保存数据
     */
    const handleSave = (row) => {
        const newData = environmentList;
        const index = newData.findIndex((item) => row.id === item.id);
        newData.splice(index, 1, { ...newData[index], ...row });
        setList(newData)
    };

    /**
     * 添加行
     */
    const addNewRow = () =>{

        let arr = environmentList.filter(item=> item.id==="environmentInitRow")

        if(arr&&arr.length===1){
            return
        }

        const newData = {id: "environmentInitRow"};
        const  dataSource = [...environmentList, newData]
        addNewList(dataSource)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    /**
     * 展示弹框
     */
    const showModal = () => {
        setIsModalVisible(true);
    };

    /**
     * 收起弹框
     */
    const handleOk = () => {
        setIsModalVisible(false);
    };

    /**
     * 收起弹框
     */
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return(
        <>
            <a  style={{"color":"#00adff","cursor":"pointer","margin":"0 0 0 20px"}} onClick={showModal}> 环境设置</a>
            <Modal
                title="环境管理"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                width={800}
            >
                <div  style={{padding:5}} className={"env-editable"}>
                    <ExTable
                        dataSource={environmentList}
                        columns={columns}
                        handleSave={handleSave}
                    />
                    <div className={"api-status-add-box"} onClick={addNewRow}>
                        <div >  新 增  </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default observer(EvnMana);
