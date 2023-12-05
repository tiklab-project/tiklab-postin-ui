import React, { useEffect, useState} from 'react';
import { renderRoutes } from "react-router-config";
import { Layout } from 'antd';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import { PrivilegeButton,SystemNav } from "tiklab-privilege-ui";
import {useSelector} from 'tiklab-plugin-core-ui'
import './sysMana.scss'

const { Sider, Content } = Layout;

/**
 * 系统设置页导航
 */
const SysManage = (props) => {
    const {settingMenu} = props;

    const routers = props.route.routes

    const [selectKey,setSelectKey] = useState('/setting/systemRole')

    const [menuRouter,setMenuRouter] = useState();

    useEffect(() => {
        //设置左侧导航哪个选中
        setSelectKey(window.location.hash.substr(1))

        setMenuRouter(settingMenu);
    }, [])


    const select = (key)=>{
        setSelectKey(key)
        props.history.push(key)
    }
    /**
     * 树的展开与闭合
     */
    const [expandedTree, setExpandedTree] = useState(["/setting/system"])

    const isExpandedTree = (key) => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    /**
     * 无子级菜单渲染
     */
    const renderMenu = (data,deep,isFirst)=> {
        if(data.purviewCode){
            return (
                <PrivilegeButton code={data.purviewCode}  key={data.id}>
                    <li
                        key={data.id}
                        className={` orga-aside-li ${data.id=== selectKey ? "orga-aside-select" : null}`}
                        onClick={()=>select(data.id)}
                        style={{paddingLeft:`${deep*20}px`}}
                    >
                        <div className={'aside-li'} >
                            {
                                isFirst
                                    ?<svg style={{width:16,height:16,margin:"0 5px 0 0"}} aria-hidden="true">
                                        <use xlinkHref= {`#icon-${data.icon}`} />
                                    </svg>
                                    :null
                            }


                            {data.title}
                        </div>
                    </li>
                </PrivilegeButton>
            )
        }else {
           return <li
                key={data.id}
                className={` orga-aside-li ${data.id=== selectKey ? "orga-aside-select" : null}`}
                onClick={()=>select(data.id)}
                style={{paddingLeft:`${deep*20}px`}}
            >
                <div className={'aside-li'} >
                    {
                        isFirst
                            ?<svg style={{width:16,height:16,margin:"0 5px 0 0"}} aria-hidden="true">
                                <use xlinkHref= {`#icon-${data.icon}`} />
                            </svg>
                            :null
                    }

                    {data.title}
                </div>
            </li>
        }

    }

    /**
     * 子级菜单处理
     */
    const renderSubMenu = ({title,id,children,purviewCode,icon},deep)=> {
        if(purviewCode){
            return (
                <PrivilegeButton code={purviewCode} key={id}>
                    <li key={id} title={title} >
                        <div className="orga-aside-item aside-li"
                             onClick={() => setOpenOrClose(id)}
                             style={{paddingLeft:`${deep*20}px`}}
                        >
                            <div className={"menu-name-icon"}>
                                <svg style={{width:16,height:16,margin:"0 5px 0 0"}} aria-hidden="true">
                                    <use xlinkHref= {`#icon-${icon}`} />
                                </svg>
                                <span key={id}> {title}</span>
                            </div>
                            <div className="orga-aside-item-icon">
                                {
                                    children ?
                                        (isExpandedTree(id)
                                                ? <DownOutlined  style={{fontSize: "12px"}}/>
                                                : <UpOutlined  style={{fontSize: "12px"}}/>
                                        ): ""
                                }
                            </div>
                        </div>

                        <ul key={id} title={title} className={`orga-aside-ul ${isExpandedTree(id) ? null: 'orga-aside-hidden'}`}>
                            {
                                children && children.map(item =>{
                                    let deep = 1;
                                    return item.children && item.children.length
                                        ? renderSubMenu(item,deep)
                                        : renderMenu(item,deep,false)
                                })
                            }
                        </ul>
                    </li>
                </PrivilegeButton>
            )
        }else {
            return (
                <li key={id} title={title} >
                    <div className="orga-aside-item aside-li"
                         onClick={() => setOpenOrClose(id)}
                         style={{paddingLeft:`${deep*20}px`}}
                    >
                        <div className={"menu-name-icon"}>
                            <svg style={{width:16,height:16,margin:"0 5px 0 0"}} aria-hidden="true">
                                <use xlinkHref= {`#icon-${icon}`} />
                            </svg>
                            <span key={id}>{title}</span>
                        </div>
                        <div className="orga-aside-item-icon">
                            {
                                children ?
                                    (isExpandedTree(id)
                                            ? <DownOutlined  style={{fontSize: "12px"}}/>
                                            : <UpOutlined  style={{fontSize: "12px"}}/>
                                    ): ""
                            }
                        </div>
                    </div>

                    <ul key={id} title={title} className={`orga-aside-ul ${isExpandedTree(id) ? null: 'orga-aside-hidden'}`}>
                        {
                            children && children.map(item =>{
                                let deep = 1;
                                return item.children && item.children.length
                                    ? renderSubMenu(item,deep)
                                    : renderMenu(item,deep,false)
                            })
                        }
                    </ul>
                </li>
            )
        }


    }


    const showUlView = (data)=>{
        return data && data.map(firstItem => {
            return firstItem.children && firstItem.children.length > 0
                ? renderSubMenu(firstItem)
                : renderMenu(firstItem,null,true)
        })
    }

    return (
        <SystemNav
            {...props}
            expandedTree={expandedTree} // 树的展开和闭合(非必传)
            setExpandedTree={setExpandedTree} // 树的展开和闭合(非必传)
            applicationRouters={menuRouter} // 菜单
            outerPath={"/setting"} // 系统设置Layout路径
        >
            <Layout className = 'sysmana-layout'>
                <Sider
                    className = 'sysmana-sider'
                    width={240}
                    theme={'light'}
                >
                    <div className="tiklab-orga-aside">
                        <ul style={{padding: 0}} >
                            {
                                showUlView(menuRouter)
                            }
                        </ul>
                    </div>
                </Sider>
                <Content className = 'sysmana-content'>
                    {renderRoutes(routers)}
                </Content>
            </Layout>
        </SystemNav>
    )
}


export default SysManage;
