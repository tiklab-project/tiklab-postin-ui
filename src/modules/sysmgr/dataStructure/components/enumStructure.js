/**
 * @description：
 * @date: 2021-07-29 17:52
 */
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Space,  Popconfirm, Table, Empty} from 'antd';
import emptyImg from "../../../../assets/img/empty.png";
import JsonStructureEdit from "./jsonStructureEdit";
import EnumStructureEdit from "./enumStructureEdit";

const EnumStructure = (props) =>{
    const { enumParamDSStore } = props;
    const {
        findEnumParamDSList,
        deleteEnumParamDS,
        enumParamDSList,
    } = enumParamDSStore;

    //表头
    let columns= [
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
                    imageStyle={{ height: 120 }}
                    description={<span>暂无模型</span>}
                    image={emptyImg}
                />,
            }}
        />

        </div>
    );
}


export default inject('enumParamDSStore')(observer(EnumStructure));
