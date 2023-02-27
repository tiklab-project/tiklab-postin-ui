import React from "react";
import "./quickTestStyle.scss";
import LeftNavListQuickTest from "./LeftNavListQuickTest";
import RightContent from "../../common/RightContent";

const LayoutQuickTest = (props) =>{

    return(
        <RightContent
            left={ <LeftNavListQuickTest  {...props}/>}
            {...props}
        />

    )
}

export default LayoutQuickTest;