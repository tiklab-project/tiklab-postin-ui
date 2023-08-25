import React from "react";
import {Tabs} from "antd";

const { TabPane } = Tabs;


/***
 * 请求中的tab，公共组件
 */
const RequestTab = (props) =>{
    const {tabTip} = props

    //渲染tabPane
    const showTabPane = (data)=>{
        let arr = Object.keys(data)

        return arr.map((item)=>{
            //如果没有传进来的assert组件，并且当前item是asset，直接返回null
            if(!props.assert&&item==="assert") return null

            return(
                <TabPane
                    tab={
                        <div style={{"display":"flex","alignItems":"center"}}>
                            {data[item]}
                            <div>
                                {
                                    tabTip&&tabTip[item] === true
                                        ?<div
                                            style={{
                                                background:"#00d403",
                                                width: "8px",
                                                height: "8px",
                                                borderRadius:" 8px",
                                                margin: "0 0 0 5px"
                                            }}> </div>
                                        :null
                                }
                            </div>
                        </div>
                    }
                    key={item}
                >
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

    //请求中tab的名称
    const requestTabDictionary = {
        "header":"请求头",
        "query":"查询参数",
        "body":"请求体",
        "pre":"前置脚本",
        "after":"后置脚本",
        "assert":"断言"
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