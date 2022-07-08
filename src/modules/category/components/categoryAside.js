/*
 * @Description: 空间详情左侧导航栏
 * @Author: sunxiancheng
 */

import React, {useEffect} from 'react';
import { observer, inject } from "mobx-react";
import {CategoryEdit,CategoryNav} from '../index'
import { Input, Button, Dropdown, Menu} from 'antd';
import Import from "../../integration/imexport/components/import";

const CategoryAside = (props) => {
    const { categoryStore } = props;
    const { findCategoryList } = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');

    // 搜索目录
    const onSearch=(e)=> {
        findCategoryList(workspaceId,e.target.value);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <CategoryEdit name="添加目录"  type="api" />
            </Menu.Item>
            <Menu.Item>
                {/*<Import workspaceId={workspaceId}/>*/}
            </Menu.Item>
        </Menu>
    );

    return(
        <div className='wsAside'>
            <div className={` detailmenu-fold  `}>
                <div className='ws-detail-menu'>
                    <div className="ws-detail-menu-serchbtn">
                        <Input
                            placeholder="搜索"
                            onPressEnter={onSearch}
                        />
                        <Dropdown overlay={menu}  className="ws-detail-dropdown" >
                            <Button>+</Button>
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


export default inject( 'categoryStore')(observer(CategoryAside)) ;
