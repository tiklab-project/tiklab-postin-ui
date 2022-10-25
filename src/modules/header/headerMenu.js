import React, {useState} from "react";
import {inject, observer} from "mobx-react";

const HeaderMenu = (props) =>{

    const [clickIcon, setClickIcon] = useState(false);

    const menuRouter = [
        {
            to:'/home',
            title:'主页',
            key: 'home'
        },
        {
            to:'/workspacePage',
            title:'空间',
            key: 'Workspace'
        },
        // {
        //     to:'/workbench',
        //     title:'工作台',
        //     key: 'workbench'
        // }
    ]

    const changeCurrentLink = item => {
        props.history.push(item)
        setClickIcon(false)
    }

    const menuView = (data) => {
        return data&&data.map(item => {
            return(
                <div
                    key={item.key}
                    onClick={ () => changeCurrentLink(item.to)}
                    className={"header-link-item"}
                >
                    {item.title}
                </div>
            )

        })
    }


    return(
        <>
            {
                menuView(menuRouter)
            }
        </>
    )
}
export default inject("workspaceStore")(observer(HeaderMenu));