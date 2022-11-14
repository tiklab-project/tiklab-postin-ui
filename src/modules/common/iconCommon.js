import React from "react";

const IconCommon = (props) =>{
    const {icon,style,className,onClick} = props;

    return(
        <svg style={style} className={className} aria-hidden="true" onClick={onClick}>
            <use xlinkHref= {`#icon-${icon}`} />
        </svg>
    )
}

export default IconCommon;