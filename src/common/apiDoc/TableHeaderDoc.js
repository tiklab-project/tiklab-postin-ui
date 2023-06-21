import React from "react";
import { Table} from "antd";

/**
 * 文档
 * 头部
 */
const TableHeaderDoc = (props) =>{
    const {dataSource,isResponse} = props;

    const columns=[
        {
            title: '参数名称',
            dataIndex: 'headerName',
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
            title: '说明',
            dataIndex: 'desc',
            editable: true,
        }
    ]

    return(
        <>
            {
                dataSource&&dataSource.length>0
                    ?<div className={"share-request-item"}>
                        <div>{isResponse?"响应头":"Header参数"}</div>
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

export default TableHeaderDoc;