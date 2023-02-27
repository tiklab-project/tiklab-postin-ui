import React from "react"

const BackCommon = (props) => {

    return (
        <div className={"back-ex-header"}>
            <div>
                <span
                    onClick={props.clickBack}
                    className={"back-contant"}
                >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-fanhui2"/>
                    </svg>
                    返回
                </span>
            </div>
            <div>
                {props.right}
            </div>
        </div>
    )
}

export default BackCommon;