import React, {useState} from "react";
import {Button, Input, Modal, Select, Tag} from "antd";
import IconCommon from "../../../../common/iconCommon";
import {uuid} from "../../../../../common/utils/createId";
import {inject, observer} from "mobx-react";
import md5 from "js-md5"
import IconBtn from "../../../../common/iconBtn/IconBtn";
import copyMockUrl from "../../../../common/copyLink";

const {Option} = Select;

const ShareModal  = (props) =>{
    const {shareStore,targetId,targetType} = props;
    const {findShare,createShare,updateShare} =shareStore

    const [code, setCode] = useState();
    const [visibility, setVisibility] = useState(0);
    const [password, setPassword] = useState(uuid(6));
    const [shareUrl, setShareUrl] = useState();
    const [visible, setVisible] = useState(false);

    const showModal = async () =>{
        //通过当前id，进行md5，设置为分享的Id
        let code  = md5(targetId)
        setCode(code);

        let res = await findShare(code)
        //数据为空的话，创建分享
        if (res.code===0&&!res.data){
            let param = {
                code:code,
                targetId: targetId,
                targetType:targetType,
                visibility:visibility,
                password:null,

            }

             createShare(param)
        }else {
            let data = res.data
            setVisibility(data.visibility);
            setPassword(data.password);
        }


        //通过当前 id，进行MD5，
        setShareUrl( window.location.origin+"/#/share/"+code)
        setVisible(true)
    }


    const changeType = (type) =>{
        setVisibility(type);

        let param = {
            id:code,
            visibility:type,
            targetId:targetId,
            targetType:targetType
        }

        if(type===1){
            let password = uuid(6)
            setPassword(password);

            param = Object.assign({},param,{password:password})
        }else {
            param = Object.assign({},param,{password:"nullstring"})
            setPassword(null)
        }


        updateShare(param)

    }

    const changePassword = (value) =>{
        let param = {
            id:code,
            password:value,
            targetType:targetType,
            targetId:targetId,
            visibility:visibility
        }

        updateShare(param)
    }


    const showTargetName = (type) =>{

        switch (type) {
            case "workspace":
                return "空间"
            case "category":
                return "目录"
            case "api":
                return "接口"
        }

    }


    // 弹框关闭
    const onCancel = () => setVisible(false)

    const showClickView = () =>{
        if(props.btn){
            return <IconBtn
                className="pi-icon-btn-grey"
                icon={"fenxiang"}
                onClick={showModal}
                name={"分享"}
            />
        }

        if(props.icon){
            return(
                <IconCommon
                    icon={"fenxiang"}
                    style={{margin:"0 10px 0 0"}}
                    className={"icon-s"}
                    onClick={showModal}
                />
            )
        }else {
            return <a onClick={showModal}>分享</a>
        }

    }


    return(
        <>
            {showClickView()}
            <Modal
                destroyOnClose={true}
                title={"链接分享"}
                visible={visible}
                onCancel={onCancel}
                okText="提交"
                cancelText="取消"
                centered
                footer={false}
            >
                <div className={"share-modal"}>
                    <div className={"share-modal-item share-modal-top"}>
                        <div>{props.targetName}</div>
                        <Tag  color="#55acee"> {showTargetName(targetType)}</Tag>

                    </div>
                    <div className={"share-modal-item"}>
                        <Select
                            className={"share-modal-item-visibility"}
                            onChange={ changeType}
                            defaultValue={visibility}
                        >
                            <Option value={0}>公开</Option>
                            <Option value={1}>密码查看</Option>
                        </Select>
                        {
                            visibility
                                ?<Input.Password
                                    style={{width: 'calc(100% - 105px)'}}
                                    defaultValue={password}
                                    onBlur={(e)=>changePassword(e.target.value)}
                                />
                                :<span />
                        }
                    </div>
                    <div className={"share-modal-item"}>
                        <div className={"share-modal-link"} id={"share-link"}>
                            {shareUrl}
                        </div>
                        <Button className={"important-btn"} onClick={()=>copyMockUrl("share-link")}>复制链接</Button>
                    </div>

                </div>

            </Modal>

        </>
    )
}

export default inject("shareStore")(observer(ShareModal))