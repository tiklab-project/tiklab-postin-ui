import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Badge, Space} from "antd";
import {Search} from "../index";
import {Profile, WorkAppConfig} from "tiklab-eam-ui"
import {getUser} from "tiklab-core-ui"
import { BellOutlined } from '@ant-design/icons';
import {inject, observer} from "mobx-react";
import HeaderMenu from "./headerMenu";
import logo from "../../assets/img/postin.png";
import MessageDrawer from "../sysmgr/message/messageDrawer";


const HeaderContent = props => {
    const {userMessageStore,logout,versionImg} = props;
    const {userMessageNum} = userMessageStore;

    const { i18n } = useTranslation();
    const [languageData, setLanguageData] = useState(i18n.languages);

    let userInfo = getUser();



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


    //去往系统设置页
    const toSystem = () =>{
        props.history.push("/systemManagement")
    }


    return(
        <Row className="frame-header">
            <Col span={12}>
                {/*<div className={'frame-header-right'}>*/}
                <Space size={"large"}>


                    <WorkAppConfig isSSO={false}/>
                    <div className={'frame-header-logo'}>
                        {logo && <img src={logo} alt='logo' />}
                    </div>
                    <div className={"header-menu-box"}>
                        <HeaderMenu {...props}/>
                    </div>
                </Space>
                {/*</div>*/}
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    <div className={'frame-header-right-text'}>
                        <div className={"header-right-item"}>
                            <Search {...props}/>
                        </div>
                        <div className={"header-right-item"}>
                            <MessageDrawer />
                        </div>
                        <Dropdown overlay={menu} className={'frame-header-dropdown'}>
                            <svg className=" user-header-icon-hover" aria-hidden="true">
                                <use xlinkHref= {`#icon-yuyan`} />
                            </svg>
                        </Dropdown>
                        <div className={"header-right-item"} >
                            <svg className=" user-header-icon-hover" aria-hidden="true"  onClick={toSystem}>
                                <use xlinkHref= {`#icon-setting`} />
                            </svg>
                        </div>
                        <div className={"header-right-item"}>
                            <div className={"toggle-hover"}>
                                <div className="user-header-icon-hover">
                                    <Profile userInfo={getUser()}/>
                                </div>
                                <div className={"toggle-hidden-box header-user-box"}>
                                    <div className={"user-detail-box"}>
                                        <div className={"user-detail-item  user-detail-item-icon"}>
                                            <svg className="header-user-icon" aria-hidden="true">
                                                <use xlinkHref= {`#icon-a-ziyuan106`} />
                                            </svg>
                                        </div>
                                        <div className={"user-detail-item"}>
                                            <div className={"user-detail-item-name"}>{userInfo.name}</div>
                                            <div>{userInfo.email}</div>
                                        </div>
                                    </div>
                                    <div className={"user-hidden-item"} onClick={logout}>
                                        <svg className="user-header-icon" aria-hidden="true">
                                            <use xlinkHref= {`#icon-tuichu`} />
                                        </svg>
                                        <span>退出登录</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"header-right-item"}>
                            {versionImg()}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default inject("userMessageStore")(observer(HeaderContent));
