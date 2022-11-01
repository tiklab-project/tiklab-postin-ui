import React from "react";

const DetailHeader = (props) =>{

    return(
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px"
            }}
        >
            <div>
                <span style={{
                    "fontSize":"16px",
                    "fontWeight":"600"
                }}>
                    {props.left}
                </span>
            </div>
            <div>
                {
                    props.right
                }
            </div>
        </div>
    )
}

export default DetailHeader;