import React from "react";
import {ElectronLogin} from "tiklab-eam-ui";

/**
 * 用于electron验证登录
 */
const ElectronLoginContant =(props)=>{
    return(
        <ElectronLogin {...props}  loginGoRouter={'/auth_result'} />
    )
}

export default ElectronLoginContant;