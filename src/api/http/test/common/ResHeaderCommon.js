import React from "react";
import {Table} from "antd";


const ResHeaderCommon = (props) => {
    const {headers} = props;


    let column = [
        {
            title:` 属性`,
            dataIndex: "key",
            key: "key",
            width:"20%",
        },
        {
            title: `值`,
            dataIndex: "value",
            key: "value",
        },
    ]


    return(
        <Table
            dataSource={headers}
            pagination={false}
            rowKey={record => record.id}
            columns={column}
        />
    )

}

export default ResHeaderCommon;