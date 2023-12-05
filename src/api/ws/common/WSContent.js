import React from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";

const WSContent = (props) =>{

    return(
        <>
            <div className={"content-margin"} style={{overflow:"hidden"}}>
                <div className={"page-padding"}>
                    <div className={"content-margin-box"} style={{borderBottom:"1px solid #e4e4e4"}}>
                        <div style={{fontWeight:"bold",padding:"0 3px 10px"}}>接口详情</div>
                        <MenuSelect />
                    </div>
                </div>
                <div className={"content-margin page-padding"} style={{height:"calc(100% - 80px)"}}>
                    <div className="content-margin-box">
                        {renderRoutes(props.route.routes)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default WSContent;