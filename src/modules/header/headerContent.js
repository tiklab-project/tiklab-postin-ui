import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Button, Badge, Tooltip} from "antd";
import {Search} from "../index";
import {useWorkAppConfig} from "tiklab-eam-ui"
import {getUser} from "tiklab-core-ui"
import { BellOutlined } from '@ant-design/icons';
import {inject, observer} from "mobx-react";
import HeaderMenu from "./headerMenu";
import logo from "../../assets/img/log.png";
import localImage from "../../assets/img/local.png";
import enterprise from "../../assets/img/enterprise.png"

const HeaderContent = props => {
    const {userMessageStore} = props;
    const {userMessageNum} = userMessageStore;
    const {logout} = props;

    const { i18n } = useTranslation();
    const [languageData, setLanguageData] = useState(i18n.languages);

    let userInfo = getUser();


    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageData[key])
    };

    //语言包选项
    const menu = (
        <Menu onClick={onClickLan}>
            {
                languageData.map((item, index) => {
                    return <Menu.Item key={index} value={item}>{item}</Menu.Item>
                })
            }
        </Menu>
    );

    const toMessage = () =>{
        props.history.push("/MessageUser");
    }


    let authConfigInfo = JSON.parse(localStorage.getItem("authConfig"))

    const version = ()=>{
        let versionInfo = JSON.parse(localStorage.getItem("versionInfo"))
        if(versionInfo){
            switch (versionInfo.release) {
                case 1:
                    return <img style={{width: 25}} src={localImage} alt='ce' />
                case 2:
                    return <img style={{width: 25}} src={enterprise} alt='ee' />
            }
        }else {
            return  <img  style={{width: 25}} src={localImage} alt='ce' />
        }
    }

    const toSystem = () =>{
        props.history.push("/systemManagement")
    }

    const toAccountMember = () =>{
        props.history.push("/accountMember")
    }


    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-right'}>
                    {component}
                    <div className={'frame-header-logo'}>
                        {logo && <img src={logo} alt='logo' />}
                    </div>
                    <div className={"header-menu-box"}>
                        <HeaderMenu {...props}/>
                    </div>
                </div>
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    <div className={'frame-header-right-text'}>
                        <div className={"header-right-item"}>
                            <Search {...props}/>
                        </div>
                        <div className={"header-right-item"}>
                            <Badge count={userMessageNum}>
                                <BellOutlined style={{fontSize: 21}} onClick={toMessage}/>
                            </Badge>
                        </div>
                        {/*<div className={"header-right-item"}>*/}
                            <Dropdown overlay={menu} className={'frame-header-dropdown'}>
                                <svg className="user-header-icon user-header-icon-hover" aria-hidden="true">
                                    <use xlinkHref= {`#icon-yuyan`} />
                                </svg>
                            </Dropdown>
                        {/*</div>*/}
                        <div className={"header-right-item"}>
                            <div className={"toggle-hover"}>
                                <svg className="user-header-icon user-header-icon-hover" aria-hidden="true">
                                    <use xlinkHref= {`#icon-setting`} />
                                </svg>
                                <div className={"toggle-hidden-box setting-setting-box"}>
                                    {
                                        authConfigInfo.authType==="local"
                                            ?<div className={"user-hidden-item"} onClick={toAccountMember}>帐号成员</div>
                                            :<Tooltip placement="right" title="仅限本地登录使用">
                                                <div className={"user-hidden-item-disable "} >帐号成员</div>
                                            </Tooltip>
                                    }

                                    <div className={"user-hidden-item"} onClick={toSystem}>系统设置</div>
                                </div>
                            </div>
                        </div>
                        {
                            props.isSignIn&&!userInfo.ticket
                                ? props.isSignIn
                                :<div className={"header-right-item"}>
                                    <div className={"toggle-hover"}>
                                        <svg className="user-header-icon user-header-icon-hover" aria-hidden="true">
                                            <use xlinkHref= {`#icon-user__easyico`} />
                                        </svg>
                                        <div className={"toggle-hidden-box header-user-box"}>
                                            <div className={"user-detail-box"}>
                                                <div className={"user-detail-item  user-detail-item-icon"}>
                                                    <svg className="user-header-icon" aria-hidden="true">
                                                        <use xlinkHref= {`#icon-user__easyico`} />
                                                    </svg>
                                                </div>
                                                <div className={"user-detail-item"}>
                                                    <div className={"user-detail-item-name"}>{userInfo.name}</div>
                                                    <div>{userInfo.email}</div>
                                                </div>
                                            </div>
                                            <div className={"user-hidden-item"} onClick={logout}>退出登录</div>
                                        </div>
                                    </div>
                                </div>
                        }

                        <div className={"header-right-item"}>
                            {version()}
                        </div>
                    </div>
                </div>
                {ModalComponent}
                {editOrAddModal}
            </Col>
        </Row>
    )
}
export default inject("userMessageStore")(observer(HeaderContent));
