import React, {useState} from "react";
import {Button, Dropdown, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {TextMethodType} from "../../common/MethodType";
import {initTabPane} from "./quickTestData";
import TestdetailQuickTest from "../components/TestdetailQuickTest";
import tabQuickTestStore from "../store/TabQuickTestStore";
import IconCommon from "../../common/IconCommon";
const {TabPane} = Tabs;

/**
 * 快捷测试
 * tab
 */
const TabsQuickTest = (props) =>{
    const {setTabPaneInfo,tabPaneInfo} = tabQuickTestStore;

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
        <div className={"qk-test-box"}>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={tabPaneInfo.activeKey}//字符串才生效
                onEdit={onEdit}
                onTabClick={changeTabPane}
                // tabBarExtraContent={
                //     <div style={{
                //         marginRight:"25px",
                //         borderLeft: "2px solid #e4e4e4",
                //         padding: "10px 66px 10px 10px",
                //         cursor: "pointer",
                //         lineHeight: "15px"
                //     }}>
                //         <Dropdown
                //             menu={{items}}
                //             placement="bottomRight"
                //             arrow
                //             trigger={"click"}
                //             overlayStyle={{width: 170}}
                //         >
                //             <div>
                //                 <IconCommon
                //                     icon={"more"}
                //                     className={"icon-l edit-icon"}
                //                 />
                //             </div>
                //         </Dropdown>
                //     </div>
                //
                // }
            >
                {
                    tabPaneInfo&&tabPaneInfo.tabList.map((item,index )=> (
                        <TabPane
                            tab={
                                <>
                                    <TextMethodType type={item.data.baseInfo.methodType} />
                                    {item.data.baseInfo.path?item.data.baseInfo.path:"新标签"}
                                </>
                            }
                            key={index}
                        >
                            <TestdetailQuickTest {...props} sendTest={props.sendTest} />
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>

    );
}

export default observer(TabsQuickTest);