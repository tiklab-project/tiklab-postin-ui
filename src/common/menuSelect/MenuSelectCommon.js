import React from "react";
import "./menuSelectStyle.scss"

const MenuSelectCommon = (props) =>{
    const {items,selectKeyFun,selectItem,right} = props

    return(
        <div className={"ws-header-menu"}>
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
            {right}
        </div>
    )
}

export default MenuSelectCommon