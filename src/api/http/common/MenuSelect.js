import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import EnvSelect from "../../../support/environment/components/EnvSelect";
import MenuSelectCommon from "../../../common/menuSelect/MenuSelectCommon";

const MenuSelect = () =>{

    let pathname = useLocation().pathname

    const [selectItem, setSelectItem] = useState(pathname||"/workspace/apis/http/document");
    let history = useHistory()

    useEffect(()=>{
        setSelectItem(pathname)
    },[pathname])

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
        <MenuSelectCommon
            items={items}
            selectItem={selectItem}
            right={<EnvSelect />}
            selectKeyFun={selectKeyFun}
        />
    )
}

export default MenuSelect