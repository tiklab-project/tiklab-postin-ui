import React, {useEffect, useState} from "react";
import {productWhiteImg} from "thoughtware-core-ui";
import {useHistory} from "react-router";
import {productTitle} from "thoughtware-core-ui/es/utils/product";
import "./LeftMenuCommonStyle.scss"
import {CaretLeftOutlined, CaretRightOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import MessageDrawer from "../../setting/message/MessageDrawer";
import {Dropdown} from "antd";
import IconCommon from "../IconCommon";
import {Profile} from 'thoughtware-licence-ui/es/commons'
import {AvatarLink} from "thoughtware-licence-ui";
import {AvatarLink as AvatarLinkCloud} from "thoughtware-licence-cloud-ui";

const LeftMenuCommon = (props) =>{
    const {
        menuData,
        diffHeader,
        setNewCreateWorkspaceModal,
        isFirst,
        workspaceId,
        HelpLink,AppLink
    } = props
    const history = useHistory()
    const LEFT_MENU_SELECT = localStorage.getItem("LEFT_MENU_SELECT")
    const [isExpanded, setIsExpanded] = useState(false);
    const [moreMenu, setMoreMenu] = useState([]);
    const [visibleMenuItems, setVisibleMenuItems] = useState([]);
    const [visible, setVisible] = useState(false);

    const resizeUpdate = () => {
        const documentHeight = window.innerHeight;
        const menuHeight = documentHeight - 220;
        const menuNum = Math.floor(menuHeight / 65);

        if (menuData.length > menuNum) {
            setVisibleMenuItems(menuData.slice(0, menuNum - 1));
            setMoreMenu(menuData.slice(menuNum - 1));
        } else {
            setVisibleMenuItems(menuData);
            setMoreMenu([]);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", resizeUpdate);
        resizeUpdate(); // 初始化调用
        return () => {
            window.removeEventListener('resize', resizeUpdate);
        };
    }, []);


    /**
     * 点击路由
     */
    const clickToPage = (item) => {
        if(item.router === "/new-create"){
            setNewCreateWorkspaceModal(true)
            return
        }

        if(item.key==="overview"){
            history.push(`/workspace/overview/${workspaceId}`)
        }else {
            history.push(item.router)
        }

        localStorage.setItem("LEFT_MENU_SELECT",item.router);
    };

    /**
     * 导航
     */
    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return(
                <li
                    key={item.key}
                    className={`menu-box-nav-item `}
                    onClick={()=>clickToPage(item)}
                >
                    <div
                        className={`menu-box-nav-item-box  
                            ${LEFT_MENU_SELECT===item.router?"selectlink":""}
                            ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}
                            `}>
                        <div className={"menu-box-nav-item-detail"}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-${item.icon}`}/>
                            </svg>
                        </div>
                        <div  className={"menu-box-nav-item-detail"}>
                            {item.name}
                        </div>
                    </div>
                </li>
            )
        })
    }

    /**
     * 更多列表
     */
    const showMore = (
        <div className={"more-menu-box"} style={{left:`${isExpanded?"200px":"81px"}`}}>
            {
                moreMenu.map(item=>{
                    return(
                        <div
                            className={`more-menu-box-item ${LEFT_MENU_SELECT===item.router?"more-menu-box-item-action":""}`}
                            onClick={()=>clickToPage(item)}
                        >
                            <div >
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-${item.icon}`}/>
                                </svg>
                            </div>
                            <div  >
                                {item.name}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

    /**
     * 更多
     */
    const moreItem = () => (
        <li
            key={"more"}
            className={`menu-box-nav-item `}
        >
            <Dropdown
                overlay={showMore}
                trigger={['click']}
                visible={visible}
                onOpenChange={()=>setVisible(!visible)}
                placement="top"
            >
                <div
                    className={`menu-box-nav-item-box ${isExpanded?"menu-box-nav-item-isExpanded":"menu-box-nav-item-not-isExpanded"}`}>
                    <div className={"menu-box-nav-item-detail"}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-gengduo`}/>
                        </svg>
                    </div>
                    <div  className={"menu-box-nav-item-detail"}>
                        更多
                    </div>
                </div>
            </Dropdown>
        </li>
    )

    return(
        <div className={`menu-box ${isExpanded?"menu-box-expended":"menu-box-not-expended"}`}>
            <div className={"menu-box-isexpanded"} onClick={()=>setIsExpanded(!isExpanded)}>
                {
                    isExpanded?<CaretLeftOutlined />:<CaretRightOutlined />
                }
            </div>
            <div className={'product-logo-box'} onClick={()=>clickToPage({router:"/home"})}>
                <img src={productWhiteImg.postin} alt='logo' className={"product-logo"}/>
                {
                    isExpanded&&<div className={"productName"} >{productTitle.postin}</div>
                }
            </div>
            <div className={"menu-box-flex"}>
                <ul className={"menu-box-nav"}>
                    {
                        diffHeader&&diffHeader(isExpanded)
                    }
                    {
                        showMenuItem(visibleMenuItems)
                    }
                    {
                        moreMenu&&moreMenu.length>0
                            &&moreItem()
                    }
                </ul>


                <div className={"menu-box-bottom"}>
                    {
                        isFirst&&<MessageDrawer isExpanded={isExpanded}/>
                    }

                    {
                        HelpLink&& <HelpLink
                            iconComponent={
                                <div className='menu-box-bottom-item'>
                                    <QuestionCircleOutlined style={{fontSize:"20px"}}/>
                                    {isExpanded && <div >帮助与支持</div>}
                                </div>
                            }
                        />
                    }
                    {
                        isFirst&&<div className='menu-box-bottom-item'>
                            <IconCommon
                                icon={"genghuanpifu"}
                                className={"icon-m"}
                            />
                            {isExpanded && <div>皮肤</div>}
                        </div>
                    }
                    {
                        AppLink&& <AppLink
                            iconComponent={
                                <div className='menu-box-bottom-item'>
                                    <IconCommon
                                        icon={"jiugongge"}
                                        className={"icon-m"}
                                    />
                                    {isExpanded && <div>应用导航</div>}
                                </div>
                            }
                        />
                    }
                    {
                        version!=="cloud"
                            ?<AvatarLink
                                iconComponent={
                                    <div className='menu-box-bottom-item-avatar'>
                                        <Profile />
                                        {isExpanded && <div >个人中心</div>}
                                    </div>
                                }
                                {...props}
                            />
                            :<AvatarLinkCloud
                                iconComponent={
                                    <div className='menu-box-bottom-item-avatar'>
                                        <Profile />
                                        {isExpanded && <div >个人中心</div>}
                                    </div>
                                }
                                {...props}
                            />
                    }

                </div>

            </div>

        </div>
    )
}

export default LeftMenuCommon