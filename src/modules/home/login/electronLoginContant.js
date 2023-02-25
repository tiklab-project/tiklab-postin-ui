import React from "react";
import {ElectronLogin} from "tiklab-eam-ui";


const ElectronLoginContant =(props)=>{
    return(
        <ElectronLogin {...props}  loginGoRouter={'/auth_result'} />
    )
}

export default ElectronLoginContant;