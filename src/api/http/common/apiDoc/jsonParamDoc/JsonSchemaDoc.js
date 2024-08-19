import React, {useState} from "react";
import "./jsonSchemaDocStyle.scss"
import {jsonSchemaToJson} from "../../../../common/TestFunctionCommon";
import Mock from "mockjs";
import ReactMonacoEditor from "../../../../../common/monacoEditor/MonacoEditor";
import IconCommon from "../../../../../common/IconCommon";

const JsonSchemaDoc = ({schemaStr}) =>{

    /**
     * 根据schema生成 模拟数据示例
     */
    const showEg = (schemaStr) =>{
        let processJson = jsonSchemaToJson(JSON.parse(schemaStr))
        let jsonData =JSON.stringify(Mock.mock(processJson))

        return  <ReactMonacoEditor
            value={jsonData}
            language={"json"}
            height={"100%"}
            // width={"100%"}
            readOnly={true}
        />
    }

    return(
        <div className={"doc-json-box"}>
            <div className={"doc-json-item "}>
                <div className={"doc-json-title"}>数据结构</div>
                <div className={"doc-json-left-content"}>
                    <SchemaView schema={JSON.parse(schemaStr)} />
                </div>
            </div>
            <div className={"doc-json-right doc-json-item"}>
                <div className={"doc-json-title"}>示例</div>
                    {
                        schemaStr&&showEg(schemaStr)
                    }
            </div>
        </div>
    )
}


const SchemaView = ({schema}) => {

    /**
     * 初始化展开所有带层级的项
     * @param schema
     * @returns {{}}
     */
    const initializeExpanded = (schema) => {
        const expanded = {};
        const setExpanded = (schema) => {
            for (let key in schema.properties) {
                expanded[key] = true;
                const property = schema.properties[key];
                if ( property.type === 'object' && property.properties) {
                    setExpanded(property);
                }
            }
        }
        setExpanded(schema);
        return expanded;
    }

    const [expanded, setExpanded] = useState(initializeExpanded(schema));

    const toggleExpand = (key) => {
        setExpanded({
            ...expanded,
            [key]: !expanded[key]
        });
    }

    const isShow = (property,key) =>{
        if(property.type === 'object' && property.properties ){
            if(expanded[key]){
                return(
                    <IconCommon
                        icon={"zhankai"}
                        className="icon-s"
                        style={{cursor:"pointer"}}
                        onClick={() => toggleExpand(key)}
                    />
                )
            }else {
                return (
                    <IconCommon
                        icon={"W-03"}
                        className="icon-s"
                        style={{cursor:"pointer"}}
                        onClick={() => toggleExpand(key)}
                    />
                )
            }
        }else {
            return <div style={{width:"16px"}}/>
        }

    }

    const loopSchema = (schema, indent) => {

        const view = [];

        for (let key in schema.properties) {
            const property = schema.properties[key];

            view.push(
                <div className="property" key={key+indent}>
                    <div style={{paddingLeft: indent}} className={"left-content-item"}>
                        {isShow(property,key)}
                        <div className={"left-content-field"}>{key}</div>
                        <div className={"left-content-type"}>{property.type}</div>
                        { schema.required && schema.required.includes(key)
                            ?  <span className={"left-content-required"}>必填</span>
                            : null
                        }
                        <span className={"left-content-description"}>{property.description}</span>
                    </div>

                    {/* 判断是否有子属性 */}
                    {property.type === 'object' && property.properties && (
                        expanded[key] ? (
                            <div className="sub-properties">
                                {loopSchema(property,indent+15)}
                            </div>
                        ) : null
                    )}

                </div>
            );
        }
        return view;
    }

    return (
        <>
            {loopSchema(schema,0)}
        </>
    );
}


export default JsonSchemaDoc;