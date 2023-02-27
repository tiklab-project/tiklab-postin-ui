import React, {useEffect} from "react";
import logo from "../../../../assets/img/postinlog.png";
import "./shareStyle.scss"
import {renderRoutes} from "react-router-config";

const Share = (props) =>{

    const router = props.route.routes;

    return(
        <>
            <div className="frame-header">
                <div style={{
                    margin: "0 auto",
                    width: "1280px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }} >
                    <div className={"pi-header-right"}>
                        <div className={'frame-header-logo'}>
                            {logo && <img src={logo} alt='logo' />}
                        </div>
                    </div>
                    <div style={{color:"white"}}>
                        帮助
                    </div>
                </div>

            </div>
            {
                renderRoutes(router)
            }
        </>
    )
}

export default Share;