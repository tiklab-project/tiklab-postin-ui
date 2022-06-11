import React from "react";
import "./quickTestStyle.scss";
import LeftNavListQuickTest from "./leftNavListQuickTest";
import RightContent from "../../common/rightContent";

const LayoutQuickTest = (props) =>{

    return(
        <RightContent
            left={ <LeftNavListQuickTest  {...props}/>}
            {...props}
        />

    )
}

export default LayoutQuickTest;