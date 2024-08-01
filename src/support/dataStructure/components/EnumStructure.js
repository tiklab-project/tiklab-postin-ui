
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space,  Popconfirm, Table, Empty} from 'antd';
import EnumStructureEdit from "./EnumStructureEdit";
import enumParamDSStore from "../store/EnumParamDSStore";
/**
 * 枚举结构 可编辑表格
 */
const EnumStructure = (props) =>{
    const {
        findEnumParamDSList,
        deleteEnumParamDS,
        enumParamDSList,
    } = enumParamDSStore;

    //表头
    let columns= [
        {
            title: '属性名',
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
            render:(text) =>text?"是":"否"
        },
        {
            title: '说明',
            width: '20%',
            dataIndex: 'description',
            editable: true,
        },
        {
            title: '操作',
            width: '10%',
            dataIndex: 'operation',
            render: (text, record) =>(
                <Space size={"large"}>
                    <EnumStructureEdit
                        type={"edit"}
                        name={"编辑"}
                        enumParamDSStore={enumParamDSStore}
                        dataStructureId={dataStructureId}
                        dataItemId={record.id}
                    />

                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteEnumParamDS(record.id).then(()=> findEnumParamDSList(dataStructureId))}
                        okText='确定'
                        cancelText='取消'
                    >
                        <svg className="icon-s edit-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-shanchu3`} />
                        </svg>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const dataStructureId = localStorage.getItem("dataStructureId")

    useEffect( ()=>{
        findEnumParamDSList(dataStructureId)
    },[])


    return (
        <div className={"structure-item-list"}>
            <div className={"structure-item-list-header"}>
                <EnumStructureEdit
                    type={"add"}
                    btn={"btn"}
                    name={"添加"}
                    enumParamDSStore={enumParamDSStore}
                    dataStructureId={dataStructureId}
                />
            </div>

            <Table
                columns={columns}
                dataSource={enumParamDSList}
                rowKey={record => record.id}
                pagination={false}
                locale={{
                    emptyText: <Empty
                        imageStyle={{ height: 100 }}
                        description={<span>暂无模型</span>}
                    />,
                }}
            />
        </div>
    );
}


export default observer(EnumStructure);
