import React from "react";
import {PluginList} from "doublekit-plugin-ui"

const PluginManage = (props) =>{
    return <PluginList {...props} detailRouter={"/plugindetail"}/>
}

export default PluginManage;