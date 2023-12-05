import React, {useEffect, useState} from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";
import {Space} from "antd";
import ShareModal from "../document/components/ShareModal";
import apxMethodStore from "../definition/store/ApxMethodStore";
import apiStore from "../../api/store/APIStore";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {useHistory} from "react-router";
import categoryStore from "../../../category/store/CategoryStore";

const ApiContent = (props) =>{
    const { findApxMethod } = apxMethodStore;
    const {deleteApi} = apiStore;
    const {findCategoryList} = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem("apiId")
    const [apiDoc, setApiDoc] = useState();
    const history = useHistory()

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
                                    onClick={async ()=> {
                                        await deleteApi(apiId)
                                        await findCategoryList(workspaceId);
                                        history.push("/workspace/apis/category")
                                    }}
                                />

                            </Space>
                        </div>

                        <MenuSelect />
                    </div>
                </div>
                <div className={"content-margin page-padding"} style={{height:"calc(100% - 70px)"}}>
                    <div className="content-margin-box">
                        {renderRoutes(props.route.routes)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApiContent;