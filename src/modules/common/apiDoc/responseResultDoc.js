import React from "react";
import {Tabs, Tag} from "antd";
import ReactMonacoEditor from "../monacoEditor/reactMonacoEditor";
const { TabPane } = Tabs;

const ResponseResultDoc = (props) =>{
    const {dataSource} = props;




    const showTabPane = (list) =>{
        return list && list.map(item=>{
            return <TabPane tab={item.name+"("+item.httpCode+")"} key={item.id}>
                    <div>
                        <Tag>{item.dataType}</Tag>
                        {
                            item.dataType==="json"
                                ?<ReactMonacoEditor
                                    value={JSON.stringify(JSON.parse(item.jsonText),null,4)}
                                    language={"json"}
                                    readOnly={true}
                                    height={"200px"}
                                    width={"100%"}
                                />
                                :<ReactMonacoEditor
                                    value={item.rawText}
                                    language={"text"}
                                    readOnly={true}
                                    height={"200px"}
                                    width={"100%"}
                                />
                        }
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