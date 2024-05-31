import React, {useState} from "react";
import {Button, Modal} from "antd";
import {getVersionInfo} from "thoughtware-core-ui";
import upgradeImg from "../assets/img/upgrade.png"
import IconCommon from "./IconCommon"

/**
 * 以btn形式展示
 */
const ShowBtnView = ({name,showModal}) =>{
    return(<Button
        onClick={showModal}
        style={{
            display: "flex",
            alignItems: "center",
            gap: "5px"
        }}
    >
        <span>{name}</span>
        <IconCommon
            icon={"version-ee"}
            className="icon-s"
        />
    </Button>)
}
/**
 * 以文字形式展示
 */
const ShowTxtView = ({name,icon,showModal,isHideIcon})=>{
    return(
        <div
            onClick={showModal}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer"
            }}
        >
            {icon ? (
                icon
            ) : (
                <>
                    <span>{name}</span>
                    {
                        isHideIcon
                            ? <span/>
                            :<IconCommon
                                icon={"version-ee"}
                                className="icon-s"
                            />
                    }
                </>
            )}
        </div>
    )
}



const ExtensionCommon =(props)=>{
    const {extension,name,isBtn,icon,isHideIcon} = props

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

        if(version==="ce"||version==="ee"){
            window.open("https://thoughtware.cn/account/subscribe/apply/postin")
        }else {
            window.open("https://work.thoughtware.cn/#/enterprise/application/postin")
        }
    };

    const handleCancel = () =>  setIsModalOpen(false);


    /**
     * 展示插件
     *
     *  {
        "release": 1:ce, 2:ee,3:saas
        "expired": true //过期 true，没过期false
        }
     */
    const showPluginView = () =>{
        let versionInfo = getVersionInfo()
        //如果版本不为ce，没有过期，并且有插件就显示
        if(versionInfo.expired===false&&extension){
            return <>{extension}</>
        }else {
            return <>
                {
                    isBtn
                    ?<ShowBtnView name={name} showModal={showModal} />
                    :<ShowTxtView name={name} showModal={showModal} icon={icon} isHideIcon={isHideIcon}/>
                }

                <Modal
                    title={`${name} 企业版`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText={"取消"}
                    okText={"订阅"}
                >
                    <div style={{
                        margin: "20px",
                        textAlign: "center",
                    }}>
                        <img src={upgradeImg} alt={"升级"} width={150}/>
                        <p>{`如想使用${name},请购买企业版Licence`}</p>
                    </div>
                </Modal>
            </>
        }
    }

    return(
        <>
            {
                showPluginView()
            }
        </>
    )
}

export default ExtensionCommon