import React from "react";
import { Table} from "antd";

const TableHeaderShare = (props) =>{
    const {dataSource} = props;

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
            // width: '20%',
            dataIndex: 'desc',
            editable: true,
        }
    ]

    return(
        <>
            {
                dataSource&&dataSource.length>0
                    ?<div className={"share-request-item"}>
                        <div>Header参数</div>
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

export default TableHeaderShare;