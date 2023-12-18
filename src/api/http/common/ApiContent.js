import React, {useEffect} from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";
import {Dropdown, Menu, Space, Tag} from "antd";
import ShareModal from "../document/components/ShareModal";
import apxMethodStore from "../definition/store/ApxMethodStore";
import apiStore from "../../api/store/APIStore";
import {useHistory} from "react-router";
import categoryStore from "../../../category/store/CategoryStore";
import {observer} from "mobx-react";

const ApiContent = (props) =>{
    const { findApxMethod,apiInfo } = apxMethodStore;
    const {deleteApi} = apiStore;
    const {findCategoryList} = categoryStore;

    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem("apiId")

    const history = useHistory()

    useEffect(async ()=>{
        await findApxMethod(apiId);
    },[apiId])

    const moreMenu = (
        <Menu>
            <Menu.Item>
                <a
                    onClick={async ()=> {
                        await deleteApi(apiId)
                        await findCategoryList(workspaceId);
                        history.push("/workspace/apis/category")
                    }}
                >
                    删除
                </a>
            </Menu.Item>
        </Menu>
    )

    return(
        <>
            <div className={"content-margin"} style={{overflow:"hidden",padding:"20px 0 0 "}}>
                <div className={"padding-left-right"}>
                    <div className={"content-margin-box"} style={{borderBottom:"1px solid #e4e4e4"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Space>
                                <span style={{fontWeight:"bold"}}>{apiInfo?.apix?.name}</span>
                                <Tag color={apiInfo?.apix?.status?.color} style={{margin:"0 10px"}}>{apiInfo?.apix?.status?.name}</Tag>
                            </Space>
                            <Space>
                                <ShareModal
                                    targetId={apiId}
                                    targetType={"api"}
                                    targetName={apiInfo?.apix?.name}
                                    icon={true}
                                />
                                <Dropdown overlay={moreMenu} overlayStyle={{width:"150px",height:"10px"}}>
                                    <svg className="icon-s" aria-hidden="true" style={{cursor:"pointer"}}>
                                        <use xlinkHref={`#icon-more`}/>
                                    </svg>
                                </Dropdown>

                            </Space>
                        </div>

                        <MenuSelect />
                    </div>
                </div>
                <div className={"content-margin padding-left-right"} style={{height:"calc(100% - 78px)"}}>
                    <div className="content-margin-box">
                        {renderRoutes(props.route.routes)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default observer(ApiContent);