import React from "react";
import "./userIcon.scss";

const Avatar = (props) => {
    const {name, isBig} = props;
    const showName = name ? name.charAt(0) : "A";
    return (
        <div className={isBig ? "user-big-icon" : "user-icon"} >
            {showName}
        </div>
    )

}

export default Avatar;