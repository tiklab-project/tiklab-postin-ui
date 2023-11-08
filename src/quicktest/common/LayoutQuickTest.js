import React from "react";
import "../http/components/quickTestStyle.scss";
import LeftNavListQuickTest from "./LeftNavListQuickTest";
import RightContent from "../../common/RightContent";

/**
 * 快捷测试
 * 布局
 */
const LayoutQuickTest = (props) =>{

    return(
        <RightContent
            left={ <LeftNavListQuickTest  {...props}/>}
            {...props}
        />

    )
}

export default LayoutQuickTest;