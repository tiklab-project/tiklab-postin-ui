import React from "react";
import {message} from "antd";
import "./messageCommon.scss"

/**
 * alert 提示框
 */
export const messageFn = (type,content) =>{

    let successOptions = {
        content:content||"保存成功",
        className:"pi-message-success",
        duration: 1,
    }

    let errorOptions = {
        content:content||"保存失败",
        className:"pi-message-error",
        duration: 1,
    }

    const switchMessage = (type) =>{
        switch (type) {
            case "success":
                message.success(successOptions)
                break
            case "error":
                message.error(errorOptions)
                break
            default:
                message.error(errorOptions)
                break
        }
    }


    return(
        <>
            {switchMessage(type)}
        </>
    )
}
