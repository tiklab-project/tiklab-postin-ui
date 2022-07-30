/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React from 'react';
import { Login } from 'tiklab-eam-ui';
import {EAM_STORE} from "tiklab-eam-ui/es/store"

import {inject, observer} from 'mobx-react'


// 登录
const LoginContent = (props)=> {

    return(
        <Login
            {...props}
            loginGoRouter={'/'}
            fetchMethod={fetchMethod}
            languageUrl={pluginAddressUrl}
        />
    )

}

export default inject(EAM_STORE)(observer(LoginContent)) ;
