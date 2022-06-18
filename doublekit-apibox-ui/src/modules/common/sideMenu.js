import React, {useState} from "react";

const SideMenu = (props) =>{
    const {selectedKey} = props;

    let localSelectKey = localStorage.getItem("LEFT_NAV_SELECTED")

    /**
     * 点击左侧菜单，设置路由地址
     * @param {*} key
     */
    const selectKeyFun = (key)=>{
        localStorage.setItem("LEFT_NAV_SELECTED",key)
        props.history.push(key);
    }


    /**
     *左侧导航循环渲染
     */
    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.key} >
                    <div className={`ws-menu-li ${Item.key ===( localSelectKey||selectedKey) ? "ws-menu-li-action" : null}`}
                         key={Item.key}
                         onClick={()=>selectKeyFun(Item.key)}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${Item.icon}`} />
                        </svg>
                        <span >
                            {Item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }

    return(
        <div className={"ws-side-menu"}>
            <ul className="ws-menu-ul">
                {
                    renderList(props.item)
                }
            </ul>

        </div>
    )
}

export default SideMenu;