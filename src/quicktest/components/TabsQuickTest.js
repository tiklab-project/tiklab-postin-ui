import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {renderRoutes} from "react-router-config";

const {TabPane} = Tabs;

/**
 * 快捷测试
 * tab
 */
const TabsQuickTest = (props) =>{
    const router = props.route.routes;

    const [action, setAction] = useState(false);

    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    useEffect(()=>{
        console.log('quickTest')
        localStorage.setItem("instanceId","-1")
    },[action])

    /**
     * 切换tab
     */
    const onChange = (activeKey) => {
        const { tabList } = quickTestTabListInfo;
        let newTabInfo = {
            activeKey:activeKey,
            tabList:tabList
        }
        sessionStorage.setItem("quickTestTabListInfo", JSON.stringify(newTabInfo));
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
        const { tabList } = quickTestTabListInfo;

        const newTabId = "newTabPane"+Date.now(); // 使用时间戳生成唯一 ID
        const newTab = { name: "新标签", id: newTabId, type: "api" };

        const newTabList = [...tabList, newTab];
        const activeKey = JSON.stringify(newTabList.length - 1);
        const newTabInfo = { activeKey:activeKey, tabList: newTabList };

        sessionStorage.setItem("quickTestTabListInfo", JSON.stringify(newTabInfo));
        props.history.push("/workspace/quickTest/detail/api");
        setAction(!action);
    }

    /**
     * 删除tab标签处理
     */
    const remove = (targetKey) => {
        const { tabList, activeKey } = quickTestTabListInfo;
        let newList = [...tabList];
        newList.splice(targetKey, 1);

        let newActiveKey = activeKey < tabList.length - 1 ? activeKey : JSON.stringify(newList.length - 1);
        //如果删除所有的标签后 newActiveKey 会等于 -1，把它重新设置为0
        let updatedActiveKey = newActiveKey < 0 ? "0" : newActiveKey;

        let newTabInfo = {
            activeKey: updatedActiveKey,
            tabList: newList.length ? newList : [{ name: "新标签", id: Date.now(), type: "api" }]
        };

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTabInfo));
        setAction(!action);
    };

    /**
     * 切换tab标签
     */
    const changeTabPane = (activeKey) =>{
        const { tabList } = quickTestTabListInfo;
        let item = tabList[activeKey];

        let newTab = {...quickTestTabListInfo,activeKey:activeKey}

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTab))
        if(item.id.includes("newTabPane")){
            localStorage.setItem("instanceId","-1")
        }else {
            localStorage.setItem("instanceId",item.id)
        }

        props.history.push("/workspace/quickTest/detail/api")
    }



    return (
        <div className={"qk-test-box"}>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={quickTestTabListInfo.activeKey}//字符串才生效
                onEdit={onEdit}
                onTabClick={changeTabPane}
                style={{"backgroundColor":"var(--pi-bg-grey-100)"}}
            >
                {
                    quickTestTabListInfo&&quickTestTabListInfo.tabList.map((item,index )=> (
                        <TabPane
                            tab={item.name}
                            key={index}
                            forceRender
                        >
                            {
                                renderRoutes(router)
                            }
                        </TabPane>
                    ))

                }
            </Tabs>
        </div>

    );
}

export default TabsQuickTest;