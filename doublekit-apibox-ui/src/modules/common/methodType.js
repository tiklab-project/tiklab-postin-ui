import React from "react";
import "./commonStyle.scss"

//请求类型，如：get，post
const MethodType =(props) =>{

    const showMethodType = (type)=>{
        switch (type){
            case "get":
                return <span className={"requestType requestType-get"}>GET</span>
            case "post":
                return <span className={"requestType requestType-post"}>POST</span>
            case "delete":
                return <span className={"requestType requestType-delete"}>DEL</span>
            case "head":
                return <span className={"requestType requestType-head"}>HEAD</span>
            case "put":
                return <span className={"requestType requestType-put"}>PUT</span>
            case "options":
                return <span className={"requestType requestType-options"}>OPTS</span>
            case "patch":
                return <span className={"requestType requestType-patch"}>PATCH</span>
        }
    }


    return(
        <>
            {
                showMethodType(props.type)
            }
        </>
    )
}

export default MethodType;