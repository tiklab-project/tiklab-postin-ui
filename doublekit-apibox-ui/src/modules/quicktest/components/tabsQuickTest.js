import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {renderRoutes} from "react-router-config";

const {TabPane} = Tabs;

const TabsQuickTest = (props) =>{
    const router = props.route.routes;
    const [activeKey,setActiveKey] = useState();

    const [action, setAction] = useState(false);

    const quickTestTabListInfo = JSON.parse(sessionStorage.getItem("quickTestTabListInfo"))

    useEffect(()=>{
        console.log('12121212')
    },[activeKey,action,quickTestTabListInfo])



    const onChange = (activeKey) => {
        setActiveKey(activeKey)
    };



    const onEdit  = (targetKey, action)=>{
        switch (action){
            case "add": add(); break
            case "remove":remove(); break
        }
    }

    const [newTabId, setNewTabId] = useState(1);

    const add = ()=>{
        setNewTabId(newTabId+1);

        let list = quickTestTabListInfo.tabList;

        const newList = [...list];

        const tabId = `newTab${newTabId}`;

        newList.push({name:"新标签", id:tabId,type: "api"})

        let newTabInfo ={
            activeKey:newList.length,
            tabList:newList
        }

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTabInfo))
        setAction(!action)
    }

    const remove = (targetKey )=>{
        let list = quickTestTabListInfo.tabList;

        let newlist = list.slice(0,list.length-1);

        let newTabInfo = {};
        if(quickTestTabListInfo.activeKey<list.length-1){
            newTabInfo = {
                activeKey:quickTestTabListInfo.activeKey,
                tabList:newlist
            }
        }else {
            newTabInfo = {
                activeKey:newlist.length-1,
                tabList:newlist
            }
        }

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTabInfo))
        setAction(!action)
    }

    const changeTabPane = (activeKey) =>{
        let list = quickTestTabListInfo.tabList;
        let item = list[activeKey];

        let newTab = {...quickTestTabListInfo,activeKey:activeKey}

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTab))

        localStorage.setItem("testCaseId",item.id)
        props.history.push("/workspacepage/quickTest/detail/api")


    }

    //展示TabPane
    const showTabPaneView = (data) =>{
        let list = data.tabList;
        return list&&list.map((item,index )=> (
            <TabPane
                tab={item.name}
                key={index}
            >
                {
                    renderRoutes(router)
                }
            </TabPane>
        ))
    }

    return (
        <div style={{width:1240}}>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey?activeKey:String(quickTestTabListInfo.activeKey)}//字符串才生效
                onEdit={onEdit}
                onTabClick={changeTabPane}
            >
                {
                    showTabPaneView(quickTestTabListInfo)
                }
            </Tabs>
        </div>

    );
}

export default TabsQuickTest;