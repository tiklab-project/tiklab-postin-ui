import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Dropdown, Menu, Space, Tabs} from "antd";
import ProtocolType from "../../../common/ProtocolType";
import categoryStore from "../../../category/store/CategoryStore";
import {useHistory} from "react-router";
import wsStore from "../ws/store/WSStore";
import AsyncComponent from "../../../common/lazy/SyncComponent";

const WSDocumentPage = AsyncComponent(()=>import ( "../document/components/WSDocumentPage"));
const WSDesignPage = AsyncComponent(()=>import ( "../design/components/WSDesignPage"));
const WSTestPage = AsyncComponent(()=>import ("../test/components/WSTestPage"));

const WsContent = (props) =>{
    const {findWSApi} = wsStore
    const {deleteNode,findNodeTree} = categoryStore;

    const [tabKey, setTabKey] = useState("document");
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

    const onChange = (key) => {
        console.log(key);
        setTabKey(key)
    };

    return(
        <div className={"page-center"}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Space>
                    <ProtocolType type={wsInfo?.apix?.protocolType}/>
                    <span style={{fontWeight:"bold"}}>{wsInfo?.node?.name}</span>
                </Space>

                <Dropdown overlay={moreMenu}>
                    <svg className="icon-m" aria-hidden="true" style={{cursor:"pointer"}}>
                        <use xlinkHref={`#icon-gengduo`}/>
                    </svg>
                </Dropdown>
            </div>
            <Tabs
                defaultActiveKey="document"
                onChange={onChange}
                items={[
                    {
                        label: `文档`,
                        key: 'document',
                        children: <WSDocumentPage tabKey={tabKey}/>,
                    },
                    {
                        label: `设计`,
                        key: 'design',
                        children: <WSDesignPage tabKey={tabKey}/>,
                    },
                    {
                        label: `测试`,
                        key: 'test',
                        children: <WSTestPage tabKey={tabKey}/>,
                    }
                ]}
            />
        </div>
    )
}
export default observer(WsContent);