import React from 'react';
import {UserVerify} from "tiklab-eam-ui";
import PageContent from "./PageContent";
import {AppLink, AvatarLink, HelpLink} from "tiklab-licence-ui"

/**
 * 用于个性化配置
 */
export const Page = (props)=>{

    return(
        <PageContent
            AppLink={AppLink}
            HelpLink={HelpLink}
            AvatarLink={AvatarLink }
            {...props}
        />
    )
}

/**
 * 再把对象，使用平台高阶组件传递给verifyUser，验证用户
 */
export default UserVerify(Page,"/no-auth");



