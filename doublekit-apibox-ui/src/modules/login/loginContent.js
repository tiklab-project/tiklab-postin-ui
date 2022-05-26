/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React from 'react';
import contentImg from '../../assets/img/contentimg.jpg';
import { Login, EAM_STORE } from 'doublekit-eam-ui'

import {inject, observer} from 'mobx-react'


// 登录
const LoginContent = (props)=> {

    return(
        <Login
            title={'接口管理'}
            contentImg={contentImg}
            {...props}
            loginGoRouter={'/workspacepage/quickTest/detail/api'}
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
        />
    )

}

export default inject(EAM_STORE)(observer(LoginContent)) ;
