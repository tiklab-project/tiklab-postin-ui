import React from "react";
import {useHasPointPlugin} from "tiklab-plugin-core-ui";
import {Popconfirm} from "antd";
import IconBtn from "../iconBtn/IconBtn";
import {getVersionInfo} from "tiklab-core-ui";
import {useHistory} from "react-router";

const PluginCommon =({plugin,name,point})=>{

    //判断是否有版本插件，返回的是true或false
    let hasVersionPlugin = useHasPointPlugin(point);
    let version = getVersionInfo()
    let history = useHistory()

    /**
     * 展示插件
     *
     *  {
        "release": 1:ce, 2:ee,3:saas
        "expired": true //过期 true，没过期false
        }
     */
    const showPluginView = () =>{
        //如果版本不为ce，没有过期，并且有插件就显示
        if(version.expired===false&&hasVersionPlugin){
            return <>{plugin}</>
        }else {
            return <Popconfirm
                title="想要升级增强功能？"
                onConfirm={()=>history.push("/setting/plugin")}
                okText='确定'
                cancelText='取消'
                placement="bottomRight"
            >
                <IconBtn
                    // className="pi-icon-btn-grey"
                    name={name}
                />
            </Popconfirm>
        }
    }

    return(
        <>
            {
                showPluginView()
            }
        </>
    )

}

export default PluginCommon