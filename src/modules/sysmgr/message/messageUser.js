/*
 * @Description: 
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-02 17:28:24
 */
import React from "react";
import { UserMessage } from 'doublekit-message-ui';

const MsgUser = (props) => {
    return (
            <UserMessage {...props} application={"apibox"}/>
    )
}

export default MsgUser
