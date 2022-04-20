import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Button, Badge} from "antd";
import {Search} from "../index";
import useAppConfig from "./useAppLink"
import { BellOutlined } from '@ant-design/icons';
import {inject, observer} from "mobx-react";
import HeaderMenu from "./headerMenu";

const CommonHeader = props => {
    const {userMessageStore} = props;
    const {userMessageNum} = userMessageStore;
    const {
        logo = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1735300731,83723593&fm=26&gp=0.jpg',
        logout,
        languageSelectData = [], // 切换语言包的数据
    } = props;

    const { i18n } = useTranslation();
    const [lan, setLan] = useState(i18n.language);

    const [component, ModalComponent, editOrAddModal] = useAppConfig(false);

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    const menu = (
        <Menu onClick={onClickLan}>
            {
                languageSelectData.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );

    const toMessage = () =>{
        props.history.push("/MessageUser");
    }

    return(
        <Row style={{height :"64px"}} className="frame-header">
            <Col span={12}>
                <div className={'frame-header-right'}>
                    {component}
                    {logo && <div className={'frame-header-logo'}><img src={logo} alt={'logo'} /></div> }
                    <div className={"header-menu-box"}>
                        <HeaderMenu {...props}/>
                    </div>
                </div>
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    <div className={'frame-header-right-text'}>
                        <Search {...props}/>
                        <Badge count={userMessageNum}>
                            <BellOutlined style={{fontSize: 21}} onClick={toMessage}/>
                        </Badge>
                        <Dropdown overlay={menu} className={'frame-header-dropdown'}>
                            <Button>{lan}</Button>
                        </Dropdown>
                        <span onClick={logout}>退出</span>
                    </div>
                </div>
                {ModalComponent}
                {editOrAddModal}
            </Col>
        </Row>
    )
}
export default inject("userMessageStore")(observer(CommonHeader));
