import React from "react";
import {dir} from "./dictionary/dictionary";

/**
 * 协议类型
 */
const ProtocolType = (props) =>{
    const {type} = props;

    let protocolType =  dir.protocolType

    const showType = (type) =>{

        switch (type) {
            case protocolType.http:
                return <div
                    style={{
                        borderRadius:" 4px",
                        color: "#415dad",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                > {protocolType.http.toUpperCase()}</div>
            case protocolType.https:
                return <div
                    style={{
                        borderRadius:" 4px",
                        color: "#415dad",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                > {protocolType.https.toUpperCase()}</div>
            case protocolType.ws:
                return <div
                    style={{
                        borderRadius:" 4px",
                        color: "#2ea7ff",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                > {protocolType.ws.toUpperCase()}</div>
        }
    }


    return(
        <>
            {
                showType(type)
            }
        </>
    )
}

export default ProtocolType