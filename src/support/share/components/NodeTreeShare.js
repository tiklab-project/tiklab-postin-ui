import React, {useEffect, useState} from 'react';
import {FolderOpenOutlined, FolderOutlined} from '@ant-design/icons';
import {TextMethodType} from "../../../common/MethodType";
import {observer} from "mobx-react";
import {Axios} from "thoughtware-core-ui";
import {Tree} from "antd";
const { TreeNode } = Tree;

/**
 * 分享页中 目录导航
 */
const NodeTreeShare = (props) => {
    const {setApiData,setWsData,setNodeType,treeList} = props;

    const [expandedKeys, setExpandedKeys] = useState([]);

    /**
     *  点击目录
     */
    const onClick = async (item) =>{
        switch (item.type){
            case 'category':
                //点击目录展开收缩
                let key = item.id
                const nextExpandedKeys = expandedKeys.includes(key)
                    ? expandedKeys.filter(k => k !== key)
                    : [...expandedKeys, key];
                setExpandedKeys(nextExpandedKeys);

                break;
            case "http":
                setNodeType(item.type)
                let param = new FormData()
                param.append("id",item.id)
                let res = await Axios.post(`/share/findHttpApi`,param)
                setApiData(res.data)
                break;
            case "ws":
                setNodeType(item.type)
                let wsParam = new FormData()
                wsParam.append("id",item.id)
                let wsInfo = await Axios.post(`/share/findWSApi`,wsParam)
                setWsData(wsInfo.data)
                break;
        }
    }


    const renderTreeNodes = (data) => {
        return data && data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode
                        key={item.id}
                        title={
                            <div
                                className="node-title"
                                onClick={() => onClick(item)}
                            >
                                {item.name}
                            </div>
                        }
                        icon={({ expanded }) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />)}
                        dataRef={item}
                    >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    key={item.id}
                    title={
                        <div
                            className={"node-title"}
                            onClick={() => onClick(item)}
                        >
                            {item.name}
                        </div>
                    }
                    icon={getIcon(item.type, item.methodType)}
                    dataRef={item}
                />
            );
        });
    };

    const getIcon = (type, methodType) => {
        if (type === 'category') {
            return <FolderOutlined />;
        } else if (type === 'ws') {
            return <span style={{ color: "#0070ff" }} className={"requestType"}>{type.toUpperCase()}</span>;
        } else if (type === 'http') {
            return <TextMethodType type={methodType} />;
        }
    };

    return(
        <Tree
            showIcon
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            defaultExpandAll={true}
        >
            {renderTreeNodes(treeList)}
        </Tree>
    )
}


export default observer(NodeTreeShare);
