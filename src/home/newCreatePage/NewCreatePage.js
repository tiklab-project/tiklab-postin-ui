import React from "react";
import "./newCreatePageStyle.scss"
import IconCommon from "../../common/IconCommon";

const NewCreatePage = (props) => {

    const newCreateItem = [
        {
            title:"新建空间",
            router:"/workspaces-edit",
            icon:"cloud"
        }
    ]

    const clickCreateItem = (item) =>{
        //跳转到新建空间页面
        localStorage.setItem("LEFT_MENU_SELECT","/workspaces");
        props.history.push(item.router)
    }

    const showItem = (list) =>{
        return list.map(item=>{
            return(
                <div className={"create-item"} onClick={()=>clickCreateItem(item)}>
                    <div>
                        <IconCommon
                            icon={item.icon}
                            style={{width:"50px",height:"50px"}}
                        />
                    </div>
                    <div className={"create-item-title"}>
                        {item.title}
                    </div>
                </div>
            )
        })
    }


    return(
        <div className={"new-create-main"}>
            <div className={"create-item-box"}>
                {
                    showItem(newCreateItem)
                }
            </div>
        </div>
    )
}

export default NewCreatePage;