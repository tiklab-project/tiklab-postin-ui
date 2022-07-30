import React from "react";
import {PluginList} from "tiklab-plugin-ui"

const PluginManage = (props) =>{
    return <PluginList {...props}  detailRouter={"/systemManagement/plugindetail"}/>
}

export default PluginManage;