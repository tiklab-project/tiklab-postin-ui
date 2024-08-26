import React, {useCallback, useEffect, useState} from 'react';
import { renderRoutes } from "react-router-config";
import {DownOutlined, HomeOutlined, UpOutlined} from '@ant-design/icons';
import { PrivilegeButton,SystemNav } from "thoughtware-privilege-ui";
import './sysMana.scss'
import {getUser} from "thoughtware-core-ui";
import IconCommon from "../../common/IconCommon";


const SPECIAL_KEYS = [
    "/setting/orga",
    "/setting/user",
    "/setting/dir",
    "/setting/userGroup"
];

const SysManage = (props) => {
    const { settingMenu, route, history } = props;
    const routers = route.routes;

    const [selectKey, setSelectKey] = useState();
    const [menuRouter, setMenuRouter] = useState([]);
    const [expandedTree, setExpandedTree] = useState([]);

    const authConfig = JSON.parse(localStorage.getItem('authConfig'));

    useEffect(() => {
        setMenuRouter(settingMenu);
    }, [settingMenu]);

    const isExpandedTree = useCallback((key) => expandedTree.includes(key), [expandedTree]);

    const toggleExpand = useCallback((key) => {
        setExpandedTree(prev =>
            prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
        );
    }, []);

    const handleSelect = useCallback((key) => {
        if (!authConfig.authType && SPECIAL_KEYS.includes(key)) {
            const authServiceUrl = authConfig.authServiceUrl;
            const ticket = getUser().ticket;
            const url = `${authServiceUrl}#${key}?ticket=${ticket}`;
            window.open(url, '_blank');
            return;
        }
        setSelectKey(key);
        history.push(key);
    }, [authConfig, history]);

    const renderMenu = useCallback((data, deep, isFirst) => (
        <PrivilegeButton key={data.id} code={data.purviewCode || ''}>
            <li
                className={`orga-aside-li ${data.id === selectKey ? 'orga-aside-select' : ''}`}
                onClick={() => handleSelect(data.id)}
                style={{ paddingLeft: `${isFirst?"0px":"25px"}` }}
            >
                <div className='aside-li'>
                    {isFirst && <IconCommon icon={data.icon} className="icon-m" />}
                    {data.title}
                    {!authConfig.authType && SPECIAL_KEYS.includes(data.id) && <IconCommon icon="dakaixinyemian" className="icon-s" />}
                </div>
            </li>
        </PrivilegeButton>
    ), [handleSelect, selectKey, authConfig]);

    const renderSubMenu = useCallback(({ title, id, children, purviewCode, icon }, deep) => (
        <PrivilegeButton key={id} code={purviewCode || ''}>
            <li>
                <div className="orga-aside-item aside-li" onClick={() => toggleExpand(id)} style={{ paddingLeft: `16px` }}>
                    <div className="menu-name-icon">
                        <IconCommon icon={icon} className="icon-m" />
                        <span>{title}</span>
                    </div>
                    {children && (isExpandedTree(id)
                            ? <DownOutlined style={{ fontSize: '10px' }} />
                            : <UpOutlined style={{ fontSize: '10px' }} />
                    )}
                </div>
                {children && (
                    <ul className={`orga-aside-ul ${isExpandedTree(id) ? '' : 'orga-aside-hidden'}`}>
                        {children.map(item =>
                            item.children && item.children.length
                                ? renderSubMenu(item, deep + 1)
                                : renderMenu(item, deep + 1, false)
                        )}
                    </ul>
                )}
            </li>
        </PrivilegeButton>
    ), [isExpandedTree, toggleExpand, renderMenu]);

    const showUlView = useCallback((data) => (
        data.map(item => item.children && item.children.length > 0
            ? renderSubMenu(item, 1)
            : renderMenu(item, 1, true)
        )
    ), [renderMenu, renderSubMenu]);

    return (
        <SystemNav
            {...props}
            applicationRouters={menuRouter}
            outerPath={"/setting"}
            noAccessPath={"/noaccess"}
        >
            <div className='sysmana-layout'>
                <div className="thoughtware-orga-aside">
                    <div className="system-header">
                        <div className="system-header-title system-header-item">设置</div>
                        <div
                            className="system-header-back-home system-header-item"
                            onClick={() => {
                                localStorage.setItem("leftRouter", "/index");
                                history.push("/index");
                            }}
                        >
                            <HomeOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
                            返回首页
                        </div>
                    </div>
                    <ul style={{ padding: 0 }}>
                        {showUlView(menuRouter)}
                    </ul>
                </div>
                <div className='sysmana-content'>
                    {renderRoutes(routers)}
                </div>
            </div>
        </SystemNav>
    );
};


export default SysManage;
