import React from "react";
import IconCommon from "../common/iconCommon";
import ApxMethodEdit from "../apxMethod/http/components/apxMethodEdit";

const TabApiInitPage = (props)=>{
    const item = [
        // {
        //     name:"新建接口",
        //     key:"http",
        //     icon:"APIwangguan"
        // },
        {
            name:"新建WebSocket",
            key:"ws",
            icon:"fenzhi",
            disabled:true
        }
    ]

    const showItem = (list) =>{
        return list.map(item=>{
            return <div key={item.key} className={`init-tab-item  ${item.disabled?"init-tab-item-disabled":null}`}>
                <div className={"init-tab-item-icon"}>
                    <IconCommon
                        icon={`${item.icon}`}
                        style={{margin:"0 10px 0 0"}}
                        className={"icon-x"}
                    />
                </div>
                <div className={"init-tab-item-title"}>{item.name}</div>
            </div>
        })
    }

    return(
        <div className={"ws-tab-init-box"}>
            <ApxMethodEdit
                type={"add"}
                tab={true}
                {...props}
            />
            {
                showItem(item)
            }
        </div>
    )
}

export default TabApiInitPage;