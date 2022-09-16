/*
 * @Description: 
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-02 17:28:24
 */
import React from "react";
import { UserMessage } from 'tiklab-message-ui';

const MsgUser = (props) => {
    return (
            <UserMessage {...props}  bgroup={"postin"}/>
    )
}

export default MsgUser
