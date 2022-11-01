import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Menu} from "antd";

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
    ]

    const [current, setCurrent] = useState('/home');

    const onClick = (e) => {
        console.log('click ', e);
        props.history.push(e.key)
        setCurrent(e.key);
    };



    return(
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}
export default inject("workspaceStore")(observer(HeaderMenu));