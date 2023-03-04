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
                return(
                    <div
                        style={{
                            background: "#0078d4",
                            padding: "0 5px",
                            borderRadius:" 2px",
                            color: "white",
                            height: "22px"
                        }}
                    >
                        {protocolType.http.toUpperCase()}
                    </div>
                )
            case protocolType.https:
                return <div className={"api-protocol-type-http"}> {protocolType.https.toUpperCase()}</div>
            case protocolType.ws:
                return <div className={"api-protocol-type-http"}> {protocolType.ws.toUpperCase()}</div>
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