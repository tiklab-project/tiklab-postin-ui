import React from "react";
import {mediaTypeDir} from "../dictionary/dictionary";
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
            case mediaTypeDir.none.title:
                return null
            case mediaTypeDir.formdata.title:
                return <TableFormDoc dataSource={data?.formList}/>
            case mediaTypeDir.formUrlencoded.title:
                return <TableFormUrlDoc dataSource={data?.urlencodedList} />
            case mediaTypeDir.raw.title:
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