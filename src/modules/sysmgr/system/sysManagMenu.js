import React, {Fragment, useEffect, useState} from 'react';
import { renderRoutes } from "react-router-config";
import { Layout } from 'antd';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import { PrivilegeButton } from "tiklab-privilege-ui";
import {useSelector} from 'tiklab-plugin-ui/es/_utils'
import './sysMana.scss'

const { Sider, Content } = Layout;

const SysManage = (props) => {
    const {settingMenu} = props;

    const pluginStore = useSelector(store => store.pluginStore)
    const routers = props.route.routes

    const [selectKey,setSelectKey] = useState('/systemManagement/systemFeature')

    const [menuRouter,setMenuRouter] = useState();

    useEffect(() => {

        let data = pluginStore.filter(item=>item.point==="settingMenu").filter(item => item.menuTitle);

        if(data.length > 0){
            let newRouter;
            data&&data.map(item => {
                return newRouter = item.menuTitle.map((routerItem)=> {
                    return {
                        title: routerItem.menuTitle,
                        icon: 'laptop',
                        key: '/'+routerItem.mount + routerItem.router
                    }
                })
            })

            setMenuRouter(settingMenu.concat(newRouter));
        }else {
            setMenuRouter(settingMenu);
        }
    }, [])


    const select = (key)=>{
        setSelectKey(key)
        props.history.push(key)
    }

    // 树的展开与闭合
    const [expandedTree, setExpandedTree] = useState(["/systemManagement/system"])

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

    // 无子级菜单处理
    const renderMenu = (data,deep)=> {
        if(data.encoded){
            return (
                <PrivilegeButton code={data.encoded}  key={data.key}>
                    <li
                        key={data.key}
                        className={` orga-aside-li ${data.key=== selectKey ? "orga-aside-select" : null}`}
                        onClick={()=>select(data.key)}
                        style={{paddingLeft:`${deep*20+5}px`}}
                    >
                        <div className={'aside-li'} >
                            <svg style={{width:18,height:18,margin:"0 5px 0 0"}} aria-hidden="true">
                                <use xlinkHref= {`#icon-${data.icon}`} />
                            </svg>

                            {data.title}
                        </div>
                    </li>
                </PrivilegeButton>
            )
        }else {
           return <li
                key={data.key}
                className={` orga-aside-li ${data.key=== selectKey ? "orga-aside-select" : null}`}
                onClick={()=>select(data.key)}
                style={{paddingLeft:`${deep*20+5}px`}}
            >
                <div className={'aside-li'} >
                    <svg style={{width:18,height:18,margin:"0 5px 0 0"}} aria-hidden="true">
                        <use xlinkHref= {`#icon-${data.icon}`} />
                    </svg>

                    {data.title}
                </div>
            </li>
        }

    }

    // 子级菜单处理
    const renderSubMenu = ({title,key,children,encoded,icon},deep)=> {
        if(encoded){
            return (
                <PrivilegeButton code={encoded} key={key}>
                    <li key={key} title={title} >
                        <div className="orga-aside-item aside-li"
                             onClick={() => setOpenOrClose(key)}
                             style={{paddingLeft:`${deep*20+5}px`}}
                        >
                            <div className={"menu-name-icon"}>
                                <svg style={{width:18,height:18,margin:"0 5px 0 0"}} aria-hidden="true">
                                    <use xlinkHref= {`#icon-${icon}`} />
                                </svg>


                                <span key={key}>
                                  {title}
                              </span>
                            </div>
                            <div className="orga-aside-item-icon">
                                {
                                    children ?
                                        (isExpandedTree(key)
                                                ? <DownOutlined  style={{fontSize: "12px"}}/>
                                                : <UpOutlined  style={{fontSize: "12px"}}/>
                                        ): ""
                                }
                            </div>
                        </div>

                        <ul key={key} title={title} className={`orga-aside-ul ${isExpandedTree(key) ? null: 'orga-aside-hidden'}`}>
                            {
                                children && children.map(item =>{
                                    let deep = 1;
                                    return item.children && item.children.length
                                        ? renderSubMenu(item,deep)
                                        : renderMenu(item,deep)
                                })
                            }
                        </ul>
                    </li>
                </PrivilegeButton>
            )
        }else {
            return (
                <li key={key} title={title} >
                    <div className="orga-aside-item aside-li"
                         onClick={() => setOpenOrClose(key)}
                         style={{paddingLeft:`${deep*20+5}px`}}
                    >
                        <div className={"menu-name-icon"}>
                            <svg style={{width:18,height:18,margin:"0 5px 0 0"}} aria-hidden="true">
                                <use xlinkHref= {`#icon-${icon}`} />
                            </svg>


                            <span key={key}>
                                  {title}
                              </span>
                        </div>
                        <div className="orga-aside-item-icon">
                            {
                                children ?
                                    (isExpandedTree(key)
                                            ? <DownOutlined  style={{fontSize: "12px"}}/>
                                            : <UpOutlined  style={{fontSize: "12px"}}/>
                                    ): ""
                            }
                        </div>
                    </div>

                    <ul key={key} title={title} className={`orga-aside-ul ${isExpandedTree(key) ? null: 'orga-aside-hidden'}`}>
                        {
                            children && children.map(item =>{
                                let deep = 1;
                                return item.children && item.children.length
                                    ? renderSubMenu(item,deep)
                                    : renderMenu(item,deep)
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
                : renderMenu(firstItem)
        })
    }


    return (
        <>
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
        </>
    )
}


export default SysManage;
