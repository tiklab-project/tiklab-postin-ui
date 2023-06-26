import React, {useState} from "react";
import {Tabs} from "antd";
import {inject, observer} from "mobx-react";
import {TextMethodType} from "../../common/MethodType";
import {initTabPane} from "./quickTestCommon";
import TestdetailQuickTest from "../components/TestdetailQuickTest";
import tabQuickTestStore from "../store/TabQuickTestStore";
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



    return (
        <div className={"qk-test-box"}>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={tabPaneInfo.activeKey}//字符串才生效
                onEdit={onEdit}
                onTabClick={changeTabPane}
                style={{"backgroundColor":"var(--pi-bg-grey-100)"}}
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
                            <TestdetailQuickTest {...props} sendRequest={props.sendRequest} />
                        </TabPane>
                    ))

                }
            </Tabs>
        </div>

    );
}

export default observer(TabsQuickTest);