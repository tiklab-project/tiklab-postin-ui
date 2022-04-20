/**
 * @description：版本插件入口
 * @date: 2021-07-22 11:17
 */
import React from 'react';
import {Dropdown,Button,Menu} from "antd";
import AddVersion from './addVersion'

const Version = (props) => {

    console.log(props,'v')

    //跳到版本管理
    const toVersion = () => {
        props.history.push('/workspacepage/version')
    }

    const menu = (
        <Menu>
            <Menu.Item key={'addversion'}>
                <AddVersion {...props}>添加</AddVersion>
            </Menu.Item>
            <Menu.Item key={'historyversion'}>
                <a onClick={toVersion}> 查看历史</a>
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
