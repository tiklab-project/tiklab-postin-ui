import React from 'react';
import HeaderMenu from "./HeaderMenu";
import logo from "../../assets/img/postin.png";
import MessageDrawer from "../../setting/message/MessageDrawer";
import {SettingOutlined} from "@ant-design/icons";
import Search from "./search/components/Search";


/**
 * 页面头部
 */
const HeaderContent = props => {


    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <div  className={"recovery-item"}>
                    {props.AppLink}
                </div>
                <div className={'frame-header-logo'}>
                    {logo && <img src={logo} alt='logo' />}
                </div>
                <div className={"productName"}>PostIn</div>
                <HeaderMenu {...props}/>
            </div>

            <div className={'frame-header-right-box'}>
                <div className={"header-right-search"}>
                    <Search {...props}/>
                </div>
                <div className={'frame-header-right-box'}>
                    <div className={"header-right-item"}  data-title-bottom={"设置"}>
                        <SettingOutlined className={"header-icon-item"} onClick={()=>props.history.push("/setting/home")}/>
                    </div>
                    <div className={"header-right-item"} data-title-bottom={"消息"}>
                        <MessageDrawer />
                    </div>
                    <div className={"recovery-item"}>
                        {props.HelpLink}
                    </div>
                    <div >
                        {props.AvatarLink}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default HeaderContent;
