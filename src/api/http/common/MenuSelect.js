import React, {useState} from "react";
import {useHistory, useLocation} from "react-router";
import EnvSelect from "../../../support/environment/components/EnvSelect";

const MenuSelect = () =>{

    let pathname = useLocation().pathname

    const [selectItem, setSelectItem] = useState(pathname||"/workspace/apis/http/document");
    let history = useHistory()

    //项目筛选列表
    const items = [
        {
            title: '文档',
            key: `/workspace/apis/http/document`,
        },
        {
            title: '设计',
            key: `/workspace/apis/http/edit`,
        }, {
            title: '调试',
            key: `/workspace/apis/http/test`,
        }, {
            title: 'MOCK',
            key: `/workspace/apis/http/mock`,
        }
    ];


    const selectKeyFun = (item) =>{
        setSelectItem(item.key)
        history.push(item.key)
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
            </div>
            <EnvSelect />
        </div>
    )
}

export default MenuSelect