import React from "react";
import {bodyTypeJsonDictionary as bodyTypeJson} from "../dictionary/dictionary";
import TableFormDoc from "./tableFormDoc";
import TableFormUrlDoc from "./tableFormUrlDoc";
import RawDoc from "./rawDoc";

const RequestBodyDoc = (props) =>{

    //渲染对应类型的组件
    const showItemComponent = (data)=>{
        switch(data?.request?.bodyType) {
            case bodyTypeJson.none:
                return null
            case bodyTypeJson.formdata:
                return <TableFormDoc dataSource={data?.formList}/>
            case bodyTypeJson.formUrlencoded:
                return <TableFormUrlDoc dataSource={data?.urlencodeList} />
            case bodyTypeJson.raw:
                return <RawDoc dataSource={data?.rawParam} />
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