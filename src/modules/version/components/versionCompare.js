import React, {useEffect, useState} from "react";
import {VersionStore} from "../store/versionStore";
import ReactJson from "react-json-view";
import "./versionStyle.scss"
import {observer} from "mobx-react";

import versionStore from "../store/versionStore";


const VersionCompare = () =>{
    let {compareVersion} = versionStore;

    const [versionData, setVersionData] = useState();
    let versionParam = localStorage.getItem("VERSION_INFO")

    useEffect(()=>{
        compareVersion(versionParam).then(res=>{
            setVersionData(res)
        })
    },[])

    return(
        <div className={"version-box"}>
            <div className={"version-item"}>
                <div className={"version-title"}>当前版本</div>
                <ReactJson
                    src={versionData?.current}
                    name={null}
                    style={{fontFamily:"sans-serif"}}
                    displayDataTypes={false}
                    enableClipboard={false}
                    displayObjectSize={false}
                />
            </div>
           <div className={"version-item"}>
               <div className={"version-title"}>历史版本</div>
               <ReactJson
                   src={versionData?.version}
                   name={null}
                   style={{fontFamily:"sans-serif"}}
                   displayDataTypes={false}
                   enableClipboard={false}
                   displayObjectSize={false}
               />
           </div>

        </div>
    )
}

export default observer(VersionCompare);