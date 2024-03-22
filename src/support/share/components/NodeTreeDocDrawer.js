import React, {useState} from "react";
import {observer} from "mobx-react";
import {FolderOpenOutlined, FolderOutlined} from "@ant-design/icons";
import apxMethodStore from "../../../api/http/definition/store/ApxMethodStore";
import {TextMethodType} from "../../../common/MethodType";
import {Tree} from "antd"
import wsStore from "../../../api/ws/ws/store/WSStore";

const { TreeNode } = Tree;


/**
 *文档中使用的目录树
 */
const NodeTreeDocDrawer = (props) =>{
    const { treeList,setApiData,setWsData,setNodeType } = props;
    const { findApxMethod } = apxMethodStore;
    const {findWSApi} = wsStore
    const [expandedKeys, setExpandedKeys] = useState([]);

    /**
     *  保存分类id，跳往分类页
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
                let res = await findApxMethod(item.id);
                setApiData(res)
                break;
            case "ws":
                setNodeType(item.type)
                let info =  await findWSApi(item.id)
                setWsData(info)
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

export default observer(NodeTreeDocDrawer);




