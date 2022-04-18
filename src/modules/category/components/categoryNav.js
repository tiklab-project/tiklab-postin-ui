import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import {Dropdown,Menu,Popconfirm} from "antd";
import {ApxMethodEdit} from "../../apxMethod";
import CategoryEdit from './categoryEdit';
import {apiTabListInfoProcess} from "../../common/apiTabListInfoProcess";

//分类导航
const CategoryNav = (props) => {
    const { categoryStore } = props;
    const { findCategoryList, deleteCategory, categoryList } = categoryStore;
    const [expandedTree, setExpandedTree] = useState([]);
    const [clickKey, setClickKey] = useState();

    const workspaceId = localStorage.getItem('workspaceId');

    const apiTabListInfo = JSON.parse(sessionStorage.getItem("apiTabListInfo"))


    //保存分类id，跳往分类页
    const onClick = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id);
        localStorage.setItem('categoryId',item.id);
        sessionStorage.setItem("isAllApi","notAllApi");

        apiTabListInfoProcess(item,apiTabListInfo,"list")

        props.history.push('/workspacepage/apis/detail/category');
    }

    //保存接口id，跳往接口详情页
    const onMethod = (item) => {
        setClickKey(item.id);

        apiTabListInfoProcess(item,apiTabListInfo,"api")

        localStorage.setItem('apxMethodId',item.id);
        props.history.push('/workspacepage/apis/detail/interface');
    }


    useEffect(() => {
        findCategoryList(workspaceId);
    },[workspaceId])

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }

    //展开闭合 分类
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const openIcon={
        icon:'file-open',
        preIcon:<CaretDownOutlined/>
    }
    const closeIcon ={
        icon:'folder-close',
        preIcon:<CaretRightOutlined/>
    }

    //目录悬浮的操作项
    const menu = (id)=>(
        <Menu>
            <Menu.Item >
                <ApxMethodEdit name="添加API"  type="add" categoryItemId={id}/>
            </Menu.Item>
            <Menu.Item >
                <CategoryEdit name="添加子目录"  type="api"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item>
                <CategoryEdit  name="编辑"  type="api"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>delCategory(id)}
                    okText='确定'
                    cancelText='取消'
                >
                <a>删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    //删除分组，变成所有api
    const delCategory = (id)=>{
        sessionStorage.setItem("isAllApi","isAllApi")
        deleteCategory(id)
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

    const toAllApi = ()=>{
        let item = {name:"所有API",id:"-1"}

        apiTabListInfoProcess(item,apiTabListInfo,"list")
        sessionStorage.setItem("isAllApi","isAllApi")
        props.history.push("/workspacepage/apis/detail/category")
    }


    return(
        <>
            <ul className="categoryNav-ui">
                <li
                    className={"allapi"}
                    onClick={toAllApi}
                >
                    所有API
                </li>
                {
                    tree(categoryList)
                }
            </ul>
        </>
    )
}


export default inject('categoryStore')(observer(CategoryNav));
