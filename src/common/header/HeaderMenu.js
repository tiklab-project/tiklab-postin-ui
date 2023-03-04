import React, {useState} from "react";
import {inject, observer} from "mobx-react";

/**
 * 头部左侧导航
 */
const HeaderMenu = (props) =>{

    //导航项
    const items = [
        {
            label: '首页',
            key: '/home',
        },
        {
            label: '空间',
            key: '/workspacePage',
        }
    ]

    const [current, setCurrent] = useState('/home');

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
export default inject("workspaceStore")(observer(HeaderMenu));