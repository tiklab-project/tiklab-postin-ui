/**
 * @description：
 * @date: 2021-07-29 17:53
 */

import React, {  useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space, Table, Empty, Popconfirm} from 'antd';

import emptyImg from "../../../../assets/img/empty.png";
import JsonStructureEdit from "./jsonStructureEdit";

const JsonStructure = (props) => {
    const { jsonParamDSStore, } = props;
    const {
        findJsonParamDSListTree,
        deleteJsonParamDS,
        jsonParamDSList
    } = jsonParamDSStore;

    //表头
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width: '20%',
            editable: true,
        },
        {
            title: '数据类型',
            width: '10%',
            dataIndex: 'dataType',
        },
        {
            title: '必须',
            dataIndex: 'required',
            width: '10%',
            render:(text,record) =>text?"是":"否"
        },
        {
            title: '说明',
            width: '20%',
            dataIndex: 'description',
            editable: true,

        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record, index) =>(
                <Space size={"large"}>
                    <JsonStructureEdit
                        type={"edit"}
                        name={"编辑"}
                        jsonParamDSStore={jsonParamDSStore}
                        dataStructureId={dataStructureId}
                        dataItemId={record.id}
                    />

                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteJsonParamDS(record.id).then(()=> findJsonParamDSListTree(dataStructureId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <svg className="icon-s edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>
                    {
                        record.dataType==="object"
                            ?
                            <JsonStructureEdit
                                type={"add"}
                                icon={true}
                                jsonParamDSStore={jsonParamDSStore}
                                dataStructureId={dataStructureId}
                                dataItemId={record.id}
                            />
                            :null
                    }

                </Space>
            )
        }
    ]

    const dataStructureId = localStorage.getItem("dataStructureId")
    useEffect(()=>{
        findJsonParamDSListTree(dataStructureId);
    },[])


    return (
        <div className={"structure-item-list"}>
            <div className={"structure-item-list-header"}>
                <JsonStructureEdit
                    type={"add"}
                    btn={"btn"}
                    name={"添加"}
                    jsonParamDSStore={jsonParamDSStore}
                    dataStructureId={dataStructureId}
                />
            </div>

            <Table
                columns={columns}
                dataSource={jsonParamDSList}
                rowKey={record => record.id}
                pagination={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{ height: 120 }}
                        description={<span>暂无模型</span>}
                        image={emptyImg}
                    />,
                }}
            />
        </div>

    );
}


export default inject('jsonParamDSStore')(observer(JsonStructure));
