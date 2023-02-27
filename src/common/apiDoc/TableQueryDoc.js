import React from "react";
import {Checkbox, Table} from "antd";
import ExSelect from "../ExSelect";
import {mockValueDictionary} from "../dictionary/dictionary";

const TableQueryDoc = (props) =>{
    const {dataSource} = props;

    const columns=[
        {
            title: '参数名称',
            dataIndex: 'paramName',
            width:  "25%",
            editable: true,
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
                        <div>Query参数</div>
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

export default TableQueryDoc;