import React, {useEffect, useState} from "react";
import {Dropdown, Menu, Space, Tabs} from "antd";
import ProtocolType from "../../../common/ProtocolType";
import ShareModal from "../../../support/share/components/ShareModal";
import apxMethodStore from "../definition/store/ApxMethodStore";
import categoryStore from "../../../category/store/CategoryStore";
import {useHistory} from "react-router";
import AsyncComponent from "../../../common/lazy/SyncComponent";
import {observer} from "mobx-react";
import EnvSelect from "../../../support/environment/components/EnvSelect";
const ApiDocument = AsyncComponent(() => import("../definition/components/ApiDocumentPage"));
const ApxMethodDetail = AsyncComponent(() => import( "../definition/components/ApxMethodEditPage"));
const TestBox = AsyncComponent(() => import( "../test/test/components/ApiTestPage"));
const Mock = AsyncComponent(() => import("../mock/components/Mock"));

const HttpContent = (props) =>{
    const { findApxMethod } = apxMethodStore;
    const {findNodeTree,deleteNode} = categoryStore;
    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem("apiId")
    const history = useHistory()

    const [apiInfo, setApiInfo] = useState();
    const [tabKey, setTabKey] = useState("document");

    useEffect(async ()=>{
        let info = await findApxMethod(apiId);
        setApiInfo(info)
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
                    <ProtocolType type={apiInfo?.apix?.protocolType}/>
                    <span style={{fontWeight:"bold"}}>{apiInfo?.node?.name}</span>
                    {/*<Tag color={apiInfo?.apix?.status?.color} style={{margin:"0 10px"}}>{apiInfo?.apix?.status?.name}</Tag>*/}
                </Space>
                <Space>
                    <ShareModal
                        targetId={apiId}
                        targetType={"api"}
                        targetName={apiInfo?.node?.name}
                        icon={true}
                    />
                    <Dropdown overlay={moreMenu} overlayStyle={{width:"150px",height:"10px"}}>
                        <svg className="icon-m" aria-hidden="true" style={{cursor:"pointer"}}>
                            <use xlinkHref={`#icon-gengduo`}/>
                        </svg>
                    </Dropdown>
                </Space>
            </div>

            <Tabs
                defaultActiveKey="document"
                onChange={onChange}
                tabBarExtraContent={<EnvSelect />}
                items={[
                    {
                        label: `文档`,
                        key: 'document',
                        children: <ApiDocument tabKey={tabKey}/>,
                    },
                    {
                        label: `设计`,
                        key: 'design',
                        children: <ApxMethodDetail tabKey={tabKey}/>,
                    },
                    {
                        label: `测试`,
                        key: 'test',
                        children: <TestBox tabKey={tabKey}/>,
                    },
                    {
                        label: `Mock`,
                        key: 'mock',
                        children: <Mock tabKey={tabKey}/>,
                    },
                ]}
            />
        </div>
    )
}

export default observer(HttpContent);