import React from "react";
import {Space, Table, Tag} from "antd";

const TableFormUrlDoc = (props) =>{
    const {dataSource} = props;

    const columns=[
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width:  "25%",
        },{
            title: '示例值',
            width:  "25%",
            dataIndex: 'value',
        },{
            title: '必须',
            dataIndex: 'required',
            width: 50,
            align:"center",
            render:(text)=>text===1?"是":"否"
        },{
            title: '数据类型',
            width: 120,
            dataIndex: 'dataType',
        },{
            title: '说明',
            dataIndex: 'desc',

        }
    ]

    return(
        <>
            {
                dataSource&&dataSource.length>0
                    ?<div className={"share-request-item"}>
                        <Space><div>Body参数</div><Tag>x-www-form-urlencoded</Tag></Space>
                        <div className={"share-right-table"}>
                            <Table
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                                rowKey={record => record.id}
                                pagination={false}
                            />
                        </div>
                    </div>
                    :null
            }

        </>

    )
}

export default TableFormUrlDoc;