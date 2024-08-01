import React from "react";
import "./iconBtnStyle.scss"
import {Button} from "antd";

/**
 * 按钮 可带icon
 */
const IconBtn = (props) =>{
    const {name,className,onClick,icon,type} = props;


    return(
        <div className={"pi-icon-btn-box"}>
            <Button className={`${className}`} type={type} style={{padding:"4px 10px"}} onClick={onClick} >
                <div className={`pi-icon-btn`} >
                    {
                        icon
                            ?<svg className={"icon-s"} aria-hidden="true" style={{margin:"0 5px 0 0 "}}>
                                <use xlinkHref= {`#icon-${icon}`} />
                            </svg>
                            :null
                    }

                    <span>{name}</span>
                </div>
            </Button>

        </div>

    )
}

export default IconBtn;