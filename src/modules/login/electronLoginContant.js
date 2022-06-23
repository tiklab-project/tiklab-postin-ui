import React from "react";
import {ElectronLogin} from "doublekit-eam-ui";


const ElectronLoginContant =(props)=>{
    return(
        <ElectronLogin {...props}  loginGoRouter={'/auth_result'} />
    )
}

export default ElectronLoginContant;