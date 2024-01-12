/**
 * 点击空间，初始化的一些数据，并跳往空间详情
 */
import {getUser} from "thoughtware-core-ui";
import React from "react";
import pi1 from "../../../assets/img/pi1.png"
import pi2 from "../../../assets/img/pi2.png"
import pi3 from "../../../assets/img/pi3.png"
import pi4 from "../../../assets/img/pi4.png"
import pi5 from "../../../assets/img/pi5.png"

export const toWorkspaceDetail = (workspaceId,workspaceRecent,leftMenuSelect) => {

    //最近空间
    let params = {
        workspace: {id:workspaceId},
        user: {id:getUser().userId}
    }
    workspaceRecent(params)


    localStorage.setItem("LEFT_MENU_SELECT",leftMenuSelect?leftMenuSelect:"quickTest");

    localStorage.setItem('workspaceId',workspaceId);
}




export const ShowWorkspaceIcon = (props) => {
    const {url,className} = props

    const iconMap = {
        "pi1.png": pi1,
        "pi2.png": pi2,
        "pi3.png": pi3,
        "pi4.png": pi4,
        "pi5.png": pi5
    };

    const showIcon = ()=>{
        for (const key in iconMap) {
            if (url?.includes(key)) {
                return <img src={iconMap[key]} alt={"icon"} className={className} {...props}/>;
            }
        }
    }

    return(
        <>
            {showIcon()}
        </>
    )
};