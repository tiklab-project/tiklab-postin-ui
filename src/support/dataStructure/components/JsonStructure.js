
import React, {  useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Space, Table, Empty, Popconfirm} from 'antd';

import emptyImg from "../../../assets/img/empty.png";
import JsonStructureEdit from "./JsonStructureEdit";
import ToggleSchema from "../../../common/jsonSchema/ToggleSchema";
import jsonParamDSStore from "../store/JsonParamDSStore";
/**
 * json数据结构
 */
const JsonStructure = (props) => {
    const {
        findJsonParamDS,
        deleteJsonParamDS,
        updateJsonParamDS,
        setSchemaData,
        schemaData,
    } = jsonParamDSStore;

    //表头
    const columns = [
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
        findJsonParamDS(dataStructureId).then(res=>{
            setSchemaData(JSON.parse(res.jsonText))
        })

    },[])



    return (
        <ToggleSchema
            data={schemaData}
            schemaData={schemaData}
            setSchemaData={setSchemaData}
            deep={0}
            parent={schemaData}
            root={true}
            updateFn={updateJsonParamDS}
            httpId={dataStructureId}
            resultId={dataStructureId}
        />

    );
}


export default observer(JsonStructure);
