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
            //如果没有传进来的assert组件，并且当前item是asset，直接返回null
            if(!props.assert&&item==="assert") return null

            return(
                <TabPane tab={data[item]} key={item} >
                    <div className={"tabPane-item-box"}>
                        {
                            showTabPaneComponent(item)
                        }
                    </div>
                </TabPane>
            )
        })
    }

    /**
     *   渲染相应tab下的组件
     */
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
            case "assert":
                return props.assert
        }
    }

    return(
        <Tabs className="tabs" size={"small"}>
            {
                showTabPane(requestTabDictionary)
            }
        </Tabs>
    )
}

export default RequestTab;