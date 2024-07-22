import React from 'react';
import { observer } from "mobx-react";

import { Input, Dropdown, Menu} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import IconCommon from "../../common/IconCommon";
import Import from "../../support/imexport/components/Import";
import categoryStore from "../store/CategoryStore";
import NodeTree from "./NodeTree";
import CategoryEdit from "./CategoryEdit";
import "./category.scss"
import {debounce} from "../../common/commonUtilsFn/CommonUtilsFn";

/**
 * @Description: 空间详情左侧导航栏
 * @Author: sunxiancheng
 */
const CategoryAside = (props) => {
    const { findNodeTree } = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');

    /**
     * 搜索目录
     */
    const onSearch= async (e)=> {
        await findNodeTree({
            workspaceId:workspaceId,
            name:e.target.value
        });
    }

    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <CategoryEdit name="添加目录"  type="add" />
            </Menu.Item>
            <Menu.Item key={2}>
                <Import workspaceId={workspaceId}/>
            </Menu.Item>
        </Menu>
    );

    return(
        <div className='wsAside'>
            <div className={` detailmenu-fold  `}>
                <div className='ws-detail-menu'>
                    <div className="ws-detail-menu-serchbtn" style={{minWidth: "280px"}}>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="搜索"
                            onPressEnter={onSearch}
                            onChange={debounce(onSearch,500)}
                            allowClear
                        />
                        <Dropdown overlay={menu}  className="ws-left-tree-drop" >
                            <div>
                                <IconCommon
                                    className={"icon-s"}
                                    icon={"tianjia-"}
                                />
                            </div>
                        </Dropdown>
                    </div>
                    <div className='ws-detail-menu-ul-box'>
                        <NodeTree />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default observer(CategoryAside);
