import React, {useState} from "react";
import {inject, observer} from "mobx-react";

const HeaderMenu = (props) =>{

    const items = [
        {
            label: '首页',
            key: '/home',
        },
        {
            label: '空间',
            key: '/workspacePage',
        },
        // {
        //     label: 'test',
        //     key: '/test',
        // },
    ]

    const [current, setCurrent] = useState('/home');

    const onClick = (e) => {
        props.history.push(e.key)
        setCurrent(e.key);
    };


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