import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Avatar, Dropdown, Menu} from "antd";

import {AppLink} from "tiklab-integration-ui"
import {getUser} from "tiklab-core-ui";
import HeaderMenu from "./HeaderMenu";
import logo from "../../assets/img/postinlog.png";
import MessageDrawer from "../../setting/message/MessageDrawer";
import {QuestionCircleOutlined, RightOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import Search from "./search/components/Search";

/**
 * 页面头部
 */
const HeaderContent = props => {
    const {logout} = props;

    const { i18n } = useTranslation();
    const [languageData, setLanguageData] = useState(i18n.languages);

    let userInfo = getUser();


    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageData[key])
    };

    // 帮助项
    const helpItem = [
        {
            label: '文档',
            key: 'doc' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                    <use xlinkHref= {`#icon-icon_bangzhuwendang`} />
                </svg>
        },
        {
            label: '社区支持',
            key: 'help',
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                    <use xlinkHref= {`#icon-shequ`} />
                </svg>
        },
        {
            label: '在线工单',
            key: 'order' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                    <use xlinkHref= {`#icon-gongdan`} />
                </svg>
        },
        {
            label: '在线客服',
            key: 'service' ,
            icon:<svg className="icon-s user-header-icon-hover" aria-hidden="true" >
                     <use xlinkHref= {`#icon-kefu`} />
                </svg>
        },
    ]

    /**
     * 渲染帮助项
     */
    const showMenuItem =(data)=>{
        return data&&data.map(item=>{
            return(
                <Menu.Item  key={item.key} icon={item.icon}>{item.label}</Menu.Item>
            )
        })
    }

    /**
     * 帮助与支持
     */
    const helpMenu = (
        <Menu style={{padding:10,width:180}} >
            {
                showMenuItem(helpItem)
            }
        </Menu>
    );

    /**
     * 去往系统设置页
     */
    const toSystem = () =>{
        props.history.push("/systemManagement")
    }

    /**
     * 语言包选项
     */
    const lanMenu = (list) =>{
        return list&&list.map(item=>{
            return <div className={"header-lan-box-item"} key={item} onClick={()=>onClickLan(item)}>{item}</div>
        })
    }


    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <AppLink isSSO={false}/>
                <div className={'frame-header-logo'}>
                    {logo && <img src={logo} alt='logo' />}
                </div>
                <HeaderMenu {...props}/>
            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-search"}>
                    <Search {...props}/>
                </div>
                <div className={"frame-header-right-detail"}>
                    <div className={"header-right-item"} >
                        <SettingOutlined className={"header-icon-item"} onClick={toSystem}/>
                    </div>
                    <div className={"header-right-item"}>
                        <MessageDrawer />
                    </div>
                    <Dropdown overlay={helpMenu}  placement="bottomRight" >
                        <div className={"header-right-item"} >
                            <QuestionCircleOutlined  className={"header-icon-item"} />
                        </div>
                    </Dropdown>
                    <div className={"header-right-item"}>
                        <div className={"toggle-hover"}>
                            <div className="user-header-icon-hover">
                                <Avatar size="small" icon={<UserOutlined />} />
                            </div>
                            <div className={"toggle-hidden-box header-user-box"}>
                                <div className={"user-detail-box"}>
                                    <div className={"user-detail-item  user-detail-item-icon"}>
                                        <div className="header-user-icon">
                                            <Avatar icon={<UserOutlined />} />
                                        </div>
                                    </div>
                                    <div className={"user-detail-item"}>
                                        <div className={"user-detail-item-name"}>{userInfo.name}</div>
                                        <div>{userInfo.email}</div>
                                    </div>
                                </div>

                                <div className={"user-hidden-item-lan"}>
                                    <div  style={{"display": "flex", "alignItems": "center","justifyContent":"space-between"}}>
                                        <div style={{"display": "flex", "alignItems": "center"}}>
                                            <svg className="icon-s user-header-icon" aria-hidden="true">
                                                <use xlinkHref= {`#icon-yuyan`} />
                                            </svg>
                                            <span>语言</span>
                                        </div>
                                        <RightOutlined />
                                    </div>

                                    <div className={"header-lan-box"}>
                                        {
                                            lanMenu(languageData)
                                        }
                                    </div>
                                </div>

                                <div className={"user-hidden-item"} onClick={logout}>
                                    <svg className="icon-s user-header-icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-tuichu`} />
                                    </svg>
                                    <span>退出登录</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderContent;
