import React from "react";
import {withRouter} from "react-router-dom";
import {Empty} from "antd";
import "./templateListStyle.scss"
import Profile from "../avatar/Profile";

/**
 * 动态列表
 */
const DynamicList = props =>{

    const {dynamicList,type,readFn} = props

    // 动态路由跳转
    const goDynaLink = item =>{
        if(type==="message"){readFn(item)}

        props.history.push(item.link.split("#")[1])
    }

    // 渲染动态列表
    const renderLis = (item) => {
        const {actionType,action,user,createTime,data} = item
        const dataObj = data && JSON.parse(data)
        return (
            <div key={item.id} className="dynamic-item" onClick={()=>goDynaLink(item)}>
                <div className="dynamic-item-data">
                    <Profile
                        userInfo={user}
                    />
                    <div className='item-data-info'>
                        <div className='item-data-info-name'>{user?.nickname || user?.name} {actionType?.name}</div>
                        <div className='item-data-info-desc'>
                            <div className='desc-action'> {action}</div>
                            {
                                dataObj?.message &&
                                <div className='desc-message'>{dataObj.message}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dynamic-item-time">{createTime}</div>
            </div>
        )
    }

    // 渲染消息列表
    const renderMsgList = (item) => {
        const {messageType,action,sendUser,sendTime,data} = item
        const dataObj = data && JSON.parse(data)
        return (
            <div key={item.id} className="dynamic-item" onClick={()=>goDynaLink(item)}>
                <div className="dynamic-item-data">
                    <Profile
                        userInfo={sendUser}
                    />
                    <div className='item-data-info'>
                        <div className='item-data-info-name'>{sendUser?.nickname || sendUser?.name} {messageType?.name}</div>
                        <div className='item-data-info-desc'>
                            <div className='desc-action'> {action}</div>
                            {
                                dataObj?.message &&
                                <div className='desc-message'>{dataObj.message}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dynamic-item-time">{sendTime}</div>
            </div>
        )
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                    dynamicList.map(item=> {
                        if(type==="message"){
                           return  renderMsgList(item)
                        }else {
                            return renderLis(item)
                        }
                    })
                    :<Empty
                        imageStyle={{height: 100}}
                        description={<span>暂无动态</span>}
                    />

            }
        </div>
    )
}

export default withRouter(DynamicList)