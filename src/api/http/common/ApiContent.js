import React, {useEffect, useState} from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";
import {Space} from "antd";
import ShareModal from "../document/components/ShareModal";
import apxMethodStore from "../definition/store/ApxMethodStore";
import apiStore from "../../api/store/APIStore";
import IconBtn from "../../../common/iconBtn/IconBtn";

const ApiContent = (props) =>{
    const { findApxMethod } = apxMethodStore;
    const {deleteApi} = apiStore;

    let apiId = localStorage.getItem("apiId")
    const [apiDoc, setApiDoc] = useState();

    useEffect(async ()=>{
        let res = await findApxMethod(apiId);
        setApiDoc(res)
    },[apiId])

    return(
        <>
            <div className={"content-margin"} style={{overflow:"hidden"}}>
                <div className={"page-padding"}>
                    <div className={"content-margin-box"} style={{borderBottom:"1px solid #e4e4e4"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{fontWeight:"bold",padding:"10px 3px"}}>接口详情</div>
                            <Space>
                                <ShareModal
                                    targetId={apiId}
                                    targetType={"api"}
                                    targetName={apiDoc?.apix?.name}
                                    btn={true}
                                />
                                <IconBtn
                                    icon={"shanchu3"}
                                    className="pi-icon-btn-grey"
                                    name={"删除"}
                                    onClick={()=>deleteApi(apiId)}
                                />

                            </Space>
                        </div>

                        <MenuSelect />
                    </div>
                </div>

                {renderRoutes(props.route.routes)}
            </div>
        </>
    )
}
export default ApiContent;