/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React from 'react';
import { Login } from 'tiklab-eam-ui';
// 登录
const LoginContent = (props)=> {

    return(
        <Login
            {...props}
            title={"Postin"}
            // logoIcon={logo}
            // vaildUserAuthRouter={"/no-auth"}
        />
    )

}

export default LoginContent ;
