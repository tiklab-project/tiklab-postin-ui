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
        <div className='ws-detail-menu'>
            <div  className='api-category-header'>
                <div className={"api-category-header-title"}>接口</div>
                <Dropdown overlay={menu}  className="ws-left-tree-drop" >
                    <div>
                        <IconCommon
                            className={"icon-s"}
                            icon={"tianjia-"}
                        />
                    </div>
                </Dropdown>
            </div>
            <div className="ws-detail-menu-serchbtn">
                <Input
                    prefix={<SearchOutlined style={{fontSize:"16px"}} />}
                    placeholder="搜索"
                    onPressEnter={onSearch}
                    onChange={debounce(onSearch,500)}
                    allowClear
                    className={"api-search-box"}
                />
            </div>
            <div className='ws-detail-menu-ul-box'>
                <NodeTree />
            </div>
        </div>
    )
}


export default observer(CategoryAside);
