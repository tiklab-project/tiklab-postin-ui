import React, {useEffect} from "react";
import logo from "../../../assets/img/postin.png";
import "./shareStyle.scss"
import {renderRoutes} from "react-router-config";
import "../../../category/components/category.scss"
import "../../../common/header/portalStyle.scss"
import "../../../common/styles/base.scss"
import "../../../common/styles/global.scss"
/**
 * 分享的文档页
 */
const Share = (props) =>{

    const router = props.route.routes;

    return(
        <>
            <div
                className="frame-header"
                style={{borderBottom:"1px solid #e3e3e3"}}
            >
                <div style={{
                    margin: "0 auto",
                    width: "1280px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }} >
                    <div className={"pi-header-left"}>
                        <div className={'frame-header-logo'}>
                            {logo && <img src={logo} alt='logo' />}
                        </div>
                        <div className={"productName"}>PostIn</div>
                    </div>
                    <div>帮助</div>
                </div>
            </div>
            {
                renderRoutes(router)
            }
        </>
    )
}

export default Share;