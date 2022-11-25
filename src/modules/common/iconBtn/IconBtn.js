import React from "react";
import "./iconBtnStyle.scss"
import {Button} from "antd";

const IconBtn = (props) =>{
    const {name,className,onClick,icon,} = props;


    return(
        <div className={"pi-icon-btn-box"}>
            <Button className={`${className}`} style={{padding:"4px 10px"}} onClick={onClick}>
                <div className={`pi-icon-btn`} >
                    <svg className={"icon-s"} aria-hidden="true">
                        <use xlinkHref= {`#icon-${icon}`} />
                    </svg>
                    <span style={{margin:"0 0 0 5px"}}>{name}</span>
                </div>
            </Button>

        </div>

    )
}

export default IconBtn;