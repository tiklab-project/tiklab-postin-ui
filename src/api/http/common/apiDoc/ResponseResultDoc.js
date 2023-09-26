import React from "react";
import {Tabs, Tag} from "antd";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";
import JsonSchemaDoc from "./jsonParamDoc/JsonSchemaDoc";
const { TabPane } = Tabs;

/**
 * 响应结果
 */
const ResponseResultDoc = (props) =>{
    const {dataSource} = props;

    /**
     * 渲染响应结果
     */
    const showTabPane = (list) =>{
        return list && list.map(item=>{
            return <TabPane tab={item.name+"("+item.httpCode+")"} key={item.id}>
                    <div>
                        {/*<Tag>{item.dataType}</Tag>*/}
                        <div style={{border:"1px solid var(--pi-border-color)"}}>
                            {
                                item.dataType==="json"
                                    ?<JsonSchemaDoc schemaStr={item?.jsonText}/>
                                    :<ReactMonacoEditor
                                        value={item.rawText}
                                        language={"text"}
                                        readOnly={true}
                                        height={"200px"}
                                        width={"100%"}
                                    />
                            }
                        </div>
                    </div>
            </TabPane>
        })
    }


    return(
        <div className={"share-request-item"}>
            <div>返回结果</div>
            <Tabs>
                {
                    showTabPane(dataSource)
                }
            </Tabs>
        </div>
    )
}

export default ResponseResultDoc;