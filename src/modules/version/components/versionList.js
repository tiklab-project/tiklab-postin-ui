import React, {useState} from "react";
import {Drawer, Select, Table} from "antd";
import {
    compareVersion,
    findVersionList
} from "../api/versionApi"

const VersionList = (props) =>{


    const [versionList, setVersionList] = useState([]);
    const [visible, setVisible] = useState(false);

    const methodId = localStorage.getItem('apxMethodId');

    const columns = [
        {
            title: '版本',
            dataIndex: "version",
            width: '25%',
        },
        {
            title: '时间',
            dataIndex: 'createTime',
            width: '20%',
        },{
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record) =>(
                <a onClick={()=>compare(record)}>对比</a>
            )
        }
    ]

    const showDrawer = () => {
        let param = {apiUid:methodId}
        findVersionList(param).then(res=>{
            if(res.code===0){
                setVersionList(res.data)
            }
        })

        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const compare= (recode)=>{
        let param={
            currentId:methodId,
            versionId:recode.id
        }
        localStorage.setItem("VERSION_INFO",JSON.stringify(param))
        // compareVersion(param).then(
            props.history.push("/version")
        // )


    }


    return(
        <>
            <a onClick={showDrawer}>版本管理</a>
            <Drawer
                title="动态详情"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={600}
            >
                <Table
                    dataSource={versionList}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={false}
                />

            </Drawer>
        </>
    )
}

export default VersionList;