import React, {useEffect, useState} from "react";
import {Row, Col, Table, Empty, Space, Input} from "antd";
import shareStore from "../store/ShareStore";
import HideDelete from "../../../api/common/hideDelete/HideDelete";
import MenuSelectCommon from "../../../common/menuSelect/MenuSelectCommon";
import ShareModal from "./ShareModal";
import PaginationCommon from "../../../common/pagination/Page";

const ShareList = () =>{
    const {findSharePage,deleteShare} =shareStore

    const [loading, setLoading] = useState(true);
    const workspaceId = localStorage.getItem("workspaceId")
    const [dataList, setDataList] = useState([]);
    const [selectTab, setSelectTab] = useState(null);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState();
    const [pageSize] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect( ()=>{
        findPage();
    },[])

    const findPage =  (params) =>{
        setLoading(true)
        let param = {
            pageParam: {
                pageSize: pageSize,
                currentPage:1
            },
            workspaceId:workspaceId,
            ...params
        }
        findSharePage(param).then((res)=>{
            setTotalPage(res.totalPage);
            setTotalRecord(res.totalRecord)
            setDataList(res?.dataList)
            setLoading(false)
        })
    }

    const columns = [
        {
            title: "名称",
            dataIndex: ["node","name"],
            key: "name",
            width: '25%',
        },
        {
            title: "类型",
            dataIndex: "targetType",
            key: "targetType",
            width: '10%',
            render: (text, record) =>(showType(text))
        },
        {
            title: '可见',
            dataIndex: "visibility",
            key: "visibility",
            width: '20%',
            render: (text, record) =>(text===0?"公开":"私密")
        },
        {
            title: '创建时间',
            dataIndex: "createTime",
            key: "createTime",
            width: '20%',
        },
        {
            title: `操作`,
            key: "action",
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <ShareModal
                        targetId={record.targetId}
                        targetType={record.targetType}
                        icon={true}
                        targetName={record?.node?.name}
                    />

                    <HideDelete deleteFn={() =>deleteFn(record.id)}/>
                </Space>
            ),
        },
    ]

    const showType = (type) =>{
        if(type==="category")return "目录"
        if(type==="api")return "接口"
    }

    /**
     *  删除
     */
    const deleteFn=(id)=>{
        deleteShare(id).then(()=> {findPage()})
    }

    //空间筛选列表
    const items = [
        {
            title: '所有',
            key: null,
        },
        {
            title: '目录',
            key: `category`,
        },
        {
            title: '接口',
            key: `api`,
        }
    ];

    const selectMenu = async (item) =>{
        await findPage({targetType:item.key})
        setSelectTab(item.key)
    }

    /**
     * 分页
     */
    const onTableChange = (current) => {
        setCurrentPage(current)
        const newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: current
            },
        }

        findPage(newParams)
    }


    return(
        <Row style={{height:"100%",overflow:"auto"}}>
            <Col
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 18, offset: 3 }}
                xll={{ span: 16, offset: 4 }}
            >
                <div style={{padding:"10px 0",fontWeight:"bold"}}>分享</div>
                <MenuSelectCommon
                    items={items}
                    selectItem={selectTab}
                    selectKeyFun={selectMenu}
                />
                <div className={"pi-list-box"}>
                    <Table
                        columns={columns}
                        dataSource={dataList}
                        rowKey={record => record.id}
                        pagination={false}
                        loading={loading}
                        locale={{
                            emptyText: !loading
                                ?<Empty
                                    imageStyle={{height: 100}}
                                    description={<span>暂无空间</span>}
                                />
                                :<div style={{height: 100}}/>,
                        }}
                    />
                </div>
                <PaginationCommon
                    currentPage={currentPage}
                    totalPage={totalPage}
                    changePage={onTableChange}
                    totalRecord={totalRecord}
                    findPage={findPage}
                />
            </Col>
        </Row>
    )
}

export default ShareList;