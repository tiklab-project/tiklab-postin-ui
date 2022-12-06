import React, {useEffect, useState} from 'react';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import {TextMethodType} from "../../common/methodType";
import {inject, observer} from "mobx-react";

//目录导航
const ShareTree = (props) => {
    const {shareStore,setApiDoc} = props;
    const {findShareTree } = shareStore;

    const [treeList, setTreeList] = useState();

    const [expandedTree, setExpandedTree] = useState([]);
    const [clickKey, setClickKey] = useState();

    const getUrlId = ()=>{
        let url = window.location.href
        let index = url.indexOf("share/")
        return  url.substr(index+6);
    }

    useEffect(()=>{
        let id = getUrlId();

        let param =  new FormData()
        param.append("id",id)

        findShareTree(param).then(res=>{
            setTreeList(res)

            setClickKey(res[0].nodeList[0].id)
            setApiDoc(res[0].nodeList[0])
            setExpandedTree([res[0].id])
        })
    },[])


    //目录
    const onClick = (item) =>{
        setClickKey(item.id);
        setOpenOrClose(item.id);
    }

    //接口
    const onMethod = (item) => {
        setClickKey(item.id);
        setApiDoc(item)
    }

    //展开
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


export default inject("shareStore")(observer(ShareTree));
