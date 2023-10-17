import React from "react";
import {mediaTypeDir} from "../../../../common/dictionary/dictionary";
import TableFormDoc from "./TableFormDoc";
import TableFormUrlDoc from "./TableFormUrlDoc";
import RawDoc from "./RawDoc";
import JsonSchemaDoc from "./jsonParamDoc/JsonSchemaDoc";

/**
 * 文档
 * 请求体
 */
const RequestBodyDoc = (props) =>{
    const {dataSource,protocolType} = props

    /**
     * 渲染对应类型的组件
     */
    const showItemComponent = (data)=>{

        if(protocolType==="ws"){
            switch(data?.request?.bodyType) {
                case mediaTypeDir.json.title:
                    return <JsonSchemaDoc schemaStr={data?.jsonParam?.jsonText}/>
                case mediaTypeDir.raw.title:
                    return <div><RawDoc dataSource={data?.rawParam} /></div>
            }
        }else {
            switch(data?.request?.bodyType) {
                case mediaTypeDir.none.title:
                    return null
                case mediaTypeDir.formdata.title:
                    return <TableFormDoc dataSource={data?.formList}/>
                case mediaTypeDir.formUrlencoded.title:
                    return <TableFormUrlDoc dataSource={data?.urlencodedList} />
                case mediaTypeDir.json.title:
                    return <JsonSchemaDoc schemaStr={data?.jsonParam?.jsonText}/>
                case mediaTypeDir.raw.title:
                    return <div><RawDoc dataSource={data?.rawParam} /></div>
            }
        }
    }


    return(
        <>
            {
                showItemComponent(dataSource)
            }
        </>
    )
}

export default RequestBodyDoc;