import React, {useState} from "react";
import {Button, Input, Space} from "antd";
import {Axios} from "thoughtware-core-ui";
import verifyImg from "../../../../assets/img/verify.png"

/**
 * 分享的验证页
 */
const ShareVerify  = (props) =>{
    const {setBackVerify,urlId} = props;

    const [getPassword, setGetPassword] = useState();

    /**
     * 验证密码
     */
    const verify =async () =>{
        const param = {
            id:urlId,
            password: getPassword
        }

        let res = await Axios.post("/share/verify",param);

        if(res.code ===0&&res.data.status==="success"){
            setBackVerify(true)
        }else {
            setBackVerify(false)
        }
    }



    return(
        <div className={"share-verify-box"}>
            <div className={"share-verify-box-content"}>
                <img src={verifyImg} alt={"verify"}/>
                <div className={"share-verify-box-content-title"}>
                    密码查看
                </div>
                <Space size={"small"}>
                    <Input
                        style={{height:40,width:300}}
                        placeholder={"输入密码"}
                        onBlur={(e)=>setGetPassword(e.target.value)}/>
                    <Button style={{height:40}}  onClick={verify}>查看</Button>
                </Space>
            </div>


        </div>
    )
}

export default ShareVerify;