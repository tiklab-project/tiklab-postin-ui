import React, {useEffect, useState} from "react";
import ShareTree from "./ShareTree";
import {inject, observer} from "mobx-react";
import DocContent from "../../../../common/apiDoc/DocContent";
import noneImg from "../../../../assets/img/nonedoc.png";



const ApiDoc = (props) =>{
    const {shareStore,targetId} = props
    const {findShareTree} = shareStore;

    const [apiDoc, setApiDoc] = useState();
    const [treeList, setTreeList] = useState();
    const [initOpenCategory, setInitOpenCategory] = useState();

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
            setInitOpenCategory(res[0])
            // setApiDoc(res[0].nodeList[0])
        })
    },[])

    return(
        <div style={{height: "calc(100% - 48px)",overflow: "auto"}}>
            <div className={"share-box"}>
                <div className={"share-box-left"}>
                    <ShareTree
                        setApiDoc={setApiDoc}
                        treeList={treeList}
                        categoryId={initOpenCategory}
                    />
                </div>
                <div className={"share-box-right"}  >
                    {
                        apiDoc
                            ?<DocContent
                                style={{
                                    // display:"flex",
                                    // gap:10,
                                    width:"100%",
                                    // height: "100%",
                                    // margin:"0 auto"
                                }}
                                apiDoc={apiDoc}
                            />
                            :<div style={{
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
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("shareStore")(observer(ApiDoc));
