import React from "react";
import {Button, Dropdown, Input, Menu} from "antd";
import {CategoryEdit} from "../../category";
import {inject, observer} from "mobx-react";
import LeftNavTreeQuickTest from "./leftNavTreeQuickTest";


const LeftContantQuickTest = (props) =>{
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
                <CategoryEdit name="添加目录"  type={"quick"}/>
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
                        <LeftNavTreeQuickTest />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject( 'categoryStore')(observer(LeftContantQuickTest));