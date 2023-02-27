import React, {useState} from "react";
import "./menuCommonStyle.scss"


const MenuCommon = (props) =>{


    const [selectItem, setSelectItem] = useState(props.selectedKey);


    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`menu-item ${item.key === selectItem ? "menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }


    const selectKeyFun = (item)=>{
        setSelectItem(item.key)

        props.history.push(item.key)
    }



    return(
        <div className={"menu-common-box"}>
            {showMenu(props.items)}
        </div>
    )
}

export default MenuCommon;