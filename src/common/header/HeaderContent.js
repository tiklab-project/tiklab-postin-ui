import React from 'react';
import MessageDrawer from "../../setting/message/MessageDrawer";
import Search from "./search/components/Search";
import {productImg, productTitle} from "thoughtware-core-ui";
import EnterPriseEdition from "./enterpriseEdition/EnterPriseEdition";


/**
 * 页面头部
 */
const HeaderContent = props => {

    //去往主页
    const goHome = () =>{
        props.history.push("/home")
        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("LEFT_MENU_SELECT","/home");
    }

    return(
        <div className="frame-header">
            <div className={"pi-header-left"}>
                <div  className={"recovery-item"}>
                    {props.AppLink}
                </div>
                <div className={'frame-header-logo'} onClick={goHome} style={{cursor:"pointer"}}>
                    <img src={productImg.postin} alt='logo' />
                </div>
                <div className={"productName"} onClick={goHome} style={{cursor:"pointer"}}>{productTitle.postin}</div>
            </div>
            <div className={"header-right-search"}>
                <Search {...props}/>
            </div>
            <div className={'frame-header-right-box'}>

                <div className={'frame-header-right-box'}>
                    <div className={"header-right-item"} data-title-bottom={"消息"}>
                        <MessageDrawer />
                    </div>
                    <div className={"recovery-item"}>
                        {props.HelpLink}
                    </div>
                    <div className={"recovery-item"}>
                        <EnterPriseEdition />
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
