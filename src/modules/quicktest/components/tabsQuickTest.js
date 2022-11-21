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
        console.log('quickTest')
        localStorage.setItem("instanceId","-1")
    },[activeKey,action])



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
            activeKey:newList.length-1,
            tabList:newList
        }

        sessionStorage.setItem("quickTestTabListInfo",JSON.stringify(newTabInfo))
        props.history.push("/workspace/quickTest/detail/api")
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

        localStorage.setItem("instanceId",item.id)

        props.history.push("/workspace/quickTest/detail/api")
    }

    //展示TabPane
    const showTabPaneView = (data) =>{
        let list = data.tabList;
        return list&&list.map((item,index )=> (
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

    return (
        <div style={{height:"100%"}}>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey?activeKey:String(quickTestTabListInfo.activeKey)}//字符串才生效
                onEdit={onEdit}
                onTabClick={changeTabPane}
                style={{"backgroundColor":"var(--pi-bg-grey-100)"}}
            >
                {
                    showTabPaneView(quickTestTabListInfo)
                }
            </Tabs>
        </div>

    );
}

export default TabsQuickTest;