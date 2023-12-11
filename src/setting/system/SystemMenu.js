import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import { PrivilegeButton,SystemNav } from "thoughtware-privilege-ui";
import {Layout, Menu} from "antd";
import {renderRoutes} from "react-router-config";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const SystemMenu = (props) =>{
    const {settingMenu} = props;

    const routers = props.route.routes
    const history = useHistory()

    const [menuRouter,setMenuRouter] = useState();

    useEffect(()=>{
        setMenuRouter(settingMenu);
    },[])

    const renderMenu = (data) => {
        return data&&data.map(item => {
            const menuItem = {
                key: item.id,
                icon: item.icon,
                label: item.title,
            };

            if (item.children) {
                return {
                    ...menuItem,
                    children: renderMenu(item.children),
                };
            }

            return menuItem;
        });
    }

    return(
        <SystemNav
            {...props}
            // expandedTree={"/setting/system"} // 树的展开和闭合(非必传)
            // setExpandedTree={} // 树的展开和闭合(非必传)
            applicationRouters={menuRouter} // 菜单
            outerPath={"/setting"} // 系统设置Layout路径
        >
            <Layout className = 'sysmana-layout'>
                <Sider
                    className = 'sysmana-sider'
                    width={240}
                    theme={'light'}
                >
                    <div className="thoughtware-orga-aside">
                        <Menu
                            style={{background: "#f9f9f9"}}
                            mode="inline"
                            items={renderMenu(menuRouter)}
                            onClick={(item)=>history.push(item.key)}
                            defaultOpenKeys={['accountMember']}
                        />
                    </div>
                </Sider>
                <Content className = 'sysmana-content'>
                    {renderRoutes(routers)}
                </Content>
            </Layout>
        </SystemNav>
    )
}

export default SystemMenu;