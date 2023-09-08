import React, {useState} from "react";
import {useHistory, useLocation} from "react-router";
import EnvSelect from "../../../support/environment/components/EnvSelect";
import {Dropdown, Menu, Space} from "antd";
import IconCommon from "../../../common/IconCommon";
import {CaretDownOutlined} from "@ant-design/icons";

const MenuSelect = () =>{

    let pathname = useLocation().pathname

    const [selectItem, setSelectItem] = useState(pathname||"/workspace/apis/content/document");
    let history = useHistory()

    //项目筛选列表
    const items = [
        {
            title: '文档',
            key: `/workspace/apis/content/document`,
        },
        {
            title: '设计',
            key: `/workspace/apis/content/edit`,
        },

    ];

    let testItem =  {
        title: '调试',
        key: `/workspace/apis/content/test`,
    }

    let mock = {
        title: 'MOCK',
        key: `/workspace/apis/content/mock`,
    }

    const selectKeyFun = (item) =>{
        setSelectItem(item.key)
        history.push(item.key)
    }


    const dropItem = (
        <Menu>
            <Menu.Item key={"default"}  onClick={()=>selectKeyFun(mock)}>MOCK</Menu.Item>
        </Menu>
    )


    const [mouseEnter, setMouseEnter] = useState(false);

    const toggleTestMock = (item) =>{
        setSelectItem(item.key)
        history.push(item.key)
        setMouseEnter(false)
    }

    return(
        <div className={"api-header-menu"}>
            <div className={"ws-header-menu-left"}>
                {
                    items.map(item=>{
                        return(
                            <div
                                key={item.key}
                                className={`ws-header-menu-item  ${item.key === selectItem ? "ws-header-menu-item-selected" : ""}`}
                                onClick={()=>selectKeyFun(item)}
                            >
                                <span> {item.title} </span>

                            </div>
                        )
                    })
                }
                <Space
                    className={" header-toggle-testormock"}
                    onMouseEnter={()=>setMouseEnter(true)}
                    onMouseLeave={()=>setMouseEnter(false)}
                >
                    <div
                        className={`
                            ws-header-menu-item  
                        ${
                            "/workspace/apis/content/test" === selectItem || "/workspace/apis/content/mock" === selectItem
                                ? "ws-header-menu-item-selected"
                                : ""
                        }`}
                    >
                        {
                            "/workspace/apis/content/test" === selectItem
                            ?<>
                                <div onClick={()=>toggleTestMock(testItem)}>调试</div>
                                <div
                                    className={`header-toggle-hover_show ${mouseEnter?"postin-show":"postin-hide"}`}
                                    onClick={()=>toggleTestMock(mock)}
                                >
                                    <div className={"header-menu-mock_title"}>MOCK</div>
                                </div>
                            </>

                            : <>
                                <div onClick={()=>toggleTestMock(mock)}>MOCK</div>
                                <div
                                    className={`header-toggle-hover_show ${mouseEnter?"postin-show":"postin-hide"}`}
                                    onClick={()=>toggleTestMock(testItem)}
                                >
                                    <div className={"header-menu-mock_title"}>调试</div>
                                </div>
                            </>
                        }

                    </div>
                    <CaretDownOutlined />
                </Space>

            </div>
            <EnvSelect />
        </div>
    )
}

export default MenuSelect