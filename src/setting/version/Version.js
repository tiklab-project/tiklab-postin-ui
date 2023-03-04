import React from "react";
import {Version as VersionCom} from "tiklab-licence-ui";
import {Table} from "antd";

/**
 * 版本
 */
const Version = (props) =>{
    const columns = [
        {
            title: '功能',
            dataIndex: 'function',
            key: 'function',
            width:"33.33%",
        },
        {
            title: '社区版',
            dataIndex: 'ce',
            key: 'ce',
            width:"33.33%",
            render:(text,recode)=> text?"√":""
        },
        {
            title: '企业版',
            dataIndex: 'ee',
            key: 'ee',
            width:"33.33%",
            render:(text,recode)=> text?"√":""
        }

    ];
    const data = [
        {
            key: '1',
            function: '设计 API',
            ce: 1,
            ee: 1,
        },{
            key: '2',
            function: 'API 文档',
            ce: 1,
            ee: 1,
        },
        {
            key: '3',
            function: '权限',
            ce: 1,
            ee: 1,
        },
        {
            key: '4',
            function: '插件',
            ce: 0,
            ee: 1,
        },{
            key: '5',
            function: '专属客户支持',
            ce: 0,
            ee: 1,
        },{
            key: '6',
            function: '帮助中心',
            ce: 1,
            ee: 1,
        },{
            key: '7',
            function: '支持 LDAP',
            ce: 0,
            ee: 1,
        },{
            key: '8',
            function: '支持钉钉',
            ce: 0,
            ee: 1,
        },{
            key: '9',
            function: '支持企业微信',
            ce: 0,
            ee: 1,
        },
    ];
    return(
        <VersionCom  bgroup={'postin'}>

            <div className={"version-function-box"}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </VersionCom>
    )
}

export default Version;