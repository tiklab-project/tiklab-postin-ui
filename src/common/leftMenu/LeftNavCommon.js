import React from "react";
import IconCommon from "../../common/IconCommon";
import "./LeftNavMenuStyle.scss"
import {SettingOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

/**
 * 左侧导航展示
 */
const LeftNavCommon = (props) =>{
    const {
        menuData,
        diffHeader,
        clickAddRouter,
        clickSetting,

    } = props;

    const leftRouter = localStorage.getItem("LEFT_MENU_SELECT")

    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.key}
                    className={`ws-left-nav-item  `}
                    onClick={()=>clickAddRouter(item)}
                >
                    <div className={`ws-left-nav-item-box ${leftRouter===item.router?"selectlink":null}`}>
                        <div className={"ws-left-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`}/>
                            </svg>
                        </div>
                        <div  className={"ws-left-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    return(
        <ul className={"ws-detail-left-nav"}>
            <div>
                {
                    diffHeader&&diffHeader()
                }
                {
                    showMenuItem(menuData)
                }
            </div>

            <div className={"ws-nav-setting"}>
                {props.HelpLink}

                {
                    props?.clickSetting&&<div className={`ws-detail-left-nav-item`} onClick={clickSetting}>
                        <Tooltip title="设置"  placement="right" >
                            <div className={`ws-detail-left-nav-item-box  ws-detail-left-nav-item-setting`}>
                                <div className={"ws-detail-left-nav-item-detail"}>
                                    <SettingOutlined style={{fontSize:"20px"}}/>
                                </div>
                            </div>
                        </Tooltip>
                    </div>
                }
            </div>
        </ul>
    )
}

export default LeftNavCommon;