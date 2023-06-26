import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import {CategoryEdit,CategoryNav} from '../index'
import { Input, Button, Dropdown, Menu} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import IconCommon from "../../common/IconCommon";
import Import from "../../support/imexport/components/Import";
import categoryStore from "../store/CategoryStore";
/**
 * @Description: 空间详情左侧导航栏
 * @Author: sunxiancheng
 */

const CategoryAside = (props) => {
    const { findCategoryList } = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');

    /**
     * 搜索目录
     */
    const onSearch=(e)=> {
        findCategoryList(workspaceId,e.target.value);
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
                        <CategoryNav className='ws-detail-menu-ul' {...props}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default observer(CategoryAside);
