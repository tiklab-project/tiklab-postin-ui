import React from "react";
import {Dropdown, Menu, Popconfirm} from "antd";
import IconCommon from "../../../common/IconCommon";


const HideDelete = (props) =>{
    const {deleteFn} = props;


    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <Popconfirm
                    title="确定删除？"
                    onConfirm={deleteFn}
                    okText='确定'
                    cancelText='取消'
                    placement="topRight"
                >
                    <a >删除</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );


    return(
        <>
            <Dropdown overlay={menu} placement="bottomRight">
                <span>
                     <IconCommon
                         icon={"more"}
                         className={"icon-s edit-icon"}
                     />
                </span>
            </Dropdown>

        </>
    )
}

export default HideDelete;