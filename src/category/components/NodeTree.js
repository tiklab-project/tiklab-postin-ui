import React, {useState} from 'react';
import {Dropdown, Menu, Popconfirm, Space, Tree} from 'antd';
import {FolderOutlined, FolderOpenOutlined} from '@ant-design/icons';
import {useEffect} from "react";
import categoryStore from "../store/CategoryStore";
import {TextMethodType} from "../../common/MethodType";
import CategoryEdit from "./CategoryEdit";
import {ApxMethodEdit} from "../../api/http/definition";
import WSAdd from "../../api/ws/ws/components/WSAdd";
import {getUser} from "thoughtware-core-ui";
import {useHistory} from "react-router";
import {observer} from "mobx-react";

const { TreeNode } = Tree;


const NodeTree = (props) => {
    const { findNodeTree,apiRecent,categoryList,deleteNode } = categoryStore;


    let history = useHistory()
    const workspaceId = localStorage.getItem('workspaceId');
    const [expandedKeys, setExpandedKeys] = useState([]);



    useEffect(async ()=>{
        await findNodeTree({workspaceId:workspaceId})

    },[workspaceId])


    /**
     * 保存分类id，跳往分类页
     */
    const onClick = (item) =>{

        console.log("click----",item.type)
        switch (item.type){
            case 'category':
                //点击目录展开收缩
                let key = item.id
                const nextExpandedKeys = expandedKeys.includes(key)
                    ? expandedKeys.filter(k => k !== key)
                    : [...expandedKeys, key];
                setExpandedKeys(nextExpandedKeys);


                localStorage.setItem('categoryId',item.id);
                history.push('/workspace/apis/category');
                break;
            case "http":
            case "ws":
                //设置最近打开的接口
                let params = {
                    workspace:{id:workspaceId},
                    user:{id:getUser().userId},
                    apix:{id:item.id},
                }
                apiRecent(params)

                localStorage.setItem('apiId',item.id);
                if(item.type==="http"){
                    history.push('/workspace/apis/http/document');
                }else {
                    history.push('/workspace/apis/ws/document');
                }
        }
    }


    /**
     * 目录悬浮的操作项
     */
    const moreMenu = (id)=>(
        <Menu>
            <Menu.Item  key={1}>
                <CategoryEdit  name="编辑"  type="edit"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={2}>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteNode(id).then(()=> findNodeTree({workspaceId:workspaceId}))}
                    okText='确定'
                    cancelText='取消'
                >
                    <a>删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    /**
     * 目录悬浮的操作项
     */
    const addMenu = (id)=>(
        <Menu>
            <Menu.Item  key={1} >
                <ApxMethodEdit
                    name="新建接口"
                    type="add"
                    categoryItemId={id}
                    {...props}
                />
            </Menu.Item>
            <Menu.Item  key={2}>
                <WSAdd name="新建WebSocket接口" curCategoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={3}>
                <CategoryEdit name="新建目录" type="add"  categoryId={id}/>
            </Menu.Item>
        </Menu>
    );

    const categoryAct = (item) => {

        if(item.type==="category"){
            let id = item.id

            return (
                <div className={'category-action'}>
                    <div  className={"category-action-right"}>
                        <Dropdown overlay={(e)=>addMenu(id)} className={'category-action-more'}>
                        <span>
                            <svg className="icon-s edit-icon-nav" aria-hidden="true">
                                <use xlinkHref={`#icon-tianjia-`}/>
                            </svg>
                        </span>
                        </Dropdown>
                        <Dropdown overlay={()=>moreMenu(id)} className={'category-action-more'}>
                        <span>
                            <svg className="icon-s category-nav-item-icon" aria-hidden="true">
                                <use xlinkHref={`#icon-more`}/>
                            </svg>
                        </span>
                        </Dropdown>
                    </div>
                </div>
            )
        }else {
           return <span/>
        }
    }

    const renderTreeNodes = (data) => {
        return data && data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode
                        key={item.id}
                        title={
                            <div className="node-title">
                                <div
                                    className={"cate-node-name"}
                                    onClick={(e) => onClick(item)}
                                >
                                    {item.name}
                                </div>
                                {categoryAct(item)}
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
                        <div className={"node-title"}>
                            <div
                                style={{display:"flex"}}
                                onClick={(e) => onClick(item)}
                            >
                                {getIcon(item.type, item.methodType)}
                                <div className={"cate-node-name"} >{item.name}</div>
                            </div>
                            {categoryAct(item)}
                        </div>
                    }
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
        >
            {renderTreeNodes(categoryList)}
        </Tree>
    )
}


export default observer(NodeTree);
