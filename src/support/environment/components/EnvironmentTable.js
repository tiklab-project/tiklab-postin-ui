import React, {useEffect,useState} from 'react';
import { observer } from "mobx-react";
import {  Popconfirm, Space, Table} from 'antd';
import environmentStore from "../store/environmentStore";
import EnvironmentEdit from "./EnvironmentEdit";
import DetailHeader from "../../../common/DetailHeader";
import IconBtn from "../../../common/iconBtn/IconBtn";
import IconCommon from "../../../common/IconCommon";

/**
 * 点击左侧导航栏目录，查看的所在目录中的接口列表
 */
const EnvironmentTable = (props) => {
    const {
        findEnvironmentList,
        deleteEnvironment,
        createEnvironment,
        updateEnvironment,
    } = environmentStore;


    const columns = [
        {
            title: "环境名称",
            dataIndex: "name",
            key: "name",
            width: '30%',
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
            title: '创建时间',
            dataIndex: "createTime",
            width: '20%',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (text, record) =>(
                <Space  >
                    <EnvironmentEdit envData={record} findList={findList}/>

                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteEnvironment(record.id).then(()=>findList())}
                        okText='确定'
                        cancelText='取消'
                    >
                        <IconCommon
                            icon={"shanchu3"}
                            className="icon-s table-edit-icon"
                        />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const workspaceId = localStorage.getItem('workspaceId');

    const [envList, setEnvList] = useState([]);
    useEffect(async ()=>{
        findList()
    },[])

    const findList = () =>{
        findEnvironmentList({workspaceId:workspaceId}).then(list=>setEnvList(list));
    }


    return(
        <div className={"ws-setting-flex"}>
            <div className={"ws-setting-box"}>
                <DetailHeader
                    left={
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                        }}>
                            <span>环境设置</span>
                        </div>
                    }
                    right={
                        <EnvironmentEdit type={"add"} findList={findList}/>
                    }
                />
                <div className={"pi-list-box"}>
                    <Table
                        dataSource={envList}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                </div>

            </div>
        </div>

    )
}

export default observer(EnvironmentTable);

