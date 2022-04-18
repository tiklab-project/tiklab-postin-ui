import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Popconfirm} from "antd";
import CategoryEdit from "../../category/components/categoryEdit";

const LeftNavTreeQuickTest =(props)=>{
    const { categoryStore } = props;
    const { findCategoryList, deleteCategory, categoryList } = categoryStore;

    const [expandedTree, setExpandedTree] = useState([]);
    const [clickKey, setClickKey] = useState();
    const openIcon={
        icon:'file-open',
        preIcon:<CaretDownOutlined/>
    }
    const closeIcon ={
        icon:'folder-close',
        preIcon:<CaretRightOutlined/>
    }

    const workspaceId = localStorage.getItem('workspaceId');

    useEffect(() => {
        findCategoryList(workspaceId,"quick");
    },[workspaceId])

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }


    //设置有子集的li
    const expendTreeLi = (item,icon) => {
        return(
            <div className={'cate-li'}>
                <span
                    className={`categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=> onClick(item)}
                >
                    {icon.preIcon}
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-${icon.icon}`}/>
                    </svg>
                    {item.name}
                </span>
                {
                    categoryAct(item.id)
                }
            </div>
        )
    }

    //保存分类id，跳往分类页
    const onClick = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id)
    }

    //目录悬浮项
    const categoryAct = (id) => {
        return (
            <div className={'category-action'}>
                <div className={'category-action-more'}>
                    <Dropdown overlay={()=>menu(id)}>
                        <div className={'category-action-more-box'} >...</div>
                    </Dropdown>
                </div>
            </div>
        )
    }
    //目录悬浮的操作项
    const menu = (id)=>(
        <Menu>
            <Menu.Item >
                <CategoryEdit name="添加子目录" type={"quick"} categoryId={id}/>
            </Menu.Item>
            <Menu.Item>
                <CategoryEdit  name="编辑" type={"quick"} categoryId={id}/>
            </Menu.Item>
            <Menu.Item>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteCategory(id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a>删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );


    //展开闭合 分类
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    //递归渲染分类列表
    const tree = (data = [],deep) => {
        return(
            data && data.map((item) => {
                let deep = 1;
                if(item.children&&item.children.length>0 || item.categoryMethod&&item.categoryMethod.length>0 ){
                    return (
                        <li key={item.id} >
                            {
                                isExpandedTree(item.id)
                                    ?expendTreeLi(item,openIcon)
                                    :expendTreeLi(item,closeIcon)
                            }
                            <ul
                                className={!isExpandedTree(item.id) ? 'tree-hidden' : null}
                                key={item.id}
                                style={{paddingLeft: `${deep * 10 + 5}px`}}
                            >
                                {
                                    tree(item.children,deep+1)
                                }
                                {
                                    methodView(item.categoryMethod)
                                }
                            </ul>
                        </li>
                    )
                }else{
                    return(
                        <li  key={item.id} >
                            <div className={'cate-li'} >
                            <span
                                onClick={()=>onClick(item)}
                                className={`categoryNav-li tree-span ${item.id === clickKey? 'action-li':''}`}
                            >
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-folder-close"/>
                                </svg>
                                {item.name}
                            </span>
                                {
                                    categoryAct(item.id)
                                }
                            </div>
                        </li>
                    )
                }
            })
        )
    }

    //接口
    const methodView = (data) => {
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    className={`methodli categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=>onMethod(item)}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-api`}/>
                    </svg>
                    {/*<RequestType type={item.requestType}/>*/}
                    {item.name}
                </li>
            )
        })
    }

    //保存接口id，跳往接口详情页
    const onMethod = (item) => {
        setClickKey(item.id);

        // apiTabListInfoProcess(item,apiTabListInfo,"api")

        localStorage.setItem('testcaseId',item.id);
        props.history.push('/workspacepage/quickTest/detail/interface');
    }


    return(
        <>
            <ul className="categoryNav-ui">
                {
                    tree(categoryList)
                }
            </ul>
        </>
    )

}

export default inject('categoryStore')(observer(LeftNavTreeQuickTest));