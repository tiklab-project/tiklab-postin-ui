import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import {Dropdown, Menu, Popconfirm, Tooltip} from "antd";
import {ApxMethodEdit} from "../../api/http/definition";
import CategoryEdit from './CategoryEdit';
import {TextMethodType} from "../../common/MethodType";
import {getUser} from "tiklab-core-ui";
import categoryStore from "../store/CategoryStore";
/**
 *  目录树
 */
const CategoryTree = (props) => {
    const { findCategoryList, deleteCategory,categoryList,apiRecent } = categoryStore;



    const [expandedTree, setExpandedTree] = useState([]);
    const [clickKey, setClickKey] = useState();

    const workspaceId = localStorage.getItem('workspaceId');



    /**
     * 保存分类id，跳往分类页
     */
    const onClick = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id);
        localStorage.setItem('categoryId',item.id);

        props.history.push('/workspace/apis/category');
    }

    /**
     * 保存接口id，跳往接口详情页
     */
    const onMethod = (item) => {
        setClickKey(item.id);

        //设置最近打开的接口
        let params = {
            workspace:{id:workspaceId},
            user:{id:getUser().userId},
            apix:{id:item.id},
            // protocolType:record.apiRecent.protocolType
        }
        apiRecent(params)

        localStorage.setItem('apxMethodId',item.id);
        props.history.push('/workspace/apis/document');
    }


    useEffect(() => {
        findCategoryList(workspaceId).then((list)=>{
            // onClick(list[0])
        })
    },[workspaceId])

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }

    /**
     * 展开闭合 分类
     */
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

    /**
     * 目录悬浮的操作项
     */
    const menu = (id)=>(
        <Menu>
            <Menu.Item  key={2}>
                <CategoryEdit name="添加目录"   type="add"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={3}>
                <CategoryEdit  name="编辑"  type="edit"  categoryId={id}/>
            </Menu.Item>
            <Menu.Item  key={4}>
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

    /**
     * 删除分组
     */
    const delCategory = (id)=>{

        deleteCategory(id)
    }

    /**
     * 目录悬浮项
     */
    const categoryAct = (id) => {
        return (
            <div className={'category-action'}>
                <div  className={"category-action-right"}>
                    <ApxMethodEdit
                        name="添加"
                        icon={
                            <Tooltip title="新增接口"  placement="left">
                                <svg className="icon-s edit-icon-nav" aria-hidden="true">
                                    <use xlinkHref={`#icon-tianjia-`}/>
                                </svg>
                            </Tooltip>
                        }
                        type="add"
                        categoryItemId={id}
                        {...props}
                    />
                    <Dropdown overlay={()=>menu(id)} className={'category-action-more'}>
                        <svg className="icon-s category-nav-item-icon" aria-hidden="true">
                            <use xlinkHref={`#icon-more`}/>
                        </svg>
                    </Dropdown>
                </div>
            </div>
        )
    }

    /**
     * 设置有子集的li
     */
    const expendTreeLi = (item,icon,deep) => {
        return(
            <div className={'cate-li'}>
                <span
                    className={`categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=> onClick(item)}
                    style={{paddingLeft: `${deep * 11+10}px`}}
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

    /**
     * 接口项展示
     */
    const methodView = (data) => {
        return data&&data.map(item=>{
            return(
                <li
                    key={item.id}
                    className={`methodli categoryNav-li tree-childspan  ${item.id === clickKey? 'action-li':''}`}
                    onClick={()=>onMethod(item)}
                >
                    <TextMethodType type={item.methodType}/>

                    {item.name}
                </li>
            )
        })
    }

    /**
     * 递归渲染分类列表
     */
    const tree = (data = [],deep) => {
        return(
            data && data.map((item) => {
                // let deep = 1;
                if(item.children&&item.children.length>0 || item.nodeList&&item.nodeList.length>0 ){
                    return (
                    <li key={item.id} >
                        {
                            isExpandedTree(item.id)
                            ?expendTreeLi(item,openIcon,deep)
                            :expendTreeLi(item,closeIcon,deep)
                        }
                        <ul
                            className={!isExpandedTree(item.id) ? 'tree-hidden' : null}
                            key={item.id}
                        >
                            {
                                tree(item.children,deep+1)
                            }
                            {
                                methodView(item.nodeList)
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
                                style={{paddingLeft: `${deep * 10+24}px`}}
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



    return(
        <>
            <ul className="categoryNav-ui">
                {
                    tree(categoryList,0)
                }
            </ul>
        </>
    )
}


export default observer(CategoryTree);
