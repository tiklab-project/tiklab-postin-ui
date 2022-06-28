import React from "react";
import {Tabs} from "antd";
import {requestTabDictionary} from "../../dictionary/dictionary";

const { TabPane } = Tabs;

/***
 * 请求中的tab，公共组件
 */
const RequestTab = (props) =>{

    //渲染tabPane
    const showTabPane = (data)=>{
        let arr = Object.keys(data)

        return arr.map(item=>{
            return(
                <TabPane tab={data[item]} key={item} >
                    {
                        showTabPaneComponent(item)
                    }
                </TabPane>
            )
        })
    }

    //渲染相应tab下的组件
    const showTabPaneComponent =(type)=>{
        switch (type) {
            case "header":
                return props.header
            case "query":
                return props.query
            case "body":
                return props.body
            case "pre":
                return props.pre
            case "after":
                return props.after
        }
    }

    return(
        <>
            <Tabs
                className="tabs"
            >
                {
                    showTabPane(requestTabDictionary)
                }
            </Tabs>
        </>
    )
}

export default RequestTab;