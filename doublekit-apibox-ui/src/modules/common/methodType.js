import React from "react";
import "./commonStyle.scss";

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
            case  "head":
                return <span className={"requestType requestType-head"}>HEAD</span>
            case  "put":
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


export const TextMethodType = (props) =>{

    const showTextMethodType = (type) =>{
        switch (type){
            case "get":
                return <span className={"requestType requestType-get-text"}>GET</span>
            case "post":
                return <span className={"requestType requestType-post-text"}>POST</span>
            case "delete":
                return <span className={"requestType requestType-delete-text"}>DEL</span>
            case "head":
                return <span className={"requestType requestType-head-text"}>HEAD</span>
            case "put":
                return <span className={"requestType requestType-put-text"}>PUT</span>
            case "options":
                return <span className={"requestType requestType-options-text"}>OPTS</span>
            case "patch":
                return <span className={"requestType requestType-patch-text"}>PATCH</span>
        }
    }

    return(
        <>
            {
                showTextMethodType(props.type)
            }
        </>
    )
}