import React from "react";
import {bodyTypeJsonDictionary as bodyTypeJson} from "../dictionary/dictionary";
import TableFormDoc from "./TableFormDoc";
import TableFormUrlDoc from "./TableFormUrlDoc";
import RawDoc from "./RawDoc";

/**
 * 文档
 * 请求体
 */
const RequestBodyDoc = (props) =>{

    /**
     * 渲染对应类型的组件
     */
    const showItemComponent = (data)=>{
        switch(data?.request?.bodyType) {
            case bodyTypeJson.none:
                return null
            case bodyTypeJson.formdata:
                return <TableFormDoc dataSource={data?.formList}/>
            case bodyTypeJson.formUrlencoded:
                return <TableFormUrlDoc dataSource={data?.urlencodedList} />
            case bodyTypeJson.raw:
                return <div><RawDoc dataSource={data?.rawParam} /></div>
        }
    }

    return(
        <>
            {
                showItemComponent(props.data)
            }
        </>
    )
}

export default RequestBodyDoc;