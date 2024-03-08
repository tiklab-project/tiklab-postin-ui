import React, {useEffect, useState} from "react";
import MenuSelect from "./MenuSelect";
import {renderRoutes} from "react-router-config";
import wsStore from "../ws/store/WSStore";
import {observer} from "mobx-react";
import {Dropdown, Menu, Space, Tag} from "antd";
import categoryStore from "../../../category/store/CategoryStore";
import {useHistory} from "react-router";

const WSContent = (props) =>{
    const {findWSApi} = wsStore

    const {deleteNode,findNodeTree} = categoryStore;

    const [wsInfo, setWsInfo] = useState();
    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem("apiId")
    const history = useHistory()


    useEffect(async ()=>{
        let info = await findWSApi(apiId);
        setWsInfo(info)
    },[apiId])

    const moreMenu = (
        <Menu>
            <Menu.Item>
                <a
                    onClick={async ()=> {
                        await deleteNode(apiId)
                        await findNodeTree({workspaceId:workspaceId});
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
            <div className={"content-margin padding-top-bottom"} style={{overflow:"hidden"}}>
                <div className={"padding-left-right"}>
                    <div className={"content-margin-box"} style={{borderBottom:"1px solid #e4e4e4"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Space>
                                <span style={{fontWeight:"bold"}}>{wsInfo?.node?.name}</span>
                                <Tag color={wsInfo?.apix?.status?.color} >{wsInfo?.apix?.status?.name}</Tag>
                            </Space>

                            <Dropdown overlay={moreMenu}>
                                <svg className="icon-s" aria-hidden="true" style={{cursor:"pointer"}}>
                                    <use xlinkHref={`#icon-more`}/>
                                </svg>
                            </Dropdown>


                        </div>

                        <MenuSelect />
                    </div>
                </div>
                <div className={"content-margin padding-left-right"} style={{height:"calc(100% - 80px)"}}>
                    <div className="content-margin-box">
                        {renderRoutes(props.route.routes)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default observer(WSContent);