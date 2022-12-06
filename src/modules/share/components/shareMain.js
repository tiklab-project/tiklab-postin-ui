import React, {useEffect, useState} from "react";
import {Axios} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import {Anchor} from "antd";
import ShareVerify from "./shareVerify";
import ApiDoc from "./apiDoc";

const { Link } = Anchor;

const ShareMain = (props) =>{
    const {shareStore} = props;

    const {findShareTree } = shareStore;

    const [apiDoc, setApiDoc] = useState();
    const [treeList, setTreeList] = useState();
    const [getApiId, setGetApiId] = useState();
    const [verify, setVerify] = useState(-1);
    const [backVerify, setBackVerify] = useState(false);

    const getUrlId = ()=>{
        let url = window.location.href
        let index = url.indexOf("share/")
        return  url.substr(index+6);
    }

    useEffect(async ()=>{
        let id = getUrlId()
        setGetApiId(id)

        let res = await Axios.get(`/share/${id}`)

        if(res.code===0&&res.data.visibility===0){
            setVerify(0)
        }else {
            setVerify(1)
        }
    },[])

    useEffect(()=>{
        let id = getUrlId();

        let param =  new FormData()
        param.append("id",id)

        findShareTree(param).then(res=>{
            setTreeList(res)
            // setApiDoc(res[0].nodeList[0])
        })
    },[])



    return(
        <>
            {
                verify===1&& !backVerify
                    ?<ShareVerify
                        setBackVerify={setBackVerify}
                        urlId={getApiId}
                    />
                    :<ApiDoc />
            }

        </>


    )
}

export default inject("shareStore")(observer(ShareMain));

