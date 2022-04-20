/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React,{ Component } from 'react';
import contentImg from '../../assets/img/contentimg.jpg';
import { ProjectLogin, LOGIN_STATUS } from 'doublekit-portal-ui'

import {inject, observer} from 'mobx-react'
// 登录
const Login = (props)=> {

    const pickerData = [
        {
            value: 'project',
            label: 'Project系统',
            url: 'http://192.168.2.10:3001/'
        },
        {
            value: 'apibox',
            label: 'Apibox系统',
            url: 'http://192.168.2.8:3001/'
        },
        {
            value: 'protal',
            label: 'protal系统',
            url: 'http://192.168.2.6:8000/'
        }
    ]

    return(
        <ProjectLogin
            title={'接口管理'}
            contentImg={contentImg}
            {...props}
            loginGoRouter={'/'}
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
            // pickerData={pickerData}
            dingding_redirect_uri={"http://127.0.0.1:3000/#/login"}
        />
    )
}

export default inject(LOGIN_STATUS)(observer(Login)) ;
