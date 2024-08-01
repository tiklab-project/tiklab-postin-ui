import React, {useCallback, useEffect, useState} from "react";
import {Button, Form,Space} from "antd"
import { observer} from "mobx-react";
import ReactMonacoEditor from "../../../../common/monacoEditor/ReactMonacoEditor";
import apiResponseStore from "../store/ApiResponseStore";
import JsonSchemaTable from "../../../../common/JsonSchemaTable/JsonSchemaTable";

/**
 * 定义
 * http
 * 响应结果
 */
const ResponseResult = (props) =>{
    const {selectResult,curSelectInfo} = props;
    const {updateApiResponse} = apiResponseStore;

    const [rawText, setRawText] = useState(curSelectInfo?.rawText);


    /**
     * raw里面的数据改变，获取值
     */
    const rawChange = (value)=>{
        setRawText(value)
    }

    /**
     * 保存raw参数，防止切换类型后jsonText里面还有值
     */
    const saveRawText = async () =>{
        const param = {
            id: curSelectInfo?.id,
            httpId:curSelectInfo?.httpId,
            rawText:rawText,

            jsonText:"nullstring"
        }

        await updateApiResponse(param)
    }

    /**
     * raw 取消输入
     */
    const cancelRawText = () =>{
        setRawText(curSelectInfo?.rawText)
    }

    /**
     * 当旧的数据和新的输入不一样时，显示：取消、保存  按钮
     */
    const showSaveView = () =>{
        if(!curSelectInfo)return
        let isTrue = curSelectInfo.rawText!=rawText

        if(curSelectInfo?.dataType==="raw"&&isTrue){
            return <Space>
                <Button  onClick={cancelRawText}>取消</Button>
                <Button className={"important-btn"} type="primary" onClick={saveRawText}>保存</Button>
            </Space>
        }
    }

    /**
     * jsonschemaTable组件使用的更新
     */
    const jsonSchemaUpdate = async (updateValue)=>{
        let param = {
            id: curSelectInfo?.id,
            httpId:curSelectInfo?.httpId,
            jsonText:JSON.stringify(updateValue)
        }
        await updateApiResponse(param)
    }

    return(
        <div className={"api-res-result"}>
            <div className={"api-res-result-top-box"}>
                <Form layout={"inline"} style={{margin:" 0 0 10px 0"}}>
                    <Form.Item >
                        {selectResult&&selectResult}
                    </Form.Item>
                </Form>
                {
                    showSaveView()
                }
            </div>
            <div >
                {
                    curSelectInfo?.dataType==="json"
                        ? <div className={"tabPane-item-box"}>
                            <JsonSchemaTable
                                schema={JSON.parse(curSelectInfo?.jsonText)}
                                updateFn={jsonSchemaUpdate}
                            />
                        </div>
                        :<div style={{border:"1px solid #f0f0f0"}}>
                            <ReactMonacoEditor
                                editorChange={rawChange}
                                value={curSelectInfo?.rawText}
                                language={"text"}
                                height={"300px"}
                                width={"100%"}
                            />
                        </div>
                }
            </div>


        </div>
    )
}

export default observer(ResponseResult);