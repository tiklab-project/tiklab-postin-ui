/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React,{ Component } from 'react';
import contentImg from '../../assets/img/contentimg.jpg';
import { ProjectLogin, LOGIN_STATUS, ProjectElectronLogin } from 'doublekit-portal-ui'

import {inject, observer} from 'mobx-react'
// 登录
const Login = (props)=> {


    const electronDingDingQR = (url) =>{

    }

    try {
        if (electronVersion) {
            return (
                <ProjectElectronLogin
                    title={'接口管理'}
                    contentImg={contentImg}
                    {...props}
                    loginGoRouter={'/'}
                    fetchMethod={fetchMethod}
                    languageUrl={pluginAddressUrl}
                    // electronDingDingQR={electronDingDingQR}
                    // electronWeChatQR={}
                />
            )
        }
    } catch (error) {
        return(
            <ProjectLogin
                title={'接口管理'}
                contentImg={contentImg}
                {...props}
                loginGoRouter={'/'}
                fetchMethod={fetchMethod}
                languageUrl={pluginAddressUrl}
            />
        )
    }

}

export default inject(LOGIN_STATUS)(observer(Login)) ;
