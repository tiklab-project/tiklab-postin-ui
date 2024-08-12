import React, {useState} from "react";
import {Button, Input, Modal, Select, Tag, Tooltip, Radio, Col,Row} from "antd";
import IconCommon from "../../../common/IconCommon";
import {uuid} from "../../../common/utils/createId";
import {inject, observer} from "mobx-react";
import md5 from "js-md5"
import IconBtn from "../../../common/iconBtn/IconBtn";
import copyMockUrl from "../../../common/copyLink";
import shareStore from "../store/ShareStore";
const {Option} = Select;

/**
 * 分享的弹框组件
 */
const ShareModal  = (props) =>{
    const {targetId,targetType,targetName} = props;
    const {findShare,createShare,updateShare} =shareStore

    const [code, setCode] = useState();
    const [visibility, setVisibility] = useState(0);
    const [password, setPassword] = useState(uuid(6));
    const [shareUrl, setShareUrl] = useState();
    const [visible, setVisible] = useState(false);

    /**
     * 展示分享弹框
     */
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

             await createShare(param)
        }else {
            let data = res.data
            setVisibility(data.visibility);
            setPassword(data.password);
        }


        //通过当前 id，进行MD5，
        setShareUrl( window.location.origin+"/#/share/"+code)
        setVisible(true)
    }

    /**
     * 参数改变保存数据库
     */
    const changeType =async (e) =>{
        let type = e.target.value
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


        await updateShare(param)

    }

    // 改变密码
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


    // 展示目标名称
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


    /**
     *  弹框关闭
     */
    const onCancel = () => setVisible(false)

    /**
     * 展示分享的按钮效果
     */
    const showClickView = () =>{
        if(props.btn){
            return <IconBtn
                className="pi-icon-btn-grey"
                onClick={showModal}
                name={"分享"}
            />
        }

        if(props.icon){
            return(
                <Tooltip placement="bottom" title={"分享"}>
                    <span>
                       <IconCommon
                           icon={"fenxiang"}
                           style={{margin:"0 10px 0 0",cursor:"pointer"}}
                           className={"icon-s"}
                           onClick={showModal}
                       />
                    </span>
                </Tooltip>
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
                width={500}
            >

                <Row  className={"share-modal"} gutter={[16, 16]}>
                    <Col span={3}>名称 :</Col>
                    <Col span={21}>{targetName}</Col>

                    <Col span={3}>类型 :</Col>
                    <Col span={21}> <Tag  color="#55acee"> {showTargetName(targetType)}</Tag></Col>

                    <Col span={3} style={{lineHeight:"32px"}}>展示 :</Col>
                    <Col span={9}>
                        <Radio.Group
                            size={"middle"}
                            options={[
                                {
                                    label:"公开",
                                    value:0
                                },
                                {
                                    label:"密码查看",
                                    value:1
                                }
                            ]}
                            onChange={changeType}
                            defaultValue={visibility}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Col>
                    <Col span={11}>
                        {
                            visibility
                                ?<Input.Password
                                    style={{width: "160px", border: "1px solid #eee"}}
                                    defaultValue={password}
                                    onBlur={(e)=>changePassword(e.target.value)}
                                />
                                :<span />
                        }
                    </Col>
                    <Col span={3}>链接 :</Col>
                    <Col span={18}>
                        <div className={"share-modal-link"} id={"share-link"}>
                            {shareUrl}
                        </div>
                    </Col>
                    <Col span={3}>
                        <Button className={"important-btn"} type="primary" onClick={()=>copyMockUrl("share-link")}>复制</Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default observer(ShareModal)