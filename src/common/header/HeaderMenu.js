import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";

/**
 * 头部左侧导航
 */
const HeaderMenu = (props) =>{

    // let pathname = useLocation().pathname;

    //导航项
    const items = [
        {
            label: '首页',
            key: '/home',
        },
        {
            label: '空间',
            key: '/workspaces',
        }
    ]

    const [current, setCurrent] = useState('/home');

    // useEffect(()=>{
    //     if(pathname==="home"){
    //         setCurrent('/home')
    //     }else if(pathname.includes("workspace")){
    //         setCurrent('/workspaces')
    //     }
    // },[pathname])

    /**
     * 点击跳往
     */
    const onClick = (e) => {
        props.history.push(e.key)
        setCurrent(e.key);
    };

    /**
     * 渲染导航项
     */
    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return (
                <div
                    key={item.key}
                    className={`header-menu-item ${current===item.key?"header-menu-item-action":""}`}
                    onClick={()=>onClick(item)}
                >
                    <span>{item.label}</span>
                </div>
            )
        })
    }

    return(
        <div className={"header-menu-box"}>
            {showMenuItem(items)}
        </div>

    )
}
export default HeaderMenu;