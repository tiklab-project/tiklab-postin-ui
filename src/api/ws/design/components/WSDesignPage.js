import React, { useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';


/**
 * 接口编辑页
 */
const WSDesignPage = (props) => {

 

    const workspaceId = localStorage.getItem('workspaceId');
    const apiId = localStorage.getItem('apiId');



    useEffect(async ()=>{
       

    },[apiId]);

 
    return(
        <div className={"content-margin"} style={{height:"100%",padding:"0"}}>
            <div className="content-margin-box">
                wsde
            </div>
        </div>
    )
}

export default inject("userSelectStore")(observer(WSDesignPage));
