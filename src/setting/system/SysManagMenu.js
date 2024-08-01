import React, { useEffect, useState} from 'react';
import { renderRoutes } from "react-router-config";
import { Layout } from 'antd';
import {DownOutlined, LeftCircleOutlined, UpOutlined} from '@ant-design/icons';
import { PrivilegeButton,SystemNav } from "thoughtware-privilege-ui";
import './sysMana.scss'
import {getUser} from "thoughtware-core-ui";
import IconCommon from "../../common/IconCommon";

const { Sider, Content } = Layout;

/**
 * 系统设置页导航
 */
const SysManage = (props) => {
    const {settingMenu} = props;
    const routers = props.route.routes
    const [selectKey,setSelectKey] = useState('/setting/systemRole')
    const [menuRouter,setMenuRouter] = useState();
    const authConfig = JSON.parse(localStorage.getItem("authConfig"))
    const curRouter =  window.location.hash.substr(1)

    useEffect(() => {
        //设置左侧导航哪个选中
        setSelectKey(curRouter)
        setMenuRouter(settingMenu);
    }, [curRouter])



    const specialKeys = [
        "/setting/orga",
        "/setting/user",
        "/setting/dir",
        "/setting/userGroup"
    ];

    const select = (key) => {
        if (!authConfig.authType) {
            if (specialKeys.includes(key)) {
                let authServiceUrl = authConfig.authServiceUrl
                let ticket = getUser().ticket
                let url = authServiceUrl +"#"+key+"?ticket="+ticket

                window.open(url, "_blank");
                return;
            }
        }

        // 其他情况，直接进行页面导航
        props.history.push(key);
        setSelectKey(key);
    };

    const showOpenNewPage = (key) => {
        if (!authConfig.authType) {
            if (specialKeys.includes(key)) {
                return <IconCommon icon={"dakaixinyemian"}  className="icon-s"/>
            }
        }
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
                        style={{paddingLeft:`${deep*25}px`}}
                    >
                        <div className={'aside-li'} >
                            <div>
                                {
                                    isFirst
                                    &&<IconCommon
                                            icon={data.icon}
                                            className={"icon-m"}
                                            style={{margin:"0 5px 0 0"}}
                                        />
                                }
                                {data.title}
                            </div>
                            {
                                showOpenNewPage(data.id)
                            }

                        </div>
                    </li>
                </PrivilegeButton>
            )
        }else {
           return <li
                key={data.id}
                className={` orga-aside-li ${data.id=== selectKey ? "orga-aside-select" : null}`}
                onClick={()=>select(data.id)}
                style={{paddingLeft:`${deep*25}px`}}
            >
                <div className={'aside-li'} >
                    <div>
                        {
                            isFirst
                                ?<IconCommon
                                    icon={data.icon}
                                    className={"icon-m"}
                                    style={{margin:"0 5px 0 0"}}
                                />
                                :null
                        }
                        {data.title}
                    </div>
                    {
                        showOpenNewPage(data.id)
                    }
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
                                <IconCommon
                                    icon={icon}
                                    className={"icon-m"}
                                    style={{margin:"0 5px 0 0"}}
                                />
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
                            <IconCommon
                                icon={icon}
                                className={"icon-m"}
                                style={{margin:"0 5px 0 0"}}
                            />
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
            notFoundPath={"/noaccess"}
        >
            <Layout className = 'sysmana-layout'>
                <Sider
                    className = 'sysmana-sider'
                    width={220}
                    theme={'light'}
                >
                    <div className="thoughtware-orga-aside">
                        <div
                             style={{
                                 borderBottom:"1px solid #e4e4e4",
                                 padding:"10px 15px 10px 30px",
                             }}
                        >
                            <div style={{fontWeight:"bold",display:"flex",gap:"5px",alignItems:"center"}}>
                                <LeftCircleOutlined style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>props.history.push("/home")}/>
                                设置
                            </div>
                        </div>

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
