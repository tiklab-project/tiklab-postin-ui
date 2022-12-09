import React, {useEffect, useState} from "react";
import {Button, Form, Input, Radio, Select, Space} from "antd"
import {inject, observer} from "mobx-react";
import Schema from "../../../common/jsonSchema/schema";
import ReactMonacoEditor from "../../../common/monacoEditor/reactMonacoEditor";

const {Option} = Select;
const httpCodes = [200,201,403,404,410,422,500,502,503,504]

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
    const {findApiResponse,updateApiResponse} = apiResponseStore;
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


    const onChange = async ()=>{
        let value = await form.getFieldsValue();
        value.id=resultId;
        value.httpId=httpId;

        await updateApiResponse(value)

        setType(value.dataType)
    }


    //raw
    const rawChange = (value)=>{
        setRawText(value)
    }

    const saveRawText = async () =>{
        const param = {
            id: dataValue?.id,
            httpId:dataValue?.httpId,
            rawText:rawText
        }

        await updateApiResponse(param)

        let res = await findApiResponse(resultId)
        setDataValue(res)
    }

    const cancelRawText = () =>{
        setRawText(dataValue?.rawText)
    }

    const showSaveView = () =>{
        if(dataValue?.dataType==="raw"&&dataValue?.rawText!==rawText){
            return <Space>
                <Button  onClick={cancelRawText}>取消</Button>
                <Button className={"important-btn"} onClick={saveRawText}>保存</Button>
            </Space>


        }
    }

    return(
        <div className={"res-result"}>
            <div className={"res-result-top-box"}>
                <Form form={form}   layout={"inline"}  style={{margin:" 0 0 20px 0"}}>
                    <Form.Item
                        label="HTTP 状态码"
                        name="httpCode"
                    >
                        <Select
                            showSearch
                            style={{width:120}}
                            onChange={onChange}
                        >
                            {
                                httpCodes.map(item=>{
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="名称 "
                        name="name"
                    >
                        <Input style={{width:120}}  onBlur={(e)=>onChange(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="数据类型"
                        name="dataType"
                    >
                        <Select
                            style={{width:120}}
                            onChange={onChange}
                        >
                            <Option value={"json"}>json</Option>
                            <Option value={"raw"}>raw</Option>
                        </Select>
                    </Form.Item>
                </Form>
                {
                    showSaveView()
                }

            </div>

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
    )
}

export default inject("apiResponseStore","jsonSchemaStore")(observer(ResponseResult));