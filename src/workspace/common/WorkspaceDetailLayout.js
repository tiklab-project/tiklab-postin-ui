import React from "react";
import LeftNav from "./LeftNav";
import "./workspaceDetailStyle.scss"
import {renderRoutes} from "react-router-config";

/**
 * 空间详情的布局，为左右结构
 */
const WorkspaceDetailLayout = (props) =>{
    const routes = props.route.routes;

    return(

        <div className={"ws-detail-contant"}>
            <LeftNav {...props}/>
            <div className={"ws-detail-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default WorkspaceDetailLayout;