import React from "react";
import {renderRoutes} from "react-router-config";
import './portalStyle.scss'

const HeaderContent = (props) => {
    const router = props.route.routes;

    return (
        <div style={{height:"100%"}}>
            {
                props.header
            }
            {
                //body
                renderRoutes(router)
            }
        </div>
    );
};

export default HeaderContent;