import React from "react";
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
        <div className={"share-link-box"}>
            {
                renderRoutes(router)
            }
        </div>
    )
}

export default Share;