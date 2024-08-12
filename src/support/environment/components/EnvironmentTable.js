import React, {useEffect,useState} from 'react';
import { observer } from "mobx-react";
import {Col, Row, Space, Table} from 'antd';
import environmentStore from "../store/environmentStore";
import EnvironmentEdit from "./EnvironmentEdit";
import DetailHeader from "../../../common/DetailHeader";
import HideDelete from "../../../api/common/hideDelete/HideDelete";

/**
 * 点击左侧导航栏目录，查看的所在目录中的接口列表
 */
const EnvironmentTable = (props) => {
    const {
        findEnvironmentList,
        deleteEnvironment,
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

                    <HideDelete
                        deleteFn={() =>deleteEnvironment(record.id).then(()=>findList())}
                    />
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
        <Row>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "1" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className={"ws-setting-flex"}>
                    <DetailHeader
                        left={
                            <div style={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between",
                            }}>
                                <span>环境</span>
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
            </Col>
        </Row>
    )
}

export default observer(EnvironmentTable);

