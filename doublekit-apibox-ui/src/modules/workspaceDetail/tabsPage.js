import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {renderRoutes} from "react-router-config";
import ApxMethodEdit from "../apxMethod/http/components/apxMethodEdit";
import {inject, observer} from "mobx-react";
const { TabPane } = Tabs;

const TabsPage = (props) =>{
    const {apxMethodStore} = props;
    const { isAddTab } = apxMethodStore;
    const router = props.route.routes;
    const [activeKey,setActiveKey] = useState();
    const [actRemove,setActRemove] = useState(false)

    const apiTabListInfo = JSON.parse(sessionStorage.getItem("apiTabListInfo"))

    useEffect(()=>{
        // localStorage.setItem("")
        console.log('12121212')
    },[isAddTab,activeKey,actRemove])

    const onChange = (activeKey) => {
        console.log(activeKey)
        setActiveKey(activeKey)
    };

    const onEdit  = (targetKey, action)=>{
        switch (action){
            case "add": add(); break
            case "remove":remove(); break
        }
    }

    const add = ()=>{
        console.log("add---------")

    }

    const remove = ()=>{
        let list = apiTabListInfo.tabList;
        let newlist = list.slice(0,list.length-1);

        let newApiTabInfo = {};
        if(apiTabListInfo.activeKey<list.length-1){
            newApiTabInfo = {
                activeKey:apiTabListInfo.activeKey,
                tabList:newlist
            }
        }else {
            newApiTabInfo = {
                activeKey:newlist.length-1,
                tabList:newlist
            }
        }


        sessionStorage.setItem("apiTabListInfo",JSON.stringify(newApiTabInfo))
        setActRemove(!actRemove)
    }

    const changeTabPane = (activeKey) =>{
        let list = apiTabListInfo.tabList;
        let item = list[activeKey];

        let newTabInfo = {...apiTabListInfo,activeKey:activeKey}
        sessionStorage.setItem("apiTabListInfo",JSON.stringify(newTabInfo))

        let addRouter = props.history.push
        if(item.type==="api"){
            localStorage.setItem("apxMethodId",item.id)
            addRouter("/workspacepage/apis/detail/interface")
        }else {
            localStorage.setItem("categoryId",item.id)
            addRouter("/workspacepage/apis/detail/category")
        }
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
        <>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey?activeKey:String(apiTabListInfo.activeKey)}
                onEdit={onEdit}
                addIcon={<ApxMethodEdit name={"+"} type={"add"} />}
                onTabClick={changeTabPane}
            >
                {
                    showTabPaneView(apiTabListInfo)
                }
            </Tabs>

        </>

    );
}

export default inject("apxMethodStore")(observer(TabsPage));