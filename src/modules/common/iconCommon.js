import React from "react";

const IconCommon = (props) =>{
    const {icon,style,className} = props;

    return(
        <svg style={style} className={className} aria-hidden="true" >
            <use xlinkHref= {`#icon-${icon}`} />
        </svg>
    )
}

export default IconCommon;