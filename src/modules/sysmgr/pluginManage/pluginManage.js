import React from "react";
import {PluginDetail,PluginList} from "doublekit-plugin-manage"

const PluginManage = (props) =>{
    return <PluginList {...props} detailRouter={"/plugindetail"}/>
}

export default PluginManage;