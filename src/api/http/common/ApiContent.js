import React from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";

const ApiContent = (props) =>{

    return(
        <>
            <div className={"content-margin"} style={{overflow:"hidden"}}>
                <div className={"content-margin-box"} style={{borderBottom:"1px solid #e4e4e4"}}>
                    <div style={{fontWeight:"bold",padding:"0 3px 10px"}}>接口详情</div>
                    <MenuSelect />
                </div>
                {renderRoutes(props.route.routes)}
            </div>
        </>
    )
}
export default ApiContent;