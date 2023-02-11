import React, {useEffect, useState} from "react";
import {Button, Form, Input, Radio, Select, Space} from "antd"
import {inject, observer} from "mobx-react";
import Schema from "../../../common/jsonSchema/schema";
import ReactMonacoEditor from "../../../common/monacoEditor/reactMonacoEditor";
import {dir} from "../../../common/dictionary/dictionary";

const {Option} = Select;
// const httpCodes = [200,201,403,404,410,422,500,502,503,504]

const checkIsJsonSchema=(json)=> {
    try {
        json = JSON.parse(json);
        if (json.properties && typeof json.properties === 'object' && !json.type) {
            json.type = 'object';
        }
        if (json.items && typeof json.items === 'object' && !json.type) {
            json.type = 'array';
        }
        if (!json.type) {
            return false;
        }
        json.type = json.type.toLowerCase();
        let types = ['object', 'string', 'number', 'array', 'boolean', 'integer'];
        if (types.indexOf(json.type) === -1) {
            return false;
        }
        return JSON.stringify(json);
    } catch (e) {
        return false;
    }
}

const ResponseResult = (props) =>{
    const {apiResponseStore,jsonSchemaStore,resultId,httpId} = props;
    const {findApiResponse,updateApiResponse,findApiResponseList} = apiResponseStore;
    const {setSchemaData,schemaData} = jsonSchemaStore

    const [form] = Form.useForm();
    const [rawText, setRawText] = useState();
    const [dataValue, setDataValue] = useState();
    const [type, setType] = useState();



    useEffect(async ()=>{
        let res =  await findApiResponse(resultId)
        form.setFieldsValue({
            name:res.name,
            httpCode:res.httpCode,
            dataType:res.dataType
        })

        if(res.dataType==="json"){
            setSchemaData(JSON.parse(res.jsonText))
        }else {
            setRawText(res.rawText)
        }
        setType(res.dataType);

        setDataValue(res)
    },[resultId])


    //值改变，更新
    const onChange = async ()=>{
        let value = await form.getFieldsValue();
        value.id=resultId;
        value.httpId=httpId;

        await updateApiResponse(value)
        await findApiResponseList({httpId:httpId})
        setType(value.dataType)
    }


    //raw里面的数据改变，获取值
    const rawChange = (value)=>{
        setRawText(value)
    }

    //保存raw参数，防止切换类型后jsonText里面还有值
    const saveRawText = async () =>{
        const param = {
            id: dataValue?.id,
            httpId:dataValue?.httpId,
            rawText:rawText,

            jsonText:"nullstring"
        }

        await updateApiResponse(param)

        let res = await findApiResponse(resultId)
        setDataValue(res)
    }

    //raw 取消输入
    const cancelRawText = () =>{
        setRawText(dataValue?.rawText)
    }

    //当旧的数据和新的输入不一样时，显示：取消、保存  按钮
    const showSaveView = () =>{
        let isTrue = dataValue?.rawText!==rawText

        if(dataValue?.dataType==="raw"&&isTrue){
            return <Space>
                <Button  onClick={cancelRawText}>取消</Button>
                <Button className={"important-btn"} onClick={saveRawText}>保存</Button>
            </Space>
        }
    }

    return(
        <div className={"api-res-result"}>
            <div className={"api-res-result-top-box"}>
                <Form form={form}   layout={"inline"}  style={{margin:" 0 0 10px 0"}}>
                    <Form.Item
                        label="数据类型"
                        name="dataType"
                    >
                        <Radio.Group onChange={onChange}>
                            <Radio value={"json"}>json</Radio>
                            <Radio value={"raw"}>raw</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                {
                    showSaveView()
                }

            </div>
            <div style={{margin:" 0 0 0 10px"}}>
                {
                    type==="json"
                        ?<Schema
                            resultId={resultId}
                            httpId={httpId}
                        />
                        :<ReactMonacoEditor
                            editorChange={rawChange}
                            value={rawText}
                            language={"text"}
                            height={"300px"}
                            width={"100%"}
                        />
                }
            </div>


        </div>
    )
}

export default inject("apiResponseStore","jsonSchemaStore")(observer(ResponseResult));