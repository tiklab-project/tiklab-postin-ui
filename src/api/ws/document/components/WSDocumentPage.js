import React, {useEffect, useState} from "react";
import { observer} from "mobx-react";

/**
 * 接口文档页面
 */
const WSDocumentPage = (props) =>{
    
    const apiId = localStorage.getItem('apiId');

    useEffect(async ()=>{
     
    },[apiId])


    return (
        <div className={"content-margin"} style={{padding:"0",  height: "calc(100% - 50px)"}}>
            <div className="content-margin-box">
                wsdoc
            </div>
        </div>
    );

}

export default observer(WSDocumentPage);