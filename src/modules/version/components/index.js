/**
 * @description：版本插件入口
 * @date: 2021-07-22 11:17
 */
import React from 'react';
import {Dropdown,Button,Menu} from "antd";
import VersionAdd from "./versionAdd";
import VersionList from "./versionList";


const Version = (props) => {


    const menu = (
        <Menu>
            <Menu.Item key={'addversion'}>
                <VersionAdd />
            </Menu.Item>
            <Menu.Item key={'historyversion'}>
                <VersionList {...props}/>
            </Menu.Item>
        </Menu>
    );


    return(
        <>
            <Dropdown overlay={menu} placement="bottomCenter">
                <Button className="important-btn">版本</Button>
            </Dropdown>
        </>
    )
}

export default Version;
