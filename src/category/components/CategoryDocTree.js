import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {apiTabListInfoProcess} from "../../common/apiTabListInfoProcess";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import {Dropdown, Menu, Popconfirm, Tooltip} from "antd";
import CategoryEdit from "./CategoryEdit";
import ShareModal from "../../api/http/document/components/ShareModal";
import {ApxMethodEdit} from "../../api/http/definition";
import {TextMethodType} from "../../common/MethodType";

const CategoryDocTree = (props) =>{
    const { treeList,setApiDoc,apxMethodStore,categoryId } = props;
    const { findApxMethod } = apxMethodStore;


    const [expandedTree, setExpandedTree] = useState([categoryId]);
    const [clickKey, setClickKey] = useState();

    //保存分类id，跳往分类页
    const onClick = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id);
    }

    //保存接口id，跳往接口详情页
    const onMethod = async (item) => {
        setClickKey(item.id);
        let res = await findApxMethod(item.id);
        setApiDoc(res)
    }


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



    //设置有子集的li
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
                    <TextMethodType type={item.methodType}/>

                    {item.name}
                </li>
            )
        })
    }

    //递归渲染分类列表
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
                    tree(treeList,0)
                }
            </ul>
        </>
    )
}

export default inject("categoryStore","apxMethodStore")(observer(CategoryDocTree));