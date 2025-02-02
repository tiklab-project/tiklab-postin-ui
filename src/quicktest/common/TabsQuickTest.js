import React, {useState} from "react";
import {Select, Spin, Tabs} from "antd";
import {observer} from "mobx-react";
import {TextMethodType} from "../../common/MethodType";
import {initTabPane} from "./quickTestData";
import tabQuickTestStore from "../store/TabQuickTestStore";
import HttpTest from "../http/components/HttpTest";
import WSTest from "../ws/components/WSTest";
import "../http/components/testCase.scss"
import "../http/components/quickTestStyle.scss"

const {TabPane} = Tabs;
const {Option} = Select;

/**
 * 快捷测试
 * tab
 */
const TabsQuickTest = (props) =>{
    const {setTabPaneInfo,tabPaneInfo,updateProtocol,protocol,loading} = tabQuickTestStore;

    const [action, setAction] = useState(false);


    /**
     * 切换tab
     */
    const onChange = (activeKey) => {
        setTabPaneInfo({...tabPaneInfo, activeKey:activeKey})
    };

    /**
     * tab添加 删除
     */
    const onEdit  = (targetKey, action)=>{
        switch (action){
            case "add": add(); break
            case "remove":remove(targetKey); break
        }
    }


    /**
     * 添加tab标签处理
     */
    const add = ()=>{
        let { tabList } = tabPaneInfo;
        let newTabList = [...tabList, initTabPane];
        let activeKey = JSON.stringify(newTabList.length - 1);
        let newTabInfo = { activeKey:activeKey, tabList: newTabList };

        setTabPaneInfo(newTabInfo)
        setAction(!action);
    }

    /**
     * 删除tab标签处理
     */
    const remove = (targetKey) => {
        let { tabList, activeKey } = tabPaneInfo;
        let newList = [...tabList];
        newList.splice(targetKey, 1);
        let newActiveKey = activeKey < tabList.length - 1 ? activeKey : JSON.stringify(newList.length - 1);

        //如果删除所有的标签后 newActiveKey 会等于 -1，把它重新设置为0
        let updatedActiveKey = newActiveKey < 0 ? "0" : newActiveKey;
        let newTabInfo = {
            activeKey: updatedActiveKey,
            tabList: newList.length ? newList : [initTabPane]
        };
        setTabPaneInfo(newTabInfo)
        setAction(!action);
    };

    /**
     * 切换tab标签
     */
    const changeTabPane = (activeKey) =>{
        let newTabInfo = {...tabPaneInfo,activeKey:activeKey}

        setTabPaneInfo(newTabInfo)
    }

    const changeTabPaneProtocol = (protocol) =>{
        updateProtocol(protocol)
    }

    const toggleProtocol = () =>{
        return <div style={{height:"40px"}}>
            <Select
                style={{
                    width:"85px",
                    marginRight: "-1px",
                    zIndex: 10
                }}
                size={"large"}
                value={protocol}
                onSelect={changeTabPaneProtocol}
            >
                <Option value={"http"}>HTTP</Option>
                <Option value={"ws"}>WS</Option>
            </Select>
        </div>
    }



    /**
     * 关闭所有标签
     */
    const closeAllTab = () =>{
        let newTabInfo = {
            activeKey: "0",
            tabList:  [initTabPane]
        };
        setTabPaneInfo(newTabInfo)
        setAction(!action);
    }

    /**
     * 关闭其他标签
     */
    const closeOtherTab = () =>{
        let { tabList, activeKey } = tabPaneInfo;
        let newList = [...tabList];
        newList = newList.filter((item, idx) => idx === parseInt(activeKey)); // 过滤出指定下标的项

        let newTabInfo = {
            activeKey: "0",
            tabList:  newList
        };
        setTabPaneInfo(newTabInfo)
        setAction(!action);
    }

    const items = [
        {
            key: '1',
            label: (<a onClick={closeAllTab}>关闭所有标签</a>),
        },
        {
            key: '3',
            label: (<a onClick={closeOtherTab}>关闭其他标签</a> ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <div className={"qk-test-box"}>
                <Tabs
                    type="editable-card"
                    onChange={onChange}
                    activeKey={tabPaneInfo.activeKey}//字符串才生效
                    onEdit={onEdit}
                    onTabClick={changeTabPane}
                    style={{background: "var(--pi-bg-grey-100)"}}
                >
                    {
                        tabPaneInfo&&tabPaneInfo.tabList.map((item,index )=> (
                            <TabPane
                                tab={
                                    <>
                                        {
                                            item.protocol==="http"
                                                ?<TextMethodType type={item.data.baseInfo.methodType} />
                                                :<span  style={{color:"rgb(46 167 255)"}} className={"requestType"}>WS</span>
                                        }

                                        {item.data.baseInfo.path?item.data.baseInfo.path:"新标签"}
                                    </>
                                }
                                key={index}
                                style={{background:"white"}}
                            >
                                {
                                    protocol==="http"
                                        ?<HttpTest
                                            sendTest={props.sendTest}
                                            toggleProtocol={toggleProtocol}
                                            {...props}
                                        />
                                        :<WSTest
                                            toggleProtocol={toggleProtocol}
                                            {...props}
                                        />
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </div>
        </Spin>
    );
}

export default observer(TabsQuickTest);