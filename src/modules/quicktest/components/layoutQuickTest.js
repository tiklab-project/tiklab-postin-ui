import React from "react";
import "./quickTestStyle.scss";
import LeftNavQuickTest from "./leftContantQuickTest";
import {renderRoutes} from "react-router-config";
import LeftNavListQuickTest from "./leftNavListQuickTest";

const LayoutQuickTest = (props) =>{
    const routes = props.route.routes;

    return(
        <div className={"quicktest-contant"}>
            <div className={"quicktest-left"}>
                {/*<LeftNavQuickTest />*/}
                <LeftNavListQuickTest  {...props}/>
            </div>
            <div className={"quicktest-right"}>
                {
                    renderRoutes(routes)
                }
            </div>
        </div>
    )
}

export default LayoutQuickTest;