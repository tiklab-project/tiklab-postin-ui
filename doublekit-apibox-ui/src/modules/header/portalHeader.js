/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 14:00:23
 */
import React from 'react';
import { renderRoutes } from "react-router-config";

import Portal from "./ProjectPortal";
import './portalStyle.scss'

const  PortalHeader =(props)=> {
    const router = props.route.routes;

    return(
        <Portal {...props}>
            {renderRoutes(router)}
        </Portal>
    )
}

export default PortalHeader
