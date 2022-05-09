/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React from 'react';
import contentImg from '../../assets/img/contentimg.jpg';
import { Login, LOGIN_STATUS } from 'doublekit-portal-ui'

import {inject, observer} from 'mobx-react'


// 登录
const LoginContent = (props)=> {

    return(
        <Login
            title={'接口管理'}
            contentImg={contentImg}
            {...props}
            loginGoRouter={'/'}
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
        />
    )

}

export default inject(LOGIN_STATUS)(observer(LoginContent)) ;
