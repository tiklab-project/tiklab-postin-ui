import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import ApiDocContent from "../../../api/http/common/apiDoc/ApiDocContent";
import noneImg from "../../../assets/img/nonedoc.png";
import shareStore from "../store/ShareStore";
import NodeTreeShare from "./NodeTreeShare";
import WSDocContent from "./WSDocContent";

const EmptyPage =() => {

    return(
        <div style={{
            width:100,
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "flex":1
        }}>
            <div>
                <img src={noneImg} alt={"none-img"} width={200} />
                <div style={{textAlign:"center"}}>点击接口查看</div>
            </div>
        </div>
    )
}

/**
 *接口文档公共组件
 */
const DocPage = (props) =>{
    const {findShareTree} = shareStore;

    const [apiData, setApiData] = useState();
    const [wsData, setWsData] = useState();
    const [treeList, setTreeList] = useState();
    const [nodeType, setNodeType] = useState();

    const getUrlId = ()=>{
        let url = window.location.href
        let index = url.indexOf("share/")
        return  url.substr(index+6);
    }

    useEffect(()=>{
        let param =  new FormData()
        param.append("id",getUrlId())

        findShareTree(param).then(res=>{
            setTreeList(res)
        })
    },[])


    const showDoc = (nodeType)=>{
        if(nodeType){
            switch (nodeType) {
                case "http":
                    if(apiData){
                        return <ApiDocContent
                            style={{width:"100%"}}
                            apiData={apiData}
                        />
                    }else {
                        return <EmptyPage />;
                    }
                case "ws":
                    if(wsData){
                        return <WSDocContent
                            style={{width:"100%"}}
                            wsData={wsData}
                        />
                    }else {
                        return <EmptyPage />;
                    }
            }
        }else {
            return <EmptyPage />;
        }
    }


    return(
        <div style={{height: "calc(100% - 48px)",overflow: "auto"}}>
            <div className={"share-box"}>
                <div className={"share-box-left"}>
                    <NodeTreeShare
                        setApiData={setApiData}
                        treeList={treeList}
                        setWsData={setWsData}
                        setNodeType={setNodeType}
                    />
                </div>
                <div className={"share-box-right"}  >
                    {
                        showDoc(nodeType)
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(DocPage);
