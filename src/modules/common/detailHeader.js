import React from "react";

const DetailHeader = (props) =>{

    return(
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0 10px 10px"
            }}
        >
            <div>
                <span className={"ws-detail-title"}>
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