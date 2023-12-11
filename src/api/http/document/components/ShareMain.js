import React, {useEffect, useState} from "react";
import {Axios} from "thoughtware-core-ui";
import ShareVerify from "./ShareVerify";
import ApiDoc from "./ApiDoc";

/**
 * 分享的文档是否需要密码验证
 */
const ShareMain = (props) =>{

    const [targetId, setTargetId] = useState();
    const [verify, setVerify] = useState(-1);
    const [backVerify, setBackVerify] = useState(false);

    const getUrlId = ()=>{
        let url = window.location.href
        let index = url.indexOf("share/")
        return  url.substr(index+6);
    }

    useEffect(async ()=>{
        let id = getUrlId()
        setTargetId(id)

        let res = await Axios.get(`/share/${id}`)

        if(res.code===0&&res.data.visibility===0){
            setVerify(0)
        }else {
            setVerify(1)
        }
    },[])


    return(
        <>
            {
                verify===1&& !backVerify
                    ?<ShareVerify
                        setBackVerify={setBackVerify}
                        urlId={targetId}
                    />
                    :<ApiDoc  targetId={targetId}/>
            }

        </>


    )
}

export default ShareMain;

