import React, {useState} from 'react';
import MessageDrawer from "../../setting/message/MessageDrawer";
import Search from "./search/components/Search";
import {productWhiteImg, productTitle} from "tiklab-core-ui";
import EnterPriseEdition from "./enterpriseEdition/EnterPriseEdition";
import {observer} from "mobx-react";

/**
 * 页面头部
 */
const HeaderContent = props => {

    //去往主页
    const goHome = () =>{
        props.history.push("/index")
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT","/index");
    }


    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <div  className={"recovery-item"}>
                    {props.AppLink}
                </div>
                <div className={'frame-header-logo'} onClick={goHome} style={{cursor:"pointer"}}>
                    <img src={productWhiteImg.postin} alt='logo' />
                </div>
                <div className={"productName"} onClick={goHome} style={{cursor:"pointer"}}>{productTitle.postin}</div>
            </div>
            <div className={'frame-header-right-box'}>
                <div className={'frame-header-right-box'}>
                    <div  className={`header-right-item `}>
                        <Search {...props}/>
                    </div>
                    <div className={"header-right-item"} data-title-bottom={"消息"}>
                        <MessageDrawer />
                    </div>
                    <div className={"recovery-item"}>
                        {props.HelpLink}
                    </div>
                    <div className={"recovery-item"}>
                        <EnterPriseEdition featureType={props.featureType}/>
                    </div>

                    <div >
                        {props.AvatarLink}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default observer(HeaderContent);
