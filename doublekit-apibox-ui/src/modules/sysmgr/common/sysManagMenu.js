import React, {Fragment, useEffect, useState} from 'react';
import { renderRoutes } from "react-router-config";
import { Layout } from 'antd';
import { DownOutlined,UpOutlined} from '@ant-design/icons';
import { PrivilegeButton } from "doublekit-privilege-ui";

import './sysMana.scss'
import {inject, observer} from "mobx-react";

const { Sider, Content } = Layout;

const SysManage = (props) => {
    const {pluginsStore} = props;
    const {pluginConfig, isInitLoadPlugin} = pluginsStore;
    const routers = props.route.routes

    const settingMenu = [

        {
            title: '环境管理',
            icon: 'laptop',
            key: '/systemManagement/envMana',
            encoded: "environment"
        },
        {
            title: '数据结构',
            icon: 'laptop',
            key: '/systemManagement/dataStructure',
            encoded: "dataStructure"
        },
        {
            title: '接口状态管理',
            icon: 'laptop',
            key: '/systemManagement/apistatus',
            encoded: "apistatus"
        },
        {
            title: '组织中心',
            icon: 'laptop',
            key: "/systemManagement/organ",
            encoded: "SysOrgaCon",
            children: [
                {
                    title: "组织管理",
                    icon: 'laptop',
                    key: '/systemManagement/organ/org',
                    encoded: "SysOrga",

                },
                {
                    title: '用户管理',
                    icon: 'laptop',
                    key: '/systemManagement/organ/user',
                    encoded: "SysUser",
                },
            ]
        },
        {
            title: '系统权限中心',
            icon: 'laptop',
            key: "/systemManagement/system",
            encoded: "SysPrisystem",
            children: [
                {
                    title: '功能管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemFeature',
                    encoded: "SysFeatruestem",
                },
                {
                    title: '角色管理',
                    icon: 'laptop',
                    key: '/systemManagement/systemRole',
                    encoded: "SysRoleSystem",
                }
            ]
        },
        {
            title: "消息中心",
            icon: 'laptop',
            key: '/systemManagement/message',
            encoded: "SysMessage",
            children: [
                {
                    title: '消息管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageManagement',
                    encoded: "SysMessageManagement",
                },
                {
                    title: '消息模板管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageTemplate',
                    encoded: "SysMessageTemplate",
                },
                {
                    title: '消息类型管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageType',
                    encoded: "SysMessageType",
                },
                {
                    title: '发送方式管理',
                    icon: 'laptop',
                    key: '/systemManagement/messageSendType',
                    encoded: "SysMessageSendType",
                },
            ]
        },
        {
            title: '账号同步',
            icon: 'laptop',
            key: '/systemManagement/authConfig',
            encoded: "authConfig",
        },
        {
            title: '插件管理',
            icon: 'laptop',
            key: '/systemManagement/pluginmanage',
            encoded: "pluginmanage",
        },
        {
            title: 'licence管理',
            icon: 'laptop',
            key: '/systemManagement/licence',
            encoded: "licence",
        }
    ]

    const [selectKey,setSelectKey] = useState('/systemManagement/envMana')

    const [menuRouter,setMenuRouter] = useState()

    useEffect(() => {
        let data = pluginConfig("settingMenu").filter(item => item.menuTitle);

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
    }, [isInitLoadPlugin])


    const select = (key)=>{
        setSelectKey(key)
        props.history.push(key)
    }

    // 树的展开与闭合
    const [expandedTree, setExpandedTree] = useState([])

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
        return (
            <PrivilegeButton code={data.encoded}  key={data.key}>
                <li
                    key={data.key}
                    className={` orga-aside-li ${data.key=== selectKey ? "orga-aside-select" : ""}`}
                    onClick={()=>select(data.key)}
                    style={{paddingLeft:`${deep*20+5}px`}}
                >
                    <div className={'aside-li'} >
                        {data.title}
                    </div>
                </li>
            </PrivilegeButton>
        )
    }

    // 子级菜单处理
    const renderSubMenu = ({title,key,children,encoded},deep)=> {
        return (
              <PrivilegeButton code={encoded} disabled ={"hidden"} key={key}>
                  <li key={key} title={title} >
                      <div className="orga-aside-item aside-li"
                           onClick={() => setOpenOrClose(key)}
                           style={{paddingLeft:`${deep*20+5}px`}}
                      >
                          <span key={key}>
                              {title}
                          </span>
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
    }

    const showUlView = (data)=>{
        return data && data.map(firstItem => {
            return firstItem.children && firstItem.children.length > 0
                ? renderSubMenu(firstItem)
                : renderMenu(firstItem)
        })
    }


    return (
        <Fragment>
            <Layout className = 'sysmana-layout'>
                <Sider
                    className = 'sysmana-sider'
                    width={240}
                    theme={'light'}
                >
                    <div className="doublekit-orga-aside">
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
        </Fragment>
    )
}


export default inject("pluginsStore")(observer(SysManage));
