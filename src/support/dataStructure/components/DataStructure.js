import React, {useEffect,useState} from 'react'
import {Col, Row, Input, Space, Table, Empty} from "antd";
import DataStructureEdit from "./DataStructureEdit";
import { observer} from "mobx-react";
import "./structureStyle.scss"
import DetailHeader from "../../../common/DetailHeader";
import {SearchOutlined} from "@ant-design/icons";
import dataStructureStore from "../store/DataStructureStore";
import HideDelete from "../../../api/common/hideDelete/HideDelete";
import {debounce} from "../../../common/commonUtilsFn/CommonUtilsFn";
import moment from "moment"
/**
 * @description：数据结构页
 * @date: 2021-07-29 09:54
 */
const DataStructure = (props) => {
    const {findDataStructureList,deleteDataStructure,dataStructureList} = dataStructureStore;

    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            width: '40%',
            render:(text,record)=> <span className={"link-text"} onClick = {()=>toModeDetail(record.id)}>{text}</span>,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: `类型`,
            dataIndex: "dataType",
            key: "dataType",
            width: '15%',
        },
        {
            title: `创建人`,
            dataIndex: "createUser",
            key: "user",
            width: '15%',
            render: (text, record) => (
                <div className={"ws-user-item"}>
                    {/*<Profile userInfo={record.createUser}/>*/}
                    <span>{record.createUser.nickname} </span>
                </div>
            )
        },
        {
            title: `创建时间`,
            dataIndex: "createTime",
            key: "time",
            width: '20%',
            render: (text) => moment(text, 'YYYY-MM-DD').format('YYYY-MM-DD'), // 格式化显示
            sorter: (a, b) => moment(a.createTime, 'YYYY-MM-DD').unix() - moment(b.createTime, 'YYYY-MM-DD').unix(), // 改进排序
        },
        {
            title: `操作`,
            key: "action",
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <DataStructureEdit
                        name={'编辑'}
                        type={"edit"}
                        icon={true}
                        dataStructureId={record.id}
                    />

                    <HideDelete
                        deleteFn={() =>deleteFn(record.id)}
                    />
                </Space>
            ),
        },
    ]

    const [loading, setLoading] = useState(false);
    let workspaceId= localStorage.getItem("workspaceId")

    useEffect(()=>{
        findPage()
    },[])

    /**
     *  删除
     */
    const deleteFn=(id)=>{
        deleteDataStructure(id).then(()=> {
            findPage()
        })
    }

    const findPage = async () =>{
        setLoading(true)
        let params = {workspaceId:workspaceId}
        await findDataStructureList(params)
        setLoading(false)
    }

    /**
     * 搜索
     */
    const onSearch = (e) => {
        let params = {
            name: e.target.value,
            workspaceId:workspaceId
        }
        findDataStructureList(params)
    }

    /**
     * 去往模型详情页
     */
    const toModeDetail = (id) =>{
        localStorage.setItem("dataStructureId",id);

        props.history.push("/workspace/structureDetail")
    }


    return(
        <Row style={{height:"100%"}}>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xll={{ span: 16, offset: 4 }}
            >
            <div className={"page-center"}>
                <DetailHeader
                    left={<span>数据结构</span>}
                    right={ <DataStructureEdit type={"add"} name={'+添加数据结构'}  /> }
                />


                <div className={"flex-box"}>
                    <div className={"flex-box structure-header-box"}>
                        <Input
                            prefix={<SearchOutlined style={{fontSize:"16px"}} />}
                            placeholder={`搜索名称`}
                            onPressEnter={onSearch}
                            onChange={debounce(onSearch,500) }
                            allowClear
                            className='search-input'
                        />
                    </div>
                </div>

                <div className={"pi-list-box"}>
                    <Table
                        columns={columns}
                        dataSource={dataStructureList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={loading}
                        locale={{
                            emptyText: !loading
                                ?<Empty
                                    imageStyle={{height: 100}}
                                    description={<span>暂无模型</span>}
                                />
                                :<div style={{height: 100}}/>,
                        }}
                    />
                </div>
            </div>
            </Col>
        </Row>
    )
}

export default observer(DataStructure);
