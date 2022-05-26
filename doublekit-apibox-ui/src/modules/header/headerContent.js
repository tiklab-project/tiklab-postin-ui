import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Button, Badge} from "antd";
import {Search} from "../index";
import {useWorkAppConfig} from "doublekit-eam-ui"
import {getUser} from "doublekit-core-ui"
import { BellOutlined } from '@ant-design/icons';
import {inject, observer} from "mobx-react";
import HeaderMenu from "./headerMenu";


const HeaderContent = props => {
    const {userMessageStore} = props;
    const {userMessageNum} = userMessageStore;
    const {
        logo = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1735300731,83723593&fm=26&gp=0.jpg',
        logout,
        languageSelectData = [], // 切换语言包的数据
    } = props;

    const { i18n } = useTranslation();
    const [lan, setLan] = useState(i18n.language);
    let userInfo = getUser();

    const [component, ModalComponent, editOrAddModal] = useWorkAppConfig(false);

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    //语言包选项
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

    const isLocal =() =>{
        let isLocal = JSON.parse(localStorage.getItem("authConfig"))

        if(isLocal){
            switch (isLocal.authType) {
                case "local":
                    return <span>(本地)</span>
                case "acc":
                    return <span>(统一)</span>
            }
        }else {
            return <span>(本地)</span>
        }

    }

    const version = ()=>{
        let versionInfo = JSON.parse(localStorage.getItem("versionInfo"))
        if(versionInfo){
            switch (versionInfo.release) {
                case 1:
                    return <span>社区版</span>
                case 2:
                    return <span>企业版</span>
                case 3:
                    return <span>SaaS版</span>
            }
        }else {
            return <span>社区版</span>
        }
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
                        <div>
                            {version()}
                            {isLocal()}
                        </div>

                        {
                            props.isSignIn&&!userInfo.ticket
                                ? props.isSignIn
                                :null
                        }
                        {
                            userInfo.ticket
                                ?<span onClick={logout}>退出</span>
                                :null
                        }
                    </div>
                </div>
                {ModalComponent}
                {editOrAddModal}
            </Col>
        </Row>
    )
}
export default inject("userMessageStore")(observer(HeaderContent));
