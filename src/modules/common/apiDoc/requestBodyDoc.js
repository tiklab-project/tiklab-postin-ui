import React from "react";
import {bodyTypeJsonDictionary as bodyTypeJson} from "../../common/dictionary/dictionary";
import TableFormShare from "../../common/apiDoc/tableFormShare";
import TableFormUrlShare from "../../common/apiDoc/tableFormUrlShare";
import RawShare from "../../common/apiDoc/rawShare";

const RequestBodyShare = (props) =>{

    //渲染对应类型的组件
    const showItemComponent = (data)=>{
        switch(data?.request?.bodyType) {
            case bodyTypeJson.none:
                return null
            case bodyTypeJson.formdata:
                return <TableFormShare dataSource={data?.formList}/>
            case bodyTypeJson.formUrlencoded:
                return <TableFormUrlShare dataSource={data?.urlencodeList} />
            case bodyTypeJson.raw:
                return <RawShare dataSource={data?.rawParam} />
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

export default RequestBodyShare;